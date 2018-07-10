
import VueRouter from 'vue-router'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Index from '../pages/index.vue'
const routes = [
  {
    path: '/search',
    component: () => import('../pages/search.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/index',
    component: Index,
    meta: {
      index: 0
    }
  },
  {
    path: '*',
    redirect: '/index'
  }
]
const router = new VueRouter({
  routes,
  mode: 'hash'
  // scrollBehavior (to, from, savedPosition) {
  // if (savedPosition) {
  //   console.log(savedPosition)
  //   return savedPosition
  // } else {
  //   console.log({
  //     to,
  //     from
  //   })
  //   from.meta.savedPosition = document.body.getElementsByClassName('main')[0].scrollTop
  //   console.log(from.meta.savedPosition)
  //   return { x: 0, y: from.meta.savedPosition || 0 }
  // }
  // }
})
// 路由全局守卫
// 路由开始跳转前
router.beforeEach((to, form, next) => {
  // 显示进度条
  NProgress.start()
  next()
})
// 路由跳转后
router.afterEach(transition => {
  // 进度条完成
  NProgress.done()
})

export default router
