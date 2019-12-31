import React, { ReactElement, FunctionComponent, useMemo } from "react";
import { Switch, BrowserRouter, HashRouter } from "react-router-dom";

import { RouteConfig, BasicRouterItem } from "./definitions";

import { flattenRoutes } from "./util";

import { createRouterTable } from "./createRouterTable";

interface LubanRouterProps {
  config: RouteConfig;
  role?: string | number | Array<string | number>;
  customRender?: (table: ReactElement, routes: Array<BasicRouterItem>) => ReactElement;
  notFound?: ReactElement | (() => ReactElement)
}

const LubanRouter: FunctionComponent<LubanRouterProps> = ({ config, customRender, role }) => {
  const { routes, mode = "browser", basename = "/", hashType = "slash" } = config;

  const flattenRouteList = useMemo(() => flattenRoutes(routes), [routes]);

  const renderRouter =
    mode === "browser"
      ? (children: ReactElement) => <BrowserRouter basename={basename}>{children}</BrowserRouter>
      : (children: ReactElement) => (
        <HashRouter hashType={hashType} basename={basename}>
          {children}
        </HashRouter>
      );

  if (typeof customRender === "function") {
    return renderRouter(customRender(<Switch>{createRouterTable(flattenRouteList, role)}</Switch>, flattenRouteList));
  }

  return renderRouter(<Switch>{createRouterTable(flattenRouteList, role)}</Switch>);
};

export { LubanRouter };
