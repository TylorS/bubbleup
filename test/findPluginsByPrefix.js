'use strict'

/* global describe, it */

const path = require('path')

const assert = require('assert')

const { findPluginsByPrefix } = require('../lib/api')

describe('findPluginsByPrefix', () => {
  it('should find all plugins in a given directory by its prefix', () => {
    const dir = path.join(process.cwd(), 'plugins')
    const plugins = findPluginsByPrefix(dir, 'findByPrefix')

    const expected = ['findByPrefix']

    assert.deepEqual(expected, plugins)
  })
})
