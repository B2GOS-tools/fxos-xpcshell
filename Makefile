all:

install:
	adb remount
	adb push bin /system/xpcshell
	adb shell chmod 755 /system/xpcshell/xpcshell
	adb push xpcshell.sh /system/bin/xpcshell
	adb shell chmod 755 /system/bin/xpcshell
	adb shell mkdir -p /data/js/
	adb push examples /data/js/examples
