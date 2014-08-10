var path = require('path')
var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var indexHTML = fs.readFileSync(__dirname + '/index.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')
var exName = path.basename(__dirname)

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
  requireSolution('custom-styles', 'css')
  var el = document.querySelector('.viewer')
  var viewer = Crocodoc.createViewer(el, {
    url: '/assets'
  })
  viewer.load()

  viewer.on('ready', function () {
    done(null, true)
  })
}

function setup(done) {
  var exEl = document.querySelector('.display')
  exEl.innerHTML = indexHTML
  require('../viewer')
  done()
}
