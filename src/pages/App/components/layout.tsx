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

import { NestedRouteItem, MatchedRouterItem } from "@/router/lib/definitions";

interface LayoutProps {
  table: ReactElement<any>;
  matchedRouteList: MatchedRouterItem[];
  permissionRouteList: Array<NestedRouteItem>;
}

const Layout: FunctionComponent<LayoutProps> = ({ table, matchedRouteList, permissionRouteList }) => {
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
        <BreadCrumb matchedRouteList={matchedRouteList} />
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
