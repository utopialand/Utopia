# pull-file-reader [![dependencies Status](https://david-dm.org/tableflip/pull-file-reader/status.svg)](https://david-dm.org/tableflip/pull-file-reader)

Given an HTML5 File object (from e.g. HTML5 drag and drops), turn it into a pull stream source.

Heavily based on [filereader-stream](https://github.com/maxogden/filereader-stream) by [@maxogden](https://github.com/maxogden).

# install

Use it with npm & [browserify](https://github.com/substack/node-browserify)

```bash
npm install pull-file-reader
```

# example

```js
var drop = require('drag-and-drop-files')
var pull = require('pull-stream')
var fileReader = require('pull-file-reader')

drop(document.body, function (files) {
  var first = files[0]
  pull(
    fileReader(first),
    pull.collect(function (err, buffs) {
      var contents = Buffer.concat(buffs)
      // contents is the contents of the entire file
    })
  )
})

```

# usage

```js
var fileReader = require('pull-file-reader')
var source = fileReader(file, [options])
```

`fileReader` is a [pull stream](https://github.com/pull-stream/pull-stream) [source](https://github.com/pull-stream/pull-stream#source-aka-readable).

`options`:

* `chunkSize` - default `1024 * 1024` (1MB) - How many bytes will be read at a time
* `offset` - default `0` - Where in the file to start reading

# run the tests

```
npm install
npm test
```

then open your browser to the address provided, open your JS console, and drag and drop files onto the page until the test suite passes/fails

----

A [(╯°□°）╯︵TABLEFLIP](https://tableflip.io) side project.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
