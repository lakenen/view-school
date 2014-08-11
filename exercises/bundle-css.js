var extend = require('extend')
module.exports = function (b, options) {
  b.transform(extend({
    'auto-inject': false
  }, options), require.resolve('cssify'))
}
