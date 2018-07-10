/**
 * @param start 开始起点
 * @param end 结束点
 * @param rate 速率
 * @param callback 每次动画帧回调
 * @param endCallback 动画结束回调
 */
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
        setTimeout(() => {
          endCallback()
        }, 100)
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
