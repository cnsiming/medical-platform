<template>
   <header class="tw-header-search">
      <div class="header-left" @click="back">
          <i class="icon van-icon-zuo-copy"></i><span>返回</span>
      </div>
      <div class="header-middle">
        <div class="search-box">
          <!-- <div class="search-code" @click="rotate">
              <span style="vertical-align: top;" class="f14">{{searchCode}}</span><span style="vertical-align: top;" class="f10 inline code-icon">{{isRotate?'▲':'▼'}} </span>
          </div> -->
          <input ref="searchInput" readonly placeholder="搜索" class="search-input f14" type="text" @click="searchFocus">
          <i style="color: #ccc;" class="icon van-icon-search f18"></i>
        </div>
      </div>
      <div class="header-right center">
          <i class="icon van-icon-saoyisao f18"></i><br>
          <span>扫一扫</span>
      </div>
   </header>
</template>

<script>
export default {
  name: 'tw-header-search',

  data () {
    return {

    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    searchFocus () {
      this.$router.push('/search')
    }
  }
}
</script>

<style lang="less">
@import url("../../../less/vars.less");
.tw-header-search {
  height: 0.5rem;
  line-height: 0.5rem;
  background-color: @search-header-color;
  color: #fff;
  .layout(row);
  .header-left,
  .header-right {
    box-sizing: border-box;
    padding-left: 0.05rem;
    width: 0.65rem;
    display: inline-block;
    font-size: 0.16rem;
  }
  .header-right {
    padding-top: 0.1rem;
    line-height: 0.18rem;
    > span {
      font-size: 0.1rem;
    }
  }
  .header-middle {
    flex: 1;
  }
  .search-box {
    height: 0.3rem;
    margin: 0.1rem 0;
    background-color: #fff;
    border-radius: 0.04rem;
    text-align: left;
    position: relative;
    .search-input {
      width: 100%;
      height: 100%;
      border: 0;
      box-sizing: border-box;
      border-radius: 0.04rem;
      line-height: normal;
      padding: 0.08rem 0;
      padding-left: .1rem;
      padding-right: .25rem;
      display: block;
      color: #666;
    }
  }
}
.icon.van-icon-search {
  position: absolute;
  right: 0.05rem;
  top: -0.1rem;
  height: 0.18rem;
}
</style>
