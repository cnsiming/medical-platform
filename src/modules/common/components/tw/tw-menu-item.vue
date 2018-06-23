<template>
   <div class="tw-menu-item">
       <a :href="url">
           <span class="menu-icon" :style="'background-position: ' + bgImg"></span>
           <p v-text="text"></p>
       </a>
   </div>
</template>

<script>
export default {
  name: 'tw-menu-item',
  props: {
    bgImg: String,
    text: String,
    url: {
      type: String,
      default: '#'
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less">
.tw-menu-item {
  width: 25%;
  display: inline-block;
  > a {
    display: inline-block;
    width: 100%;
    padding: .05rem;

    box-sizing: border-box;
    > span {
      display: inline-block;
      width: .5rem;
      height: .5rem;
      background-size: .5rem;
      background-image: url(../../../../assets/squareIcon.png);
      background-repeat: no-repeat;
      background-position: 0.01rem 0;
    }
    > p {
      font-size: .14rem;
    }
  }
}
</style>
