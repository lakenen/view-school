var path = require('path')
var exName = path.basename(__dirname)
var exEl = document.querySelector('.exercise-content')

var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var clickHTML = fs.readFileSync(__dirname + '/../click.html', 'utf8')
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

function printResponse(res) {
  exEl.querySelector('.response').innerText = JSON.stringify(res, true, 2)
}

function test(done) {
  var boxViewMock = require('../mock-box-view')

  boxViewMock.restore()
  boxViewMock.mock({
    documents: {
      getThumbnail: function (id, opt, cb, retry) {

        if (retry === true) {
          done('Nice find, but the `retry` arg makes it too easy; let\'s learn a bit about 202 responses.<br/><br/>HINT: use setTimeout with the "retry-after" header!')
        }

        return this.__.getThumbnail(id, opt, function (err, res) {
          cb(err, res)
          if (err) {
            printResponse(err.error)
            done('Looks like an API error... check the response for details')
          }
        })
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

      exEl.querySelector('img').src = URL.createObjectURL(blob)
      done(null, true)
    })
  })
}

function setup(done) {
  exEl.innerHTML = clickHTML + indexHTML

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
