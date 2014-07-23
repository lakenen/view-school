var extend = require('extend')
module.exports = function (stubs) {
  return {
    createClient: function (token) {
      var client = require('box-view').createClient(token)
      return extend(true, client, {token: token}, stubs)
    }
  }
}
