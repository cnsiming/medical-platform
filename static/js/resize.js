(function htmlResize () {
  var devierWidth = document.documentElement.clientWidth > 750 ? 750 : document.documentElement.clientWidth
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  document.documentElement.style.fontSize = devierWidth / (7.5 / (devicePixelRatio >= 2 ? 2 : 1)) + 'px'
  addEventListener(resizeEvt, htmlResize)
  // document.addEventListener('DOMContentLoaded', resizeEvt, false)
})()
