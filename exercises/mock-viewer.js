var extend = require('extend')

var Crocodoc,
  createViewer

module.exports.mock = function (mocks) {
  mocks = mocks || {}
  Crocodoc = window.Crocodoc
  createViewer = Crocodoc.createViewer

  Crocodoc.addPlugin('expose-config', function (scope) {
    return {
      init: function () {
        scope.getConfig().api.getConfig = function () {
          return scope.getConfig()
        }
      }
    }
  })

  Crocodoc.createViewer = function (el, conf) {
    conf = extend(true, {}, conf, {
      plugins: { 'expose-config': true }
    })
    var viewer = createViewer(el, conf)
    Object.keys(mocks).forEach(function (method) {
      var orig = viewer[method]
      viewer[method] = mocks[method]
      viewer['_' + method] = orig
    })
    return viewer
  }
}

module.exports.restore = function () {
  if (Crocodoc) {
    Crocodoc.createViewer = createViewer
  }
}
