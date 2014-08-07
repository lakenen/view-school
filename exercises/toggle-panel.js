
module.exports = {
    toggle: function (name) {
      var btn = getButton(name)
      return btn && btn.click()
    }
  , hide: function (name) {
      var btn = getButton(name, true)
      return btn && btn.click()
    }
  , show: function (name) {
      var btn = getButton(name, false)
      if (btn && !btn.classList.contains('disabled')) return
      return btn && btn.click()
    }
}

function getButton(name, enabled) {
  var sel = '.toggle[data-toggle="' + name + '"]'
  if (!enabled) {
    sel = '.disabled' + sel
  }
  return document.querySelector(sel)
}
