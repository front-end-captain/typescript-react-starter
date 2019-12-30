import { lazy } from "react";

import { RouteConfig } from "./lib/definitions";

// TODO 使用 lazy API 加载的组件必须使用 <Suspense /> 包裹起来

const ExamPapers = lazy(() =>
  import(/* webpackChunkName: "papers" */ "@/pages/Papers").then((m) => {
    return { default: m.ExamPapers };
  }),
);

const Index = lazy(() =>
  import(/* webpackChunkName: "index" */ "@/pages/Index").then((m) => {
    return { default: m.Index };
  }),
);

const Score = lazy(() =>
  import(/* webpackChunkName: "papers" */ "@/pages/Score").then((m) => {
    return { default: m.Score };
  }),
);

const User = lazy(() =>
  import(/* webpackChunkName: "papers" */ "@/pages/User").then((m) => {
    return { default: m.User };
  }),
);

const ScoreSubPage1 = lazy(() =>
  import(/* webpackChunkName: "papers" */ "@/pages/Score/scoreSub1").then((m) => {
    return { default: m.ScoreSub1 };
  }),
);
const ScoreSubPage2 = lazy(() =>
  import(/* webpackChunkName: "papers" */ "@/pages/Score/scoreSub2").then((m) => {
    return { default: m.ScoreSub2 };
  }),
);

const routeConfig: RouteConfig = {
  routes: [
    {
      name: "首页",
      path: "/",
      icon: "home",
      component: Index,
      authority: [1, 2, 3],
    },
    {
      name: "列表",
      path: "/papers",
      icon: "file-text",
      authority: [2, 3],
      children: [
        {
          name: "试卷列表",
          path: "/papers/list",
          icon: "bar-chart",
          component: ExamPapers,
          authority: [3],
        },
        {
          name: "成绩列表",
          icon: "bar-chart",
          path: "/papers/scores",
          component: Score,
          authority: [2],
          children: [
            {
              name: "子成绩列表1",
              path: "/papers/scores/sub1",
              component: ScoreSubPage1,
            },
            {
              name: "子成绩列表2",
              path: "/papers/scores/sub2",
              component: ScoreSubPage2,
            },
          ],
        },
      ],
    },
    {
      name: "用户中心",
      icon: "user",
      path: "/user",
      component: User,
      authority: [2],
    },
  ],
};

export { routeConfig };
