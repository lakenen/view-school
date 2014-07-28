var path = require('path')

var exName = path.basename(__dirname)
var exEl = document.querySelector('.exercise-content')
var DOC_URL = 'https://view-api.box.com/1/sessions/2dfb390dd1d84a11925cf44e9f2d5794/content'

var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var commonHTML = fs.readFileSync(__dirname + '/../common.html', 'utf8')
var indexHTML = fs.readFileSync(__dirname + '/index.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')


module.exports = {
    dirname: exName
  , description: readme
  , success: success
  , files: files
  , test: test
  , setup: setup
  , testTimeout: false
}

function requireSolution(name) {
  // require solution files in this way so browserify doesnt try to bundle them
  return require(name + '.js')
}

function printResponse(res) {
  console.log(JSON.stringify(res, true, 2))
}

function test(done) {
  var boxViewMock = require('../mock-box-view')
  var viewerEl = document.querySelector('.viewer')

  boxViewMock.restore()
  var mock = boxViewMock.mock({
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
          console.log(id, opt, cb, retry)
          if (typeof opt === 'function') {
            retry = cb
            cb = opt
            opt = {}
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

  var view = requireSolution('upload-and-view')
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
  exEl.innerHTML = commonHTML + indexHTML
  done()
}
