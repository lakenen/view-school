var getScript = require('script-load')
var path = require('path')
var xhr = require('xhr')
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

function test(done) {
  var getLatest = requireSolution('get-latest')
  var updateLatest = requireSolution('update-latest')

  var client = require('../stub-box-view')({
    documents: {
      list: function (opt, cb) {
        if (opt.limit !== 1) {
          done()
          throw new Error('HINT: `limit` the request to 1 document')
        }
        if (opt.created_before) {
          done()
          throw new Error('Nice try, but `created_before` is not necessary in this exercise')
        }
        cb(null, { document_collection: { entries: [{}] }})
      }
    }
  }).createClient()

  var called = false
  getLatest(client, function () {
    called = true
  })

  if (!called) {
    return done(new Error('HINT: getLatest should call client.documents.list'))
  }

  var name = 'magical document of the gods'
  updateLatest(name, function (doc) {
    exEl.querySelector('.response').innerText = JSON.stringify(doc, true, 2)
    if (doc.name === name) {
      done(null, true)
    } else {
      done(new Error('Hmm, it seems like the name is wrong...'))
    }
  })
}

function setup(done) {
  exEl.innerHTML = clickHTML + indexHTML
  done()
}
