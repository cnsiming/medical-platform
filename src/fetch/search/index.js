import RQ from '../rq'
import qs from 'qs'
/**
 *
 * @param 请求参数 params
 */
export async function keywordSearch (params) {
  let str = qs.stringify({
    type: params.type,
    keyword: params.keyword
  })
  let res = await RQ.get('json/search?' + str)
  return res
}
