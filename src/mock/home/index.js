import IMock from '../base'

const mock = new IMock()
var Random = mock.Random
const endDates = [1534743668, 1538365874, 1540967077, 1543560295, 1533052799]
const normss = ['30克（15粒）', '9g*10丸', '6g*6袋', '6g*12袋', '11g*10袋']
const produceUnits = ['肇庆申氏三九医药有限公司', '成都恒瑞制药', '贵州恒和制药', '拜耳医药保健有限公司']

mock.mock('home/sp', {
  code: 1,
  data: {
    isemptystock: 0,
    total_activitys: {
      'special|1-10': [{
        'id|+1': 0,
        'goods_id|+1': 1,
        'batch_code': '20160702',
        choose: 0,
        fav: 0,
        general_name: '@cname',
        goodsstock: '1772',
        hidestock: '1772',
        image: Random.image('130x130', '#f3f3f3'),
        is_view: 0,
        'norms|1': normss,
        current_price: '会员可见',
        produce_unit: '肇庆申氏三九医药有限公司',
        sale_range: 0,
        state: 1,
        stock: 1722,
        unit: '盒',
        userid: 0,
        'end_date|1': endDates,
        start_date: 1507521070
      }],
      'gift|1-10': [{
        'id|2000-3000': 0,
        'batch_code': '1501032',
        choose: 0,
        fav: 0,
        general_name: '@cname',
        goodsstock: '1772',
        hidestock: '1772',
        image: Random.image('130x130', '#f3f3f3'),
        is_view: 0,
        'norms|1': normss,
        price: '会员可见',
        'produce_unit|1': produceUnits,
        'product_id|1-1000': 0,
        sale_range: 0,
        'product_id|2000-3000': 0,
        state: 1,
        stock: 1722,
        unit: '盒',
        userid: 0
      }],
      'promotion|1-10': [{
        'current_price': '会员可见',
        'economize_price': 9.4,
        'end_date|1': endDates,
        'goods_list|1-10': [{
          general_name: '@cname',
          imgage: Random.image('130x130', '#f5f5f5'),
          'norms|1': normss,
          price: '会员可见',
          produce_unit: '齐名药业',
          quantity: '1',
          stock: 999,
          unit: '盒'
        }],
        'id|1-9000': 0,
        original_price: '59.40',
        'post_date|1': endDates,
        sale_range: 0,
        'start_date|1': endDates,
        state: 1,
        stock: 199,
        total: 200.00,
        userid: 0
      }],
      'activity|1-10': [{
        'id|2000-3000': 0,
        'batch_code': '00000000',
        choose: 0,
        fav: 0,
        general_name: '@cname',
        goodsstock: '1772',
        hidestock: '1772',
        image: Random.image('130x130', '#f3f3f3'),
        is_view: 0,
        'norms|1': normss,
        price: '会员可见',
        'produce_unit|1': produceUnits,
        'product_id|1-1000': 0,
        sale_range: 0,
        'product_id|2000-3000': 0,
        state: 1,
        stock: 1722,
        unit: '盒',
        userid: 0
      }]
    },
    'adbanner_image_list|0-5': [{
      url: 'http:111',
      image: Random.image('1000x100', '#f3f3f3')
    }]
  }
})

mock.mock('home/slide', {

  'imgs|1-10': [Random.image('300x250', '#f3f3f3')]

})

mock.mock('home/category', {
  data: {
    'cates|10-15': [{
      'parent_id|+1': 0,
      parent_name: '@cname',
      'child|1-9': [{
        'category_id|1-100': 0,
        category_name: '@cname',
        'image_list': Random.image('100x100', '#fff'),
        'parent_category_id|+1': 0
      }]
    }]
  }
})

mock.mock('cart/getnum', 100)

mock.mock('home/activityindexshow', {
  code: 1,
  data: {
    'activity_show|0-8': [
      {
        background_color: '#FFFFFF',
        'id|+1': 0,
        image: Random.image('720x360', '#ffffff'),
        position: '@id',
        sort: '0',
        state: '1',
        title: 8,
        type: '2',
        url: ''
      }
    ]
  }
})

export default mock
