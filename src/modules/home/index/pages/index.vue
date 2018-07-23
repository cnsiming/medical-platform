<template>
  <div id="index">
    <transition :name="transitionName" mode="">
      <keep-alive>
        <router-view class="animation container"></router-view>
      </keep-alive>
    </transition>
    <nav class="animation nav" :class="{
      'slide-down': navSlideDown
    }">
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
import { mapGetters } from 'vuex'
import { Lazyload, Tabbar, TabbarItem, Swipe, SwipeItem } from 'vant'
import bus from '@/eventbus'
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
      cartNum: 109,
      navSlideDown: false
    }
  },
  mounted () {
    bus.$on('navAnimation', (onoff) => {
      this.navSlideDown = onoff
    })
  },
  computed: {
    navs () {
      return [
        {
          iconclass: 'van-icon-shouye1',
          text: '首页',
          url: '/'
        },
        {
          iconclass: 'van-icon-menu',
          text: '快捷采购',
          url: '/index/product'
          // url: '/product/index.html?goback=1'
        },
        {
          iconclass: 'van-icon-iconfontcart',
          text: '采购车',
          info: this.carNum >= 100 ? '99+' : this.carNum,
          url: '/cart/index.html?goback=1'
        },
        {
          iconclass: 'van-icon-wode',
          text: '管理中心',
          url: '/login'
        }
      ]
    },
    ...mapGetters({
      carNum: 'carNum'
    })
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
      this.navs.map((item, index) => {
        if (item.url === this.$route.path) {
          this.navActive = index
        }
      })
      const toIndex = to.meta.index
      const fromIndex = from.meta.index
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
    position: absolute;
    height: calc(100% - .5rem);
  }
}
.van-icon__info {
  left: 140% !important;
  top: 0.05em !important;
}
</style>
