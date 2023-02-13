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