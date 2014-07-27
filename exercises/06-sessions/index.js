var getScript = require('script-load')
var path = require('path')
var xhr = require('xhr')

var exName = path.basename(__dirname)
var exEl = document.querySelector('.exercise-content')
var DOC_URL = 'https://view-api.box.com/1/sessions/2dfb390dd1d84a11925cf44e9f2d5794/content'

var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var clickHTML = fs.readFileSync(__dirname + '/../click.html', 'utf8')
var indexHTML = fs.readFileSync(__dirname + '/index.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')


module.exports = {
    dirname: exName
  , description: readme
  , success: success
  , files: files
  , test: test
  , setup: setup
  , testTimeout: 10000
}

function requireSolution(name) {
  // require solution files in this way so browserify doesnt try to bundle them
  return require(name + '.js')
}

function printResponse(res) {
  console.log(JSON.stringify(res, true, 2))
}

function test(done) {
  var boxViewStub = require('../stub-box-view')
  var view = requireSolution('upload-and-view')
  var viewerEl = document.querySelector('.viewer')

  boxViewStub.restore()
  boxViewStub.stub({
      documents: {
        uploadURL: function (url, opt, cb, retry) {
          if (url !== DOC_URL) {
            done('Please use the provided URL!')
          }
          if (typeof opt === 'function') {
            retry = cb
            cb = opt
            opt = {}
          }
          return this.__.uploadURL(url, opt, function (err, res) {
            cb(err, res)
            if (err) {
              printResponse(err.error)
              done('Looks like an API error... check the log for details')
            }
          }, retry)
        }
      }
    , sessions: {
        create: function (id, opt, cb, retry) {
          if (typeof opt === 'function') {
            retry = cb
            cb = opt
            opt = {}
          }
          if (retry === true) {
            done('Nice find, but the `retry` arg makes it too easy; let\'s do it the tedious way for this exercise.<br/>HINT: use setTimeout with the "retry-after" header!')
          }
          return this.__.create(id, opt, function (err, session, response) {
            cb(err, session, response)
            if (err) {
              printResponse(err.error)
              done('Looks like an API error... check the log for details')
            }
          }, retry)
        }
      }
  })

  view(DOC_URL, function (viewURL) {
    if (viewURL) {
      viewerEl.src = viewURL
      done(null, true)
    } else {
      done('HINT: pass the view URL as an argument to the callback function')
    }
  })
}

function setup(done) {
  exEl.innerHTML = clickHTML + indexHTML
  done()
}
