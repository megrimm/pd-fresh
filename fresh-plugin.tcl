
# META NAME Fullscreen for F11
# META DESCRIPTION Lets you switch to and back from fullscreen with F11
# META AUTHOR <András Murányi> muranyia@gmail.com

::pdwindow::post "-"
::pdwindow::post "Shift + Command + F = Fullscreen Patch"
::pdwindow::post "-"

package require Tcl 8.4
package require Tk
package require pdwindow 0.1
package require pd_menus 0.1


# Fullscreen Patch Window
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

# CordArrows
# this adds arrowheads to the ends of cords when in editmode in
# order to show the direction that the messages are flowing

proc add_arrows_to_cords {mytoplevel} {
    if { ! [winfo exists $mytoplevel] } {return}
    if {$mytoplevel eq ".pdwindow"} {return}
    set tkcanvas [tkcanvas_name $mytoplevel]
    if {$::editmode($mytoplevel) == 1} {
        $tkcanvas itemconfigure cord -arrow last
    } else {
        $tkcanvas itemconfigure cord -arrow none
    }
}

bind PatchWindow <<EditMode>> {+add_arrows_to_cords %W}
