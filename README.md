# typescript-react-starter

a project starter base on typescript and react

### 关于环境变量、API 请求地址、静态资源地址以及项目启动/构建 `npm script`

##### 配置各个 API 接口请求的地址

在 `webpack/env.js` 文件中可以配置开发、测试和生成环境的 API 接口请求地址以及资源访问地址，在不同的环境下将会读取不同的配置，比如：

``` javascript
"use strict";

/**
 * @param {boolean} local
 */
const initURLS = (local) => {
  return {
    dev: {
      TRAINING_API: "https://test-training.firstleap.cn",
      LEAPFLOW_API: "https://v4-dev.firstleap.cn/mobileapi",
      ASSETS_PATH: "/",
    },
    test: {
      TRAINING_API: "https://test-training.firstleap.cn",
      LEAPFLOW_API: "https://v4-test.firstleap.cn/mobileapi",
      ASSETS_PATH: local ? "/" : "https://leapflow-test-james.firstleap.cn/training/",
    },
    prod: {
      TRAINING_API: "https://training.firstleap.cn",
      LEAPFLOW_API: "https://v4.firstleap.cn/mobileapi",
      ASSETS_PATH: "https://leapflow.firstleap.cn/training/",
    },
  };
};

module.exports = { initURLS };
```

然后，可以根据这些不同环境下的地址去创建不同接口验证规则的请求实例，项目中使用 `axios` ，示例代码如下：

``` typescript
// domian.ts
module.exports = {
  TRAINING_API: process.env.TRAINING_API,
  LEAPFLOW_API: process.env.LEAPFLOW_API,
  COURSEWARE_URL: process.env.COURSEWARE_URL,
};
```

``` typescript
// request.ts
import axios from "axios";

// 由于 domain.ts 使用 CommonJs 模块语法，此处不会被 ts 编译器编译通过
// @ts-ignore
import ENV from "./domain";

const request = axios.create({
  baseURL: `${ENV.TRAINING_API}/primary`,
  headers: {
    key: REQUEST_KEY,
  },
});

const anotherRequest = axios.create({
  baseURL: ENV.LEAPFLOW_API,
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
| --------------------- | ------------------------------------------ | ---------------------------------------------------------- | ----------------------------------- | -------- |                                                   |      |          |
| training API 接口域名 TRAINING_API | `https://test-training.firstleap.cn`       | `https://test-training.firstleap.cn`                       | `https://training.firstleap.cn`     |          |
| leapflow API 接口域名 LEAPFLOW_API | `https://v4-dev.firstleap.cn/mobileapi`    | `https://v4-test.firstleap.cn/mobileapi`                   | `https://v4.firstleap.cn/mobileapi` |          |
| 静态资源地址 ASSETS_PATH | `/`                                        | `LOCAL ? / : https://leapflow-test-james.firstleap.cn` | `https://leapflow.firstleap.cn`     |          |

##### 项目启动/构建脚本命令

`start`: NODE_ENV=development TEST=false LOCAL=false  ***项目本地启动***

`dev`: NODE_ENV=development TEST=false LOCAL=false  ***项目本地启动***

`build-local`: NODE_ENV=production TEST=true LOCAL=true  ***构建一个可以在本地运行的包***

`build-test`: NODE_ENV=production TEST=true LOCAL=false  ***构建一个可以在测试环境运行的包***

`build`: NODE_ENV=production TEST=false LOCAL=false  ***构建一个可以在生产环境运行的包***

### 关于项目目录结构

### 关于路由和导航菜单

### 关于样式

### 关于和服务器进行交互

### 关于状态管理

### 关于测试

### 关于权限管理

