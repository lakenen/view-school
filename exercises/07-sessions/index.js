var path = require('path')
var printResponse = require('../print-response')

var exName = path.basename(__dirname)
var exEl = document.querySelector('.display')
// cat winnar doc
var DOC_URL = 'https://github.com/lakenen/view-school-assets/raw/master/2.pdf'

var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var indexHTML = fs.readFileSync(__dirname + '/index.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')


module.exports = {
    dirname: exName
  , description: readme
  , success: success
  , files: files
  , test: test
  , setup: setup
  , testTimeout: 60000 // 60s because of retry-after
  , next: require('../next-exercise')(exName)
}

function requireSolution(name) {
  // require solution files in this way so browserify doesnt try to bundle them
  return require(name + '.js')
}

function test(done) {
  var boxViewMock = require('../mock-box-view')
  var viewerEl = document.querySelector('.viewer-container')

  var uploadCalled = false
  boxViewMock.restore()
  var mock = boxViewMock.mock({
      documents: {
        uploadURL: function (url, opt, cb) {
          uploadCalled = true
          if (url !== DOC_URL) {
            done('(HINT) use the provided URL!')
          }
          if (typeof opt === 'function') {
            retry = cb
            cb = opt
            opt = { params: {} }
          }
          var r = this.__.uploadURL(url, opt, function (err, body, response) {
            cb(err, body, response)
            if (err) {
              done('Looks like an API error... check the response log for details')
            }
          })
          r.on('response', function (res) {
            res.pipe(printResponse())
          })
          return r
        }
      }
    , sessions: {
        create: function (id, opt, cb) {
          if (!uploadCalled) {
            done('(HINT) upload the document before creating a session!')
          }
          if (typeof opt === 'function') {
            retry = cb
            cb = opt
            opt = { params: {} }
          }

          if (!opt.params) {
            done('(HINT) you\'ll need to specify some `params` with the session request')
          }

          if (opt.params.is_text_selectable !== false) {
            done('(HINT) remember to disable text selection')
          }
          if (opt.params.duration !== 30) {
            done('(HINT) remember to set the correct duration')
          }
          if (!opt.retry) {
            done('(HINT) use the `retry` argument on sessions.create()')
          }
          // we don't actually use retry, because we want to capture every
          // request/response for printing
          opt.retry = false
          var __ = this.__
          function makeRequest() {
            var r = __.create(id, opt, function (err, session, response) {
              if (err) {
                done('Looks like an API error... check the response log for details')
              }
              if (response && response.statusCode === 202 && response.headers['retry-after']) {
                setTimeout(makeRequest, parseInt(response.headers['retry-after'], 10) * 1000)
              } else {
                // set a timeout so that the response prints before "PASSED!"
                setTimeout(function () {
                  cb(err, session, response)
                }, 50)
              }
            })
            r.on('response', function (res) {
              res.pipe(printResponse())
            })
            return r
          }
          return makeRequest()
        }
      }
  })

  var view = requireSolution('upload-and-view')
  view(DOC_URL, function (viewURL) {
    if (typeof viewURL === 'string') {
      viewerEl.src = viewURL
      done(null, true)
    } else {
      done('(HINT) pass the view URL as an argument to the callback function')
    }
  })
}

function setup(done) {
  exEl.innerHTML = indexHTML
  done()
}
