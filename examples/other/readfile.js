
var api = [
	[ "File", "initWithPath", "@mozilla.org/file/local;1", "nsILocalFile" ],
	[ "FileInputStream", "init", "@mozilla.org/network/file-input-stream;1", "nsIFileInputStream" ],
	[ "ScriptableInputStream", "init", "@mozilla.org/scriptableinputstream;1", "nsIScriptableInputStream" ],
];

function api_load() {
	for (var i in api) {
		var a = api[i];
		var jit = "function "+a[0]+"(x) {var a=Components.classes[\""
			+[2]+"\"].createInstance(Components.interfaces."
			+a[3]+"); a."+a[1]+"(x);return x;}";
		try {
			eval (jit);
		} catch (e) {
			print (e);
		}
	}
}

function readFile(f) {
        var file = File(f);
        var inputStream = FileInputStream (file);
        var sInputStream = ScriptableInputStream (inputStream);
        return sInputStream.read(sInputStream.available ());
}

var file = (args.length>0)? args[0]: "/init.rc";
print (readFile (file));
