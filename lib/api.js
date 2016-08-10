'use strict'

const path = require('path')

const { getAllInDirectory, isDirectory, startsWith } = require('./util')

exports.requirePlugins = requirePlugins
exports.findTestPlugins = findTestPlugins
exports.findBuildPlugins = findBuildPlugins
exports.findAllPlugins = findAllPlugins
exports.findPluginsByPrefix = findPluginsByPrefix
exports.isBasePlugin = isBasePlugin
exports.getNodeModulesPath = getNodeModulesPath

const PLUGIN_PREFIX = 'bubbleup-plugin'
const TEST_PREFIX = `${PLUGIN_PREFIX}-test`
const BUILD_PREFIX = `${PLUGIN_PREFIX}-build`

exports.PLUGIN_PREFIX = PLUGIN_PREFIX
exports.TEST_PREFIX = TEST_PREFIX
exports.BUILD_PREFIX = BUILD_PREFIX

function isBasePlugin (plugin) {
  return plugin.base ? plugin.base : false
}

function requirePlugins (directory, plugins) {
  if (isDirectory(directory)) {
    return plugins.map(name => require(path.join(directory, name)))
  }
  return plugins.map(name => require(name))
}

function findTestPlugins (directory) {
  return findPluginsByPrefix(directory, TEST_PREFIX)
}

function findBuildPlugins (directory) {
  return findPluginsByPrefix(directory, BUILD_PREFIX)
}

function findAllPlugins (directory) {
  return findPluginsByPrefix(directory, PLUGIN_PREFIX)
}

function findPluginsByPrefix (directory, prefix) {
  console.log('Searching for plugins in', directory + '...')
  let plugins = []

  getAllInDirectory(directory, function (directoryName) {
    if (startsWith(prefix, directoryName)) {
      plugins.push(directoryName)
    }
  })

  return plugins
}

function getNodeModulesPath (directory) {
  const NODE_MODULES_DIRECTORY = path.join(directory, 'node_modules')

  if (isDirectory(NODE_MODULES_DIRECTORY)) {
    return NODE_MODULES_DIRECTORY
  } else {
    console.error('The given directory does not have node_modules folder')
    console.info('Have you run npm install?')
  }
}
