# Attempt to load a config.make file.
# If none is found, project defaults in config.project.make will be used.
ifneq ($(wildcard config.make),)
	include config.make
endif

# How do I build Universal?
# USER_CFLAGS = -arch arm64 x86_64
USER_CFLAGS = -arch arm64
# USER_CFLAGS = -arch x86_64


# make sure the the OF_ROOT location is defined
ifndef OF_ROOT
	# OF_ROOT=$(realpath ../../..)
	OF_ROOT=$(realpath /Users/megrimm/Development/openframeworks/of_v20220726_osx_release)
endif

# call the project makefile!
include $(OF_ROOT)/libs/openFrameworksCompiled/project/makefileCommon/compile.project.mk
