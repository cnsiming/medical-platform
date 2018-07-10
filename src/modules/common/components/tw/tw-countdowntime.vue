
<template>
   <div class="tw-countdowntime" v-html="html">

   </div>
</template>

<script>

export default {
  name: 'tw-countdowntime',
  props: {
    // 倒计时时间
    endTime: String | Number
  },
  data () {
    return {
      html: '',
      timer: null
    }
  },
  methods: {
    update () {
      var date = new Date()
      var time = date.getTime() // 当前时间距目标时间之间的毫秒数
      var edTime = this.endTime * 1000 // 结束时间字符串
      var lag = (edTime - time) / 1000 // 当前时间和结束时间之间的秒数
      if (lag > 0) {
        var second = Math.floor(lag % 60)
        var minite = Math.floor((lag / 60) % 60)
        var hour = Math.floor((lag / 3600) % 24)
        var day = Math.floor((lag / 3600) / 24)
        if (day > 99) {
          this.html = '<b >' + day + '</b>天'
        } else {
          this.html = '<b>' + day + '</b>天<b>' + hour + '</b>小时<b>' + minite + '</b>分<b>' + second + '</b>秒'
        }
      } else {
        this.html = '<b>00</b>天<b>00</b>时<b>00</b>分<b>00</b>秒'
      }
    }
  },
  mounted () {
    this.update()
    // this.timer = setInterval(this.update, 1000)
  },
  destroyed () {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="less">
.tw-countdowntime {
  position: absolute;
  width: 96%;
  top: 0.05rem;
  font-size: 0.12rem;
  text-align: center;
  b {
    font-weight: normal;
    display: inline-block;
    box-sizing: border-box;
    width: auto;
    height: 0.15rem;
    line-height: 0.15rem;
    background-color: #333;
    border-radius: 0.02rem;
    color: #f3f3f3;
  }
}
</style>
