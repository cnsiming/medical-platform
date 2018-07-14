import qs from 'qs'
import RQ from '../rq'

export async function activity () {
  let cityjson = await RQ.post('http://pv.sohu.com/cityjson?ie=utf-8')
  let city = ''
  let json = cityjson.data.split('=')[1]
  json = JSON.parse(json.substring(0, json.length - 1))
  let shengIndex = json.cname.indexOf('省')
  let shiIndex = json.cname.indexOf('市')
  city = json.cname.substring(shengIndex + 1, shiIndex)
  let res = await RQ.get('/json/activity?' + qs.stringify({
    city: city
  }))
  return res
}
