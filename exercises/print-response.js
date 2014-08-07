var format = require('format-response')
  , concat = require('concat-stream')
  , extend = require('extend')
  , escape = require('escape-html')

var SEPARATOR = '\n\n'

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
    , el: document.querySelector('.console')
  }, opt)
  var fmt = format(opt)
  fmt.on('error', function () { /* ignore (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ */ })
  fmt.pipe(concat(function (str) {
    str = str.toString() + (opt.ignoreBody ? '[...]' : '') + SEPARATOR
    opt.el.innerHTML += escape(str)
    opt.el.scrollTop = opt.el.scrollHeight
  }))
  return fmt
}
