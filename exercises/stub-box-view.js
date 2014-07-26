var extend = require('extend')

var bv, createClient

module.exports.stub = function (stubs) {
  bv = require('box-view')
  createClient = bv.createClient
  console.log('stubbing')
  bv.createClient = function (token) {
    var client = createClient(token)
      , stubbed = extend(true, {}, client, stubs)
    stubbed.documents.__ = client.documents
    stubbed.sessions.__ = client.sessions
    return stubbed
  }
}
module.exports.restore = function () {
  if (bv) {
    bv.createClient = createClient
  }
}

