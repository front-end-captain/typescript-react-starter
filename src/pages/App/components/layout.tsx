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

import { NestedRouteItem, BreadcrumbPath } from "@/router/lib/definitions";

interface LayoutProps {
  table: ReactElement<any>;
  breadcrumbPathList: BreadcrumbPath[];
  permissionRouteList: Array<NestedRouteItem>;
}

const Layout: FunctionComponent<LayoutProps> = ({ table, breadcrumbPathList, permissionRouteList }) => {
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
        <BreadCrumb breadcrumbPathList={breadcrumbPathList} />
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
