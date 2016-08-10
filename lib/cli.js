#!/usr/bin/env node

'use strict'

const path = require('path')

const program = require('commander')
const version = require('../package.json').version

const {
  findTestPlugins,
  findBuildPlugins,
  requirePlugins,
  isBasePlugin,
  getNodeModulesPath
} = require('./api')

const { isDirectory } = require('./util')

const CWD = require('process').cwd()

program.version(version)
  .option('-p, --pluginsPath <path>', 'Path to look for plugins (defaults to node_modules folder)')

program.command('test [filesGlob...]')
  .description('Run tests matching a given fileGlob')
  .action(executePlugin(findTestPlugins))

program.command('build <entryFile>')
  .option('-d, --dist-build <path>', 'Where to output a complete dist build')
  .option('-l, --lib-build <path>', 'Where to output a complete lib build')
  .description('Run a build system with a given entryFile')
  .action(executePlugin(findBuildPlugins))

// TODO program.command('lint <directory>')

// TODO program.comman('deploy')

program.parse(process.argv)

function executePlugin (findPlugins) {
  return function (args, options) {
    const directory = options.parent.pluginsPath
      ? path.join(CWD, options.parent.pluginsPath)
      : getNodeModulesPath(CWD)

    if (!isDirectory(directory)) {
      return console.error('Is not a directory', directory)
    }

    const pluginNames = findPlugins(directory)

    if (pluginNames.length === 0) {
      return console.info('No plugins have been installed in', directory)
    }

    const requireDir = options.parent.pluginsPath
      ? directory
      : false

    const plugins = requirePlugins(requireDir, pluginNames)

    plugins.forEach(function (plugin) {
      const { exec } = plugin

      if (isBasePlugin(plugin)) {
        if (typeof exec !== 'function') {
          throw new Error(`${plugin} is not a plugin: missing exec function`)
        }
        exec(args, options, CWD)
      }
    })
  }
}
