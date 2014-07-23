var getScript = require('script-load')
var path = require('path')
var xhr = require('xhr')
var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var clickHTML = fs.readFileSync(__dirname + '/../click.html')
var files = fs.readdirSync(__dirname + '/files')
var exName = path.basename(__dirname)

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
  var token = 'token.js'
    , client

  try {
    token = require(token)
    client = require('box-view').createClient(token)
    client.documents.list(function (err) {
      if (err) {
        done(new Error('This token does not appear to be valid.'), false)
      } else {
        done(null, true)
      }
    })
  } catch (err) {
    done(new Error('Please submit your token first!'), false)
  }
}

function setup(done) {
  var exEl = document.querySelector('.exercise-content')
  exEl.innerHTML = clickHTML
  xhr('/' + exName + '/proxy', function(err, res, body) {
    if (err) {
      return done()
    }
    getScript('http://localhost:' + JSON.parse(body).port + '/box-view-browser-bundle.js', function () {
      done()
    })
  })
}
