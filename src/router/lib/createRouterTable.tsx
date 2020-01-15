import React, { ReactElement, isValidElement, ComponentType } from "react";
import { Route, RouteComponentProps } from "react-router-dom";

import { NestedRouteItem, Role } from "./definitions";

import { checkAuthority } from "./util";

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

    const routeComponent = (
      <Route
        key={routeKey}
        exact={exact}
        path={path}
        strict={strict}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        render={(props: RouteComponentProps) => <Component {...props} meta={meta} />}
      />
    );

    if (typeof role !== "undefined" && checkAuthority(role, authority)) {
      table.push(routeComponent);
    }

    if (typeof role === "undefined") {
      table.push(routeComponent);
    }
  });

  const notFoundRoute = <Route path="*" key="*" exact component={NotFound} />;

  table.push(notFoundRoute);

  return table;
}

export { createRouterTable };
