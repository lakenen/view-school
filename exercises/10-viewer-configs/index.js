var path = require('path')
var viewerMock = require('../mock-viewer')

var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var indexHTML = fs.readFileSync(__dirname + '/index.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')
var exName = path.basename(__dirname)

// extrasolar.pdf
var url = 'https://view-api.box.com/1/sessions/91630aad821b47d8822bd7f1f360c5d0/assets/'
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

  var view = requireSolution('draggy-viewer')
    , el = document.querySelector('.viewer')
    , viewer = view(el, url)

  currentViewer = viewer

  if (!viewer) {
    done('(HINT) your function should return a viewer instance')
  }

  var config = viewer.getConfig()
  if (config.enableTextSelection !== false) {
    done('(HINT) remember to disable text selection!')
  }
  if (config.enableDragging !== true) {
    done('(HINT) remember to enable dragging!')
  }
  if (config.layout !== window.Crocodoc.LAYOUT_HORIZONTAL) {
    done('(HINT) remember to set the correct layout!')
  }
  if (config.zoom !== window.Crocodoc.ZOOM_FIT_HEIGHT) {
    done('(HINT) remember to set the correct zoom!')
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
