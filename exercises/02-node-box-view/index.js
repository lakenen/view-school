var getScript = require('script-load')
var path = require('path')
var xhr = require('xhr')
var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
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
    console.log(docs)
    done(null, false)
  })
}

function setup(done) {
  exEl.innerHTML = require('../click.html') + require('./index.html')
  xhr('/' + exName + '/proxy', function(err, res, body) {
    if (err) {
      return done()
    }
    getScript('http://localhost:' + JSON.parse(body).port + '/box-view-browser-bundle.js', function () {
      done()
    })
  })
}
