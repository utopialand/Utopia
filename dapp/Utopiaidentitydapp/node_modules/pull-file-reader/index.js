/* global FileReader */
var toBuffer = require('typedarray-to-buffer')

module.exports = function (file, opts) {
  opts = opts || {}

  var offset = opts.offset || 0
  var chunkSize = opts.chunkSize || 1024 * 1024 // default 1MB chunk has tolerable perf on large files

  return function (end, cb) {
    if (end) return cb(end)
    // If finished reading then stop
    if (offset >= file.size) return cb(true)

    var fileReader = new FileReader(file)

    fileReader.onloadend = function loaded (event) {
      var data = event.target.result

      if (data instanceof ArrayBuffer) {
        data = toBuffer(new Uint8Array(event.target.result))
      }

      cb(null, data)
    }

    fileReader.onerror = function (err) {
      cb(err)
    }

    var endIndex = offset + chunkSize
    var slice = file.slice(offset, endIndex)
    fileReader.readAsArrayBuffer(slice)
    offset = endIndex
  }
}
