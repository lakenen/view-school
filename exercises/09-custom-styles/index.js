var path = require('path')
var loadCSS = require('../load-css')
var parseColor = require('parse-color')

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

  var $div = $('<div>').css({
      position: 'absolute'
    , top: -10000
    , left: -10000
  }).appendTo(document.body)

  var _done = done
  done = function () {
    $div.remove()
    _done.apply(null, arguments)
  }

  function testCSS() {
    var $viewport = $('<div class="crocodoc-viewport">').appendTo($div)
      , $page = $('<div class="crocodoc-page"><div class="crocodoc-page-content"></div></div>').appendTo($viewport)
      , $content = $page.find('.crocodoc-page-content')

    var bgcolor = parseColor($viewport.css('background-color')).hex
    if (bgcolor !== '#feeffe') {
      done('(HINT) don\'t forget to set the viewport background!')
    }

    var padding = $page.css('padding')
      , shadow = parseColor($content.css('box-shadow')).rgba

    if (!/\d+px\s+200px(\s+\d+px\s+200px)?/.test(padding)) {
      done('(HINT) don\'t forget to set a 200px horizontal page spacing!')
    }

    if (!shadow || !(shadow[0] === 0 && shadow[1] === 0 && shadow[2] === 0 && shadow[3] < 1)) {
      done('(HINT) don\'t forget to set a transparent black box shadow on the page content!')
    }

    $page.addClass('crocodoc-page-loading')

    var bg = $content.css('background')

    if (bg.indexOf('https://raw.githubusercontent.com/lakenen/view-school-assets/master/spinner.gif') === -1) {
      done('(HINT) don\'t forget to add the loading indicator!')
    }

    done(null, true)
  }

  // show the actual viewer
  var el = document.querySelector('.viewer')
  var viewer = Crocodoc.createViewer(el, {
    url: '/assets'
  })

  currentViewer = viewer

  viewer.load()

  viewer.on('ready', function () {
    setTimeout(testCSS)
  })
}

function setup(done) {
  var exEl = document.querySelector('.display')
  exEl.innerHTML = indexHTML
  require('../viewer')
  done()
}
