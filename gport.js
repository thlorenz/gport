'use strict'

var http = require('http')

/**
 * Quick and dirty way to find an open port number on your localhost.
 * Super small as it doesn't include any huge dependencies like other port finder libs.
 * Inspired by https://gist.github.com/mikeal/1840641
 *
 * @name getPort
 * @function
 * @param {Number=} port start port, will be increased until an open one is
 * found, when not supplied a random port will be used
 * @param {Function} cb called back with the open port
 */
module.exports = function getPort(port, cb) {
  if (typeof port === 'function') {
    cb = port
    // passing port 0 will cause Node.js to use a random port
    port = 0
  }

  var server = http.createServer()
  var success = false
  var random = Math.random()
  var currentPort, nextPort

  function onclose() {
    if (success) return cb(currentPort)
    // we were able to listen, but another server is actually
    // listening on that port and responded to our request
    var next = nextPort || (currentPort && currentPort + 1) || 0
    getPort(nextPort, cb)
  }
  function onerror(err) {
    // failed to connect, let's try another port
    var next = nextPort || (port && port + 1) || (currentPort && currentPort + 1) || 0
    getPort(next, cb)
  }

  function onlistening() {
    currentPort = server.address().port
    nextPort = currentPort + 1

    // Somehow the server will listen even if the port is in use by another server,
    // i.e. if a SimpleHTTP Python server is listening on it.
    // Therefore we make sure that really it's our server that's listening
    // on this port by making a request and ensuring our server responds.
    http.get('http://localhost:' + currentPort, onresponse)
    function onresponse(res) {
      success = res.headers && res.headers.server === 'GetPort-TestServer - ' + random
      // destroy connection, close server and thus trigger callback or another try
      res.destroy()
      server.close()
    }
  }

  function onrequest(req, res) {
    // send very specific header to identify our server
    res.writeHead(200, { server: 'GetPort-TestServer - ' + random })
    res.end()
  }

  server
    .on('listening', onlistening)
    .on('error', onerror)
    .on('request', onrequest)
    .once('close', onclose)
    .listen(port)
}
