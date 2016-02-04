'use strict';

const getPort = require('../')
const http = require('http')

getPort(check)
function check(port) {
  console.log(port) // some available port
}
