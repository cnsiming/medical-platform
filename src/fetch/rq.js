
import axios from 'axios'
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

export default RQ
