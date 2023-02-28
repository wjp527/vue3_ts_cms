import { IBreadCrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'
let firstMenu: any = null
let firstRoute: RouteRecordRaw | undefined = undefined
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

  // vite 代替 webopack中的require context API
  /*
    const utilFuns: any = {};
    const files = import.meta.globEager('./*.ts');
    Object.keys(files).forEach((fileName) => {
      const name = fileName.replace(/\.\/|\.ts/g, '');
      utilFuns[name] = files[fileName].default;
    });
    export default utilFuns;
 */

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
        if (!firstRoute && !firstMenu) {
          firstMenu = menu
          firstRoute = route
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
  pathMapToMenu(userMenus, currentPath, breadcrumb)
  return breadcrumb
}

// 根据导航栏上的路由路径,进行获取左侧侧边栏的默认展示字段
export function pathMapToMenu(
  Menu: any[],
  currentPath: string,
  breadcrumb?: IBreadCrumb[]
): any {
  for (const item of Menu) {
    // 继续向下遍历
    if (item.type === 1) {
      const findMenu = pathMapToMenu(item.children ?? [], currentPath)
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

// 收集所有的按钮权限
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}

// 遍历用户所拥有的角色权限
export function MenuLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []
  // 递归
  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }

  _recurseGetLeaf(menuList)

  return leftKeys
}

export { firstMenu, firstRoute }
