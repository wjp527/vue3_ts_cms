# vue3-ts-cms

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



### 5. 代码提交风格

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



这个时候我们提交代码需要使用 `npx cz` :

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