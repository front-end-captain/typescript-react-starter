import React, { FunctionComponent, useMemo, Suspense } from "react";
import { Switch, BrowserRouter, HashRouter, HashRouterProps, useLocation } from "react-router-dom";
import pathToRegexp from "path-to-regexp";

import { flattenRoutes, filterUnPermissionRoute } from "./util";
import { createRouterTable } from "./createRouterTable";
import { DefaultNotFound } from "./defaultNotFound";

import { NestedRouteItem, LubanRouterProps, RouteComponent, BasicRouterItem, Role } from "./definitions";

function useBreadCrumb(routeList: Array<BasicRouterItem>): Array<BasicRouterItem> {
  const { pathname } = useLocation();

  const pathSnippets = pathname.split("/").filter((i) => i);

  // TODO current active match route add active property to route item
  const extraBreadcrumbList = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

    return routeList.find((route) => pathToRegexp(route.path, [], { strict: false }).test(url));
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return extraBreadcrumbList.filter((route) => typeof route !== "undefined");
}

function findNotFoundComponent(routes: Array<NestedRouteItem>, defaultNotFound: RouteComponent): RouteComponent {
  const notFoundRouteItem = routes.find((route) => route.path.includes("404"));

  if (notFoundRouteItem === undefined) {
    return defaultNotFound;
  }

  if (notFoundRouteItem.component === undefined) {
    return defaultNotFound;
  }

  return notFoundRouteItem.component;
}

interface RouterTableProps {
  flattenRouteList: Array<BasicRouterItem>;
  routeList: Array<NestedRouteItem>;
  notFoundComponent: RouteComponent;
  role?: Role;
  customRender?: LubanRouterProps["children"];
}
const RouterTable: FunctionComponent<RouterTableProps> = ({
  flattenRouteList,
  routeList,
  notFoundComponent,
  role,
  customRender,
}) => {
  const routerTable = createRouterTable(flattenRouteList, role, notFoundComponent);

  const extraBreadcrumbRouteList = useBreadCrumb(flattenRouteList);

  let appRouter = <Suspense fallback={<span>loading</span>}>{routerTable}</Suspense>;

  let permissionRouteList: Array<NestedRouteItem> = [];
  if (role) {
    permissionRouteList = filterUnPermissionRoute(routeList, role);
  }

  if (typeof customRender === "function") {
    appRouter = customRender(routerTable, extraBreadcrumbRouteList, permissionRouteList);
  }

  return appRouter;
};

const LubanRouter: FunctionComponent<LubanRouterProps> = ({ config, role, children }) => {
  const { routes, mode = "browser", basename = "/", hashType = "slash" } = config;

  const flattenRouteList = useMemo(() => flattenRoutes(routes), [routes]);

  const notFoundComponent: RouteComponent = findNotFoundComponent(routes, DefaultNotFound);

  const hashRouterProps: HashRouterProps = { hashType, basename };

  const RouteTableProps = {
    routeList: routes,
    customRender: children,
    flattenRouteList,
    role,
    notFoundComponent,
  };

  return mode === "browser" ? (
    <BrowserRouter basename={basename}>
      <Switch>
        <RouterTable {...RouteTableProps} />
      </Switch>
    </BrowserRouter>
  ) : (
    <HashRouter {...hashRouterProps}>
      <Switch>
        <RouterTable {...RouteTableProps} />
      </Switch>
    </HashRouter>
  );
};

export { LubanRouter };
