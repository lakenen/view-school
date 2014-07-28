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
  var name = 'magical document of the gods'
    , _done = done
    , theId

  boxViewMock.restore()
  boxViewMock.mock({
    documents: {
        list: function (opt, cb) {
          if (typeof opt === 'function') {
            done('HINT: you need to specify parameters for the list API call')
          }
          if (opt.limit !== 1) {
            done('HINT: `limit` the request to 1 document')
          }
          if (opt.created_before) {
            done('Nice try, but `created_before` is not necessary in this exercise')
          }
          return this.__.list(opt, function (err, res) {
            if (res && res.document_collection) {
              theId = res.document_collection.entries[0].id
            }
            cb(err, res)
            if (err) {
              printResponse(err.error)
              done('Looks like an API error... check the response for details')
            }
          })
        }
      , update: function (id, opt, cb) {
          if (id !== theId) {
            done('HINT: the first argument to documents.update should be the id of the document')
          }
          if (typeof opt === 'function' || !opt.name) {
            done('HINT: remember to update the name of the document')
          }
          return this.__.update(id, opt, function (err, res) {
            cb(err, res)
            if (err) {
              printResponse(err.error)
              done('Looks like an API error... check the response for details')
            }
          })
      }
    }
  })

  var updateLatest = requireSolution('update-latest')
  updateLatest(name, function (doc) {
    if (doc) {
      printResponse(doc)
      if (doc.name === name) {
        done(null, true)
      } else {
        done('Hmm, it seems like the name is wrong...')
      }
    } else {
      done('HINT: pass the updated document to the callback function')
    }
  })
}

function setup(done) {
  exEl.innerHTML = clickHTML + indexHTML
  done()
}
