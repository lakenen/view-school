var path = require('path')
var loadCSS = require('../load-css')
var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var indexHTML = fs.readFileSync(__dirname + '/index.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')
var exName = path.basename(__dirname)

var currentViewer

module.exports = {
    dirname: exName
  , description: readme
  , success: success
  , files: files
  , test: test
  , setup: setup
  , testTimeout: 15000
  , next: require('../next-exercise')(exName)
  , update: update
}

function requireSolution(name, ext) {
  // require solution files in this way so browserify doesnt try to bundle them
  return require(name + '.' + (ext || 'js'))
}

function update() {
  loadCSS('custom-styles.css')
  if (currentViewer) {
    currentViewer.updateLayout()
  }
}

function test(done) {
  update()

  if (currentViewer) {
    currentViewer.destroy()
  }

  var el = document.querySelector('.viewer')

  var viewer = Crocodoc.createViewer(el, {
    url: '/assets'
  })

  currentViewer = viewer

  viewer.load()

  viewer.on('ready', function () {
    setTimeout(function () { done('no') })
    // done(null, true)
  })
}

function setup(done) {
  var exEl = document.querySelector('.display')
  exEl.innerHTML = indexHTML
  require('../viewer')
  done()
}
