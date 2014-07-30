var format = require('format-response')
  , concat = require('concat-stream')
  , extend = require('extend')

var SEPARATOR = '\n\n----------------------------------------\n\n'

module.exports = function (opt) {
  opt = extend({
      ignoreBody: false
    , prettifyJSON: true
    , printRequestHeader: true
    , ignoreHeaders: [
          'access-control-allow-origin'
        , 'access-control-allow-headers'
        , 'access-control-allow-methods'
      ]
    , el: document.querySelector('.response-formatted')
  }, opt)
  var fmt = format(opt)
  fmt.on('error', function () { /* ignore (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ */ })
  fmt.pipe(concat(function (str) {
    opt.el.innerText += str.toString() + (opt.ignoreBody ? '[response body ignored]' : '') + SEPARATOR
  }))
  return fmt
}
