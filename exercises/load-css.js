var cssify = require('cssify')
  , remove = require('remove-element')

var styles = {}

module.exports = function (name, css) {
  css = css || require(name)
  if (styles[name]) {
    remove(styles[name])
  }
  styles[name] = cssify(css)
}
