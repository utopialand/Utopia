var test = require('tape')
var drop = require('drag-and-drop-files')
var pull = require('pull-stream')
var fileReader = require('./')

var LEN = 1024 * 512

drop(document.body, function (files) {
  test('should read file when one is dropped', function (t) {
    var first = files[0]

    pull(
      fileReader(first, { chunkSize: LEN }),
      pull.through(function (ch) {
        t.ok(ch.length <= LEN, 'length is <= ' + LEN)
      }),
      pull.collect(function (err, buffs) {
        t.ifError(err, 'no error')
        var all = Buffer.concat(buffs)
        t.ok(all.length > 0, 'got some data')
        t.equal(all.length, first.size, 'size is ' + first.size)
        t.end()
      })
    )
  })
})
