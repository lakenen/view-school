var extend = require('extend')

var bv, createClient

module.exports.mock = function (mocks) {
  bv = require('box-view')
  createClient = bv.createClient
  bv.createClient = function (token) {
    var client = createClient(token)
      , mock = extend(true, {}, client, mocks)
    mock.documents.__ = client.documents
    mock.sessions.__ = client.sessions
    return mock
  }
}

module.exports.restore = function () {
  if (bv) {
    bv.createClient = createClient
  }
}
