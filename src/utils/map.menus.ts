import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // 要递归的文件路径， 是否要进行递归，递归以.ts结尾的文件
  const routeFiles = require.context('../router/main', true, /\.ts/)

  routeFiles.keys().forEach((key) => {
    // 切割成这样子的
    // /story/chat/chat
    const keyItem = key.split('.')[1]
    // 加载某一个具体的文件
    const route = require('../router/main' + keyItem)
    allRoutes.push(route.default)
  })

  // 2.根据菜单获取需要添加的routes
  // 递归函数
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      // 要做映射的菜单
      if (menu.type === 2) {
        const route = allRoutes.find((item) => item.path === menu.url)
        if (route) {
          routes.push(route)
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

// let firstMenu: any = null

// export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
//   const routes: RouteRecordRaw[] = []

//   // 1.先去加载默认所有的routes
//   const allRoutes: RouteRecordRaw[] = []
//   const routeFiles = require.context('../router/main', true, /\.ts/)
//   routeFiles.keys().forEach((key) => {
//     const route = require('../router/main' + key.split('.')[1])
//     allRoutes.push(route.default)
//   })

//   // 2.根据菜单获取需要添加的routes
//   // userMenus:
//   // type === 1 -> children -> type === 1
//   // type === 2 -> url -> route
//   const _recurseGetRoute = (menus: any[]) => {
//     for (const menu of menus) {
//       if (menu.type === 2) {
//         const route = allRoutes.find((route) => route.path === menu.url)
//         if (route) routes.push(route)
//         if (!firstMenu) {
//           firstMenu = menu
//         }
//       } else {
//         _recurseGetRoute(menu.children)
//       }
//     }
//   }

//   _recurseGetRoute(userMenus)

//   return routes
// }
