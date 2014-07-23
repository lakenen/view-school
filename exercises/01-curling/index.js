var getScript = require('script-load')
var path = require('path')
var xhr = require('xhr')
var concat = require('concat-stream')
var util = require('util')
var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var clickHTML = fs.readFileSync(__dirname + '/../click.html')
var indexHTML = fs.readFileSync(__dirname + '/index.html')
var files = fs.readdirSync(__dirname + '/files')
var exName = path.basename(__dirname)

var DOC_URL = 'https://view-api.box.com/1/sessions/2dfb390dd1d84a11925cf44e9f2d5794/content'
var url = 'http://localhost:%s/documents'
var exEl = document.querySelector('.exercise-content')

module.exports = {
    dirname: exName
  , description: readme.replace('{{URL}}', DOC_URL)
  , success: success
  , files: files
  , test: test
  , setup: setup
}

function test(done) {
  // required name is separate so browserify doesnt try to require it in this bundle
  var curl = 'upload.curl'
  try {
    var request = require(curl)
    if (request.url !== 'https://view-api.box.com/1/documents') {
      return done(new Error('HINT: the URL seems to be missing or incorrect'), false)
    }
    if (request.options.method !== 'POST') {
      return done(new Error('HINT: the request method should be POST'), false)
    }
    var data = JSON.parse(request.data || '{}')
    if (data.url && data.url !== DOC_URL) {
      return done(new Error('Ooops, looks like you used the wrong document URL'), false)
    }
    request.options.withCredentials = false
    var r = request(url, request.optiosn)
    r.pipe(concat(function (data) {
      exEl.querySelector('.response').innerText = JSON.stringify(JSON.parse(data), true, 2)
      try {
        data = JSON.parse(data)
        if (data.type === 'document') {
          // yay
          done(null, true)
        } else {
          done(new Error(data.message || 'This is not the response I was expecting'))
        }
      } catch (err) {
        done(err, false)
      }
    }))
  } catch (err) {
    done(err, false)
  }
}

function setup(done) {
  exEl.innerHTML = clickHTML + indexHTML
  xhr('/' + exName + '/proxy', function(err, res, body) {
    if (err) {
      throw err
    }
    url = util.format(url, JSON.parse(body).port)
    done()
  })
}

