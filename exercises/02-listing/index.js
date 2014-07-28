var path = require('path')
var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var clickHTML = fs.readFileSync(__dirname + '/../click.html', 'utf8')
var indexHTML = fs.readFileSync(__dirname + '/index.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')
var exName = path.basename(__dirname)
var exEl = document.querySelector('.exercise-content')

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

  boxViewMock.restore()
  boxViewMock.mock({
    documents: {
      list: function (opt, cb) {
        if (typeof opt === 'function') {
          cb = opt
          opt = {}
        }
        return this.__.list(opt, function (err, res) {
          cb(err, res)
          if (err) {
            printResponse(err.error)
            done('Looks like an API error... check the response for details')
          }
        })
      }
    }
  })

  var list = requireSolution('list')
  list(function (docs) {
    if (!docs) {
      done('HINT: call the callback function with the document list')
    }
    printResponse(docs)
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
  exEl.innerHTML = clickHTML + indexHTML
  done()
}
