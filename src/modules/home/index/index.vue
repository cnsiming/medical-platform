<template>
  <div id="app">
    <!-- 头部 -->
    <header v-scroll class="header">
      <section class="header-left"><i class="icon icon-saoyisao"></i></section>
      <section class="header-middle">
        <input type="text" placeholder="搜索">
        <i class="icon icon-search"></i>
      </section>
      <section class="header-right"><i class="icon icon-xiaoxi"></i></section>
    </header>
    <main class="main">
      <!-- 轮播图 -->
      <section class="swipe-wrapper">
        <tw-swipe :imgs="imgs">
        </tw-swipe>
      </section>

      <!-- 菜单 -->
      <section class="menu-wrapper">
        <tw-menu>
          <tw-menu-item v-for="(menu,index) in menus" :key="index" :bgImg="menu.img" :text="menu.text" :url="menu.url">
          </tw-menu-item>
        </tw-menu>
      </section>

      <!-- 活动专区 导航栏 -->
      <section class="activity-wrapper">
        <div class="tab-wrapper">
          <span :class="isActive==='Special'?'active':''" @click="tabClick('Special')">今日特价</span>
          <span :class="isActive==='Promotion'?'active':''" @click="tabClick('Promotion')">促销套餐</span>
          <span :class="isActive==='Activity'?'active':''" @click="tabClick('Activity')">活动专区</span>
          <span :class="isActive==='Gifs'?'active':''" @click="tabClick('Gifs')">采满有赠</span>
          <span><a href="/product/speciallist?type=now_day&goback=1">更多></a></span>
        </div>
        <div class="tab-content clear">
          <transition name="fade" mode="">
            <keep-alive>
              <component :is="view"
                :special="total_activitys.special"
                :promotion="total_activitys.promotion"
                :activity="total_activitys.activity"
                :gifs="total_activitys.gift"
                >
              </component>
            </keep-alive>
          </transition>
        </div>
      </section>

      <!-- 热门分类 -->
      <section class="category">
        <div class="category_title">
          <h4>热门分类</h4>
          <p>优质商品，实力厂家，满满优惠惊喜等着您</p>
        </div>
        <div class="category_list">
          <ul>
            <li @click="currCate=index" v-for="(cate,index) in cates" :key="index" :class="index==currCate?'active':''">
              <span>{{cate.parent_name}}</span>
            </li>
          </ul>
          <div class="category_content_list">
            <div class="category-item">
              <p>标题</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <nav class="nav">
      <!-- <tw-nav v-model="menu">
        <tw-nav-item v-for="(nav,index) in navs" :key="index" :text="nav.text" :iconclass="nav.iconclass" @click="navClick">
        </tw-nav-item>
      </tw-nav> -->
      <van-tabbar v-model="navActive" @change="navChange">
        <van-tabbar-item v-for="(item,index) in navs" :key="index" :info="item.info" :url="item.url">
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
import Vue from 'vue'
import { Toast, Lazyload, Tabbar, TabbarItem } from 'vant'
import { getSp, getSlide, getCategory } from '@/fetch/index'
import twSwipe from './components/tw-swipe'

import twMenu from '@tw/tw-menu'
import twMenuItem from '@tw/tw-menu-item'

import Special from './components/special'
import Promotion from './components/promotion'
import Activity from './components/activity'
import Gifs from './components/gifs'
Vue.use(Lazyload).use(Tabbar).use(TabbarItem)
export default {
  components: {
    twSwipe,
    twMenu,
    twMenuItem,
    Special,
    Promotion,
    Activity,
    Gifs
  },
  created () {
    getSlide().then(res => {
      this.imgs = res.data.imgs
    })
    getCategory().then(res => {
      this.cates = res.data.data.cates
      console.log(this.cates)
    })
  },
  mounted () {
    getSp().then(res => {
      this.total_activitys = res.data.data.total_activitys
      // let ul = this.$refs.jrtjul
      // let ulWidth = this.total_activitys.special.length * 1.3 + 'rem'
      // ul.style.width = ulWidth
    })
  },
  data () {
    return {
      imgs: [],
      menus: [
        {
          img: '0.01rem 0.01rem;',
          text: '快捷采购',
          url: '/product/index?goback=1'
        },
        {
          img: '0.01rem -0.5rem;',
          text: '今日特价',
          url: '/product/speciallist?type=now_day&goback=1'
        },
        {
          img: '0.01rem -1rem;',
          text: '套餐促销',
          url: '/product/promotionlist?goback=1'
        },
        {
          img: '0.01rem -1.51rem;',
          text: '独家专区',
          url: '/ctrlmarketing/index?goback=1'
        },
        {
          img: '0.01rem -2.03rem;',
          text: '采满有赠',
          url: '/gifts/index?goback=1'
        },
        {
          img: '0.01rem -2.54rem;',
          text: '积分商城',
          url: '/point/index?goback=1'
        },
        {
          img: '0.01rem -3.04rem;',
          text: '我的收藏',
          url: '/user/favlist?goback=1'
        },
        {
          img: '0.01rem -3.54rem;',
          text: '采购历史',
          url: '/user/favlist?goback=1'
        }
      ],
      navs: [
        {
          iconclass: 'icon-shouye1',
          text: '首页'
        },
        {
          iconclass: 'icon-menu',
          text: '快捷采购',
          url: '/product/index.html?goback=1'
        },
        {
          iconclass: 'icon-iconfontcart',
          text: '采购车',
          info: '5',
          url: '/cart/index.html?goback=1'
        },
        {
          iconclass: 'icon-wode',
          text: '管理中心',
          url: '/user/index.html?goback=1'
        }
      ],
      navActive: 0,
      menu: '首页',
      isActive: 'Special',
      activety: '',
      total_activitys: {
        activity: [],
        special: [],
        promotion: []
      },
      view: 'Special',
      cates: [],
      currCate: 0
    }
  },
  methods: {
    navChange (text) {
      // console.log(text)
      Toast(text)
    },
    tabClick (obj) {
      this.view = obj
      this.isActive = obj
      let cxul = this.$refs.cxul
      if (cxul) {
        cxul.style.width =
          this.total_activitys.promotion[0].goods_list.length * 1.3 + 'rem'
      }
    }
  },
  computed: {
    promotion () {
      return this.total_activitys.promotion[this.promotionIndex]
    }
  },
  directives: {
    scroll: {
      inserted: function (el) {
        var swipe = document.getElementsByClassName('tw-swipe')[0]
        document
          .getElementsByClassName('main')[0]
          .addEventListener('scroll', function () {
            var t = this.scrollTop
            if (t > swipe.clientHeight) {
              el.style.background = '#00c58d'
            } else {
              el.style.background = 'transparent'
            }
          })
      }
    }
  }
}
</script>

<style lang="less">
@import "../../common/less/vars.less";
#app {
  text-align: center;
  height: 100%;
  .layout;
  justify-content: space-between;

  .header {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 888;
    line-height: 0.5rem;
    // background-color: #00c58d;
    background-color: transparent;
    .layout(row);
    > section {
      box-sizing: border-box;
      height: 0.5rem;
    }
    .header-left {
      width: 0.5rem;
    }
    .header-middle {
      flex: 1;
      position: relative;
      input {
        box-sizing: border-box;
        width: 100%;
        height: 0.3rem;
        padding-left: 0.1rem;
        border: 0;
        border-radius: 15px;
      }
      .icon {
        position: absolute;
        color: #ccc;
        right: 0.1rem;
        top: 0;
      }
    }
    .header-right {
      width: 0.5rem;
    }
    .icon {
      color: #fff;
      font-size: 0.18rem;
    }
  }
  .nav {
    height: 0.5rem;
    padding: 5px;
    box-sizing: border-box;
    background-color: #fff;
    border-top: 1px solid #f3f3f3;
  }
  .main {
    flex: 1;
    overflow-y: scroll;
    .menu-wrapper {
      background-color: #fff;
      margin-bottom: 0.05rem;
    }
    .tab-wrapper {
      background-color: #fff;
      text-align: left;
      > span {
        position: relative;
        text-align: center;
        display: inline-block;
        box-sizing: border-box;
        font-size: 0.15rem;
        width: 20%;
        height: 0.4rem;
        line-height: 0.4rem;
        color: #666;
        &:last-child {
          width: 14%;
          &::after {
            width: 0;
          }
        }
        &.active {
          border-bottom: 1px solid red;
        }
        &::after {
          content: " ";
          position: absolute;
          right: 0;
          top: 0.12rem;
          width: 0.01rem;
          height: 0.18rem;

          background-color: #ddd;
        }
      }
    }
    .tab-content {
      position: relative;
      overflow-x: hidden;
    }
    .content {
      background-color: #fff;
      position: absolute;
      width: 100%;
      transition: all .5s;
      &.jrtj {
        overflow-x: scroll;
        height: 2.05rem;
      }

      ul.card {
        li {
          position: relative;
          float: left;
          text-align: center;
          box-sizing: border-box;
          border-right: 1px solid @bgColor;
          width: 1.3rem;
          height: 2rem;
          padding: 0.05rem;
          img {
            vertical-align: middle;
            width: 100%;
          }
          p {
            text-align: left;
            font-size: 0.14rem;
            &.name {
              white-space: nowrap;
              text-overflow: ellipsis;
              word-wrap: normal;
              overflow: hidden;
              // font-size: .12rem;
            }
            &.price {
              color: @badgeColor;
            }
          }
        }
      }
      .promotion {
        .layout(row);
        position: relative;
        padding-bottom: .05rem;
        > ul {
          width: 0.75rem;
          height: 2.1rem;
          overflow-y: scroll;
          background-color: #f8f8f8;
          > li {
            box-sizing: border-box;
            width: 100%;
            height: 0.45rem;
            line-height: 0.45rem;
            border-bottom: 1px solid #e5e5e5;
            border-right: 1px solid #e5e5e5;
            border-left: 0.02rem solid #f8f8f8;
            &.active {
              border-left: 0.02rem solid red;
            }
          }
        }
        > .promotion-right {
          flex: 1;
          overflow-x: scroll;
        }
      }
      .combo-footer {
        background-color: #fff;
        padding: 0 0 0 .1rem;
        width: 100%;
        height: .45rem;
        box-sizing: border-box;
        .layout(row);
        line-height: 0.45rem;
        .combo-footer-left {
          flex: 1;
          text-align: left;
        }
        .combo-footer-right {
          width: 1.20rem;
          height: 0.45rem;
          line-height: 0.225rem;
          background: url(http://xpt.m.gzjztw.com/picture/app/home/Time-ico.png)
            no-repeat;
          background-size: cover;
          .tw-countdowntime {
            position: static;
            width: 100%;
          }
        }
      }
    }

    .category .category_title {
      width: 100%;
      height: .6rem;
      background: url(http://xpt.m.gzjztw.com//picture/app/home/category_tit.png) no-repeat center center;
      background-size: cover;
      border-bottom: 1px solid #ccc;
      h4 {
        font-size: 0.15rem;
        line-height: .3rem;
      }
      p {
        font-size: .11rem;
        color: #666;
      }
    }
    .category .category_list {
      .layout(row);
      background-color: #fff;
      ul {
        display: inline-block;
        width: .9rem;
        li {
          display: inline-block;
          height: .55rem;
          width: 100%;
          border-bottom: 1px solid #e1e1e1;
          border-right: 1px solid #e1e1e1;
          span {
            display: block;
            width: 100%;
            height: .35rem;
            line-height: .35rem;
            margin-top: .1rem;
            border-left: 3px solid #fff;
          }
          &.active {
            border-right: 1px solid #fff;
            span {
              color: #00aaef;
              border-left: 3px solid #00aaef;
            }
          }
        }
      }
      .category_content_list {
        flex: 1;
      }
    }
  }
}
.gray {
  color: @navColor;
}

.van-icon__info {
    left: 119%;
    top: -.10em;
}
</style>
