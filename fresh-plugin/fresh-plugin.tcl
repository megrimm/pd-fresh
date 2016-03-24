
# META NAME Fullscreen for F11
# META DESCRIPTION Lets you switch to and back from fullscreen with F11
# META AUTHOR <András Murányi> muranyia@gmail.com

::pdwindow::post "-\n"
::pdwindow::post "Shift + Command + F = Fullscreen Patch\n"
::pdwindow::post "-\n"

package require Tcl 8.4
package require Tk
package require pdwindow 0.1
package require pd_menus 0.1

#
# Set fresh/_extra/ user directory (NOT WORKING)
#
set custom_search_pathset {
	{fresh}{_extra}
	}
set enabled_libraries {fresh}

#
# Fullscreen Patch Window
#
variable fullscreen_windows {}

proc go_fullscreen {window} {
	global fullscreen_windows
#	wm attributes $window -topmost yes   ;# stays on top
	wm attributes $window -fullscreen 1
	if {$::windowingsystem ne "aqua"} {
    $window configure -menu ""
 	} 
	lappend fullscreen_windows $window
	update idletasks
}

proc withdraw_fullscreen {window} {
	global fullscreen_windows
#	if { [wm attributes $window -topmost] eq "yes" } {
#		wm attributes $window -topmost no
#	}
	wm attributes $window -fullscreen 0
	if {$::windowingsystem ne "aqua"} {
    $window configure -menu $::patch_menubar
 	} 
	set idx [lsearch -exact $fullscreen_windows $window]
	set fullscreen_windows [lreplace $fullscreen_windows $idx $idx]
	update idletasks
}

proc toggle_fullscreen {window} {
	global fullscreen_windows
	set window [winfo toplevel $window]
	if { [winfo class $window] eq "PatchWindow"} {
		if { [lsearch $fullscreen_windows $window] == -1 } {
			go_fullscreen $window
		} else {
			withdraw_fullscreen $window
		}
	}
}

if {$::windowingsystem eq "aqua"} {
    bind all <Mod1-Shift-Key-F> {+toggle_fullscreen %W}
} else {
    bind all <F11> {+toggle_fullscreen %W}
}


#
# Change Background Color in Edit Mode
#

proc change_background_color_in_editmode {mytoplevel eventname} {
    if {$mytoplevel eq ".pdwindow"} {return}
    set tkcanvas [tkcanvas_name $mytoplevel]
        if { ! [winfo exists $mytoplevel] } {return}
    if {$::editmode($mytoplevel) == 1} {
        $tkcanvas configure -background "lavender"
    } else {
        $tkcanvas configure -background white
    }
}

bind PatchWindow <<EditMode>> {+change_background_color_in_editmode %W editmode}
bind PatchWindow <<Loaded>> {+change_background_color_in_editmode %W loaded}




# META TCL/TK prompt plugin
# META DESCRIPTION enables a wee Tcl/Tk cmdline within the Pd-console
# META AUTHOR IOhannes m zmˆlnig <zmoelnig@umlaeute.mur.at>, Hans-Christoph Steiner <hans@eds.org>
# META VERSION 0.1

# package require pdwindow 0.1

## first check if the Pd-runtime provides a tcl_entry (and use it)
if {[catch ::pdwindow::create_tcl_entry errorname]} {

## if that fails, we need to provide our own (code shamelessly taken from Pd-0.46)

namespace eval ::tclprompt:: {
    variable tclentry {}
    variable tclentry_history {"console show"}
    variable history_position 0
}

proc ::tclprompt::eval_tclentry {} {
    variable tclentry
    variable tclentry_history
    variable history_position 0
    if {$tclentry eq ""} {return} ;# no need to do anything if empty
    if {[catch {uplevel #0 $tclentry} errorname]} {
        global errorInfo
        switch -regexp -- $errorname {
            "missing close-brace" {
                ::pdwindow::error [concat [_ "(Tcl) MISSING CLOSE-BRACE '\}': "] $errorInfo]\n
            } "missing close-bracket" {
                ::pdwindow::error [concat [_ "(Tcl) MISSING CLOSE-BRACKET '\]': "] $errorInfo]\n
            } "^invalid command name" {
                ::pdwindow::error [concat [_ "(Tcl) INVALID COMMAND NAME: "] $errorInfo]\n
            } default {
                ::pdwindow::error [concat [_ "(Tcl) UNHANDLED ERROR: "] $errorInfo]\n
            }
        }
    }
    lappend tclentry_history $tclentry
    set tclentry {}
}


proc ::tclprompt::get_history {direction} {
    variable tclentry_history
    variable history_position

    incr history_position $direction
    if {$history_position < 0} {set history_position 0}
    if {$history_position > [llength $tclentry_history]} {
        set history_position [llength $tclentry_history]
    }
    .pdwindow.tclprompt.entry delete 0 end
    .pdwindow.tclprompt.entry insert 0 \
        [lindex $tclentry_history end-[expr $history_position - 1]]
}


proc ::tclprompt::validate_tcl {} {
    variable tclentry
    if {[info complete $tclentry]} {
        .pdwindow.tclprompt.entry configure -background "white"
    } else {
        .pdwindow.tclprompt.entry configure -background "#FFF0F0"
    }
}

#--create tcl entry-----------------------------------------------------------#

proc ::tclprompt::create {} {
    # Tcl entry box frame
    frame .pdwindow.tclprompt -borderwidth 0
    pack .pdwindow.tclprompt -side bottom -fill x -before .pdwindow.text
    label .pdwindow.tclprompt.label -text [_ "Tcl:"] -anchor e
    pack .pdwindow.tclprompt.label -side left
    entry .pdwindow.tclprompt.entry -width 200 \
       -exportselection 1 -insertwidth 2 -insertbackground blue \
       -textvariable ::tclprompt::tclentry -font {$::font_family -12}
    pack .pdwindow.tclprompt.entry -side left -fill x

# bindings for the Tcl entry widget
    bind .pdwindow.tclprompt.entry <$::modifier-Key-a> "%W selection range 0 end; break"
    bind .pdwindow.tclprompt.entry <Return> "::tclprompt::eval_tclentry"
    bind .pdwindow.tclprompt.entry <Up>     "::tclprompt::get_history 1"
    bind .pdwindow.tclprompt.entry <Down>   "::tclprompt::get_history -1"
    bind .pdwindow.tclprompt.entry <KeyRelease> +"::tclprompt::validate_tcl"

    bind .pdwindow.text <Key-Tab> "focus .pdwindow.tclprompt.entry; break"

#    pack .pdwindow.tclprompt
}


::tclprompt::create
}


# This plug generates a menu tree for selecting objects from a single
# structured textfile.  The format of the textfile is nested Tcl lists
# defined using {} brackets.

#package require pd_menus

namespace eval category_menu {
}

proc category_menu::load_menutree {} {
    # load object -> tags mapping from file in Pd's path
    set testfile [file join $::current_plugin_loadpath menutree.tcl]
    set f [open $testfile]
    # filter out commented out lines from the data file
    set menutree [regsub -all {\n\s*#[^\n]*} [read $f] "\n"]
    close $f
    unset f        
    return $menutree
}

proc category_menu::create {mymenu} {
    set menutree [load_menutree]
    $mymenu add separator
    foreach categorylist $menutree {
        set category [lindex $categorylist 0]
        set categorymenu $mymenu.[string tolower $category]
        menu $categorymenu
        $mymenu add cascade -label $category -menu $mymenu.$category
        foreach subcategorylist [lrange $categorylist 1 end] {
            set subcategory [lindex $subcategorylist 0]
            set subcategorymenu $categorymenu.[string tolower $subcategory]
            menu $subcategorymenu
            $categorymenu add cascade -label $subcategory -menu $subcategorymenu
            foreach item [lindex $subcategorylist end] {
                # replace the normal dash with a Unicode minus so that Tcl doesn't
                # interpret the dash in the -label to make it a separator
                $subcategorymenu add command \
                    -label [regsub -all {^\-$} $item {−}] \
                    -command \
                    "pdsend \"\$::focused_window obj \$::popup_xcanvas \$::popup_ycanvas $item\""
            }
        }
    }
}

category_menu::create .popup
