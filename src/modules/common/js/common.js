// 定义一些 公共JS方法

function _$ (selector) {
  return document.querySelector(selector)
}
function _$$ (selector) {
  return document.querySelectorAll(selector)
}

export default {
  _$,
  _$$
}
