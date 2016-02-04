'use strict';

const getPort = require('../')
const http = require('http')
const PORT = 6000

// our port is busy now
const s1 = http.createServer().listen(PORT)

getPort(PORT, check)
function check(port) {
  console.log(port) // 6001
  s1.close()
}
