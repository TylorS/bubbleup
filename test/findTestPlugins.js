'use strict'

/* global describe, it */

const path = require('path')

const assert = require('assert')

const { findTestPlugins } = require('../lib/api')

describe('findTestPlugins', () => {
  it('should find all plugins in a given directory', () => {
    const dir = path.join(process.cwd(), 'plugins')
    const plugins = findTestPlugins(dir)

    const expected = ['bubbleup-plugin-test-fake']

    assert.deepEqual(expected, plugins)
  })
})
