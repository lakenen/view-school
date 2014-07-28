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
  var getThumbnail = requireSolution('download-thumbnail')

  boxViewMock.restore()
  boxViewMock.mock({
    documents: {
      getThumbnail: function (id, opt, cb, retry) {

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
  getThumbnail(function (res) {
    console.log(res.buffer)

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
