module.exports = function (b) {
  b.transform({ global: true }, require.resolve('cssify'))
}
