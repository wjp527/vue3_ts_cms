import { IBreadCrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'
let firstMenu: any = null
// 计算动态路由
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
        // 获取第一个二级的id
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

// 获取面包屑数据
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumb: IBreadCrumb[] = []
  pathMapMenu(userMenus, currentPath, breadcrumb)
  return breadcrumb
}

// 根据导航栏上的路由路径,进行获取左侧侧边栏的默认展示字段
export function pathMapMenu(
  Menu: any[],
  currentPath: string,
  breadcrumb?: IBreadCrumb[]
): any {
  for (const item of Menu) {
    // 继续向下遍历
    if (item.type === 1) {
      const findMenu = pathMapMenu(item.children ?? [], currentPath)
      if (findMenu) {
        breadcrumb?.push({ name: item.name })
        breadcrumb?.push({ name: findMenu.name })

        return findMenu
      }
    } else if (item.type === 2 && item.url === currentPath) {
      return item
    }
  }
}

export { firstMenu }
