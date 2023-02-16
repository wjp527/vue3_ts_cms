import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
// import useLogin from './stores/login/login'
import { mapMenusToRoutes } from '@/utils/map.menus'
import useLogin from '@/stores/login/login'
import localCache from '@/utils/cache'
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
  } else if (to.path === '/login') {
    if (token) {
      return false
    }
  }

  // console.log(router.getRoutes())
  console.log(to)
})

export default router
