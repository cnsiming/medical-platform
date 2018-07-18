<template>
   <div class="xpt-product-detail">
     <van-nav-bar
      title="商品详情"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon style="font-size: 0.2rem;position: relative;top: -.02rem;" name="caidanshu" slot="right" />
    </van-nav-bar>
    <section class="subcontent">
      <div class="product-img-box">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(item,index) in product.images" :key="index"><div @click="imgPreView(index)"><img :src="item"></div></van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-info">
        <van-cell-group>
          <van-cell>
            <h1 style="height: 0.24rem;" v-html="product.goods_name"></h1>
          </van-cell>
          <van-cell>
            <div>
              <span>供应价：<span class="red f18" v-cloak v-if="product.price">{{product.price | price('￥',2)}}</span></span>
              <span style="float: right;" class="f14">建议零售价：<span class="f14">{{product.retail_price | price('￥',2)}}</span></span>
            </div>
          </van-cell>
          <van-cell style="padding-top: .05rem;padding-bottom: .05rem;">
            <div>
              <div class="inline gray f12" style="width: 45%">规格: {{product.norms}}</div>
              <div class="inline gray f12" style="width: 38%">库存: {{product.stock}}</div>
              <div class="inline gray f12">单位: {{product.unit}}</div>
              <div class="gray f12">{{product.produce_unit}}</div>
            </div>
          </van-cell>
          <van-cell style="padding-top: .05rem;" v-if="product.pack">
            <div>
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
          </van-cell>
        </van-cell-group>

        <section style="margin-top: 0.08rem;">
          <van-cell-group>
            <van-cell>
              <div>
                <i class="product-icon"></i> 产品详情
              </div>
            </van-cell>
            <van-cell style="padding: .05rem 0 .05rem 0.45rem;">
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
            </van-cell>
            <van-cell @click="productSpecification">
              <div>
                <i class="product-icon" style="background-position: 0 -.2rem;"></i> 商品说明书
              </div>
            </van-cell>
            <van-cell>
              <div>
                <i class="product-icon" style="background-position: 0 -.4rem;"></i> 检验资料
              </div>
            </van-cell>
            <van-cell>
              <div>
                <i class="product-icon" style="background-position: 0 -.6rem;"></i> 产品介绍
              </div>
            </van-cell>
          </van-cell-group>

          <footer class="product-action">
            <div class="inline" style="width: 20%;height: 100%;">
              <div class="dbc_not">
                <van-icon v-if="product.fav==0" name="xinaixin" class="f20"></van-icon>
                <van-icon v-else name="aixin" class="red f20"></van-icon>
              </div>
              <p class="center f14">收藏</p>
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
import { Toast, NavBar, Icon, Swipe, SwipeItem, ImagePreview, Cell, CellGroup, Stepper, Popup } from 'vant'
import { productDetail, productGetdata } from '@/fetch/product'
Vue.use(NavBar)
  .use(Icon)
  .use(Swipe)
  .use(SwipeItem)
  .use(Cell)
  .use(CellGroup)
  .use(Stepper)
  .use(Popup)
export default {
  name: 'xpt-product-detail',

  /**
   * @description
   * @returns {any}
   */
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
      }
    }
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
        return pre + parseFloat(item).toFixed(xx)
      } else {
        return ''
      }
    }
  },
  /**
   * @Vue组件创建完成后调用
   */
  created () {
    let productId = this.$route.params.id
    productDetail({id: productId}).then(res => {
      console.log(res)
      this.product = res.data
      this.productNum = res.data.packNum || 1

      this.packageSpecification()
    })
  },
  computed: {
    productStep () {
      if (this.active !== -1) {
        return this.product.pack[this.active].num
      }
      return 1
    }
  },
  methods: {
    /**
     * @description
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
     * @description
     * @param {any} index
     */
    imgPreView (index) {
      ImagePreview(this.product.images, index)
    },
    /**
     * @description
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
     * 商品说明书
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
    hidePopup () {
      this.showPopup = false
    }
  }
}
</script>

<style lang="less">

@import "../../../common/less/vars.less";
.xpt-product-detail {
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
  .pack {
    box-sizing: border-box;
    padding: 0.03rem 0.08rem;
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
    p {
      border-bottom: 1px solid #e5e5e5;
      font-size: .14rem;
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
  .product-action {
    height: .5rem;
    box-sizing: border-box;
    border-top: 1px solid #e5e5e5;
    background-color: #fff;
    .layout(row);
    .stepper {
      width: 40%;
      padding-top: .1rem;
      height: .5rem;
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
  .van-nav-bar {
    background-color: #00c58d;
    .van-nav-bar__text,
    .van-ellipsis.van-nav-bar__title {
      color: #fff;
    }
  }
  .van-nav-bar__text:active{
    background-color: #00c58d;
  }
  .van-nav-bar .van-icon {
    font-size: 0.16rem;
    vertical-align: text-bottom;
    color: #fff;
  }
  .van-stepper__input {
    width: .5rem;
    height: .27rem;
  }
  .van-cell {
    padding: .05rem .15rem;
  }
  .van-stepper__minus, .van-stepper__plus{
    height: .31rem;
  }
  .van-popup--right{
    margin-top: -1px;
  }
}
</style>
