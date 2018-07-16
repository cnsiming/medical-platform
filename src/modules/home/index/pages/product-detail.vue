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
              <span>供应价：<span class="red f18" v-cloak v-if="product.price">￥{{product.price | price('￥',2)}}</span></span>
              <span style="float: right;" class="f14">建议零售价：<span class="f14">￥{{product.retail_price | price('￥',2)}}</span></span>
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
                  <span v-if="product.pack.length!=0" v-for="(item,index) in product.pack" :key="index" class="pack f12" :class="item.is_pack==='on'?'active': 'disabled'">{{item.num}}/{{item.units}}</span>
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
                <i class="product-icon" style="background-image: url(http://xpt.m.gzjztw.com/picture/app/home/productDetail/detail_ico.png)"></i> 产品详情
              </div>
            </van-cell>
            <van-cell style="padding: .05rem 0 .05rem 0.45rem;">
              <div class="product-detail">
                <p>供应批号：<span class="red">会员可见</span></p>
                <p>供应批号：<span class="red">会员可见</span></p>
                <p>有效日期：<span class="red">会员可见</span></p>
                <p>商品编码：<span>{{product.produce_code}}</span></p>
                <p>产品类型：<span>{{product.product_cate}}</span></p>
                <p>批准文号：<span>{{product.license}}</span></p>
              </div>
            </van-cell>
            <van-cell>
              <div>
                <i class="product-icon" style="background-image: url(http://xpt.m.gzjztw.com/picture/app/home/productDetail/detail_ico.png);background-position: 0 -.2rem;"></i> 商品说明书
              </div>
            </van-cell>
            <van-cell>
              <div>
                <i class="product-icon" style="background-image: url(http://xpt.m.gzjztw.com/picture/app/home/productDetail/detail_ico.png);background-position: 0 -.4rem;"></i> 检验资料
              </div>
            </van-cell>
            <van-cell>
              <div>
                <i class="product-icon" style="background-image: url(http://xpt.m.gzjztw.com/picture/app/home/productDetail/detail_ico.png);background-position: 0 -.6rem;"></i> 产品介绍
              </div>
            </van-cell>
          </van-cell-group>

          <footer class="product-action">
            <div class="inline" style="width: 20%;height: 100%;">
              <div class="dbc_not"></div>
              <p class="center f14">收藏</p>
            </div>
            <div class="inline stepper">
              <van-stepper v-model="productNum" :integer="true" />
            </div>
            <div class="inline addCart">
              <button @click="addCard">加入采购车</button>
            </div>
          </footer>
        </section>
      </div>
    </section>
   </div>
</template>

<script>
/**
 * write a component's description
 */
import Vue from 'vue'
import { Toast, NavBar, Icon, Swipe, SwipeItem, ImagePreview, Cell, CellGroup, Stepper } from 'vant'
import { productDetail } from '@/fetch/product'
Vue.use(NavBar)
  .use(Icon)
  .use(Swipe)
  .use(SwipeItem)
  .use(Cell)
  .use(CellGroup)
  .use(Stepper)
export default {
  name: 'xpt-product-detail',

  /**
   * @description
   * @returns {any}
   */
  data () {
    return {
      productNum: 1,
      product: {}
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
        return parseFloat(item).toFixed(xx)
      } else {
        return ''
      }
    }
  },
  /**
   * @description
   */
  created () {
    let productId = this.$route.params.id
    productDetail({id: productId}).then(res => {
      console.log(res)
      this.product = res.data
      this.productNum = res.data.packNum || 1
    })
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
  }
  .product-detail {
    > p {
      border-bottom: 1px solid #e5e5e5;
      font-size: .14rem;
      padding: .03rem 0;
      > span {
        padding-left: .1rem;
        font-size: .14rem;
      }
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
      line-height: .5rem;
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
    background-image: url(http://xpt.m.gzjztw.com/picture/app/home/productDetail/unCollection.png);
    background-repeat: no-repeat;
    width: .22rem;
    height: .2rem;
    background-size: .22rem;
    margin: .07rem auto 0 auto;
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
  }
  .van-cell {
    padding: .05rem .15rem;
  }
}
</style>
