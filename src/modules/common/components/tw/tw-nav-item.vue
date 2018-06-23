<template>
   <div class="tw-nav-item" @click="itemClick">
       <a href="#" class="nav-item" :class="selected?'active':''">
           <i class="nav-icon icon" :class="iconclass"></i>
           <p class="nav-text">{{text}}</p>
       </a>
   </div>
</template>

<script>
import findParent from '@tw/find-parent'
export default {
  name: 'tw-nav-item',
  props: {
    iconclass: String,
    text: String
  },
  mixins: [findParent],
  data () {
    return {

    }
  },
  computed: {
    selected () {
      return this.parent.text === this.text
    }
  },
  methods: {
    itemClick () {
      this.parent.text = this.text
      this.$emit('click', this.text)
    }
  },
  created () {
    this.findParent('tw-nav')
  }

}
</script>

<style lang="less">
@import url(../../less/vars.less);
.tw-nav-item {
  display: inline-block;
  width: 25%;
  .nav-item {
    display: inline-block;
    height: 0.45rem;
    text-align: center;
    color: @navColor;
    > i {
      font-size: 0.21rem;
    }
    > p {
      font-size: 0.12rem;
    }
    &.active {
      color: @navActiveColor;
    }
  }
}
</style>
