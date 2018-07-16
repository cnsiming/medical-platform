import qs from 'qs'
import RQ from '../rq'

export async function productDetail (params) {
  let res = await RQ.post('/product/jsondetail', qs.stringify({
    id: params.id
  }))
  return res
}
