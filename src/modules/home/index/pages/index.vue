<template>
  <div id="index">
    <!-- 头部 -->
    <header v-scroll class="header">
      <section class="header-left"><i class="icon icon-saoyisao f24"></i></section>
      <section class="header-middle">
        <div>
          <input readonly @click="searchFocus" type="text" placeholder="搜索">
          <i class="icon icon-search"></i>
        </div>
      </section>
      <section class="header-right"><i class="icon icon-xiaoxi f24"></i></section>
    </header>
    <main ref="main" class="main">
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
      <section v-category ref="category" class="category">
        <div class="category_title">
          <h4>热门分类</h4>
          <p>优质商品，实力厂家，满满优惠惊喜等着您</p>
        </div>
        <div class="category_list">
          <div class="category_ul_list">
            <ul>
              <li @click="categoryChange(index)" v-for="(cate,index) in cates" :key="index" :class="index==currCate?'active':''">
                <span>{{cate.parent_name}}</span>
              </li>
            </ul>
          </div>
          <div ref="contentList" class="category_content_list">
            <div v-for="(cate,index) in cates" :key="index" class="category-item">
              <div class="category-item-title">
                <span class="vm"></span>
                <p>{{cate.parent_name}}</p>
                <span class="vm"></span>
              </div>
              <div class="clear category-item-imgs">
                <div v-for="(imgs,i) in cate.child" :key="i" class="category-img">
                  <a :href="'/product/categorylist?pid='+imgs.parent_category_id+'&cid='+imgs.category_id">
                    <img :src="imgs.image_list" alt="">
                    <p>{{imgs.category_name}}</p>
                  </a>
                </div>
              </div>
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
    <router-view></router-view>
  </div>
</template>

<script>
/**
 * write a component's description
 */
import Vue from 'vue'
import { Toast, Lazyload, Tabbar, TabbarItem } from 'vant'
import { getSp, getSlide, getCategory, getCartNum } from '@/fetch/index'
import twSwipe from '../components/tw-swipe'

import twMenu from '@tw/tw-menu'
import twMenuItem from '@tw/tw-menu-item'

import Special from '../components/special'
import Promotion from '../components/promotion'
import Activity from '../components/activity'
import Gifs from '../components/gifs'
// import search from './components/search'
import easeout from '@/modules/common/js/animation'
Vue.use(Lazyload)
  .use(Tabbar)
  .use(TabbarItem)
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
  /**
   * @description
   */
  created () {
    getSlide().then(res => {
      this.imgs = res.data.imgs
    })
    getCategory().then(res => {
      this.cates = res.data.data.cates
      console.log(this.cates)
    })
    getSp().then(res => {
      this.total_activitys = res.data.data.total_activitys
    })
    try {
      // 判断是否登录
      let isLogin = document.querySelectorAll('#foot .is_login')[0].value
      if (isLogin === 'true') {
        getCartNum().then(res => {
          this.cartNum = res.data
        })
      }
    } catch (error) {
      console.log('err', error.message)
    }
  },
  /**
   * 页面挂载完成后执行
   */
  mounted () {

  },
  /**
   * 组件被复用时调用
   */
  activated () {
    // 恢复滚动的距离
    document.querySelector('.main').scrollTop = this.scrollPosition
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

      navActive: 0,
      menu: '首页',
      isActive: 'Special',
      activety: '',
      total_activitys: {
        activity: [],
        special: [],
        promotion: []
      },
      // 当前活动显示的视图
      view: 'Special',
      // 所以分类
      cates: [],
      // 当前分类
      currCate: 0,
      // 是否在滚动的时候计算
      scroll: false,
      scrollTimer: null,

      // 购物车数量
      cartNum: 0,
      scrollPosition: 0
    }
  },
  computed: {
    /**
     * 促销套餐中当前选择的套餐
     * @returns {any}
     */
    promotion () {
      if (this.total_activitys.promotion) {
        return this.total_activitys.promotion[this.promotionIndex]
      } else {
        return {}
      }
    },
    /**
     * @description
     * @returns {any}
     */
    navs () {
      return [
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
  directives: {
    scroll: {
      inserted: function (el) {
        let swipe = document.getElementsByClassName('tw-swipe')[0]
        let header = el
        document
          .getElementsByClassName('main')[0]
          .addEventListener('scroll', function () {
            /** 处理头部搜索框 */
            var t = this.scrollTop
            if (t > swipe.clientHeight) {
              header.style.background = '#00c58d'
            } else {
              header.style.background = 'transparent'
            }
          })
      }
    },
    category: {
      inserted: function (el, c, vnode) {
        let categoryUl = null
        let categoryLi = null
        let categorys = null
        let headerHeight = null
        let categoryTitleHeight = null
        let category = null
        let categoryUlList = null
        /** 处理分类 */
        document
          .getElementsByClassName('main')[0]
          .addEventListener('scroll', function () {
            headerHeight =
              headerHeight ||
              document.querySelectorAll('.header')[0].offsetHeight
            let top = this.scrollTop + headerHeight
            let categoryOffsetTop = el.offsetTop
            if (top >= categoryOffsetTop) {
              el.classList.add('on')
            } else {
              if (el.classList.contains('on')) {
                el.classList.remove('on')
                return
              }
            }

            if (vnode.context.scroll) {
              return
            }
            // 当滚动到热门分类时 才进行计算
            category = category || document.querySelector('.category')
            if (top < category.offsetTop) return

            // 计算分类列表的偏移量
            categoryTitleHeight =
              categoryTitleHeight ||
              document.querySelectorAll('.category_title')[0].offsetHeight
            categorys =
              categorys || document.querySelectorAll('.category-item')
            top = top + categoryTitleHeight
            let cateIndex = 0
            for (let index = 0; index < categorys.length; index++) {
              const item = categorys[index]
              if (item.offsetTop - top <= 0) {
                cateIndex = index
              }
            }
            categoryUl =
              categoryUl || document.querySelector('.category_list ul')
            categoryLi =
              categoryLi || document.querySelectorAll('.category_list li')

            categoryUlList =
              categoryUlList || document.querySelector('.category_ul_list')

            // 当前的 li 距离父容器的距离 加上自己的高度 大于 ul list 的高度后，进行滚动
            let liOffsetTop =
              categoryLi[cateIndex].offsetTop +
              categoryLi[cateIndex].offsetHeight

            if (liOffsetTop > categoryUlList.offsetHeight) {
              // 需要滚动的距离 = 当前的 li 距离父容器的距离 加上自己的高度  - 父容器的高度
              categoryUlList.scrollTop =
                liOffsetTop - categoryUlList.offsetHeight
            } else {
              // 向上滚动的时候
              if (
                categoryLi[cateIndex].offsetTop - categoryUlList.scrollTop <
                0
              ) {
                categoryUlList.scrollTop = categoryLi[cateIndex].offsetTop
              }
            }
            vnode.context.currCate = cateIndex
          })
      }
    }
  },
  /**
   * 导航离开该组件的对应路由时调用
   */
  beforeRouteLeave (to, from, next) {
    // 记录当前滚动的距离
    this.scrollPosition = document.querySelector('.main').scrollTop
    next()
  },
  methods: {
    /**
     * 点击导航栏切换
     * @param {any} text
     */
    navChange (text) {
      // console.log(text)
      Toast(text)
    },
    /**
     * 点击tab栏切换活动类型
     */
    tabClick (obj) {
      this.view = obj
      this.isActive = obj
      let cxul = this.$refs.cxul
      if (cxul) {
        cxul.style.width =
          this.total_activitys.promotion[0].goods_list.length * 1.3 + 'rem'
      }
    },
    /**
     * 改变当前分类
     */
    categoryChange (index) {
      this.currCate = index
      this.scroll = true
      let main = document.querySelectorAll('.main')[0]
      let scrollTop = main.scrollTop
      let offsetTop = this.$refs.category.offsetTop - 50
      // 判断是否要将页面滚动到分类部分
      if (scrollTop < offsetTop) {
        main.scrollTop = offsetTop
      }

      // 计算当前分类距离页面的偏移量
      let scrollHeight =
        document.querySelectorAll('.category-item')[index].offsetTop -
        document.querySelectorAll('.category_title')[0].offsetHeight -
        document.querySelectorAll('.header')[0].offsetHeight
      // main.scrollTop = scrollHeight
      easeout(
        main.scrollTop,
        scrollHeight,
        6,
        function (value) {
          main.scrollTop = value
        },
        function () {
          clearTimeout(this.scrollTimer)
          this.scrollTimer = setTimeout(() => {
            this.scroll = false
          }, 200)
        }.bind(this)
      )
    },

    /**
     * 点击搜索框
     */
    searchFocus () {
      this.$router.push('/search')
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

  .header {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 888;
    line-height: 0.5rem;
    height: 0.5rem;
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
      > div {
        height: 0.3rem;
        line-height: 0.3rem;
        margin: 0.1rem 0;
        position: relative;
      }
      input {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        font-size: 0.16rem;
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
    }
  }
  .nav {
    height: 0.5rem;
    padding: 5px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .main {
    flex: 1;
    width: 100%;
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
      min-height: 2.1rem;
      position: relative;
      overflow-x: hidden;
      padding-bottom: 0.05rem;
    }
    .content {
      background-color: #fff;
      position: absolute;
      width: 100%;
      transition: all 0.5s;
      overflow-x: scroll;
      ul.card {
        li {
          position: relative;
          float: left;
          text-align: center;
          box-sizing: border-box;
          border-right: 1px solid @bgColor;
          width: 1.3rem;
          padding: 0.05rem;
          p {
            text-align: left;
            font-size: 0.14rem;
            height: 0.2rem;
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
            border-left: 0.03rem solid #f8f8f8;
            &.active {
              border-left: 0.03rem solid red;
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
        padding: 0 0 0 0.1rem;
        width: 100%;
        height: 0.45rem;
        box-sizing: border-box;
        .layout(row);
        line-height: 0.45rem;
        .combo-footer-left {
          flex: 1;
          text-align: left;
        }
        .combo-footer-right {
          width: 1.2rem;
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
    .category.on {
      .category_title,
      .category_list > .category_ul_list {
        position: fixed;
        top: 0.5rem;
        z-index: 1;
      }
      .category_list > .category_ul_list {
        top: 1.11rem;
        height: calc(100vh - 1.6rem);
        overflow-y: scroll;
      }
      .category_content_list {
        margin-top: 0.61rem;
        margin-left: 0.91rem;
      }
    }
    .category .category_title {
      width: 100%;
      height: 0.6rem;
      background: url(http://xpt.m.gzjztw.com//picture/app/home/category_tit.png)
        no-repeat center center;
      background-size: cover;
      border-bottom: 1px solid #ccc;
      h4 {
        font-size: 0.15rem;
        line-height: 0.3rem;
      }
      p {
        font-size: 0.11rem;
        color: #666;
      }
    }
    .category .category_list {
      .layout(row);
      background-color: #fff;
      ul {
        display: inline-block;
        width: 0.9rem;
        li {
          display: inline-block;
          height: 0.55rem;
          width: 100%;
          box-sizing: border-box;
          border-bottom: 1px solid #e1e1e1;
          border-right: 1px solid #e1e1e1;
          span {
            display: block;
            height: 0.35rem;
            line-height: 0.35rem;
            margin-top: 0.1rem;
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
    .category .category_content_list {
      height: 100%;
      .category-item {
        line-height: 0.55rem;
        color: #00aaef;
        position: relative;
        &:last-child {
          min-height: calc(100vh - 1.5rem);
        }
        .category-item-title > p {
          display: inline;
          padding: 0 0.1rem;
        }
        .vm {
          width: 0.46rem;
          display: inline-block;
          border-bottom: 1px solid #ccc;
          vertical-align: middle;
        }
      }
    }
    .category .category-item-imgs {
      .category-img {
        display: inline-block;
        float: left;
        padding: 0.1rem 0.05rem;
      }
      img {
        width: 0.82rem;
        height: 0.82rem;
      }
      p {
        line-height: 0.15rem;
        font-size: 0.15rem;
      }
    }
  }
}
.gray {
  color: @navColor;
}

.van-icon__info {
  left: 140% !important;
  top: 0.05em !important;
}
</style>
