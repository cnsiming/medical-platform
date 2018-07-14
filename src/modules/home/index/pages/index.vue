<template>
  <div id="index">
    <transition :name="transitionName" mode="">
      <keep-alive>
        <router-view class="container"></router-view>
      </keep-alive>
    </transition>
    <nav class="nav">
      <van-tabbar v-model="navActive" @change="navChange">
        <van-tabbar-item v-for="(item,index) in navs" :key="index" :info="item.info">
          <span style="font-size: .14rem;" :style="{color: index === navActive? '#0c9' : '#737373'}">{{item.text}}</span>
          <template slot="icon" slot-scope="props">
            <i class="icon" :class="item.iconclass" :style="{color: props.active? '#0c9':'#737373','fontSize': '.25rem'}"></i>
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </nav>
  </div>
</template>

<script>
/**
 * write a component's description
 */
import Vue from 'vue'
import { Lazyload, Tabbar, TabbarItem, Swipe, SwipeItem } from 'vant'

Vue.use(Lazyload)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
export default {
  name: 'index',
  data () {
    return {
      navActive: 0,
      transitionName: '',
      // 购物车数量
      cartNum: 109
    }
  },
  computed: {
    navs () {
      return [
        {
          iconclass: 'icon-shouye1',
          text: '首页',
          url: '/index'
        },
        {
          iconclass: 'icon-menu',
          text: '快捷采购',
          url: '/index/product'
          // url: '/product/index.html?goback=1'
        },
        {
          iconclass: 'icon-iconfontcart',
          text: '采购车',
          info: this.cartNum >= 100 ? '99+' : this.cartNum,
          url: '/cart/index.html?goback=1'
        },
        {
          iconclass: 'icon-wode',
          text: '管理中心',
          url: '/user/index.html?goback=1'
        }
      ]
    }
  },
  methods: {
    /**
     * 点击导航栏切换
     * @param {any} index
     */
    navChange (index) {
      // console.log(this.navs[index].url)
      if (this.navs[index].url) {
        this.$router.push(this.navs[index].url)
      }
    }
  },
  watch: {
    $route (to, from) {
      const toIndex = to.meta.index
      const fromIndex = from.meta.index
      console.log({
        toIndex,
        fromIndex
      })
      this.transitionName = toIndex > fromIndex ? 'slide-right' : 'slide-left'
    }
  }

}
</script>

<style lang="less">
@import "../../../common/less/vars.less";

#index {
  text-align: center;
  height: 100%;
  .layout;
  justify-content: space-between;
  .nav {
    height: 0.5rem;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 3px 14px 2px rgba(0,0,0,.12);
    position: fixed;
    bottom: 0;
  }
  .container {
    flex: 1;
    width: 100%;
    transition: all 0.3s ease-out;
    position: absolute;
    height: calc(100% - .5rem);
  }
}
.van-icon__info {
  left: 140% !important;
  top: 0.05em !important;
}
</style>
