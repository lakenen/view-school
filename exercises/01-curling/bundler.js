module.exports = function (b) {
  // require('../common-bundler')(b)
  b.transform(require.resolve('curlify'))
}
