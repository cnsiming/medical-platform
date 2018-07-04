var easeout = function (start, end, rate, callback, endCallback) {
  var _end = end
  if (start === end || typeof start !== 'number') {
    return
  }
  end = end || 0
  rate = rate || 2

  var step = function () {
    start = start + (end - start) / rate
    if (Math.abs(start - _end) < 1) {
      if (typeof endCallback === 'function') {
        endCallback()
      }
      callback(end, true)
      return
    }
    callback(start, false)
    requestAnimationFrame(step)
  }
  step()
}

export default easeout
