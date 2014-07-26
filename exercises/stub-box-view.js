var extend = require('extend')
module.exports = function (stubs) {
  var bv = require('box-view');
  createClient = bv.createClient;

  bv.createClient = function (token) {
    return extend(true, createClient(token), {token: token}, stubs);
  }
  return {
    restore: function () {
      bv.createClient = createClient;
    }
  }
}
