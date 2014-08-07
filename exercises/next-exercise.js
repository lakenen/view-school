var exercises = require('../exercises')
var keys = Object.keys(exercises)
var next = {}
keys.forEach(function (k, i) {
  var thisName = exercises[k]
    , nextName = exercises[keys[i + 1]] || null
  next[thisName] = nextName
})

module.exports = function (name) {
  return next[name]
}
