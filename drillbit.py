#!/usr/bin/python
import os, sys
import shutil, platform, subprocess

def help(args=[],suppress_banner=False):
	print "Appcelerator Module Drillbit Runner"
	print "Copyright (c) 2010-2012 by Appcelerator, Inc."
	print

	if len(args)==0:
		print "Usage: module_folder titanium_mobile_folder [additional args]"
		print "Example: ./drillbit.py commonJS/cloud ~/Titanium/titanium_mobile --platforms=iphone"
	print
	sys.exit(-1)

def main(args):
    if len(args) < 3:
        help()

    print "Appcelerator Module Drillbit Runner"
    print

    module_folder = os.path.join(os.getcwd(),args[1])
    titanium_mobile_folder = os.path.expanduser(args[2])
    modulename = os.path.basename(module_folder)
    drillbit_cmd = './drillbit/drillbit.py --tests-dir=%s/drillbit/tests --tests=%s --iphone-version=5.0' % (module_folder, modulename)

    # Append additional drillbit commands
    if len(args) > 3:
        for arg in args[3:]:
            drillbit_cmd += ' ' + arg

    print drillbit_cmd
    subprocess.Popen(drillbit_cmd, shell=True, cwd=titanium_mobile_folder)

if __name__ == "__main__":
	main(sys.argv)