
import axios from 'axios'
import qs from 'qs'
let BASEURL = location.protocol + '//' + location.host + '/'
var RQ = axios.create({
  baseURL: BASEURL
})
RQ.defaults.transformRequest = function (data) {
  // let token = sessionStorage.getItem('token')
  // if (token) {
  //   if (!data) {
  //     data = 'loginedtoken=' + token
  //     } else {
  //     data += '&loginedtoken=' + token
  //     }
  // }
  // Indicator.open('正在加载中')
  // TODO '请求前操作'

  return data
}
RQ.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})
export async function getSlide () {
  let res = await RQ.post('home/slide')
  return res
}

export async function getSp () {
  let res = await RQ.post('home/sp', qs.stringify({
    special: 2,
    promotion: 3,
    activity: 4,
    gifts: 5
  }))
  return res
}
