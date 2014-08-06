var path = require('path')
var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var unusedHTML = fs.readFileSync(__dirname + '/../unused.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')
var exName = path.basename(__dirname)
var exEl = document.querySelector('.display')

var printResponse = require('../print-response')

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

function test(done) {
  var boxViewMock = require('../mock-box-view')

  boxViewMock.restore()
  boxViewMock.mock({
    documents: {
      list: function (opt, cb) {
        if (typeof opt === 'function') {
          cb = opt
          opt = {}
        }
        var r = this.__.list(opt, function (err, body, response) {
          cb(err, body)
          if (err) {
            done('Looks like an API error... check the response for details')
          }
        })
        r.on('response', function (res) {
          res.pipe(printResponse())
        })
        return r
      }
    }
  })

  var list = requireSolution('list')
  list(function (docs) {
    if (!docs) {
      done('HINT: call the callback function with the document list')
    }
    if (docs.document_collection) {
      if (docs.document_collection.entries.length) {
        done(null, true)
      } else {
        done('Oops, I don\'t see any docs (did you upload one yet?)')
      }
    }
  })
}

function setup(done) {
  exEl.innerHTML = unusedHTML
  done()
}
