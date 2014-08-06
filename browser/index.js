var css = require('insert-css')
  , domify   = require('domify')

var fs = require('fs')
var styles = fs.readFileSync(__dirname + '/workshop.css', 'utf8')
var markup = fs.readFileSync(__dirname + '/workshop.html', 'utf8')

css(styles)

if (!document.querySelector('.browser-terminal-menu')) {
  domify(markup)
}
