var path = require('path')
var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var indexHTML = fs.readFileSync(__dirname + '/index.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')
var exName = path.basename(__dirname)

var url = 'https://view-api.box.com/1/sessions/b1d79d7b69a24c8a97cda45bfff07138/assets'

module.exports = {
    dirname: exName
  , description: readme
  , success: success
  , files: files
  , test: test
  , setup: setup
  , testTimeout: 15000
  , next: require('../next-exercise')(exName)
}

function requireSolution(name, ext) {
  // require solution files in this way so browserify doesnt try to bundle them
  return require(name + '.' + (ext || 'js'))
}

function test(done) {
  requireSolution('styles', 'css')
  var view = requireSolution('view-document')

  var viewer = view(document.querySelector('.viewer'), url)

  if (!viewer) {
    done('(HINT) your function should return a viewer instance')
  }

  viewer.on('ready', function () {
    done(null, true)
  })

  viewer.on('fail', function () {
    done('The document failed to load. (HINT) did you specify the `url` correctly?')
  })
}

function setup(done) {
  var exEl = document.querySelector('.display')
  exEl.innerHTML = indexHTML
  require('../viewer')
  done()
}