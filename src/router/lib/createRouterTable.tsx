import React, { ReactElement, isValidElement } from "react";
import { Route } from "react-router-dom";

import { NestedRouteItem } from "./definitions";

function checkAuthority(authority: Array<string | number>, role: string | number | Array<string | number>): boolean {
  if (Array.isArray(role)) {
    return authority.some((item, index) => item === role[index]);
  }

  return authority.includes(role);
}

function createRouterTable(
  routes: Array<NestedRouteItem>,
  role?: string | number | Array<string | number>,
): Array<ReactElement> {
  const table: ReactElement[] = [];

  const reversedRoutes: Array<NestedRouteItem> = Array.from(routes).reverse();

  reversedRoutes.forEach((route) => {
    const { path, component: Component, exact = true, strict = true, authority } = route;
    const routeKey = Array.isArray(path) ? path[0] : path;

    if (isValidElement(Component)) {
      return;
    }

    if (Array.isArray(authority) && typeof role !== "undefined" && checkAuthority(authority, role)) {
      table.push(<Route key={routeKey} exact={exact} path={path} strict={strict} component={Component} />);
    }
  });

  table.push(<Route path="*" key="*" exact render={() => <div>404 not found</div>} />);

  return table;
}

export { createRouterTable };