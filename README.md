# medical-platform

> 一个采用vue + webpack 开发多页面的医药报货平台应用程序

- 请保持所有代码整齐划一，命名请尽量有意义！！！
- 请保持所有js代码要添加分号（;）
- 所有代码提交git前会先经过eslint检查，暂未实施（npm install pre-commit --save-dev）

> 技术栈
- php
- html5
- vant-ui
- js[vue.js]
    - ES6
    - Nodejs
- css[less]/css3

> #### dev 开发流程
- 命令行下执行：'npm run dev'
- 打包上线: 'npm run build'
- 前端采取webpack编译构建开发，配合dev-server插件和mock模拟后端服务器进行交互
- 前端渐进式采取es6开发

```
### 项目结构
``` bash
vue-mpa
├───build                            # 构建脚本
├───node_modules                     # 第三方依赖，库等
├───dist                             # 上生产编译后的文件目录
├───src                              # 源代码
├───────assets                       # 静态资源，相对的资源路径，将由Webpack解析为模块依赖。
├───────fetch                        # 后台api接口
├──────────index                        # index模块 api接口
├──────────search                       # 搜索模块 api接口
├──────────login                        # 登录模块 api接口
├───────layout                       # 公共布局html
├───────mock                         # 模拟数据接口
├───────moudles                      # 各个模块
├──────────common                    # common模块
├──────────home                      # 首页模块
├────────────pages                       # 页面存放文件夹
├────────────router                      # 路由配置
├────────────components                       # 组件
├───static                           # 静态文件 绝对资源路径，不会被 Webpack 处理，它们会直接被复制到最终目录
```
> ## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dll
npm run dev

# build for production with minification
npm run dll
npm run build

# build for production and view the bundle analyzer report
npm run dll
npm run build --report
```

> ## 开发规范
项目采用vue + webpack 的且是多人协作，那么定义一个开发规范是必须的，这样可以让并行开发变的容易起来。
### 1. 页面摆放顺序
* html
* script
* css
```javascript
<template>
</template>

<script>
</script>

<style>
</style>
```
### 2. css规则（使用BEM命名规则避免样式冲突，不使用scoped）
```javascript
<template>
  <div class="home">
    <div class="home__count">{{ count }}</div>
    <div class="home__input"></div>
  </div>
</template>

<style lang="scss">
.home {
  text-align: center;
  &__count {}
  &__input {}
}
</style>
```

### 3.vue文件中上下文顺序
* components
* mixins
* filters
* prop
* data
* state
* getter
* action
* mutations
* watch

* 生命周期钩子
    * beforeCreate （按照生命周期钩子从上到下）
    * created
    * beforeMount
    * mounted
    * beforeUpdate
    * updated
    * activated
    * deactivated
    * beforeDestroy
    * destroyed
* 路由钩子
    * beforeRouteEnter
    * beforeRouteUpdate
    * beforeRouteLeave
* computed
* methods

### 4.Vuex模块化管理
store下面一个文件夹对应一个模块

### 5.Mock数据模拟
mock下面一个文件夹对应一个模块的数据模拟
### 6.路由引入模式
路由懒加载，
```javascript
{
    path: '/login',
    component: () => import(/* webpackChunkName: 'login' */'../pages/login.vue'),
    meta: {
      index: 998,
      keepAlive: false
    }
}
```

### 7.文件命名规范
单词小写,单词之间用'-'分隔，如：
- cell
- cell-group
- search
- search-list

名词在前，动词在后,如：
- time-edit.vue
- time-select.vue

### 8. 与产品 + 后端等协作
千万记住以下三点：

* 要有礼貌的探（si）讨（bi）
* 要很有礼貌的探（si）讨（bi）
* 要非常有礼貌的探（si）讨（bi）



> ## 参考资料
- [Vue](https://cn.vuejs.org/v2/guide/)
- [VueRouter](https://router.vuejs.org/zh-cn/)
- [Vant](https://youzan.github.io/vant/#/zh-CN/intro)
- [Axios](http://www.jianshu.com/p/df464b26ae58)
- [Mockjs](http://mockjs.com/)
- [Webpack](https://doc.webpack-china.org)
- [Less](http://lesscss.cn/)
- [BEM命名规范](https://www.w3cplus.com/css/bem-definitions.html)
