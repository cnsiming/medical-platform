<template>
   <div ref="content" class="gifs content" style="height: 2.0rem;">
        <ul class="card" :style="{width: gifs.length * 1.3 +'rem'}">
            <li v-for="(item,index) in gifs" :key="index">
                <a :href="'/product/detail?id='+item.id+'&goback=1'">
                <img v-lazy="item.image" :alt="item.general_name">
                <p class="f18 pro-title">{{item.general_name}}</p>
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
  name: 'gifs',
  props: {
    gifs: {
      type: Array,
      default: null
    }
  },
  data () {
    return {}
  },
  mounted () {
    document.getElementsByClassName('tab-content')[0].style.height = this.$refs.content.clientHeight + 'px'
  }
}
</script>

<style lang="less">
</style>
