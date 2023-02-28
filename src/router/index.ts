import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'
import { firstRoute } from '@/utils/map.menus'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/index.vue')
    // children: [] -> 根据 userMenus 来决定
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/notFound/index.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 导航守卫
router.beforeEach((to) => {
  const token = localCache.getCache('token')
  if (to.path !== '/login') {
    if (!token) {
      return '/login'
    }
  }

  if (to.path === '/main') {
    return firstRoute?.path
  }
  // console.log(router.getRoutes())
  // console.log(to)
})

export default router
