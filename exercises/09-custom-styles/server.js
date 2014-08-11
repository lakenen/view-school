var hyperquest = require('hyperquest')
var BASE_URL = 'https://view-api.box.com/1/sessions/6ebeaf32b9f24c5380fd64594c99c3db'
module.exports = function (req, res, next) {
  if (req.url.indexOf('/assets') === 0) {
    var url =  BASE_URL + req.url
    setTimeout(function () {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Headers', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET')
      hyperquest.get(url).pipe(res)
    }, 0)
    return
  }
  next()
}
