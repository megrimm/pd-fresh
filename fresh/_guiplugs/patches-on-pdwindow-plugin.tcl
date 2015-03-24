# open all files dropped on the Pd Window

#lappend ::auto_path tkdnd
lappend auto_path "/Users/megrimm/Library/Pd/tkdnd"
package require tkdnd

namespace eval ::patches_on_pdwindow {
}

::tkdnd::drop_target register .pdwindow DND_Files
bind .pdwindow <<Drop:DND_Files>> {::patches_on_pdwindow::open_dropped_files %D}

proc ::patches_on_pdwindow::open_dropped_files {files} {
    foreach file $files {
        open_file $file
    }
    return "link"
}
