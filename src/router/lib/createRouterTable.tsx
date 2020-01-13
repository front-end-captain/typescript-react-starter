import React, { ReactElement, isValidElement, ComponentType } from "react";
import { Route, RouteComponentProps } from "react-router-dom";

import { NestedRouteItem, Role } from "./definitions";

function checkAuthority(authority: Array<string | number>, role: Role): boolean {
  if (Array.isArray(role)) {
    const roleSet = new Set(role);
    return authority.filter((item) => roleSet.has(item)).length > 0;
  }

  return authority.includes(role);
}

function createRouterTable(
  routes: Array<NestedRouteItem>,
  role?: Role,
  NotFound?: ComponentType<any>,
): Array<ReactElement> {
  const table: ReactElement[] = [];

  const reversedRoutes: Array<NestedRouteItem> = Array.from(routes).reverse();

  reversedRoutes.forEach((route) => {
    const { path, component: Component, exact = true, strict = true, authority, meta = {} } = route;
    const routeKey = Array.isArray(path) ? path[0] : path;

    if (typeof Component === "undefined") {
      return;
    }

    if (isValidElement(Component)) {
      return;
    }

    if (Array.isArray(authority) && typeof role !== "undefined" && checkAuthority(authority, role)) {
      table.push(
        <Route
          key={routeKey}
          exact={exact}
          path={path}
          strict={strict}
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          render={(props: RouteComponentProps) => <Component {...props} meta={meta} />}
        />,
      );
    }
  });

  const notFoundRoute =  <Route path="*" key="*" exact component={NotFound} />;

  table.push(notFoundRoute);

  return table;
}

export { createRouterTable };
