'use strict'

const fs = require('fs')
const path = require('path')

exports.isDirectory = isDirectory
exports.getAllInDirectory = getAllInDirectory
exports.startsWith = startsWith

function isDirectory (pathname) {
  try {
    return fs.statSync(pathname).isDirectory()
  } catch (e) {
    return false
  }
}

function getAllInDirectory (directory, cb) {
  const files = fs.readdirSync(directory)
  for (let i = 0; i < files.length; ++i) {
    const filename = path.basename(files[i])
    const file = path.join(directory, filename)
    if (isDirectory(file)) {
      cb(filename)
    }
  }
}

function startsWith (prefix, string) {
  switch (arguments.length) {
    case 1: return function (string) { return string.indexOf(prefix) === 0 }
    case 2: return string.indexOf(prefix) === 0
    default: return startsWith
  }
}
