// box view needs to be required like this, because it's loaded as a separate
// script with box-view-browser-bundle, and we don't want browserify to bundle
// box-view with this bundle (it's exposed as 'box-view-browser' to prevent a
// naming clash with this module itself, which will be exposed as 'box-view')
var moduleName = 'box-view-browser'
module.exports = require(moduleName)
