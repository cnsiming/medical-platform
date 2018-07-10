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

export default {
  data () {
    return {
      transitionName: 'fade'
    }
  },
  watch: {
    $route (to, from) {
      const toIndex = to.meta.index
      const fromIndex = from.meta.index
      this.transitionName = toIndex > fromIndex ? 'slide-right' : 'fade'
    }
  }
}
</script>

<style lang="less">
@import '../../common/less/vars.less';
.child-view {
  position: absolute;
  transition: all .3s ease-out;
  max-width: 750px;
  width: 100%;
}
</style>
