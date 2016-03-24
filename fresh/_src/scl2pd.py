#!/usr/bin/python
import sys 
from math import pow

# Set "write_pd" to 1 to automatically write files to use in a Pd table, set to
# 0 to only print the analysis.
#
# Files written will have the same name as the input files with ".tab"
# appended.
write_pd = 1

# converters:
def cent2float(cval):
    cval = float(cval)
    return pow(2, cval/1200.0)

def ratio2float(rval):
    r = rval.split("/",2)
    if len(r) < 2:
        r.append(1)
    return float(r[0]) / float(r[1])


def convert_scala(scala_filename):
    """converts scala file to a list of floats suitable for use in a Pd table"""
    try:
        scale = open(scala_filename)
    except:
        print >> sys.stderr, "Could not open scale file:", scala_filename

    debug = 0
    desc = ""
    numnotes = 0

    # 1/1 is implicit in scala files, but not in Pd tables:
    tab = [1]

    # walk through scala file:
    for l in scale:
        l = l.strip()
        
        if l.startswith("!"):
            continue
        
        if not desc:
            desc = l
            continue
        if not numnotes:
            numnotes = int(l)
            continue
            
        if l.find(".") > 0:
            if debug: print >> sys.stderr, """CENT: %s """ % l
            tab.append(cent2float(l))
            continue
        
        if debug: print """RATIO: %s """ % l
        tab.append(ratio2float(l))

    print >> sys.stderr, "\nDescription:\t", desc
    print >> sys.stderr, "Scala length:\t", numnotes
    print >> sys.stderr, "Pd table:\t", " ".join([str(x) for x in tab])
    print >> sys.stderr, "Table length:\t", len(tab)
    return tab
    scale.close()

if __name__ == "__main__":
    for file in sys.argv[1:]:
        tab = convert_scala(file)
        tab = [str(x) for x in tab]
        if write_pd:
            pdfile = "%s.tab" % file
            p = open(pdfile,"w")
            p.write(" ".join(tab))
            p.close()
            print >> sys.stderr, "Written to:\t", pdfile
            print
