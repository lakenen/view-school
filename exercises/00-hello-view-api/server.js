
var bvbb = require('box-view-browser-bundle')
  , path = require('path')
  , url = require('url')

function setupProxy(token, cb) {
  bvbb({
      token: token
    , cwd: path.resolve(process.cwd(), '.tmp')
  }, cb)
}

module.exports = function (req, res, next) {
  var parsed = url.parse(req.url, true)
  if (parsed.pathname.indexOf('update-token') > -1) {
    if (!parsed.query.token) {
      res.writeHead(400, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ error: 'no token specified' }))
      return
    }
    module.exports.cleanup()
    setupProxy(parsed.query.token, function (port, server) {
      console.log('setup server with token %s', parsed.query.token)
      res.setHeader('content-type', 'application/json')
      res.end(JSON.stringify({ port: port }))
      server.on('connection', function (s) {
        s.setTimeout(1000)
      })
      module.exports.cleanup = function () {
        try {
          server.close()
        } catch (err) {}
      }
    })
    return
  }
  next()
}

module.exports.cleanup = function () {}
