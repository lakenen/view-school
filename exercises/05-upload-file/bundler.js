module.exports = function (b) {
  require('../common-bundler')(b)
  b.transform(ignorePDF)
}

var through = require('through2');

function ignorePDF(file) {
  if (!/\.pdf$/.test(file)) {
    return through()
  }
  return through(function (buf, enc, next) {
      next();
  });
}
