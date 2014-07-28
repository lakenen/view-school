var path = require('path')
var dragndrop = require('drag-and-drop-files')
var size = require('byte-size')

var exName = path.basename(__dirname)
var exEl = document.querySelector('.exercise-content')
var fileToUpload

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
}

function requireSolution(name) {
  // require solution files in this way so browserify doesnt try to bundle them
  return require(name + '.js')
}

function printResponse(res) {
  exEl.querySelector('.response').innerText = JSON.stringify(res, true, 2)
}

function test(done) {
  var boxViewMock = require('../mock-box-view')

  boxViewMock.restore()
  boxViewMock.mock({
    documents: {
      uploadFile: function (file, opt, cb) {
        if (file !== fileToUpload) {
          done('HINT: the first argument to uploadFile should be the file.')
        }
        if (typeof opt === 'function' || !opt.thumbnails) {
          done('HINT: don\'t forget to specify thumbnails!')
        }
        opt.name = 'view-school:05-upload-file'
        return this.__.uploadFile(file, opt, function (err, res) {
          cb(err, res)
          if (err) {
            printResponse(err.error)
            done('Looks like an API error... check the response for details')
          }
        })
      }
    }
  })
  if (!fileToUpload) {
    done('HINT: drop a file first (we left a sample in <a target="_blank" href="/open/'+exName+'">the lesson directory</a>)!')
  }

  var upload = requireSolution('upload-file')
  upload(fileToUpload, function (doc) {
    printResponse(doc)
    done(null, true)
  })
}

function setup(done) {
  exEl.innerHTML = clickHTML + indexHTML

  var dropTargetEl = document.querySelector('.drop-target')
  dragndrop(dropTargetEl, function(files) {
    fileToUpload = files[0]
    dropTargetEl.innerText = fileToUpload.name + ' (' + size(fileToUpload.size) + ')'
  })

  done()
}
