'use strict'

const assert = require('assert')

function exec (filesGlob) {
  console.log('Thank you for trying out "bubbleup test"')
  const expected = [
    'test/findAllPlugins.js',
    'test/findBuildPlugins.js',
    'test/findPluginsByPrefix.js',
    'test/findTestPlugins.js',
    'test/isBasePlugin.js'
  ]
  assert.deepEqual(filesGlob, expected)
}

module.exports = {
  exec,
  base: true
}
