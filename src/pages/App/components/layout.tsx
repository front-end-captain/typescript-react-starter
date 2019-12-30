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

import { BasicRouterItem } from "@/router/lib/definitions";

interface LayoutProps {
  table: ReactElement;
  routeList: BasicRouterItem[];
}

const Layout: FunctionComponent<LayoutProps> = ({ table, routeList }) => {
  const { pathname } = useLocation();

  useChange(pathname);

  const [navMenuCollapsed, setNavMenuCollapsed] = useState<boolean>(true);

  return (
    <BackendLayoutWrapper>
      <BackendGlobalStyle />
      <NavMenu pathname={pathname} navMenuCollapsedStatus={navMenuCollapsed} />
      <div className="backend-layout-container">
        <PageHeader
          navMenuCollapsedStatus={navMenuCollapsed}
          toggleNavMenuCollapse={() => setNavMenuCollapsed(!navMenuCollapsed)}
        />
        <BreadCrumb routeList={routeList} />
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
