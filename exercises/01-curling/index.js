var path = require('path')
var concat = require('concat-stream')
var printResponse = require('../print-response')
var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var unusedHTML = fs.readFileSync(__dirname + '/../unused.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')
var exName = path.basename(__dirname)

var DOC_URL = 'https://github.com/lakenen/view-school-assets/raw/master/1.pdf'
var url  = process.env.BVBB_URL + '/documents'
var exEl = document.querySelector('.display')

module.exports = {
    dirname: exName
  , description: readme.replace('{{URL}}', DOC_URL)
  , success: success
  , files: files
  , test: test
  , setup: setup
  , next: require('../next-exercise')(exName)
}

function test(done) {
  // required name is separate so browserify doesnt try to require it in this bundle
  var curl = 'upload.curl'
  try {
    var request = require(curl)
    if (request.url !== 'https://view-api.box.com/1/documents') {
      done('(HINT) the URL seems to be missing or incorrect')
    }
    if (request.options.method !== 'POST') {
      done('(HINT) the request method should be POST')
    }
    var data = JSON.parse(request.data || '{}')
    if (data.url && data.url !== DOC_URL) {
      done('Ooops, looks like you used the wrong document URL')
    }
    request.options.withCredentials = false

    var r = request(url, request.options)
    r.pipe(concat(function (data) {
      setTimeout(function () {
        data = JSON.parse(data)
        if (data.type === 'document') {
          // yay
          done(null, true)
        } else {
          done(data.message || 'This is not the response I was expecting')
        }
      }, 50)
    }))
    r.on('response', function (res) {
      res.pipe(printResponse())
    })
  } catch (err) {
    done(err)
  }
}

function setup(done) {
  exEl.innerHTML = unusedHTML
  require('../toggle-panel').hide('display')
  done()
}

