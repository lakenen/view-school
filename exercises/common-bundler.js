var bvbb = require('box-view-browser-bundle')
module.exports = function (b) {
  bvbb.bundle({
      url: process.env.BVBB_URL
    , output: false
    , expose: 'box-view-browser'
    , bundler: function (fn) { fn(b) }
  })
  b.transform(require('envify/custom')({ BVBB_URL: process.env.BVBB_URL }))
  b.require(__dirname + '/box-view-wrapper', { expose: 'box-view' })
}
