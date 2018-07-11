import IMock from '../base'

const mock = new IMock()
// var Random = mock.Random
// let reg = 'json/search[^\\s]*'
// /json/search?type=1&keyword=1/
mock.mock(/json\/search/, {
  'state|0-1': 1,
  'data|8-15': [{
    general_name: '@cname',
    image_list: [
      '@cname',
      '/picture/home/ungoodsphoto.png'
    ]
  }]
})

mock.mock('json/hotsearch', {
  state: 1,
  'data|2-6': [
    '@cname'
  ]
})
export default mock
