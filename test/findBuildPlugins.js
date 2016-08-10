'use strict'

/* global describe, it */

const path = require('path')

const assert = require('assert')

const { findBuildPlugins } = require('../lib/api')

describe('findBuildPlugins', () => {
  it('should find all build plugins in a given directory', () => {
    const dir = path.join(process.cwd(), 'plugins')
    const plugins = findBuildPlugins(dir)

    const expected = ['bubbleup-plugin-build-fake']

    assert.deepEqual(expected, plugins)
  })
})
