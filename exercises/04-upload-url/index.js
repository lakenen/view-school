var getScript = require('script-load')
var path = require('path')
var xhr = require('xhr')
var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var clickHTML = fs.readFileSync(__dirname + '/../click.html', 'utf8')
var indexHTML = fs.readFileSync(__dirname + '/index.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')
var exName = path.basename(__dirname)
var exEl = document.querySelector('.exercise-content')
var DOC_URL = 'https://view-api.box.com/1/sessions/2dfb390dd1d84a11925cf44e9f2d5794/content'

module.exports = {
    dirname: exName
  , description: readme
  , success: success
  , files: files
  , test: test
  , setup: setup
}

function requireSolution(name) {
  // require solution files in this way so browserify doesnt try to bundle them
  return require(name + '.js')
}

function printResponse(res) {
  exEl.querySelector('.response').innerText = JSON.stringify(res, true, 2)
}

function test(done) {
  var boxViewStub = require('../stub-box-view')
  var upload = requireSolution('upload-url')

  boxViewStub.restore()
  boxViewStub.stub({
    documents: {
      uploadURL: function (url, opt, cb) {
        if (url !== DOC_URL) {
          done('HINT: use the provided URL!')
        }
        if (typeof opt === 'function' || !opt.name) {
          done('HINT: don\'t forget to specify a name')
        }
        return this.__.uploadURL(url, opt, function (err, res) {
          cb(err, res)
          if (err) {
            printResponse(err.error)
            done('Looks like an API error... check the response for details')
          }
        })
      }
    }
  })
  upload(DOC_URL, function (doc) {
    printResponse(doc)
    done(null, true)
  })
}

function setup(done) {
  exEl.innerHTML = clickHTML + indexHTML
  done()
}
