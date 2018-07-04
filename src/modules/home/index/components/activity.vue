<template>
   <!-- 活动专区 -->
    <div ref="content" class="content jrtj" style="height: 2.20rem;">
        <ul class="card" :style="{width: activity.length * 1.3 +'rem'}">
            <li v-for="(item,index) in activity" :key="index">
                <a :href="'/product/detail?id='+item.id+'&goback=1'">
                <img v-lazy="item.image" :alt="item.general_name">
                <p class="f18 pro-title text-overflow">{{item.general_name}}</p>
                <p class="f18 gray">{{item.norms}}</p>
                <p class="f18 name gray">{{item.produce_unit}}</p>
                <p class="f18 price">{{item.price}}</p>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
    activity: {
      type: Array,
      default: null
    }
  },
  data () {
    return {}
  },
  activated () {
    document.getElementsByClassName('tab-content')[0].style.height = this.$refs.content.clientHeight + 'px'
  }
}
</script>

<style lang="less">
</style>
