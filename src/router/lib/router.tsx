import React, { FunctionComponent, useMemo, Suspense } from "react";
import { Switch, BrowserRouter, HashRouter, HashRouterProps, useLocation } from "react-router-dom";
import pathToRegexp from "path-to-regexp";

import { flattenRoutes, filterUnPermissionRoute } from "./util";
import { createRouterTable } from "./createRouterTable";
import { DefaultNotFound } from "./defaultNotFound";

import {
  NestedRouteItem,
  LubanRouterProps,
  RouteComponent,
  BasicRouterItem,
  Role,
  BreadcrumbPath,
} from "./definitions";

function useBreadCrumb(routeList: Array<BasicRouterItem>): Array<BreadcrumbPath> {
  const { pathname } = useLocation();

  let pathSnippets = pathname.split("/");

  if (pathname !== "/") {
    pathSnippets = pathname.split("/").filter((i) => i);
  }

  const breadcrumbPathList: Array<BreadcrumbPath> = [];

  pathSnippets.forEach((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

    const targetRoute = routeList.find((route) => pathToRegexp(route.path, [], { strict: false }).test(url));

    if (targetRoute) {
      breadcrumbPathList.push({ name: targetRoute.name, path: targetRoute.path, active: pathname === url });
    }
  });

  return breadcrumbPathList;
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

  const breadcrumbPathList = useBreadCrumb(flattenRouteList);

  let appRouter = (
    <Suspense fallback={<span>loading</span>}>
      <Switch>{routerTable}</Switch>
    </Suspense>
  );

  let permissionRouteList: Array<NestedRouteItem> = [];
  if (role) {
    permissionRouteList = filterUnPermissionRoute(routeList, role);
  }

  if (typeof customRender === "function") {
    appRouter = customRender({
      renderedTable: <Switch>{routerTable}</Switch>,
      breadcrumbPathList,
      permissionRouteList,
    });
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
      <RouterTable {...RouteTableProps} />
    </BrowserRouter>
  ) : (
    <HashRouter {...hashRouterProps}>
      <RouterTable {...RouteTableProps} />
    </HashRouter>
  );
};

export { LubanRouter };
