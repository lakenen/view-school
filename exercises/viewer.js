
window.jQuery = window.$ = require('jquery')
window.Crocodoc = require('viewer')(window.$)
// full path necessary for browserify
require('./crocodoc.viewer.css')

module.exports = window.Crocodoc
