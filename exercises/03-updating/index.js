var path = require('path')
var printResponse = require('../print-response')
var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var unusedHTML = fs.readFileSync(__dirname + '/../unused.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')
var exName = path.basename(__dirname)
var exEl = document.querySelector('.display')

module.exports = {
    dirname: exName
  , description: readme
  , success: success
  , files: files
  , test: test
  , setup: setup
  , next: require('../next-exercise')(exName)
}

function requireSolution(name) {
  // require solution files in this way so browserify doesnt try to bundle them
  return require(name + '.js')
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
          if (typeof opt === 'function' || !opt.params) {
            done('(HINT) you\'ll need to specify some `params` with the list request')
          }
          if (opt.params.limit !== 1) {
            done('(HINT) `limit` the request to 1 document')
          }
          if (opt.params.created_before) {
            done('Nice try, but `created_before` is not necessary in this exercise')
          }
          var r = this.__.list(opt, function (err, res) {
            if (res && res.document_collection) {
              theId = res.document_collection.entries[0].id
            }
            if (err) {
              done('Looks like an API error... check the response for details')
            }
            // set a timeout so that the response prints before "PASSED!"
            setTimeout(function () {
              cb(err, res)
            }, 50)
          })
          r.on('response', function (res) {
            res.pipe(printResponse())
          })
          return r
        }
      , update: function (id, data, opt, cb) {
          if (id !== theId) {
            done('(HINT) the first argument to documents.update should be the id of the document')
          }
          if (typeof opt === 'function') {
            cb = opt
            opt = {}
          }
          if (typeof data === 'function' || !data) {
            done('(HINT) you\'ll need to specify some `data` with the update request')
          }
          if (!data.name) {
            done('(HINT) remember to update the name of the document')
          }
          var r = this.__.update(id, data, opt, function (err, res) {
            if (err) {
              done('Looks like an API error... check the response for details')
            }
            // set a timeout so that the response prints before "PASSED!"
            setTimeout(function () {
              cb(err, res)
            }, 50)
          })
          r.on('response', function (res) {
            res.pipe(printResponse())
          })
          return r
      }
    }
  })

  var updateLatest = requireSolution('update-latest')
  updateLatest(name, function (doc) {
    if (doc) {
      if (doc.name === name) {
        done(null, true)
      } else {
        done('Hmm, it seems like the name is wrong...')
      }
    } else {
      done('(HINT) pass the updated document to the callback function')
    }
  })
}

function setup(done) {
  exEl.innerHTML = unusedHTML
  require('../toggle-panel').hide('display')
  done()
}
