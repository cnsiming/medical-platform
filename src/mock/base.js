import mock from 'mockjs'
let BASEURL = location.protocol + '//' + location.host + '/'
function setUrl (url) {
  return BASEURL + url
}
mock.setup({
  timeout: '200-1000'
})
class IMock {
  mock = function (url, payload) {
    if (typeof url === 'string') {
      url = setUrl(url)
    }
    mock.mock(url, payload)
  }
  Random = mock.Random
}

export default IMock

const imock = new IMock()

imock.mock(/json\/activity/, {
  data: {
    city_ids: '@boolean',
    title: '大平台11',
    content: '因为专业，所以值得您信赖！6月30日，’86医药在线‘ 全新上市，敬请关注！',
    range: '0',
    province_ids: '',
    url: 'http://www.86yyzx.com',
    interval: '1',
    type: '0',
    state: '1',
    image: ' ',
    member_id: null
  }
})
mock.mock('http://pv.sohu.com/cityjson?ie=utf-8',
  'var returnCitySN = {"cip": "113.111.29.177", "cid": "440100", "cname": "广东省广州市"};'
)

imock.mock('visitor/login', 1)
