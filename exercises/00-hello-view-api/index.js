var getScript = require('script-load')
var path = require('path')
var xhr = require('xhr')
var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var files = fs.readdirSync(__dirname + '/files')
var name = path.basename(__dirname)

module.exports = {
    dirname: name
  , description: readme
  , files: files
  , test: test
  , setup: setup
}

function test(done) {
  // required name is separate so browserify doesnt try to require it in this bundle
  var bv = 'box-view'
  try {
    var client = require(bv).createClient()
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
  exEl.innerHTML = require('./index.html')
  exEl.querySelector('.token-form').addEventListener('submit', function (ev) {

    exEl.classList.add('saving')
    var token = this.querySelector('input').value
    xhr('/' + name + '/update-token?token=' + token, function(err, res, body) {
      if (err) throw err
      res = JSON.parse(body)
      getScript('http://localhost:' + res.port + '/box-view-browser-bundle.js', function () {
        exEl.classList.remove('saving')
        exEl.classList.add('saved')
      })
    })
    ev.preventDefault()
  })
  return done()
}
