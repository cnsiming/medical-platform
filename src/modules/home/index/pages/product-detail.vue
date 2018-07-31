<template>
   <div class="xpt-product-detail">
     <xpt-header title="商品详情" rightIcon="caidanshu">
     </xpt-header>

    <section class="subcontent">
      <div class="product-img-box">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(item,index) in product.images" :key="index"><div @click="imgPreView(index)"><img :src="item"></div></van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-info">
        <div style="background: #fff;">
          <div class="cell">
            <h1 v-html="product.goods_name"></h1>
          </div>

          <div class="special-box" v-if="product.activity_type === 2">
            <div class="inline special-left">
              <span class="inline f14 xstj">限时特价</span>
              <span class="inline f14" style="vertical-align: top;margin-top: 5px;">￥</span>
              <span class="inline current_price">{{product.current_price | price('',2)}}</span>
            </div>
            <div class="inline special-right">
              <p class="f10"><i class="inline small_time"></i>剩余时间</p>
              <p>
                <tw-countdowntime :endTime="product.end_time"></tw-countdowntime>
              </p>
              <i class="i_top"></i>
              <i class="i_bottom"></i>
            </div>
          </div>

          <div class="cell">
            <span>
              {{product.activity_type === 2?'原价':'供应价'}}：
              <span :class="{
                'text-del': product.activity_type === 2,
                'f16': product.activity_type === 2,
                'red': product.activity_type !== 2,
                'f18': product.activity_type !== 2
                }" v-cloak v-if="product.jiage">{{product.jiage | price('￥',2)}}</span>
            </span>
              <span style="float: right;" class="f14">建议零售价：<span class="f14">{{product.retail_price | price('￥',2)}}</span>
            </span>
            <div v-if="product.type === 2" style="line-height: .26rem;">
              <p style="width: 40%" class=" f12 inline">
                限购总数量：<span class="red f12">30</span>瓶
              </p>
              <p class="inline f12 ">
                每单限购<span class="red f12">5</span>瓶
              </p>
            </div>
            <div class="tags" v-if="product.type === 1 && product.gettag" >
              <span v-for="(tag,index) in product.gettag" :key="index" class="inline f12 tag"
              :style="{
                'border-color': tag.color,
                'color': tag.color}">{{tag.name}}</span>
            </div>
          </div>

          <div class="cell">
            <div class="inline gray f12" style="width: 45%">规格: {{product.norms}}</div>
            <div class="inline gray f12" style="width: 38%">库存: {{product.stock}}</div>
            <div class="inline gray f12">单位: {{product.unit}}</div>
            <div class="gray f12">{{product.produce_unit}}</div>
          </div>

          <div class="cell" v-if="product.pack">
            <div>
              <span class="f14">包装规格：</span>
              <div class="inline packs">
                <span v-if="product.pack.length!=0" v-for="(item,index) in product.pack" :key="index" class="pack f12"
                :class="{
                  'active': active === index,
                  'disabled': disabled === index
                }"
                @click="packClick(index,item)"
                >
                  {{item.num}}/{{item.units}}
                </span>
                <span v-else>{{product.unit}}</span>
              </div>
            </div>
          </div>
        </div>

        <section style="margin-top: 0.08rem;background: #fff;">
          <div class="cell">
            <div>
              <i class="product-icon"></i> 产品详情
            </div>
          </div>
          <div class="cell" style="padding: 0 .15rem;padding-right: 0;">
            <div class="product-detail">
              <div v-if="product.member_id && product.is_batch_name===0 && (product.batch_number.length == 0 || product.batch_number =='')">
                <p>供应批号：<span class="red">{{product.batch_code}}</span></p>
                <p>生产日期：<span class="red">{{product.produce_date}}</span></p>
                <p>有效日期：<span class="red">{{product.last_date}}</span></p>
              </div>
              <p>商品编码：<span>{{product.produce_code}}</span></p>
              <p>产品类型：<span>{{product.product_cate}}</span></p>
              <p>批准文号：<span>{{product.license}}</span></p>
            </div>
          </div>
          <div @click="productSpecification"  class="cell">
            <div>
              <i class="product-icon" style="background-position: 0 -.2rem;"></i> 商品说明书
            </div>
          </div>
          <div class="cell">
            <div>
              <i class="product-icon" style="background-position: 0 -.4rem;"></i> 检验资料
            </div>
          </div>
          <div class="cell border0">
            <div>
              <i class="product-icon" style="background-position: 0 -.6rem;"></i> 产品介绍
            </div>
          </div>
          <footer class="product-action">
            <div class="inline" style="width: 20%;height: 100%;">
              <div class="dbc_not" @click="favset(product.id)">
                <van-icon v-if="fav==0" name="xinaixin" class="f20"></van-icon>
                <van-icon v-else name="aixin" class="red f20"></van-icon>
              </div>
              <p class="center f14">{{fav == 0 ? '收藏' : '已收藏'}}</p>
            </div>
            <div class="inline stepper">
              <van-stepper v-model="productNum" :step="productStep" :integer="true" />
            </div>
            <div class="inline addCart">
              <button @click="addCard">加入采购车</button>
            </div>
          </footer>
        </section>
      </div>
    </section>

    <van-popup v-model="showPopup" position="right" :overlay="false">
      <div class="showPopup">
        <div class="p-title">
          <i class="product-icon" style="background-position: 0 -.2rem;"></i>{{popup.pTitle}}
          <van-icon class="icon" name="angle-down" @click="hidePopup"></van-icon>
        </div>
        <div class="p-content" v-html="popup.pContent"></div>
      </div>
    </van-popup>
   </div>
</template>

<script>
/**
 * write a component's description
 */
import Vue from 'vue'
import bus from '@/eventbus'
import { Toast, NavBar, Icon, Swipe, SwipeItem, ImagePreview, Stepper, Popup } from 'vant'
import { productDetail, productGetdata, favorite } from '@/fetch/product'

import twCountdowntime from '@tw/tw-countdowntime'
import xptHeader from '../components/xpt-header'
Vue.use(NavBar)
  .use(Icon)
  .use(Swipe)
  .use(SwipeItem)
  .use(Stepper)
  .use(Popup)
export default {
  name: 'xpt-product-detail',

  components: {
    twCountdowntime,
    xptHeader
  },

  filters: {

    /**
     * @价格格式化
     * @param {any} item 价格
     * @param {any} pre  前缀
     * @param {any} xx   保留几位小数
     * @returns {string} price
     */
    price (item, pre, xx) {
      xx = xx || 2
      if (typeof item === 'number') {
        return pre + item.toFixed(xx)
      } else if (typeof item === 'string') {
        if (isNaN(parseFloat(item))) {
          return item
        } else {
          return pre + parseFloat(item).toFixed(xx)
        }
      } else {
        return ''
      }
    }
  },

  data () {
    return {
      productNum: 1,
      product: {},
      active: -1,
      disabled: -1,
      showPopup: false,
      popup: {
        pTitle: '',
        pContent: '',
        iconName: ''
      },
      fav: 0
    }
  },
  /**
   * @Vue组件创建完成后调用
   */
  created () {
    this.getProductData()
  },

  computed: {
    productStep () {
      if (this.active !== -1) {
        return this.product.pack[this.active].num
      }
      return 1
    }
  },

  beforeRouteEnter (to, from, next) {
    bus.$emit('navAnimation', true)
    next()
  },

  beforeRouteLeave (to, from, next) {
    bus.$emit('navAnimation', false)
    this.$destroy()
    next()
  },

  methods: {
    getProductData () {
      let productId = this.$route.params.id
      const toast = Toast.loading({
        mask: true
      })
      productDetail({id: productId}).then(res => {
        toast.clear()
        console.log(res)
        this.product = res.data
        this.productNum = res.data.packNum || 1
        this.fav = this.product.fav
        console.log(this.productStep)
        this.packageSpecification()
      })
    },
    /**
     * @返回
     */
    onClickLeft () {
      this.$router.back()
    },
    /**
     * @description
     */
    onClickRight () {
      Toast('click right')
    },
    /**
     * 图片放大
     * @param {any} index
     */
    imgPreView (index) {
      ImagePreview(this.product.images, index)
    },
    /**
     * @加入采购车
     */
    addCard () {
      Toast('Click addCart')
    },
    /**
     * @点击包装规格
     */
    packClick (index, item) {
      if (item.disabled) {
        return
      }
      this.active = index
      this.productNum = item.num
    },
    /**
     * @中包装规格
     */
    packageSpecification () {
      let pack = this.product.pack
      let data = this.product
      let isFollowPack = false
      for (var i = 0; i < pack.length; i++) {
        // pack[i].active = pack[i].disabled = false
        if (data.is_real_separate) {
          if (pack[i].is_pack === 'on' || isFollowPack) {
            if (isFollowPack === false) {
              this.active = i
              this.productNum = this.product.pack[this.active].num
              isFollowPack = true
            }
          } else {
            pack[i].disabled = true
            this.disabled = i
          }
        }
      }
    },
    /**
     * @description 商品说明书
     */
    productSpecification () {
      this.popup.pTitle = '商品说明书'
      this.popup.iconName = ''

      productGetdata({
        goods_id: this.$route.params.id,
        num: 1
      }).then(res => {
        console.log(res.data)
        this.popup.pContent = res.data.introduc
        this.showPopup = true
      })
    },
    favset (id) {
      const toast = Toast.loading()
      favorite({
        id: id
      }).then(res => {
        console.log(res.data)
        this.fav = res.data.state
        toast.type = 'text'
        toast.duration = 2000
        toast.message = res.data.text
        // toast.clear()
      })
    },
    /**
     * @description 关闭弹出层
     */
    hidePopup () {
      this.showPopup = false
    }
  }
}
</script>

<style lang="less">

@import "../../../common/less/vars.less";
.xpt-product-detail {
  height: 100vh !important;
  overflow-y: scroll;
  .product-img-box {
    width: 100%;
    height: 2.2rem;
    background-color: #fff;
    img {
      height: 2.2rem;
      width: 2.2rem;
      margin: 0 auto;
      display: inherit;
    }
  }
  .product-info,.van-cell {
    color: #666;
  }
  .product-info {
    // background-color: #fff;
    .special-box {
      box-sizing: border-box;
      height: .5rem;
      padding: .05rem .1rem;
      color: #fff;
      text-align: left;
      background-color: #e52735;
      .special-left {
        width: 2.17rem;
        position: relative;
        .xstj {
          width: 2em;
        }
        .current_price {
          font-size: .3rem;
          color: #fffac5;
          vertical-align: text-bottom;
        }
      }
      .special-right {
        float: right;
        width: 1.48rem;
        height: .5rem;
        box-sizing: border-box;
        background-image: url(../../../../assets/imgs/price_bg.gif);
        margin-top: -0.05rem;
        margin-right: -0.1rem;
        text-align: center;
        color: #803338;
        padding: .05rem .1rem;
        position: relative;
        .small_time {
          width: .16rem;
          height: .2rem;
          background-size: .13rem;
          vertical-align: -webkit-baseline-middle;
          background-repeat: no-repeat;
        }
        .tw-countdowntime {
          top: .25rem;
          left: 50%;
          width: 100%;
          transform: translateX(-50%);
          b {
            color: #e52735;
            background-color: transparent;
          }
        }
        .i_top,.i_bottom{
          border-left: 13px solid #e52735;
        }
        .i_bottom {
          width: 0px;
          height: 0px;
          border-top: 25px solid transparent;
          position: absolute;
          left: -0;
          bottom: 0px;
        }
        .i_top {
          width: 0px;
          height: 0px;
          border-bottom: 25px solid transparent;
          position: absolute;
          left: -0;
          top: 0px;
        }
      }
    }
  }
  .pack {
    box-sizing: border-box;
    padding: 0.25em 0.08rem;
    margin-right: .05rem;
    border: 1px solid #ddd;
    border-radius: .02rem;
    &.active {
      border-color: red;
      // border-width: .02rem;
    }
    &.disabled {
      background-color: #ddd;
    }
  }
  .product-icon {
    display: inline-block;
    width: .2rem;
    height: .2rem;
    background-size: .2rem;
    vertical-align: text-bottom;
    margin-right: 0.05rem;
    background-image: url(../../../../assets/detail_ico.png)
  }
  .product-detail {
    padding-left: .3rem;
    p {
      border-bottom: 1px solid #e5e5e5;
      font-size: .14rem;
      line-height: .3rem;
      padding: .03rem 0;
      > span {
        padding-left: .1rem;
        font-size: .14rem;
      }
    }
    > p {
      &:last-child {
        border-width: 0;
      }
    }
  }
  .tags {
    margin-top: .03rem;
    .tag {
      box-sizing: border-box;
      height: .20rem;
      line-height: .20rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 0px 5px;
      font-family: 'SimHei';
      margin-right: .02rem;
    }
  }
  .product-action {
    height: .5rem;
    box-sizing: border-box;
    border-top: 1px solid #e5e5e5;
    background-color: #fff;
    .layout(row);
    .stepper {
      width: 40%;
      padding-top: .1rem;
    }
    .addCart {
      flex: 1;
      text-align: center;
      height: .5rem;
      > button {
        background-color: #f84143;
        color: #fff;
        border: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
  .dbc_not {
    width: .22rem;
    height: .22rem;
    text-align: center;
    margin: .07rem auto 0 auto;
  }
  .showPopup {
    height: 100vh;
    width: 100vw;
    .p-title {
      height: .4rem;
      line-height: .4rem;
      padding-left: .1rem;
      box-sizing: border-box;
      border-bottom: 1px solid #e5e5e5;
    }
    .p-content {
      padding: .1rem;
      letter-spacing: .02rem;
    }
    .icon {
      float: right;
      line-height: .4rem;
      padding:0 .15rem;
      color: #666;
    }
  }
  .cell {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    min-height: .4rem;
    line-height: .2rem;
    padding: .1rem .15rem;
    border-bottom: .01rem solid #e5e5e5;
    text-align: left;
    color: #666;
    &.border0 {
      border: 0;
    }
  }
  .van-stepper__input {
    width: .5rem;
    height: .27rem;
  }
  .van-cell {
    padding: .1rem .15rem;
  }
  .van-stepper__minus, .van-stepper__plus{
    height: .31rem;
  }
  .van-popup--right{
    margin-top: -1px;
  }
}
</style>
