var extend = require('extend')

var Crocodoc,
  createViewer

module.exports.mock = function (mocks) {
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
      , mock = extend(true, viewer, mocks)
    mock.__ = viewer
    return mock
  }
}

module.exports.restore = function () {
  if (Crocodoc) {
    Crocodoc.createViewer = createViewer
  }
}
