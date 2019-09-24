# typescript-react-starter

a project starter base on typescript and react

### 关于环境变量、API 请求地址、静态资源地址以及项目启动/构建 `npm script`

##### 配置各个 API 接口请求的地址

在 `webpack/url.js` 文件中可以配置开发、测试和生成环境的 API 接口请求地址以及资源访问地址，在不同的环境下将会读取不同的配置，比如：

``` javascript
"use strict";

/**
 *
 * @param {boolean} local
 */
const initURLS = (local) => {
  return {
    dev: {
      ONE_API: "http://localhost:3000",
      ANOTHER_API: "https://localhost:4000",
      ASSETS_PATH: "/",
    },
    test: {
      ONE_API: "https://test.example.cn",
      ANOTHER_API: "https://test.another.example.cn",
      ASSETS_PATH: local ? "/" : "https://online.test.cn/assets/",
    },
    prod: {
      ONE_API: "https://example.cn",
      ANOTHER_API: "https://another.example.cn",
      ASSETS_PATH: "https://online.cn/assets/",
    },
  };
};

module.exports = { initURLS };
```

然后，可以根据这些不同环境下的地址去创建不同接口验证规则的请求实例，项目中使用 `axios` ，示例代码如下：

``` typescript
// request.ts
import axios from "axios";
import ENV from "URL";

const request = axios.create({
  baseURL: `${ENV.ONE_API}/primary`,
  headers: {
    key: REQUEST_KEY,
  },
});

const anotherRequest = axios.create({
  baseURL: ENV.ANOTHER_API,
  headers: {
    Authorization: `Bearer ${getUserToken()}`,
  },
});
```

##### 环境变量

| 名称                  | 开发                                       | 测试                                                       | 生产                                | 说明     |
| --------------------- | ------------------------------------------ | ---------------------------------------------------------- | ----------------------------------- | -------- |
| NODE_ENV              | development                                 | production                                                 | production                          | 确定第三方库是使用生产版本还是开发版本 |
| TEST                  | false                                      | true                                                       | false                               | 是否是测试环境 |
| LOCAL                 | false                                      | 根据参数确定(true/false)                                   | false                               | 用以确定静态资源地址 |

##### 地址（根据环境变量确定）

| 名称                  | 开发                                       | 测试                                                       | 生产                                | 说明     |
| --------------------- | ------------------------------------------ | ---------------------------------------------------------- | ----------------------------------- | -------- |
| ONE_API 接口域名 | `http://localhost:3000` | `https://test.example.cn` | `https://example.cn` |          |
| ANOTHER_API 接口域名 | `https://localhost:4000` | `https://test.another.example.cn` | `https://another.example.cn` |          |
| 静态资源地址 ASSETS_PATH | `/`                                        | `local ? / : https://online.test.cn/assets/` | `https://online.cn/assets/` |          |

##### 项目启动/构建脚本命令

`start`: NODE_ENV=development TEST=false LOCAL=false  ***项目本地启动***

`dev`: NODE_ENV=development TEST=false LOCAL=false  ***项目本地启动***

`build-local`: NODE_ENV=production TEST=true LOCAL=true  ***构建一个可以在本地运行的包***

`build-test`: NODE_ENV=production TEST=true LOCAL=false  ***构建一个可以在测试环境运行的包***

`build`: NODE_ENV=production TEST=false LOCAL=false  ***构建一个可以在生产环境运行的包***

`build-analysis`: NODE_ENV=production TEST=false LOCAL=false  ***构建一个可以在生产环境运行的包，并打开依赖分析页面***

### 关于项目目录结构

``` javascript
.
├── ./README.md
├── ./favicon.ico
├── ./jest.config.js
├── ./mock
├── ./package.json
├── ./src
│   ├── ./src/assets                   // 图片，字体存放位置
│   ├── ./src/components               // 通用组件
│   ├── ./src/constants                // 一些常量
│   ├── ./src/hooks                    // custom hooks
│   ├── ./src/index.tsx                // 入口文件
│   ├── ./src/pages                    // 路由组件
│   ├── ./src/router
│   │   ├── ./src/router/config.ts     // 路由、权限、导航菜单配置文件
│   │   └── ./src/router/router.tsx    // 应用路由表在这里创建
│   ├── ./src/service                  // 接口请求相关
│   │   ├── ./src/service/URL.ts       // 请求域名
│   │   ├── ./src/service/api          // 接口请求方法定义
│   │   └── ./src/service/request.ts   // 请求实例在这里创建
│   ├── ./src/style                    // 全局样式重写，reset.css，动画，样式常量，公共样式等
│   ├── ./src/types                    // 定义了 API 请求传参接口定义以及响应接口定义
│   ├── ./src/typings                  // 没有类型声明文件的第三方库，在这里声明模块接口定义
│   └── ./src/utils                    // 工具函数
├── ./template
├── ./tests
├── ./tsconfig.json
└── ./webpack
    ├── ./webpack/build.js
    ├── ./webpack/paths.js
    ├── ./webpack/start.js
    ├── ./webpack/url.js              // 这里配置了【开发/测试/生产】各个环境下 API 请求的域名 
    ├── ./webpack/webpack.base.js
    ├── ./webpack/webpack.dev.js
    ├── ./webpack/webpack.devServer.js
    └── ./webpack/webpack.prod.js
```



### 关于路由和导航菜单

### 关于样式

### 关于和服务器进行交互

### 关于状态管理

### 关于测试

### 关于权限管理


