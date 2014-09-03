var path = require('path')
var viewerMock = require('../mock-viewer')

var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var indexHTML = fs.readFileSync(__dirname + '/index.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')
var exName = path.basename(__dirname)

// extrasolar.pdf
var viewURL = 'https://view-api.box.com/1/sessions/13dbd94e658d4581845226c42d0737ce/assets/'
  , downloadURL = 'https://view-api.box.com/1/sessions/13dbd94e658d4581845226c42d0737ce/content'
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

  var view = requireSolution('viewer-with-plugins')
    , el = document.querySelector('.viewer')
    , viewer = view(el, viewURL, downloadURL)
    , fullscreenBtn = document.querySelector('.fullscreen-btn')
    , downloadBtn = document.querySelector('.download-btn')

  currentViewer = viewer

  if (!viewer) {
    done('(HINT) your function should return a viewer instance')
  }

  var config = viewer.getConfig()

  if (!config.plugins) {
    done('(HINT) remember to configure the plugins!')
  }

  if (!config.plugins.fullscreen) {
    done('(HINT) remember to use the fullscreen plugin!')
  }

  if (!config.plugins.download) {
    done('(HINT) remember to use the download plugin!')
  } else if (config.plugins.download.url !== downloadURL) {
    done('(HINT) the url property of the download plugin config should be the provided download URL')
  }

  viewer.on('ready', function () {
    fullscreenBtn.disabled = downloadBtn.disabled = false
    setTimeout(testPlugins)
  })

  viewer.on('fail', function () {
    done('The document failed to load. (HINT) did you specify the `url` correctly?')
  })

  function testPlugins() {
    var called = false
    var originals = {
        isFullscreen: viewer.isFullscreen
      , enterFullscreen: viewer.enterFullscreen
      , exitFullscreen: viewer.exitFullscreen
      , download: viewer.download
    }
    viewer.isFullscreen = function () {
      return false
    }
    viewer.enterFullscreen = function () {
      called = true
    }
    viewer.exitFullscreen = function () {
      done('(HINT) only call exitFullscreen if the viewer is already in fullscreen mode')
    }
    fullscreenBtn.click()
    if (!called) {
      done('(HINT) call enterFullscreen when the button is clicked if the viewer is not in fullscreen mode')
    }

    called = false
    viewer.isFullscreen = function () {
      return true
    }
    viewer.enterFullscreen = function () {
      done('(HINT) only call enterFullscreen if the viewer is not yet in fullscreen mode')
    }
    viewer.exitFullscreen = function () {
      called = true
    }
    fullscreenBtn.click()
    if (!called) {
      done('(HINT) call exitFullscreen when the button is clicked if the viewer is in fullscreen mode')
    }

    viewer.isFullscreen = originals.isFullscreen
    viewer.enterFullscreen = originals.enterFullscreen
    viewer.exitFullscreen = originals.exitFullscreen

    called = false
    viewer.download = function () {
      called = true
    }
    downloadBtn.click()
    if (!called) {
      done('(HINT) call download() when the download button is clicked')
    }

    viewer.download = originals.download
    done(null, true)
  }
}

function setup(done) {
  var exEl = document.querySelector('.display')
  exEl.innerHTML = indexHTML
  require('../viewer')

  require('../../node_modules/viewer/plugins/fullscreen/fullscreen.css')
  require('../../node_modules/viewer/plugins/fullscreen/fullscreen.js')
  require('../../node_modules/viewer/plugins/download/download.js')
  done()
}
