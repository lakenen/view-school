var getScript = require('script-load')
var path = require('path')
var xhr = require('xhr')
var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var clickHTML = fs.readFileSync(__dirname + '/../click.html')
var indexHTML = fs.readFileSync(__dirname + '/index.html')
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

function test(done) {
  // required name is separate so browserify doesnt try to require it in this bundle
  var list = 'list.js'

  require(list)(function (docs) {
    exEl.querySelector('.response').innerText = JSON.stringify(docs, true, 2)
    if (!docs) {
      return done(new Error('Looks like you did not return the documents'), false)
    }
    if (!docs.length) {
      return done(new Error('Oops, I don\'t see any docs (did you upload one yet?)'), false)
    }
    done(null, true)
  })
}

function setup(done) {
  exEl.innerHTML = clickHTML + indexHTML
  xhr('/' + exName + '/proxy', function(err, res, body) {
    if (err) {
      return done()
    }
    getScript('http://localhost:' + JSON.parse(body).port + '/box-view-browser-bundle.js', function () {
      done()
    })
  })
}
