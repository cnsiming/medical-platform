
import VueRouter from 'vue-router'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Index from '../pages/index.vue'
import store from '../store'
const routes = [
  {
    path: '/search',
    component: () => import(/* webpackChunkName: 'grounp-search' */'../pages/search.vue'),
    meta: {
      index: 999,
      keepAlive: false
    }
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: 'login' */'../pages/login.vue'),
    meta: {
      index: 998,
      keepAlive: false
    }
  },
  {
    path: '/',
    component: Index,
    meta: {
      index: 0,
      keepAlive: true
    },
    children: [
      {
        path: '',
        component: () => import('../pages/home.vue'),
        meta: {
          index: 1,
          keepAlive: true
        }
      },
      {
        path: 'product',
        component: () => import(/* webpackChunkName: 'grounp-product' */ '../pages/product-index.vue'),
        meta: {
          index: 2,
          keepAlive: true
        }
      },
      {
        path: '/product/detail/:id',
        component: () => import(/* webpackChunkName: 'grounp-product-detail' */'../pages/product-detail.vue'),
        meta: {
          keepAlive: false,
          index: 3
        }
      }
    ]
  },
  {
    path: '/notification-center',
    component: () => import(/* webpackChunkName: 'notification' */'../pages/notification-center.vue'),
    meta: {
      index: 999,
      keepAlive: true,
      login: true
    }
  },
  {
    path: '*',
    redirect: '/'
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
  // 如果需要登录的页面则检查是否已经登录，如果未登录则返回login页面
  if (to.meta.login) {
    let login = store.getters.login
    if (!login) {
      next('/login')
    }
  }
  next()
})
// 路由跳转后
router.afterEach(transition => {
  // 进度条完成
  NProgress.done()
})

export default router
