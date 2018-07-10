<template>
    <!-- 今日特价 -->
    <div ref="content" class="content jrtj">
        <ul class="card clear" :style="{width: special.length * 1.3 +'rem'}">
        <li v-for="(item,index) in special" :key="index">
            <a :href="'/product/detail?id='+item.id+'&goback=1'">
              <img v-lazy="item.image" :alt="item.general_name">
              <p class="pro-title text-overflow">{{item.general_name}}</p>
              <p class="gray">{{item.norms}}</p>
              <p class="name gray">{{item.produce_unit}}</p>
              <p class="price">{{item.current_price}}</p>
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
  activated () {
    console.log('update')
    document.getElementsByClassName('tab-content')[0].style.height = 'auto'
  }
}
</script>

<style lang="less">
</style>
