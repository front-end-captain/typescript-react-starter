import { ComponentType, lazy } from "react";
import { RouteComponentProps } from "react-router-dom";

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

export interface RouteItem {
  name: string;
  path: string;
  component?: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
  authority: string[];
  icon?: string;
  children?: Array<RouteItem>;
}

const routes: Array<RouteItem> = [
  {
    name: "首页",
    path: "/",
    icon: "home",
    component: Index,
    authority: [],
  },
  {
    name: "列表",
    path: "/papers",
    icon: "file-text",
    authority: [],
    children: [
      {
        name: "试卷列表",
        path: "/papers/list",
        icon: "bar-chart",
        component: ExamPapers,
        authority: [],
      },
      {
        name: "成绩列表",
        icon: "bar-chart",
        path: "/papers/scores",
        component: Score,
        authority: [],
      },
    ],
  },
  {
    name: "用户中心",
    icon: "user",
    path: "/user",
    component: User,
    authority: [],
  },
];

export { routes };
