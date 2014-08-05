
window.jQuery = window.$ = require('jquery')
window.Crocodoc = require('viewer')(window.$)
require('viewer/dist/crocodoc.viewer.css')

module.exports = window.Crocodoc
