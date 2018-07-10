# medical-platform

> 一个采用vue + webpack 开发多页面的医药报货平台应用程序

- 请保持所有代码整齐划一，命名请尽量有意义！！！
- 请保持所有js代码要添加分号（;）
- 所有代码提交git前会先经过eslint检查，暂未实施（npm install pre-commit --save-dev）

> 技术栈
- php
- html5
- vant-ui
- js[vue.js,jQuery]
    - ES6
    - Nodejs
- css[less]/css3

#### dev 开发流程
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
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

#### 参考资料
- [vue](https://cn.vuejs.org/v2/guide/)
- [scss](https://www.sass.hk/guide/)
- [vue-router](https://router.vuejs.org/zh-cn/)
- [webpack](https://doc.webpack-china.org)
- [axios](http://www.jianshu.com/p/df464b26ae58)
