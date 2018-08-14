<template>
   <div class="home">
        <!-- 头部 -->
    <header v-scroll class="header animation" :class="{
        'slide-up': headerActive
      }">
      <section class="header-left"><i class="icon van-icon-saoyisao f24"></i></section>
      <section class="header-middle">
        <div>
          <input readonly @click="searchFocus" type="text" placeholder="搜索">
          <i class="icon van-icon-search"></i>
        </div>
      </section>
      <section class="header-right">
        <!-- <a href="/notification/index?goback=1"> -->
        <router-link to="/notification-center">
          <i class="icon van-icon-xiaoxi f24"></i>
        </router-link>
        <!-- </a> -->
        </section>
    </header>
    <main ref="main" class="main">
      <!-- 轮播图 -->
      <section class="swipe-wrapper">
        <van-swipe :show-indicators="showIndicators" :autoplay="3000" style="height: 1.8rem" >
          <van-swipe-item v-for="(item,index) in imgs" :key="index"><img style="height: 1.8rem" v-lazy="item"></van-swipe-item>
        </van-swipe>
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
        <div class="tab-wrapper" >
          <span v-for="(item,index) in activitys" :key="index" :class="isActive=== item.name?'active':''" @click="tabClick(item.name,index)">{{item.value}}</span>
          <span><a href="/product/speciallist?type=now_day&goback=1">更多></a></span>
        </div>
        <div class="tab-content clear">
          <transition :name="activeAnimation" mode="">
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

      <!-- 促销活动专区 -->
      <div class="activity_show" v-if="activityItems.length!=0">
        <div class="activity_show_header">
          <span class="inline"></span>
          <p class="inline f16">促销活动专区</p>
        </div>
        <div class="activity_show_list">
          <div class="activity_show_item" v-for="(item,index) in activityItems" :key="index">
            <a :href="item.url===''?'#':item.url">
              <img v-lazy="item.image">
            </a>
          </div>
        </div>
      </div>

      <!-- 广告通栏banner -->
      <section class="adbanner" v-if="adBannerImgs.length != 0" style="height: 1rem;padding-bottom: 0.05rem">
        <van-swipe :show-indicators="showIndicators" :autoplay="3000" style="height: 1rem" >
          <van-swipe-item style="height: 1rem" v-for="(item,index) in adBannerImgs" :key="index"><a :href="item.url"><img style="height: 1rem" v-lazy="item.image"></a></van-swipe-item>
        </van-swipe>
      </section>

      <!-- 热门分类 -->
      <section ref="category" class="category">
        <div class="category_title">
          <h4>热门分类</h4>
          <p>优质商品，实力厂家，满满优惠惊喜等着您</p>
        </div>
        <div class="category_list" style="height: 100%;">
          <div class="category_ul_list" style="height: 100%;overflow: hidden;">
            <ul>
              <li @click="categoryChange(index,$event)" v-for="(cate,index) in cates" :key="index" :class="index==currCate?'active':''">
                <span>{{cate.parent_name}}</span>
              </li>
            </ul>
          </div>
          <div style="height: calc(100vh - 1.6rem);overflow: hidden;" ref="contentList" class="category_content_list">
            <div class="content_warpper">
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
        </div>
      </section>
    </main>
   </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import { Lazyload, Tabbar, TabbarItem, Swipe, SwipeItem } from 'vant'
import BScroll from 'better-scroll'
import twMenu from '@tw/tw-menu'
import twMenuItem from '@tw/tw-menu-item'
import Special from '../components/special'
import Promotion from '../components/promotion'
import Activity from '../components/activity'
import Gifs from '../components/gifs'

import { getSp, getSlide, getCategory, activityindexshow } from '@/fetch/index'

Vue.use(Lazyload)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
export default {
  name: 'home',
  components: {
    twMenu,
    twMenuItem,
    Special,
    Promotion,
    Activity,
    Gifs
  },
  data () {
    return {
      scrollRight: null,
      scrollLeft: null,
      headerActive: false,
      imgs: [], // 上方轮播图
      adBannerImgs: [], // 广告轮播图
      showIndicators: true, // 是否显示轮播图指示器
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

      menu: '首页',
      isActive: 'Special',
      activitys: [
        {
          name: 'Special',
          value: '今日特价'
        },
        {
          name: 'Promotion',
          value: '促销套餐'
        },
        {
          name: 'Activity',
          value: '活动专区'
        },
        {
          name: 'Gifs',
          value: '采满有赠'
        }
      ],
      activeAnimation: 'slide-right',
      preIndex: 0,
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

      scrollPosition: 0,

      // 促销活动专区
      activityItems: [],
      heights: [0]
    }
  },

  created () {
    getSlide().then(res => {
      this.imgs = res.data.imgs
    })
    getCategory().then(res => {
      this.cates = res.data.data.cates
      this.$nextTick(() => {
        this._initScroll()
      })
    })
    getSp().then(res => {
      this.total_activitys = res.data.data.total_activitys
      this.adBannerImgs = res.data.data.adbanner_image_list
    })
    activityindexshow().then(res => {
      this.activityItems = res.data.data.activity_show
    })
  },
  /**
   * 页面挂载完成后执行
   */
  mounted () {

  },

  activated () {
    // 是否显示头部
    this.headerActive = false
    // 恢复滚动的距离
    document.querySelector('.main').scrollTop = this.scrollPosition

    // 重新获取购物车数量
    this.getCartNum()
  },
  deactivated () {
    this.headerActive = true
  },

  /**
   * 导航离开该组件的对应路由时调用
   */
  beforeRouteLeave (to, from, next) {
    // this.headerActive = true
    // 记录当前滚动的距离
    this.scrollPosition = document.querySelector('.home .main').scrollTop
    next()
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
    }
  },

  directives: {
    scroll: {
      inserted: function (el) {
        let swipe = document.querySelector('.swipe-wrapper')
        let header = el
        document
          .querySelector('.home .main')
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
    }
  },

  methods: {
    /**
     * 点击tab栏切换活动类型
     */
    tabClick (obj, index) {
      this.activeAnimation = this.preIndex < index ? 'slide-right' : 'slide-left'
      this.preIndex = index
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
    categoryChange (index, event) {
      if (!event._constructed) {
        return
      }
      this.currCate = index
      this.scrollRight.scrollTo(0, -this.heights[index], 300)
      this.scrollLeft.scrollToElement(document.querySelector('.category_ul_list li:nth-child(' + (index + 1) + ')'), null, true, true)
      this.scrollLeft.refresh()
    },

    _initScroll () {
      this.scrollLeft = new BScroll('.category_ul_list', {
        scrollY: true,
        click: true
      })
      this.scrollRight = new BScroll('.category_content_list', {
        scrollY: true,
        probeType: 3
      })

      this.scrollRight.on('scroll', (ops) => {
        this.heights.forEach((height, index) => {
          let y = Math.abs(Math.round(ops.y))
          let height2 = this.heights[index + 1]
          if (height2 && (height <= y && y < height2)) {
            this.currCate = index
            this.scrollLeft.scrollToElement(document.querySelector('.category_ul_list li:nth-child(' + (index + 1) + ')'), null, true, true)
            this.scrollLeft.refresh()
          }
        })
      })

      let items = document.querySelectorAll('.category_content_list .category-item')
      items.forEach((el, index) => {
        if (index > 0) {
          let preItem = this.heights[index]
          this.heights.push(preItem + el.offsetHeight)
        } else {
          this.heights.push(el.offsetHeight)
        }
      })
    },
    /**
     * 点击搜索框
     */
    searchFocus () {
      this.$router.push('/search')
    },

    ...mapActions({
      getCartNum: 'UPDATE_CARNUM'
    })
  }
}
</script>

<style lang="less">
@import url('./styles/home.less');
</style>
