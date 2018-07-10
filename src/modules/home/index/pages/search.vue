
<template>
    <!-- 快捷搜索 -->
   <div class="search">
      <header class="search_header">
          <div class="header-left" @click="back">
              <i class="icon icon-zuo-copy"></i><span>返回</span>
          </div>
          <div class="header-middle">
            <div class="search-box">
                <div class="search-code" @click="rotate">
                    <span style="vertical-align: top;" class="f14">{{searchCode}}</span><span style="vertical-align: top;" class="f10 inline code-icon">{{isRotate?'▲':'▼'}} </span>
                </div>
                <input ref="searchInput" placeholder="搜索" class="search-input f14" v-model="searchKeyword" type="text" @keyup="keyword">
                <i style="color: #ccc;" class="icon icon-search f18"></i>
            </div>
          </div>
          <div class="header-right center">
              <i class="icon icon-saoyisao"></i><br>
              <span>扫一扫</span>
          </div>
      </header>
      <main>
        <!-- 热门搜索 -->
        <section class="hot-search">
          <h2>热门搜索</h2>
          <ul class="hot-search-list">
            <li class="hot-search-item center f10 red">255</li>
            <li class="hot-search-item center f10 red">RX</li>
            <li class="hot-search-item center f10 red">fg</li>
            <li class="hot-search-item center f10">感冒</li>
            <li class="hot-search-item center f10">搜身</li>
            <li class="hot-search-item center f10">驱寒</li>
          </ul>
        </section>
        <section class="key-search">
          <ul class="search-list" v-for="(item,index) in searchList" :key="index">
            <li class="search-item"><a :href="'/product/categorylist?keyword='+item.general_name">{{item.general_name}}</a></li>
          </ul>
        </section>
      </main>
      <van-actionsheet v-model="actionsheetShow" :actions="actions" cancelText="取消" />
   </div>
</template>

<script>
import Vue from 'vue'
import { Actionsheet, Toast } from 'vant'
import { keywordSearch } from '@/fetch/search'
Vue.use(Actionsheet)
export default {
  name: 'search',

  data () {
    return {
      isRotate: false,
      actionsheetShow: false,
      actions: [
        {
          name: '综合',
          type: 1,
          callback: this.clickCode
        },
        {
          name: '编码',
          type: 2,
          callback: this.clickCode
        }
      ],
      searchCode: '综合',
      searchType: 1,
      searchKeyword: '',
      searchList: []
    }
  },
  activated () {
    this.autofocus()
  },
  mounted () {

  },
  methods: {
    rotate () {
      this.isRotate = !this.isRotate
      this.actionsheetShow = true
    },
    back () {
      this.$router.back()
    },
    clickCode (item) {
      this.searchCode = item.name
      this.searchType = item.type
      this.actionsheetShow = false
      this.isRotate = !this.isRotate
    },
    autofocus () {
      setTimeout(() => {
        this.$refs.searchInput.focus()
      }, 500)
    },
    keyword () {
      if (this.searchKeyword) {
        console.log(this.searchKeyword)
        keywordSearch({
          type: this.searchType,
          keyword: this.searchKeyword
        }).then(res => {
          let result = res.data
          console.log(res.data)
          if (result.state === 0) {
            Toast.fail('请求失败')
          } else {
            this.searchList = result.data
          }
        })
      }
    }
  }
}
</script>

<style lang="less">
@import url("../../../../modules/common/less/vars.less");
.search {
  height: 100vh;
  width: 100%;
  background-color: #fff;
}
.icon {
  font-size: 0.18rem;
}
.search_header {
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
    .search-code {
      display: inline-block;
      box-sizing: border-box;
      position: absolute;
      vertical-align: top;
      padding: 0 0 0 0.05rem;
      line-height: 0.3rem;
      color: #666;
      width: .5rem;
      height: 100%;
      &::after {
        content: ' ';
        position: absolute;
        top: 0.05rem;
        right: 0;
        width: 0.01rem;
        height: 0.20rem;
        background-color: #ccc;
      }
    }
    .search-input {
      height: 100%;
      line-height: 100%;
      border: 0;
      box-sizing: border-box;
      vertical-align: top;
      padding-left: 0.05rem;
      width: 100%;
      border-radius: 0.04rem;
      padding-left: .55rem;
      color: #666;
    }
  }
}
.hot-search {
  background-color: #f1f1f1;
  > h2 {
    font-size: 0.16rem;
    padding: 0.05rem 0.15rem;
    text-align: left;
    color: #666;
  }
  .hot-search-list{
    padding-bottom: .1rem;
    .hot-search-item {
      display: inline-block;
      width: 30%;
      height: .26rem;
      line-height: .26rem;
      background-color: #fff;
      margin: 0 1% .1rem;
    }
  }
}
.search > main {
  height: calc(100vh - 0.5rem);
  overflow-y: scroll;
}
.key-search {

  .search-item {
    line-height: .35rem;
    height: .35rem;
    border-bottom: .01rem solid #e9e9e9;
    padding: 0 .24rem;
    a {
      display: block;
      font-size: .12rem;
      color: #666;
    }
  }
}
.icon.icon-search {
  position: absolute;
  right: 0.05rem;
  top: -0.1rem;
  height: 0.18rem;
}
</style>
