'use strict'

/* global describe, it */

const path = require('path')

const assert = require('assert')

const { findAllPlugins } = require('../lib/api')

describe('findAllPlugins', () => {
  it('should find all plugins in a given directory', () => {
    const dir = path.join(process.cwd(), 'plugins')
    const plugins = findAllPlugins(dir)

    const expected = ['bubbleup-plugin-build-fake', 'bubbleup-plugin-test-fake']

    assert.deepEqual(expected, plugins)
  })
})
