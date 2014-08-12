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
    , zoomInButton = document.querySelector('.zoom-in-btn')
    , zoomOutButton = document.querySelector('.zoom-out-btn')

  currentViewer = viewer

  if (!viewer) {
    done('(HINT) your function should return a viewer instance')
  }

  function testButtons(numPages) {
    var initZoom

    function reset() {
      viewer.zoom(initZoom)
      viewer.scrollTo(1)
    }

    function ok(k, msg) {
      if (!k) {
        viewer.off('zoom')
        viewer.off('pagefocus')
        reset()
        done(msg)
      }
    }

    function equal(x, y, msg) {
      ok(x === y, msg)
    }

    viewer.on('zoom', function (ev) {
      if (!initZoom) {
        initZoom = ev.data.zoom
      }
      equal(zoomInButton.disabled, !ev.data.canZoomIn, '(HINT) disable the zoom-in button when the viewer can not zoom in any further')
      equal(zoomOutButton.disabled, !ev.data.canZoomOut, '(HINT) disable the zoom-in button when the viewer can not zoom in any further')
    })

    viewer.on('pagefocus', function (ev) {
      if (ev.data.page === 1) {
        ok(prevBtn.disabled, '(HINT) disable the previous button when the current page is 1')
      } else {
        ok(!prevBtn.disabled, '(HINT) enable the previous button when the current page is higher than 1')
      }
      if (ev.data.page === numPages) {
        ok(nextBtn.disabled, '(HINT) disable the next button when the current page is `numPages`')
      } else {
        ok(!nextBtn.disabled, '(HINT) enable the next button when the current page is lower than `numPages`')
      }
    })

    viewer.zoom(Crocodoc.ZOOM_FIT_HEIGHT)
    viewer.scrollTo(1)
    viewer.scrollTo(numPages)

    viewer.zoom(0)
    viewer.zoom(Infinity)

    reset()
    done(null, true)
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
