import React, { FunctionComponent, ReactElement, Suspense, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { useChange } from "@/hooks/useChange";

import { Loading } from "@/components/Suspense";
import { NavMenu } from "@/components/NavMenu";
import { BackTop } from "@/components/BackTop";
import { BreadCrumb } from "@/components/Breadcrumb";
import { PageHeader } from "./pageHeader";
import { PageFooter } from "./pageFooter";

import { BackendLayoutWrapper, BackendGlobalStyle } from "./../index.css";

interface LayoutProps extends RouteComponentProps {
  router: () => ReactElement;
}

/**
 * 匹配到 /classroom/:classId 不渲染 <Header /> 和 <BreadCrumb />
 * 同时内容宽度占视口的 90% 且最小宽度为 980px
 *
 * 匹配到 /classroom 不渲染 <BreadCrumb />
 */
const LayoutComponent: FunctionComponent<LayoutProps> = (props) => {
  const {
    router,
    location: { pathname },
  } = props;

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
        <BreadCrumb />
        <div className="main-container">
          <Suspense fallback={<Loading />}>{router()}</Suspense>
        </div>
        <PageFooter />
      </div>
      <BackTop />
    </BackendLayoutWrapper>
  );
};

const Layout = withRouter(LayoutComponent);

export { Layout };
