import React, { FunctionComponent, ReactElement } from "react";
import { Switch, Route } from "react-router-dom";
import { RouteItem } from "./config";

const createRouterTable: (routes: Array<RouteItem>) => Array<ReactElement> = function(routes) {
  const table: JSX.Element[] = [];

  // 将一维的路由列表倒序 优先匹配子路由
  const reversedRoutes: Array<RouteItem> = Array.from(routes).reverse();

  reversedRoutes.forEach((route) => {
    const { path, component: Component } = route;
    if (Component) {
      table.push(<Route key={path} extra path={path} component={Component} />);
    }
  });

  return table;
};

interface AppRouterProps {
  routes: Array<RouteItem>;
  roleId?: number;
}

const AppRouter: FunctionComponent<AppRouterProps> = ({ routes }) => {
  return <Switch>{createRouterTable(routes)}</Switch>;
};

export { AppRouter };
