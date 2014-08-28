var extend = require('extend')

var bv, createClient

module.exports.mock = function (mocks, creator) {
  var boxview = 'box-view'
  bv = require(boxview)
  createClient = bv.createClient
  bv.createClient = function (token) {
    if (token === 'your api token') {
      throw new Error('(HINT) remember to replace "your api token" with your Box View token!')
    }
    var client = createClient(token)
      , mock = extend(true, {}, client, mocks)

    mock.documents.__ = client.documents
    mock.sessions.__ = client.sessions
    client.token = token
    mock.documents.__client = client
    mock.sessions.__client = client

    if (!creator) {
      return mock
    }
    return creator(mock, token)
  }
}

module.exports.restore = function () {
  if (bv) {
    bv.createClient = createClient
  }
}
