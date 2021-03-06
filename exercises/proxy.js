var bvbb = require('box-view-browser-bundle')
  , path = require('path')
  , url = require('url')

function setupProxy(token) {
  if (typeof token === 'undefined') {
    token = require(path.resolve(process.cwd(), '00-hello-view-api/token.js'))
  }
  return bvbb.createHandler({
      token: token
    , url: process.env.BVBB_URL
    , serveStatic: false
    , headers: { 'user-agent': 'view-school@' + process.env.VERSION }
  })
}

function createProxy() {
  var route = setupProxy(false)
  function proxy(req, res, next) {
    var parsed = url.parse(req.url, true)
    try {
      if (parsed.pathname.indexOf(path.basename(process.env.BVBB_URL)) === 1) { // just after the /
        return route(req, res)
      }
    } catch (err) {}

    next()
  }
  return proxy
}


module.exports = createProxy
module.exports.setup = setupProxy
