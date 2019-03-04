
# META NAME Fullscreen for F11
# META DESCRIPTION Lets you switch to and back from fullscreen with F11
# META AUTHOR <András Murányi> muranyia@gmail.com

package require Tcl 8.5
package require Tk
package require pdwindow 0.1
package require pd_menus 0.1

variable fullscreen_windows {}

proc go_fullscreen {window} {
	global fullscreen_windows
	set cfs [wm attributes $window -fullscreen]
	if { $::tcl_platform(os) eq "Darwin" } {
		if { $cfs == 0 } {
		    set savevar [wm geometry $window]
		           }
	wm withdraw $window
 	} 
	wm attributes $window -fullscreen [expr {1-$cfs}]
	if { $::tcl_platform(os) eq "Darwin" } {
      wm deiconify $window
      if { $cfs == 1 } {
        after idle [list wm geometry $window $savevar]
		}
	}
}

proc withdraw_fullscreen {window} {
	global fullscreen_windows
	set cfs [wm attributes $window -fullscreen]
	if { $::tcl_platform(os) eq "Darwin" } {
		if { $cfs == 0 } {
		    set savevar [wm geometry $window]
		           }
	wm withdraw $window
 	} 
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

if { $::tcl_platform(os) eq "Darwin" } {
    bind all <Control-Shift-Key-F> {+toggle_fullscreen %W}
} else {
    bind all <F11> {+toggle_fullscreen %W}
}