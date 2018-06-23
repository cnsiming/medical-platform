<template>
    <!-- 今日特价 -->
    <div ref="content" class="content jrtj" style="height: 2.00rem;">
        <ul class="card" :style="{width: special.length * 1.3 +'rem'}">
        <li v-for="(item,index) in special" :key="index">
            <a :href="'/product/detail?id='+item.id+'&goback=1'">
              <img v-lazy="item.image" :alt="item.general_name">
              <p class="f18 pro-title">{{item.general_name}}</p>
              <p class="f18 gray">{{item.norms}}</p>
              <p class="f18 name gray">{{item.produce_unit}}</p>
              <p class="f18 price">{{item.current_price}}</p>
              <tw-countdowntime :endTime="item.end_date"></tw-countdowntime>
            </a>
        </li>
        </ul>
    </div>
</template>

<script>

import twCountdowntime from '@tw/tw-countdowntime'
export default {
  components: {
    twCountdowntime
  },
  props: {
    special: {
      type: Array,
      default: null
    }
  },
  data () {
    return {}
  },
  updated () {
    let ul = this.$refs.jrtjul
    let ulWidth = this.special.length * 1.3 + 'rem'
    ul.style.width = ulWidth
  },
  mounted () {
    document.getElementsByClassName('tab-content')[0].style.height = this.$refs.content.clientHeight + 'px'
  }
}
</script>

<style lang="less">
</style>
