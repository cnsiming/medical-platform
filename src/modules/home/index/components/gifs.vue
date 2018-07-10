<template>
   <div ref="content" class="gifs content">
        <ul class="card clear" :style="{width: gifs.length * 1.3 +'rem'}">
            <li v-for="(item,index) in gifs" :key="index">
                <a :href="'/product/detail?id='+item.id+'&goback=1'">
                <img v-lazy="item.image" :alt="item.general_name">
                <p class="pro-title text-overflow">{{item.general_name}}</p>
                <p class="gray">{{item.norms}}</p>
                <p class="name gray">{{item.produce_unit}}</p>
                <p class="price">{{item.price}}</p>
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
  activated () {
    document.getElementsByClassName('tab-content')[0].style.height = 'auto'
  }
}
</script>

<style lang="less">
</style>
