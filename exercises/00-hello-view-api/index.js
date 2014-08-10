var path = require('path')
var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var unusedHTML = fs.readFileSync(__dirname + '/../unused.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')
var exName = path.basename(__dirname)

module.exports = {
    dirname: exName
  , description: readme
  , success: success
  , files: files
  , test: test
  , setup: setup
  , next: require('../next-exercise')(exName)
}

function test(done) {
  // required name is separate so browserify doesnt try to require it in this bundle
  var token = 'token.js'
    , boxview = 'box-view'
    , client

  try {
    token = require(token)
    client = require(boxview).createClient(token)
    client.documents.list(function (err) {
      if (err) {
        done('This token does not appear to be valid.')
      } else {
        done(null, true)
      }
    })
  } catch (err) {
    done('Please enter your token first!')
  }
}

function setup(done) {
  var exEl = document.querySelector('.display')
  exEl.innerHTML = unusedHTML
  require('../toggle-panel').hide('display')
  done()
}
