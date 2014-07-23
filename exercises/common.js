var bvbb = require('box-view-browser-bundle')
  , path = require('path')
  , url = require('url')

function setupProxy(token, cb) {
  if (typeof token === 'function'){
    cb = token
    token = undefined
  }
  if (typeof token === 'undefined') {
    token = require(path.resolve(process.cwd(), '00-hello-view-api/token.js'))
  }
  bvbb({
      token: token
    , cwd: path.resolve(process.cwd(), '.tmp')
    , expose: 'box-view-browser'
  }, cb)
}

function createProxy() {
  function proxy(req, res, next) {
    var parsed = url.parse(req.url, true)
    if (parsed.pathname.indexOf('proxy') > -1) {
      proxy.cleanup()
      setupProxy(false, function (port, server) {
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify({ port: port }))
        server.on('connection', function (s) {
          s.setTimeout(1000)
        })
        proxy.cleanup = function () {
          try {
            server.close()
          } catch (err) {}
        }
      })
      return
    }
    next()
  }

  proxy.cleanup = function () {}
  return proxy
}


module.exports = {
    setupProxy: setupProxy
  , proxy: createProxy
}
