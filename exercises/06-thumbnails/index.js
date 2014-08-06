var path = require('path')
var printResponse = require('../print-response')
var exName = path.basename(__dirname)
var exEl = document.querySelector('.display')

var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var indexHTML = fs.readFileSync(__dirname + '/index.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')


module.exports = {
    dirname: exName
  , description: readme
  , success: success
  , files: files
  , test: test
  , setup: setup
  , testTimeout: false
}

function requireSolution(name) {
  // require solution files in this way so browserify doesnt try to bundle them
  return require(name + '.js')
}

function test(done) {
  var boxViewMock = require('../mock-box-view')

  boxViewMock.restore()
  boxViewMock.mock({
    documents: {
      getThumbnail: function (id, width, height, opt, cb) {

        if (typeof width !== 'number' || typeof height !== 'number') {
          done('HINT: you should specify both a width and a height')
        }

        if (!opt) {
          opt = {}
        }

        if (opt.retry === true) {
          done('Nice find, but the `retry` option makes it too easy; let\'s learn a bit about 202 responses.<br/><br/>HINT: use setTimeout with the "retry-after" header!')
        }

        var r = this.__.getThumbnail(id, width, height, opt, function (err, res) {
          cb(err, res)
          if (err) {
            printResponse(err.error)
            done('Looks like an API error... check the response for details')
          }
        })
        r.on('response', function (res) {
          res.pipe(printResponse({ ignoreBody: true }))
        })
        return r
      }
    }
  })

  var getThumbnail = requireSolution('download-thumbnail')
  getThumbnail(function (res) {

    var result = [];
    res.on('data', function (d) {
      result.push(d)
    })
    res.on('end', function (e) {
      var data = concat.apply(null, result);
      var blob = new window.Blob([ data ])

      exEl.querySelector('.thumbnail-img').src = URL.createObjectURL(blob)
      done(null, true)
    })
  })
}

function setup(done) {
  exEl.innerHTML = indexHTML

  done()
}

function concatBuffer(buffer1, buffer2) {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
}

function concat() {
  return [].reduce.call(arguments, concatBuffer);
}
