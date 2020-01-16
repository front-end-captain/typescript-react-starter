import React, { FunctionComponent, ReactElement, Suspense, useState } from "react";
import { useLocation } from "react-router-dom";

import { useChange } from "@/hooks/useChange";

import { Loading } from "@/components/Suspense";
import { NavMenu } from "@/components/NavMenu";
import { BackTop } from "@/components/BackTop";
import { BreadCrumb } from "@/components/Breadcrumb";
import { PageHeader } from "./pageHeader";
import { PageFooter } from "./pageFooter";

import { BackendLayoutWrapper, BackendGlobalStyle } from "./../index.css";

import { BasicRouterItem, NestedRouteItem } from "@/router/lib/definitions";

interface LayoutProps {
  table: ReactElement<any>[];
  extraBreadcrumbRouteList: BasicRouterItem[];
  permissionRouteList: Array<NestedRouteItem>;
}

const Layout: FunctionComponent<LayoutProps> = ({ table, extraBreadcrumbRouteList, permissionRouteList }) => {
  const { pathname } = useLocation();

  useChange(pathname);

  const [navMenuCollapsed, setNavMenuCollapsed] = useState<boolean>(true);

  return (
    <BackendLayoutWrapper>
      <BackendGlobalStyle />
      <NavMenu
        pathname={pathname}
        navMenuCollapsedStatus={navMenuCollapsed}
        permissionRouteList={permissionRouteList}
      />
      <div className="backend-layout-container">
        <PageHeader
          navMenuCollapsedStatus={navMenuCollapsed}
          toggleNavMenuCollapse={() => setNavMenuCollapsed(!navMenuCollapsed)}
        />
        <BreadCrumb extraBreadcrumbRouteList={extraBreadcrumbRouteList} />
        <div className="main-container">
          <Suspense fallback={<Loading />}>{table}</Suspense>
        </div>
        <PageFooter />
      </div>
      <BackTop />
    </BackendLayoutWrapper>
  );
};

export { Layout };
