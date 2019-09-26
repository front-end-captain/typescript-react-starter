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

// URL 模块自动获取并导出了在 `webpack/url.js` 中配置的地址
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

路由和导航菜单是组织起整个应用的关键骨架，模板中为了方便管理路由，采用了中心化的配置式路由，在 `/src/router/config.ts` 中进行统一配置和管理。一个基本的路由项接口如下：

```typescript
interface RouteItem {
  // 路由名称，也是导航菜单项名称
  name: string;
  // 路由路径 任何 path-to-regexp@^1.7.0 可识别的路径地址
  path: string;
  // 与此路由对应的组件
  component?: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
  // 该路由的权限集合
  authority: string[];
  // 导航菜单项图标
  icon?: string;
  // 该路由的子路由
  children?: Array<RouteItem>;
}
```

##### 基本结构

+ *路由管理*。通过约定的结构在 `/src/router/config.ts` 配置路由。
+ *导航菜单生成*。根据路由配置项来生成导航菜单。菜单项名称、嵌套路径与路由配置高度耦合。
+ *面包屑*组件。根据路由配置和当前路径进行匹配，生成面包屑导航。

### 关于样式

模板默认使用[`Styled-components`](https://www.styled-components.com/) 这样的作为样式解决方案。因为对 TypeScript 支持友好，且没有额外的学习成本。

模板中只有 `/src/style/base.css` 和 `/src/style/reset.css` 两个文件使用 **.css** 文件的后缀，其余的样式文件均使用 ***.css.ts** 的文件后缀。

###  关于和服务端进行数据交互

接口请求库使用 `Axios`，接口都通过自定义的 hook `useTriggerRequest` 和 `useRequest` 调用，具体区别，见 `/src/hooks/useRequest.ts`。下面以获取一个列表为例，简单的流程如下：

1. 定义接口传参和返回值接口：

   ``` typescript
   interface Params {
     userId: number;
   }
   interface MentorItem {
     id: number;
     en_name: string;
     zh_name: string;
     role?: string;
   };
   ```
   
2. 定义接口请求的方法：

   ```typescript
   /**
    * 获取所有导师列表
    */
   const getAllMentors = (params: Params) => {
     return request.post<ResponseData<Array<MentorItem>>>("/v4/teacher/teacherlist?role_id=41", { ...params });
   };
   ```


3. 在组件中调用：

   ```tsx
   const DemoComponent: FunctionComponent = () => {
     // useRequest 还暴露了 清空响应数据，重发请求，取消请求等方法
     const { data: allMentorList, fetching } = useRequest(getAllMentors);
   
     if (fetching) {
       return <span>loading...</span>
     }
   
   	return (
       <div>
        {allMentorList.map((mentor) => {
          return <span>{mentor.zh_name}</span>
        })}
       </div>
     );
   };
   ```

### 关于状态管理

**状态管理并不是必选项**

可以在项目中集成 redux，但是 redux 对 TypeScript 支持并不好，这里不做推荐。模板中集成了一个轻量级的依赖 [immer](https://github.com/immerjs/immer#readme) 的状态管理方案。位置 `/src/lib/store/index.ts` ，一个简单的栗子：

定义 model，类似于 dva 中的 model

``` typescript
import { Store } from "@/lib/store";

const counterStore = new Store({
  name: "counter",
  state: {
    count: 10,
  },
  reducers: {
    increment: (state, payload) => {
      if (payload) {
        state.count = state.count + payload;
        return;
      }

      state.count++;
    },
    decrement: (state) => {
      state.count--;
    },
  },
  effects: {
    asyncIncrement: async (payload) => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      counterStore.dispatch((A) => A.increment, payload);
    },
  },
});

export { counterStore };
```

然后就可以在组件中使用这个 model 了：

``` tsx
import React from "react";

import { counterStore } from "@/modal/counter";

const Counter = () => {
  const count = counterStore.useStore((S) => S.count);

  return (
    <div>
      <h2>Counter</h2>
      <span>Count: {count}</span>
      <br />
      <button onClick={() => counterStore.dispatch((R) => R.decrement)}>-</button>
      <button onClick={() => counterStore.dispatch((A) => A.increment)}>+</button>
      <button onClick={() => counterStore.dispatch((A) => A.asyncIncrement, 10)}>async+</button>
    </div>
  );
};

export { Counter  };
```

### 关于单元测试

测试方案选择 jest + enzyme, enzyme 主要来测试视图组件，但是在测试自定义 hooks 时，有一些不同。由于 hooks 只能在一个 FunctionComponent 的 scope 中调用，所以在测试时需要模拟一个 FunctionComponent 来调用 hooks，这里使用了一个库 [@testing-library/react-hooks](https://github.com/testing-library/react-hooks-testing-library#readme)，来帮助测试自定义 hooks，同时建议对项目中的所有自定义 hooks 进行单元测试。这里举个例子：

```typescript
import { renderHook } from "@testing-library/react-hooks";

// 这里不能使用路径别名 只能使用相对路径 因为 jest 没有配置路径别名的选项
import { useCountDown } from "./../useCountDown";
import { parseRemainingMillisecond } from "./../../utils/index";

// useCountdown 返回一个以 毫秒为单位的时间戳，同时每隔一秒时间戳减 1000 ms

describe("test hook countdown", () => {
  it("should init right countdown", () => {
    const { result } = renderHook(() => useCountDown(5000));
    const showTime = parseRemainingMillisecond(5000);

    expect(result.current.countdown).toBe(5000);
    expect(parseRemainingMillisecond(result.current.countdown)).toBe(showTime);
  });

  it("should invoke callback function when countdown time equal 0", () => {
    const onCountDownLessThenZero = jest.fn();
    const { result } = renderHook(() => useCountDown(5000, onCountDownLessThenZero));

    setTimeout(() => {
      expect(result.current.countdown).toBe(0);
      expect(onCountDownLessThenZero).toBeCalled();
    }, 5000);
  });
});
```



### 关于文件导出和导入

`export default`被认为是有害的，具体可以点击[这里查看](https://jkchao.github.io/typescript-book-chinese/tips/avoidExportDefault.html)。

但是在做按路由进行代码分割时，事情变的有点不一样了。

假设有这样一个组件（在 `containers/Papers/index.tsx`），与路径 `/papers` 成映射关系（路由本质上是路径到组件的映射关系）:

``` tsx
const Papers: FunctionComponent = () => {
  return <div>Hear, rendered paper list table</div>
};

export { Papers };
```

接着，再路由配置文件中，我们会这样引入这个组件，这里使用 `lazy` 这个 API 来加载组件，文档[点这里](https://reactjs.org/docs/code-splitting.html#reactlazy)，与 [lodable-components](https://github.com/smooth-code/loadable-components) 不同的是，`lazy` 还暂时不支持服务端渲染。

``` ts
const Papers = lazy(() => import(/* webpackChunkName: "paper" */ "@/containers/Papers"));
```

这样 TS 编译器就会报一个错误：`Property 'default' is missing in type 'typeof'`，可以看看 `lazy `的函数签名：

``` ts
function lazy<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): LazyExoticComponent<T>;
```

`lazy`接收的参数是一个函数，且这个函数必须返回一个具有 `default` 属性的泛型 `Promise`，但是 `Papers` 组件的导出并没有 `default` 属性。我们可以这样做：

``` ts
const Papers = lazy(() =>
  import(/* webpackChunkName: "paper" */ "@/containers/Papers").then((m) => ({ default: m.Papers }))
);
```

或者在文件中默认导出组件 `Papers`，即 `export default Papers`。这里不推荐默认导出，而是 `export`与解构的形式，便于统一。