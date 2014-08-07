var path = require('path')
var printResponse = require('../print-response')
var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
var success = fs.readFileSync(__dirname + '/success.md', 'utf8')
var unusedHTML = fs.readFileSync(__dirname + '/../unused.html', 'utf8')
var files = fs.readdirSync(__dirname + '/files')
var exName = path.basename(__dirname)
var exEl = document.querySelector('.display')
var DOC_URL = 'https://view-api.box.com/1/sessions/2dfb390dd1d84a11925cf44e9f2d5794/content'

module.exports = {
    dirname: exName
  , description: readme
  , success: success
  , files: files
  , test: test
  , setup: setup
  , next: require('../next-exercise')(exName)
}

function requireSolution(name) {
  // require solution files in this way so browserify doesnt try to bundle them
  return require(name + '.js')
}

function test(done) {
  var boxViewMock = require('../mock-box-view')

  boxViewMock.restore()
  boxViewMock.mock({
    documents: {
      uploadURL: function (url, opt, cb) {
        if (url !== DOC_URL) {
          done('(HINT) use the provided URL!')
        }
        if (typeof opt === 'function' || !opt.params) {
          done('(HINT) you\'ll need to specify some `params` with the upload request')
        }

        if (!opt.params.name) {
          done('(HINT) don\'t forget to specify a name')
        }
        var r = this.__.uploadURL(url, opt, function (err, res) {
          if (err) {
            done('Looks like an API error... check the response for details')
          }
          // set a timeout so that the response prints before "PASSED!"
          setTimeout(function () {
            cb(err, res)
          }, 50)
        })
        r.on('response', function (res) {
          res.pipe(printResponse())
        })
        return r
      }
    }
  })

  var upload = requireSolution('upload-url')
  upload(DOC_URL, function (doc) {
    if (doc && doc.id) {
      done(null, true)
    } else {
      done('This does not look like a valid document response')
    }
  })
}

function setup(done) {
  exEl.innerHTML = unusedHTML
  require('../toggle-panel').hide('display')
  done()
}
