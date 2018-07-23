import qs from 'qs'
import RQ from '../rq'

/**
 * 获取商品详情
 * @param {参数} params
 */
export async function productDetail (params) {
  let res = await RQ.post('/product/jsondetail', qs.stringify({
    id: params.id
  }))
  return res
}

/**
 * 获取商品数据
 * @param {any} param
 */
export async function productGetdata (param) {
  let res = await RQ.post('/product/getdata', qs.stringify({
    goods_id: param.goods_id,
    num: param.num
  }))
  return res
}

/**
 * 收藏商品
 * @param {Object} param 请求参数
 */
export async function favorite (param) {
  let res = await RQ.post('/user/setfav', qs.stringify({
    id: param.id
  }))
  return res
}
