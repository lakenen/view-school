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

  var scrollTo = function () {
    scrollTo.calledWith = arguments
    this._scrollTo.apply(this, arguments)
  }
  scrollTo.calledWith = []
  var zoom = function () {
    zoom.calledWith = arguments
    this._zoom.apply(this, arguments)
  }
  zoom.calledWith = []

  viewerMock.restore()
  viewerMock.mock({
      scrollTo: scrollTo
    , zoom: zoom
  })

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
    function reset(full) {
      viewer.off('zoom', testZoomUpdatesButtons)
      viewer.off('pagefocus', testPagefocusUpdatesButtons)
      viewer.zoom(Crocodoc.ZOOM_AUTO)
      viewer.scrollTo(1)
    }

    function ok(k, msg) {
      if (!k) {
        reset()
        done(msg)
      }
    }

    function equal(x, y, msg) {
      ok(x === y, msg)
    }

    function testZoomUpdatesButtons(ev) {
      if (ev.data.canZoomOut) {
        ok(!zoomOutButton.disabled, '(HINT) enable the zoom-out button when the viewer can zoom out')
      } else {
        ok(zoomOutButton.disabled, '(HINT) disable the zoom-out button when the viewer can not zoom out any further')
      }
      if (ev.data.canZoomIn) {
        ok(!zoomInButton.disabled, '(HINT) enable the zoom-in button when the viewer can zoom in')
      } else {
        ok(zoomInButton.disabled, '(HINT) disable the zoom-in button when the viewer can not zoom in any further')
      }
    }

    function testPagefocusUpdatesButtons(ev) {
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
    }



    viewer.zoom(Crocodoc.ZOOM_FIT_HEIGHT)
    viewer.on('pagefocus', testPagefocusUpdatesButtons)
    viewer.scrollTo(1)
    viewer.scrollTo(numPages)

    viewer.on('zoom', testZoomUpdatesButtons)
    viewer.zoom(0.01)
    viewer.zoom(Infinity)

    reset()

    zoomInButton.click()
    equal(zoom.calledWith[0], 'in', '(HINT) the zoom-in button should zoom in the viewer when clicked')

    reset()

    zoomOutButton.click()
    equal(zoom.calledWith[0], 'out', '(HINT) the zoom-out button should zoom out the viewer when clicked')

    reset()

    nextBtn.click()
    equal(scrollTo.calledWith[0], 'next', '(HINT) the next button should scroll to the next page when clicked')

    reset()

    prevBtn.click()
    equal(scrollTo.calledWith[0], 'previous', '(HINT) the previous button should scroll to the previous page when clicked')

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
