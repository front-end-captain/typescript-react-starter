import React, { ReactElement, FunctionComponent, useMemo, Suspense } from "react";
import { Switch, BrowserRouter, HashRouter, HashRouterProps } from "react-router-dom";

import { RouteConfig, BasicRouterItem, Role } from "./definitions";

import { flattenRoutes } from "./util";

import { createRouterTable } from "./createRouterTable";
import { DefaultNotFound } from "./defaultNotFound";

interface LubanRouterProps {
  config: RouteConfig;
  role?: Role;
  children?: (table: ReactElement, routes: Array<BasicRouterItem>) => ReactElement;
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

  if (typeof children === "function") {
    routerTable = children(
      <Switch>{createRouterTable(flattenRouteList, role, notFoundComponent)}</Switch>,
      flattenRouteList,
    );
  }

  return renderRouter(routerTable);
};

export { LubanRouter };
