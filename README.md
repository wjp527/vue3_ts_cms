# vue3-ts-cms

vite项目创建

```bash
npm init vue@latest -- 会给下好eslint，prettier之类的插件
```

```bash
npm create vite@latest -- 就是一个空的vite项目
```



## 项目配置

### 1. 团队开发 项目配置

#### 1. `.editorconfig`

根目录配置

```bash
# https://editorconfig.org

root = true

[*] # 标识所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格 (tab | space)
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr |crlf)
insert_final_newline = true # 始终在文件末尾插入一个新行
trim_trailing_whitespace = true  # 去除行首的任意空白字符

[*.md] # 表示仅 md文件适用以下规则
insert_final_newline = false
trim_trailing_whitespace = false
```



#### 1.2 安装 `EditorConfig for VS Code` 插件



### 2. Prettier 格式化代码

第一步: 

安装插件

```bash
npm i prettier -D
```



第二步: 

创建 `.prettierrc` 文件

```bash
{
  "useTabs": false,
  # 每个tab键等于 2个空格
  "tabWidth": 2,
  # 一行代码长度多少，超出则换行
  "printWidth": 80,
  # true: 单引号，false: 还是双引号
  "singleQuote": true,
  # 末尾要不要加上逗号
  "trailingComma": "none",
  # 末尾要不要加上分号
  "semi": false
}
```



第三步: 

忽略文件: `.prettierignore`

```bash
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*

```



第四步: 

编写脚本，一次性格式化所有代码

```json
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "prettier": "prettier --write ."
  },
```

==**可能会出现的问题:**== 

✖ 2 problems (0 errors, 2 warnings) 0 errors and 2 warnings potentially fixable with the `--fix`

解决方法: 

```bash
npm run lint --fix
```



### 3. esLint 配置

```bash
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
    'plugin:prettier/recommended'  #新增的
  ],
```



### 4. git Husky和eslint

虽然我们已经要求项目使用`eslint`了，但是不能保证组员提交代码之前都将eslint中的问题解决了

- 也就是我们希望保证代码仓库中的代码都是符合`eslint`规范的
- 那么我们需要在组员执行 `git commit` 命令的时候对其进行校验，如果不符合eslint规范，那么自动通过规范进行修复；

那么如何做到这一点呢？可以通过 ==**Husky**==工具

- `husky`是一个git hook工具: 可以帮助我们触发git提交的各个阶段: `pre-commit`、`commit-msg`、`pre-push`

如何使用husky呢?

这里我们通过自动配置命令: 

```bash
npx husky-init -and npm install
```

这里会做三件事: 

1. 安装 `husky`相关的依赖

![](D:\前端\Vue\Vue3\vue3-ts_cms\src\assets\md\husky1.png)

2. 在项目目录下创建 `.husky`文件夹

![](D:\前端\Vue\Vue3\vue3-ts_cms\src\assets\md\husky2.png)

3. 在 `package.json` 添加一个脚本: 

![](D:\前端\Vue\Vue3\vue3-ts_cms\src\assets\md\husky3.png)

4. 接下来，我们需要去完成一个操作，在进行commit时，执行lint脚本: 

![](D:\前端\Vue\Vue3\vue3-ts_cms\src\assets\md\husky4.png)



这时候我们进行 `git commit` 的时候就会自动格式化代码进行lint校验了



### 5. 代码提示

`jsconfig.json` (根目录)

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "node",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "jsx": "preserve",
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  }
}

```





### 6. git commit 规范

#### 6.1 代码提交风格

通常我们的`git commit`会按照统一的风格来提交，这样可以快速定位每次提交的内容，方便之后对版本进行控制

但是如果每次手动来编写这些是比较麻烦的，我们可以使用一个工具: `Commitizen`

- `Commitizen` 是一个帮助我们编写规范 commit message 的工具: 

1. 安装 `Commitizen`

```bash
npm install commitizen -D
```



2. 安装 `cz-conventional-changelog`, 并且初始化 `cz-conventional-changelog`:

```bash
npx commitizen init cz-conventional-changelog --save-dev --save-exact --save-dev --save-exact
```



这个命令会帮助我们安装`cz-conventional-changelog`

![](D:\前端\Vue\Vue3\vue3-ts_cms\src\assets\md\cz-conventional-changelog版本.png)



并且在 package.json中进行配置: 

![](D:\前端\Vue\Vue3\vue3-ts_cms\src\assets\md\cz-conventional-changelog.png)



这个时候我们提交代码需要使用 **==`npx cz`==** :

- 第一步是选择 `type`, 本次更新的类型

| Type     | 作用                                                         |
| -------- | ------------------------------------------------------------ |
| feat     | 新增特性(feature)                                            |
| fix      | 修复Bug(bug fix)                                             |
| docs     | 修改文档(documentation)                                      |
| style    | 代码格式修改(white-space, formatting, missing semi colors, etc) |
| refactor | 代码重构(refactor)                                           |
| perf     | 改善性能(A code change that improves performance)            |
| test     | 测试(when adding missing tests)                              |
| ci       | 更改持续集成的配置文件和 package中的 scripts命令，例如: scopes； Travis, Circle等 |
| chore    | 变更构建流程或辅助工具(比如更改环境)                         |
| revent   | 代码回退                                                     |

流程: 

![](D:\前端\Vue\Vue3\vue3-ts_cms\src\assets\md\cz.png)



#### 6.2 代码提交验证

如果我们按照 `cz` 来规范了提交风格，但是依然有同事通过  `git commit` 按照不规范的格式提交应该怎么办呢?

- 我们可以通过 `commitlint`来限制提交

1. 安装 `@commitlint/config-conventional` 和 `@commitlint/cli`

```bash
npm i @commitlint/config-conventional @commitlint/cli -Dlint/cli -D
```

![](D:\前端\Vue\Vue3\vue3-ts_cms\src\assets\md\commitlint相关依赖.png)

2. 在根目录创建 `commitlint.config.js`文件，配置 `commitlint`

```bash
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

3. 使用 `husky` 生成 `commit-msg`文件，验证提交信息: 

```bash
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

如下图: 

![](D:\前端\Vue\Vue3\vue3-ts_cms\src\assets\md\commit-msg.png)

4. **==配置脚本:==** 

```json
  "scripts": {
    "commit": "cz"
  },
```

5. **==执行命令:==** 

```bash
npm run commit
```

### 7. vue.config.js的配置

```js
const path = require('path')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 1.配置方式一: CLI提供的属性
  outputDir: './build',
  // 2. 配置方式二: 和webpack属性完全一致，最后会机型合并
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       components: '@/components'
  //     }
  //   }
  // },
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // },
  // 配置方式三:
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components/')
  }
})

```



### 8. env

`.env.development`、`.env.production`、`.env.test` 中变量名不能随便起，如果要的话 需要这样:(在webpack中)

```bash
VUE_APP + 自定义名字
```



## 初始化Css样式

```bash
npm i normalize.css
```



## 添加动态路由

```tsx
import { defineStore } from 'pinia'
// 路由
import router from '@/router'

import localCache from '@/utils/cache'
// 用户模块接口
import {
  accountLoginRequest,
  requestUserInfoById,
  reqUserMenuByRoleId
} from '@/api/user/login'

// 用户类型的接口
import { IAccount, IDataType } from '@/api/user/types'
// 登录类型的接口
import { ILoginState } from './types'
import { ElMessage } from 'element-plus'
import { mapMenusToRoutes } from '@/utils/map.menus'
const useLogin = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: {}
  }),

  getters: {
    // 计算动态路由数据
    getsMenus() {
      this.userMenus = localCache.getCache('menus')
      // if (this.userMenus) {
      // console.log(this.userMenus)
      const routes = mapMenusToRoutes(this.userMenus)
      console.log(routes)
      // 将routes -> router.main.children
      // 注册路由
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      // }
    }
  },

  actions: {
    // 用户登录
    async accountLoginAsync(payload: IAccount) {
      const res = await accountLoginRequest(payload)
      const { id, token } = res.data

      localCache.setCache('token', token)
      if (token) {
        this.token = token
        this.getUserInfo(id)

        ElMessage({
          message: '登录成功',
          type: 'success'
        })
        // 跳转到首页
        router.push('/main')
      }
    },
    async getUserInfo(id: number) {
      // 获取某个用户信息
      const users = await requestUserInfoById(id)
      this.userInfo = users.data
      this.getMenu(id)
    },
    async getMenu(id: number) {
      // 获取侧边栏全部数据
      const menu = await reqUserMenuByRoleId(id)
      this.userMenus = menu.data
      localCache.setCache('menus', this.userMenus)
      // 获取用户的动态路由
      const routes = mapMenusToRoutes(this.userMenus)
      console.log(routes)
      // 将routes -> router.main.children
      // 注册路由
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    },
    loadLocalLogin() {
      const token = localCache.getCache('token')
      if (token) {
        this.token = token
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
      }
      // const userMenus = localCache.getCache('menu')
      const userMenus = JSON.parse(JSON.stringify(this.userMenus))
      if (userMenus) {
        // userMenus -> routes
        // 获取用户的动态路由
        const routes = mapMenusToRoutes(this.userMenus)
        // console.log(routes)
        // 将routes -> router.main.children
        // 注册路由
        routes.forEach((route) => {
          router.addRoute('main', route)
        })
      }
    }
  },

  // 开启数据缓存
  persist: {
    enabled: true
  }
})

export default useLogin

```



整合路由 `map.menus.ts`

```js
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
```

生成路由页面

```bash
npm install coderwhy -g

// 生成文件 路由文件，view页面
coderwhy add3page overview -d src/views/main/analysis/overview
```



路由导航守卫

```js
// 导航守卫
router.beforeEach((to) => {
  const token = localCache.getCache('token')
  if (to.path !== '/login') {
    if (!token) {
      return '/login'
    }
  }

  // console.log(router.getRoutes())
  // console.log(to)
})

```



`main.ts`

```js
const app = createApp(App)
// 优雅的局部引入
app.use(globalRegister)
// 挂载vuex状态管理
// pinia挂载要在router之前
app.use(pinia)
const loginStore = useLogin()
// 重新加载动态路由
loginStore.loadLocalLogin()

// 挂载路由
app.use(router)
app.mount('#app')
```



## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).