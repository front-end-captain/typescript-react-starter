import { NestedRouteItem, BasicRouterItem, Role } from "./definitions";

function checkAuthority(role: Role, authority?: Array<string | number>): boolean {
  if (typeof authority === "undefined") {
    return true;
  }

  if (Array.isArray(role)) {
    const roleSet = new Set(role);
    return authority.filter((item) => roleSet.has(item)).length > 0;
  }

  return authority.includes(role);
}

function filterUnPermissionRoute(routes: Array<NestedRouteItem>, role: Role): Array<NestedRouteItem> {
  return routes.filter((route) => {
    if (route.path.includes("404")) {
      return false;
    }

    if (Array.isArray(route.children) && route.children.length > 0) {
      // eslint-disable-next-line no-param-reassign
      route.children = filterUnPermissionRoute(route.children, role);
    }

    return checkAuthority(role, route.authority);
  });
}

/**
 * 将嵌套结构的路由表转换为一维的路由列表
 *
 * @see router/config.ts
 */
function flattenRoutes(routes: Array<NestedRouteItem>): Array<BasicRouterItem> {
  let routeList: Array<BasicRouterItem> = [];
  routes.forEach((route) => {
    routeList.push(route);
    if (Array.isArray(route.children) && route.children.length > 0) {
      routeList = routeList.concat(flattenRoutes(route.children));
    }
  });

  return routeList;
}

export { flattenRoutes, checkAuthority, filterUnPermissionRoute };
