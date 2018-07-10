import RQ from '../rq'
import qs from 'qs'
/**
 *
 * @param 请求参数 params
 */
export async function keywordSearch (params) {
  let res = await RQ.post('json/search', qs.stringify({
    type: params.type,
    keyword: params.keyword
  }))
  return res
}
