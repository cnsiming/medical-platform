<template>
   <div class="xpt-header">
       <van-nav-bar
        :title="title"
        :left-text="leftText"
        :right-text="rightText"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <van-icon style="font-size: 0.2rem;position: relative;top: -.02rem;" v-if="rightIcon!=''" :name="rightIcon" slot="right" />

      </van-nav-bar>
   </div>
</template>

<script>
/**
 * 封装的header组件
 */
import Vue from 'vue'
import { NavBar, Toast } from 'vant'
Vue.use(NavBar)
export default {
  name: 'xpt-header',
  props: {
    title: '',
    leftText: {
      default: '返回'
    },
    rightText: {
      default: ''
    },
    rightIcon: {
      default: ''
    }
  },
  /**
   * @data
   * @returns {any}
   */
  data () {
    return {}
  },
  methods: {
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
    }
  }
}
</script>

<style lang="less">
.xpt-header {
  .van-nav-bar {
    background-color: #00c58d;
    .van-nav-bar__text,
    .van-ellipsis.van-nav-bar__title {
      color: #fff;
    }
  }
  .van-nav-bar__text:active {
    background-color: #00c58d;
  }
  .van-nav-bar .van-icon {
    font-size: 0.16rem;
    vertical-align: text-bottom;
    color: #fff;
  }
}
</style>
