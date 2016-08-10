'use strict'

/* global describe, it */

const path = require('path')

const assert = require('assert')

const { isBasePlugin, findPluginsByPrefix, requirePlugins } = require('../lib/api')

const fakePlugin = {
  exec: () => {}
}

describe('isBasePlugin', () => {
  it('should return false if not a base plugin', () => {
    assert(false === isBasePlugin(fakePlugin))
  })

  it('should reeturn true if a plugin is a base plugin', () => {
    const dir = path.join(process.cwd(), 'plugins')
    const plugins = requirePlugins(dir, findPluginsByPrefix(dir, 'findByPrefix'))

    const plugin = plugins[0]

    assert(isBasePlugin(plugin))
  })
})
