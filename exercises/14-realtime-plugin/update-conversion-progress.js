module.exports = updateConversionProgress

function updateConversionProgress(percent) {
  var progressBar = document.querySelector('.conversion-progress-bar')
  progressBar.style.width = percent + '%'
  window.updateConversionProgressCalled = true
  window.updateConversionProgressCalledWith = percent
  if (percent < 100) {
    document.body.classList.add('converting')
  } else {
    updateConversionProgress.reset()
  }
}

updateConversionProgress.reset = function () {
  document.body.classList.remove('converting')
  window.updateConversionProgressCalled = false
  window.updateConversionProgressCalledWith = null
}
