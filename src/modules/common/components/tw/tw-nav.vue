<template>
   <div class="tw-nav">
      <slot>

      </slot>
   </div>
</template>

<script>
export default {
  name: 'tw-nav',
  props: {
    value: {
      type: String,
      default: '首页'
    }
  },
  data () {
    return {
      text: this.value
    }
  },
  watch: {
    text: () => {
      this.value = this.text
    }
  }
}
</script>

<style lang="less">
</style>
