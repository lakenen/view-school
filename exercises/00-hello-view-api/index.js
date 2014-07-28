var path = require('path')
var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var commonHTML = fs.readFileSync(__dirname + '/../common.html', 'utf8')
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
        done('This token does not appear to be valid.')
      } else {
        done(null, true)
      }
    })
  } catch (err) {
    done('Please submit your token first!')
  }
}

function setup(done) {
  var exEl = document.querySelector('.exercise-content')
  exEl.innerHTML = commonHTML
  done()
}
