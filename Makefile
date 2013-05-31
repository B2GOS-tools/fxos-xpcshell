all:

install:
	adb remount
	adb push xpcshell /system/b2g/xpcshell
	adb shell chmod 755 /system/b2g/xpcshell
	adb push xpcshell.sh /system/bin/xpcshell
	adb shell chmod 755 /system/bin/xpcshell
	
