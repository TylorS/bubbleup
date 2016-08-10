'use strict'

const assert = require('assert')

function exec (entryFile) {
  console.log('Thank you for trying out "bubbleup build"')
  assert(entryFile === 'src/index.js')
}

module.exports = {
  exec,
  base: true
}
