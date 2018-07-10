
import qs from 'qs'
import RQ from '../rq'
/**
 * 获取轮播图
 */
export async function getSlide () {
  let res = await RQ.post('home/slide')
  return res
}
/**
 * 获取活动专区
 */
export async function getSp () {
  let res = await RQ.post('home/sp', qs.stringify({
    special: 2,
    promotion: 3,
    activity: 4,
    gifts: 5
  }))
  return res
}
/**
 * 获取热门分类
 */
export async function getCategory () {
  let res = await RQ.post('home/category', qs.stringify({
    parent_cates: 1
  }))
  return res
}

/**
 * 获取购物车数量
 */
export async function getCartNum () {
  var now = new Date().valueOf()
  let res = await RQ.post('cart/getnum', qs.stringify({
    rand: now
  }))
  return res
}
