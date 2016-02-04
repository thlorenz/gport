'use strict';

var test = require('tape')
var getPort = require('../')
var http = require('http')
var spawn = require('child_process').spawn
var PORT = 6000

test('\nno server listening - random port', function (t) {
  getPort(check)
  function check(port) {
    t.ok(port > 0 , 'provides a random port')
    t.end()
  }
})

test('\nno server listening', function (t) {
  getPort(PORT, check)
  function check(port) {
    t.equal(port, PORT, 'uses given port')
    t.end()
  }
})

test('\nserver listening on port', function (t) {
  var s1 = http.createServer().listen(PORT)
  t.on('end', s1.close.bind(s1))

  getPort(PORT, check)
  function check(port) {
    t.equal(port, PORT + 1, 'uses next available port')
    t.end()
  }
})

test('\ntwo servers listening on port and next one', function (t) {
  var s1 = http.createServer().listen(PORT)
  var s2 = http.createServer().listen(PORT + 1)
  t.on('end', s1.close.bind(s1))
  t.on('end', s2.close.bind(s2))

  getPort(PORT, check)
  function check(port) {
    t.equal(port, PORT + 2, 'uses next available port')
    t.end()
  }
})

test('\nSimpleHTTP Python Server listening on port', function (t) {
  // This test is needed to demonstrate behavior where the server
  // is allowed to listen on a given port, but actually SimpleHTTP python
  // server is listening on it. For more info see ../gport.js

  var child = spawn('python', ['-m', 'SimpleHTTPServer', ''+PORT ])
  t.on('end', child.kill.bind(child))
  child.on('error', onerr)
  function onerr(err) { t.error(err) }

  // wait a bit to ensure it started listening
  setTimeout(onstarted, 200)

  function onstarted(d) {
    getPort(PORT, check)
    function check(port) {
      t.equal(port, PORT + 1, 'uses next available port')
      t.end()
    }
  }
})
