import React, { ReactElement, FunctionComponent, useMemo, Suspense } from "react";
import { Switch, BrowserRouter, HashRouter, HashRouterProps, useLocation } from "react-router-dom";

import { RouteConfig, BasicRouterItem, Role, NestedRouteItem } from "./definitions";

import { flattenRoutes, filterUnPermissionRoute } from "./util";

import { createRouterTable } from "./createRouterTable";
import { DefaultNotFound } from "./defaultNotFound";

interface LubanRouterProps {
  config: RouteConfig;
  role?: Role;
  children?: (
    table: ReactElement,
    routes: Array<BasicRouterItem>,
    permissionRouteList: Array<NestedRouteItem>,
  ) => ReactElement;
}

const LubanRouter: FunctionComponent<LubanRouterProps> = ({ config, role, children }) => {
  const { routes, mode = "browser", basename = "/", hashType = "slash" } = config;

  const flattenRouteList = useMemo(() => flattenRoutes(routes), [routes]);

  const notFoundRouteItem = flattenRouteList.find((route) => route.path.includes("404"));

  const notFoundComponent = notFoundRouteItem ? notFoundRouteItem.component : DefaultNotFound;

  const hashRouterProps: HashRouterProps = { hashType, basename };

  const renderRouter =
    mode === "browser"
      ? (children: ReactElement) => <BrowserRouter basename={basename}>{children}</BrowserRouter>
      : (children: ReactElement) => <HashRouter {...hashRouterProps}>{children}</HashRouter>;

  let routerTable = (
    <Suspense fallback={<span>loading</span>}>
      <Switch>{createRouterTable(flattenRouteList, role, notFoundComponent)}</Switch>
    </Suspense>
  );

  let permissionRouteList: Array<NestedRouteItem> = [];
  if (role) {
    permissionRouteList = filterUnPermissionRoute(routes, role);
  }

  if (typeof children === "function") {
    routerTable = children(
      <Switch>{createRouterTable(flattenRouteList, role, notFoundComponent)}</Switch>,
      flattenRouteList,
      permissionRouteList,
    );
  }

  return renderRouter(routerTable);
};

export { LubanRouter };
