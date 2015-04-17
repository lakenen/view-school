var path = require('path')
var printResponse = require('../print-response')
var dragndrop = require('drag-and-drop-files')
var size = require('byte-size')

var exName = path.basename(__dirname)
var exEl = document.querySelector('.display')
var fileToUpload

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
      uploadFile: function (file, opt, cb) {
        if (file !== fileToUpload) {
          done('(HINT) the first argument to uploadFile should be the file.')
        }
        if (typeof opt === 'function') {
          cb = opt
          opt = { params: {} }
        }
        if (opt.retry) {
          opt.retry = false
        }
        opt.params.name = 'view-school:05-upload-file'
        var r = this.__.uploadFile(file, opt, function (err, res) {
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
  if (!fileToUpload) {
    done('(HINT) drag and drop a file into the dashed box first (we left a sample in <a target="_blank" href="/open/'+exName+'">the lesson directory</a>)!')
  }

  var upload = requireSolution('upload-file')
  upload(fileToUpload, function (doc) {
    if (doc.id) {
      done(null, true)
    } else {
      done('This does not look like a valid document response')
    }
  })
}

function setup(done) {
  exEl.innerHTML = indexHTML

  var dropTargetEl = document.querySelector('.drop-target')
  dragndrop(dropTargetEl, function(files) {
    fileToUpload = files[0]
    dropTargetEl.innerText = fileToUpload.name + ' (' + size(fileToUpload.size) + ')'
  })

  done()
}
