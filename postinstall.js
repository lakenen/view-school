var fs = require('fs')

var links = [
    ['/node_modules/viewer/dist/crocodoc.viewer.css', '/crocodoc.viewer.css']
  , ['/node_modules/viewer/plugins/fullscreen/fullscreen.css', '/fullscreen.css']
]

links.forEach(function (link) {
  var src = __dirname + link[0]
    , dest = __dirname + link[1]

  fs.exists(dest, function (exists) {
    if (exists) {
      return
    }
    fs.symlink(src, dest, function (err) {
      if (err) {
        console.error('Error symlinking viewer.js CSS files', err)
      }
    })
  })
})
