var path = require('path')
var printResponse = require('../print-response')
var exName = path.basename(__dirname)
var exEl = document.querySelector('.display')

var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var indexHTML = fs.readFileSync(__dirname + '/index.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')

// congratulations
var url = 'https://github.com/lakenen/view-school-assets/raw/master/2.pdf'

// TODO: abstract local storage into the workshopper somehow
var storageKey = 'Box-View-School.storage:06-thumbnails/id'

var id = window.localStorage.getItem(storageKey) || ''
  , width = 300 + Math.floor(Math.random() * 100)
  , height = 300 + Math.floor(Math.random() * 100)
  , created = false // whether the client has been created yet

module.exports = {
    dirname: exName
  , description: readme
  , success: success
  , files: files
  , test: test
  , setup: setup
  , testTimeout: 15000
  , next: require('../next-exercise')(exName)
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
          done('(HINT) you should specify both a width and a height')
        }

        if (typeof opt === 'function') {
          cb = opt
          opt = {}
        }

        if (opt.retry === true) {
          done('Nice find, but the `retry` option makes it too easy; let\'s learn a bit about 202 responses.<br/><br/>(HINT) use setTimeout with the "retry-after" header!')
        }

        var r = this.__.getThumbnail(id, width, height, opt, function (err, res) {
          if (err) {
            done('Looks like an API error... check the response for details')
          }
          setTimeout(cb.bind(null, err, res), 50)
        })
        r.on('response', function (res) {
          if (res.statusCode !== 200) {
            res.pipe(printResponse())
          }
        })
        return r
      }
    }
  }, function (client) {
    created = true
    if (id) {
      setTimeout(runTest)
    } else {
      client.documents.uploadURL(url, function (err, doc) {
        id = doc && doc.id
        if (id) {
          window.localStorage.setItem(storageKey, id)
          runTest()
        } else {
          done('Error setting up exercise...')
        }
      })
    }
    return client
  })

  var getThumbnail = requireSolution('download-thumbnail')
  if (!created) {
    done('(HINT) in this exercise, the client needs to be created before your exported method runs')
  }

  function runTest() {
    if (!id) {
      done('OOPS, something went wrong uploading a document for this exercise...')
    }
    getThumbnail(id, width++, height++, function (res) {
      if (!res) {
        done('(HINT) pass the successful response object to the callback function')
      }
      if (res.statusCode === 202) {
        done('(HINT) retry your request if you get a 202 response code (see the bit about `retry-after` in the instructions!)')
      }
      res.pipe(printResponse({ ignoreBody: true }))
      var result = [];
      res.on('data', function (d) {
        result.push(d)
      })
      res.on('end', function (e) {
        var data = concat.apply(null, result);
        var blob = new window.Blob([ data ])

        exEl.querySelector('.thumbnail-img').src = URL.createObjectURL(blob)
        setTimeout(function () {
          done(null, true)
        }, 50)
      })
    })
  }
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
