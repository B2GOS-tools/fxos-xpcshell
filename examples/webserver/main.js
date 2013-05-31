#!/system/bin/xpcshell -f httpd.js

let server = new HttpServer();
const SERVER_PORT = 8080; // or some suitably large number
var file = Components.classes["@mozilla.org/file/local;1"]
	.createInstance (Components.interfaces.nsILocalFile);
file.initWithPath ("/");
server.registerDirectory("/", file);
server.start (SERVER_PORT);

function handleRequest (request, response) {
  response.setStatusLine (request.httpVersion, 200, "OK");
  response.write ("Hello world!  This request was dynamically " +
                 "generated at " + new Date().toUTCString());
}

print ("server started");

(function waitforevents() {
  const Cc = Components.classes;
  var gThreadManager = Cc["@mozilla.org/thread-manager;1"].getService();
  var thread = gThreadManager.currentThread;
  while (!server.isStopped())
    thread.processNextEvent(true);

  // get rid of any pending requests
  while (thread.hasPendingEvents())
    thread.processNextEvent(true);
print ("done");
})();
