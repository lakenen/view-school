var path = require('path')
var viewerMock = require('../mock-viewer')
var updateConversionProgress = require('./update-conversion-progress')

var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var indexHTML = fs.readFileSync(__dirname + '/index.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')
var exName = path.basename(__dirname)

// japanese haikus
var assetsURL = 'https://view-api.box.com/1/sessions/6ebeaf32b9f24c5380fd64594c99c3db/assets'
  , realtimeURL = ''
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
  document.body.classList.add('converting')

  if (currentViewer) {
    currentViewer.destroy()
  }

  viewerMock.restore()
  viewerMock.mock()
  updateConversionProgress.reset()

  Crocodoc.getUtility('ajax').request('/create-fake-realtime?url='+encodeURIComponent(assetsURL), {
    success: function () {
      realtimeURL = this.responseText;
      runTest()
    },
    fail: function () {
      done('Failed to setup exercise: ' + this.responseText || 'unknown error')
    }
  })

  function runTest() {
    var view = requireSolution('streaming-viewer')
      , el = document.querySelector('.viewer')
      , viewer = view(el, assetsURL, realtimeURL)

    currentViewer = viewer

    if (!viewer) {
      done('(HINT) your function should return a viewer instance')
    }

    var config = viewer.getConfig()

    if (!config.plugins) {
      done('(HINT) remember to configure the plugins!')
    }

    if (!config.plugins.realtime) {
      done('(HINT) remember to use the realtime plugin!')
    } else if (config.plugins.realtime.url !== realtimeURL) {
      done('(HINT) the url property of the realtime plugin config should be the provided realtime URL')
    }

    viewer.on('ready', function (ev) {
      var numPages = ev.data.numPages
      viewer.one('realtimeupdate', function (ev) {
        setTimeout(function () {
          if (!window.updateConversionProgressCalled) {
            done('(HINT) call updateConversionProgress when the viewer fires a `realtimeupdate`')
          }
          var p = window.updateConversionProgressCalledWith
          if (Math.abs(Math.floor(p) - ev.data.page / numPages * 100) > 10) {
            done('(HINT) you might be off by a couple orders of magnitude ;)')
          }

          done(null, true)
        })
      })
    })

    viewer.on('fail', function () {
      done('The document failed to load. (HINT) did you specify the `url` correctly?')
    })
  }
}

function setup(done) {
  var exEl = document.querySelector('.display')
  exEl.innerHTML = indexHTML

  require('../viewer')
  require('event-source-polyfill')
  require('viewer/plugins/realtime/realtime')
  done()
}
