var path = require('path')
var viewerMock = require('../mock-viewer')
var loadCSS = require('../load-css')

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
  , update: update
}

function requireSolution(name, ext) {
  // require solution files in this way so browserify doesnt try to bundle them
  return require(name + '.' + (ext || 'js'))
}

function update() {
  loadCSS('transitions.css')
  if (currentViewer) {
    currentViewer.updateLayout()
  }
}

function test(done) {
  update()

  if (currentViewer) {
    currentViewer.destroy()
  }

  // do this here so we don't have to worry about unregistering event handlers
  var exEl = document.querySelector('.display')
  exEl.innerHTML = indexHTML

  viewerMock.restore()
  viewerMock.mock()

  var view = requireSolution('presentation-viewer')
    , el = document.querySelector('.viewer')
    , viewer = view(el, url)
    , prevBtn = document.querySelector('.prev-btn')
    , nextBtn = document.querySelector('.next-btn')
    , numPages
    , config

  currentViewer = viewer

  if (!viewer) {
    done('(HINT) your function should return a viewer instance')
  }

  config = viewer.getConfig()
  if (config.layout !== window.Crocodoc.LAYOUT_PRESENTATION) {
    done('(HINT) remember to set the correct layout!')
  }

  viewer.on('ready', function (ev) {
    numPages = ev.data.numPages
    setTimeout(testTransitions)
  })

  viewer.on('pagefocus', function (ev) {
    prevBtn.disabled = ev.data.page === 1
    nextBtn.disabled = ev.data.page === numPages
  })

  prevBtn.addEventListener('click', function () {
    viewer.scrollTo(Crocodoc.SCROLL_PREVIOUS);
  })
  nextBtn.addEventListener('click', function () {
    viewer.scrollTo(Crocodoc.SCROLL_NEXT);
  })

  viewer.on('fail', function () {
    done('The document failed to load. (HINT) did you specify the `url` correctly?')
  })

  function testTransitions() {
    // just pass it, I guess ¯\_(ツ)_/¯
    done(null, true)
  }
}

function setup(done) {
  require('../viewer')
  done()
}
