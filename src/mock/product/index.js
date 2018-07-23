import IMock from '../base'

const mock = new IMock()
var Random = mock.Random
mock.mock('product/jsondetail', {
  activity_introduc: '',
  'activity_type|1-5': 0,
  area_ids: false,
  bar_code: 'JF131005',
  batch_code: '00000000',
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
  'fav|0-1': 0,
  full_promotion_info: [],
  'gettag|0-3': [{
    color: '#ff00ff',
    name: '活动'
  }],
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
  'is_real_separate|0-1': 0,
  jiage: '9.72',
  last_date: '0000-00-00',
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
  type: '@activity_type',
  unit: '盒',
  warehouse_code: ''
})

mock.mock('product/getdata', {
  introduc: `<p>
<span font-size:16px;background-color:#ffffff;"="" style="color: rgb(51, 51, 51);">1、生活如酒，或</span><a href="http://www.so.com/s?q=%E8%8A%B3%E9%A6%99&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">芳香</a><span font-size:16px;background-color:#ffffff;"="" style="color: rgb(51, 51, 51);">，或浓烈，因为诚实，它变得醇厚；生活如歌，或高昂，或低沉，因为守信，它变得悦耳； 生活如画，或明丽，或素雅，因为诚信，它变得美丽。</span>
</p>
<span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">2、若能掬起一捧</span><a href="http://www.so.com/s?q=%E6%9C%88%E5%85%89&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">月光</a><span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">，我选择最柔和的；若能采来</span><a href="http://www.so.com/s?q=%E9%A6%99%E5%B1%B1%E7%BA%A2%E5%8F%B6&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">香山红叶</a><span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">，我选择最艳丽的；若能摘下满天星辰，我选择最明亮的。也许你会说，我的选择不是最好，但我的选择，我相信。 </span><br />
<span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">3、当三闾大夫抱着石头与</span><a href="http://www.so.com/s?q=%E6%B1%9F%E6%B0%B4&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">江水</a><span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">相拥，当西楚霸王自刎时的鲜血染红了整片</span><a href="http://www.so.com/s?q=%E5%A4%95%E9%98%B3&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">夕阳</a><span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">，当普罗米修斯裸着身体被巨鹰啄食，当</span><a href="http://www.so.com/s?q=%E6%8B%89%E5%A5%A5%E5%AD%94&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">拉奥孔</a><span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">扭曲着身体仍想保卫自己的儿子，历史的悲风中发出阵阵悲鸣，但他们生命的</span><a href="http://www.so.com/s?q=%E7%BB%93%E5%B0%BE&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">结尾</a><span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">却那么响亮有力，数千年来仍叩击着</span><a href="http://www.so.com/s?q=%E4%BA%BA%E4%BB%AC&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">人们</a><span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">的</span><a href="http://www.so.com/s?q=%E5%BF%83%E7%81%B5&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">心灵</a><span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">，播放出永不低沉的生命绝唱！ </span><br />
<span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">4、人生弯弯曲曲水，世事重重叠叠山。热情去奔跑，去超越，然后才能拾掇失意后的坦然，挫折后的不屈，困苦艰难后的从容。 </span><br />
<span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">5、 我们的成长要摆脱低俗事物的纷扰，用</span><a href="http://www.so.com/s?q=%E4%BC%A0%E7%BB%9F%E6%96%87%E5%8C%96&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">传统文化</a><span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">来滋养。</span><a href="http://www.so.com/s?q=%E6%9C%89%E5%8F%A5%E8%AF%9D&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">有句话</a><span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">叫</span><a href="http://www.so.com/s?q=%E6%9F%94%E6%97%A5%E8%AF%BB%E5%8F%B2&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">柔日读史</a><span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">，刚日读经。是说意志懈怠时读史以明志：谋臣策士，家国三寸簧舌里；金戈铁马，江山万里血泪中。读</span><a href="http://www.so.com/s?q=%E5%8F%B2%E4%B9%A6&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">史书</a><span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">，能养</span><a href="http://www.so.com/s?q=%E6%B5%A9%E7%84%B6%E6%AD%A3%E6%B0%94&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">浩然正气</a><span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">。也是指骄躁狂暴时读经以养性：老庄之道，清净无为是非空；菩提之心，</span><a href="http://www.so.com/s?q=%E7%81%B5%E5%8F%B0&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">灵台</a><span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">空明尘埃无。读</span><a href="http://www.so.com/s?q=%E7%BB%8F%E4%B9%A6&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">经书</a><span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">，能塑静俭德性。我国浩瀚的</span><a href="http://www.so.com/s?q=%E4%B9%A6%E6%B5%B7&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">书海</a><span font-size:16px;background-color:#ffffff;"="" style="white-space: normal; color: rgb(51, 51, 51);">之中，蕴含着无尽的宝藏，它们是我们成长真正的养分。 </span>…</span><a href="http://www.so.com/s?q=%E7%9A%84%E5%A4%8F&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">的夏</a><span font-size:16px;background-color:#ffffff;"="" style="color: rgb(51, 51, 51);">，错过了稻禾沾满金露</span><a href="http://www.so.com/s?q=%E6%A0%91%E6%9C%A8&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">树木</a><span font-size:16px;background-color:#ffffff;"="" style="color: rgb(51, 51, 51);">寄走一封封枯叶的秋，错过了</span><a href="http://www.so.com/s?q=%E5%B1%B1%E5%9D%A1&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">山坡</a><span font-size:16px;background-color:#ffffff;"="" style="color: rgb(51, 51, 51);">覆</span><a href="http://www.so.com/s?q=%E7%99%BD%E9%9B%AA&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">白雪</a><span font-size:16px;background-color:#ffffff;"="" style="color: rgb(51, 51, 51);">水面凝银冰的冬。</span>
</p>
<p>
<span font-size:16px;background-color:#ffffff;"="" style="color: rgb(51, 51, 51);"><span font-size:16px;background-color:#ffffff;"="">15、拥有诚实，就舍弃了虚伪；拥有诚实，就舍弃了无聊；拥有踏实，就舍弃了浮躁，不论是有意的丢弃，还是意外的失去，只要曾经真实拥有，在一些时候，大度舍弃也是一种境界。 </span><br />
<span font-size:16px;background-color:#ffffff;"="">16、一颗</span><a href="http://www.so.com/s?q=%E5%AD%A4%E7%8B%AC%E7%9A%84%E5%BF%83&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">孤独的心</a><span font-size:16px;background-color:#ffffff;"="">需要爱的滋润；一颗冰冷的心需要友谊的温暖；一颗绝望的心需要力量的托慰；一颗苍白的心需要真诚的帮助；一颗充满戒备关闭的门是多么需要真诚这一把钥匙打开呀！ </span><br />
<span font-size:16px;background-color:#ffffff;"="">17、让我们挥起沉重的铁锤吧！每一下都砸在最稚嫩的部位，</span><a href="http://www.so.com/s?q=%E5%BD%93%E9%9D%92%E6%98%A5%E9%80%9D%E5%8E%BB&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">当青春逝去</a><span font-size:16px;background-color:#ffffff;"="">，那些部位将生出厚晒太阳的茧，最终成为坚实的石，支撑起我们不再年轻但一定</span><a href="http://www.so.com/s?q=%E7%BE%8E%E4%B8%BD%E7%9A%84%E7%94%9F%E5%91%BD&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">美丽的生命</a><span font-size:16px;background-color:#ffffff;"="">。 </span><br />
<span font-size:16px;background-color:#ffffff;"="">18、生活如海，宽容作舟，泛舟于海，方知海之宽阔；生活如山，宽容为径，循径登山，方知山之高大；生活如歌，宽容是曲，</span><a href="http://www.so.com/s?q=%E5%92%8C%E6%9B%B2&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">和曲</a><span font-size:16px;background-color:#ffffff;"="">而歌，方</span><a href="http://www.so.com/s?q=%E7%9F%A5%E6%AD%8C&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">知歌</a><span font-size:16px;background-color:#ffffff;"="">之动听。 </span><br />
<span font-size:16px;background-color:#ffffff;"="">19、爱是一盏灯，</span><a href="http://www.so.com/s?q=%E9%BB%91%E6%9A%97%E4%B8%AD&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">黑暗中</a><span font-size:16px;background-color:#ffffff;"="">照亮前行的远方；爱是一首诗，冰冷中温暖渴求的心房；爱是夏日的风，是</span><a href="http://www.so.com/s?q=%E5%86%AC%E6%97%A5&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">冬日</a><span font-size:16px;background-color:#ffffff;"="">的阳，是</span><a href="http://www.so.com/s?q=%E6%98%A5%E6%97%A5&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">春日</a><span font-size:16px;background-color:#ffffff;"="">的雨，是</span><a href="http://www.so.com/s?q=%E7%A7%8B%E6%97%A5&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">秋日</a><span font-size:16px;background-color:#ffffff;"="">的果。 </span><br />
<span font-size:16px;background-color:#ffffff;"="">20、选择自信，就是选择豁达坦然，就是选择在名利面前岿然不动，就是选择在势力面前昂首挺胸，撑开自信的帆破流向前，展示搏击的</span><a href="http://www.so.com/s?q=%E9%A3%8E%E9%87%87&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">风采</a><span font-size:16px;background-color:#ffffff;"="">。 </span><br />
<span font-size:16px;background-color:#ffffff;"="">21、</span><a href="http://www.so.com/s?q=%E4%BF%A1%E5%BF%B5%E7%9A%84%E5%8A%9B%E9%87%8F&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">信念的力量</a><span font-size:16px;background-color:#ffffff;"="">在于即使身处逆境，亦能帮助你鼓起前进的船帆；信念的魅力在于即使遇到险运，亦能召唤你鼓起生活的勇气；信念的伟大在于即使遭遇不幸，亦能促使你保持崇高的心灵。 </span><br />
<span font-size:16px;background-color:#ffffff;"="">22、当乌云布满</span><a href="http://www.so.com/s?q=%E5%A4%A9%E7%A9%BA&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">天空</a><span font-size:16px;background-color:#ffffff;"="">时，悲观的人看到的是“黑云压城城欲摧”，乐观的人看到的是“甲光向日金鳞开”。无论处在什么厄运中，只要保持乐观的心态，总能找到这样奇特的草莓。 </span><br />
<span font-size:16px;background-color:#ffffff;"="">23、热爱是风，“贫穷而能听到风声也是好的”。热爱是雨，“有情芍药含春泪”。热爱是土，俯身就能抠出一把，哪一把土壤里没有</span><a href="http://www.so.com/s?q=%E5%85%88%E6%B0%91&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">先民</a><span font-size:16px;background-color:#ffffff;"="">的血汗和</span><a href="http://www.so.com/s?q=%E6%9C%AA%E6%9D%A5%E4%BA%BA&ie=utf-8&src=internal_wenda_recommend_textn" target="_blank">未来人</a><span font-size:16px;background-color:#ffffff;"="">的绿梦呢？热爱是云，仰首就能望到一片，哪一片云里没落过孩子的向往和老人的忆念呢？ </span><br />
<span font-size:16px;background-color:#ffffff;"="">因为热爱，我们心存感激，因为热爱，我们满怀忧愤；因为热爱，我们甘于淡泊宁静的日子；也因为热爱，我们敢于金戈铁马去，马革裹尸还。忍辱负重的生，生是热爱；大义凛然地死，死是热爱；清清爽爽，认认真真地活着，活着又何尝不是热爱！ </span></span>
</p>`,
  tel: '0663-12345678'
})

mock.mock('user/setfav', {
  data: [],
  'state|0-1': 0,
  text: '收藏成功or取消收藏'
})
export default mock
