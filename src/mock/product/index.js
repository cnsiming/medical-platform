import IMock from '../base'

const mock = new IMock()
var Random = mock.Random
mock.mock('product/jsondetail', {
  activity_introduc: '',
  activity_type: 1,
  area_ids: false,
  bar_code: 'JF131005',
  batch_code: ' ',
  batch_number: '',
  buy_num: 0,
  category_id: 185,
  choose: 0,
  city_ids: false,
  current_price: 0,
  dept_code: '',
  dispaly_proposal: 1,
  end_time: 0,
  erp_goods_id: '23731',
  erp_range_id: 0,
  fav: 0,
  full_promotion_info: [],
  gettag: false,
  gift: 0,
  gifts: '',
  goods_name: '人胎盘注射液',
  hidestocktrue: '93',
  id: 23731,
  'images|1-6': [Random.image('220x220', '#f5f5f5')],
  index_show: 1,
  is_batch_name: 0,
  is_empty_stock: 0,
  is_has_send_stock: 0,
  is_separate: 0,
  is_unified_price: 1,
  jiage: '9.72',
  last_date: ' ',
  level_percent: {
    1: {
      percent: '100',
      price: 9.72
    },
    2: {
      percent: '100',
      price: 9.72
    },
    3: {
      percent: '100',
      price: 9.72
    }
  },
  level_price: null,
  license: '暂无批准文号',
  maximum: 0,
  meidanxiangou: '10000000',
  member_id: 21933,
  method_ids: [],
  modified_date: 1524103870,
  norms: '2ml×10支×240盒/件',
  'pack': [
    {
      num: '1',
      is_pack: 'off',
      units: '盒'
    }, {
      num: '2',
      is_pack: 'on',
      units: '袋'
    },
    {
      num: '20',
      is_pack: 'off',
      units: '袋'
    }
  ],
  parent_category_id: 1,
  points: null,
  price: '9.7200',
  produce_code: '131005',
  produce_date: '0000-00-00',
  produce_unit: '邯郸康业',
  product_cate: '化学药品>生物制剂',
  product_code: '131005',
  product_date: ' ',
  product_id: 24390,
  province_ids: false,
  region_percent: {
    '': {
      province_id: [''],
      city_id: ['']
    },
    price: 0
  },
  retail_price: '0.00',
  sale_range: 0,
  send_stock: '0.00',
  shanchujia: '0.00',
  sort: 0,
  split_order_id: 0,
  state: 0,
  stock: '93',
  sync_state: 0,
  tags: '',
  tax: '',
  total: 0,
  type: 1,
  unit: '盒',
  warehouse_code: ''
})
export default mock
