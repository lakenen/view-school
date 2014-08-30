var path = require('path')
var viewerMock = require('../mock-viewer')

var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var indexHTML = fs.readFileSync(__dirname + '/index.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')
var exName = path.basename(__dirname)

// japanese haikus
var url = 'https://view-api.box.com/1/sessions/6ebeaf32b9f24c5380fd64594c99c3db/assets'
  , currentViewer

module.exports = {
    dirname: exName
  , description: readme
  , success: success
  , files: files
  , test: test
  , setup: setup
  , next: require('../next-exercise')(exName)
}

function requireSolution(name, ext) {
  // require solution files in this way so browserify doesnt try to bundle them
  return require(name + '.' + (ext || 'js'))
}

function test(done) {
  if (currentViewer) {
    currentViewer.destroy()
  }

  viewerMock.restore()
  viewerMock.mock()

  var view = requireSolution('simple-controls')
    , el = document.querySelector('.viewer')
    , viewer = view(el, url)

  var prevBtn = document.querySelector('.prev-btn')
    , nextBtn = document.querySelector('.next-btn')

  currentViewer = viewer

  if (!viewer) {
    done('(HINT) your function should return a viewer instance')
  }

  var config = viewer.getConfig()
  if (config.layout !== window.Crocodoc.LAYOUT_PRESENTATION) {
    done('(HINT) remember to set the correct layout!')
  }

  viewer.on('ready', function (ev) {
    setTimeout(testButtons.bind(null, ev.data.numPages))
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
