<template>
  <div id="app">
    <transition :name="transitionName" mode="">
      <keep-alive>
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import { Dialog } from 'vant'
import { activity } from '@/fetch/common'
import VueCookie from 'vue-cookie'

Vue.use(VueCookie)
export default {
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    $route (to, from) {
      const toIndex = to.meta.index
      const fromIndex = from.meta.index
      this.transitionName = toIndex > fromIndex ? 'slide-right' : 'slide-left'
    }
  },
  mounted () {
    this.getActivity()
  },
  methods: {
    getActivity () {
      var newTime = Math.round(new Date().getTime())
      var val = parseInt(this.$cookie.get('oldTime'))
      var total = (newTime - val) / 1000
      var day = parseInt(total / (24 * 60 * 60))
      if (val) {
        activity().then(data => {
          if (day >= data.data.data.interval) {
            this.showDialog(data.data.data)
          }
        })
      } else {
        activity().then(data => {
          this.showDialog(data.data.data)
        })
      }
    },
    showDialog (item) {
      Dialog.confirm({
        title: item.title,
        message: item.content,
        confirmButtonText: '前往领取',
        cancelButtonText: '暂不关注',
        lockScroll: true,
        beforeClose: (action, done) => {
          let oldTime = Math.round(new Date().getTime())
          this.$cookie.set('oldTime', oldTime, {expires: 99, path: '/'})
          if (action === 'confirm') {
            window.location = item.url
          }
          done()
        }
      })
    }
  }
}
</script>

<style lang="less">
@import "../../common/less/vars.less";
.header {
  background-color: transparent;
}
.van-dialog {
  width: 100%;
  .van-dialog__confirm {
    background-color: #0c9cf3;
    color: #fff;
  }
  .van-dialog__header {
    padding: 0.06rem 0;
    font-size: .14rem;
    line-height: .26rem;
    border-bottom: 1px solid #ddd;
  }
}
</style>
