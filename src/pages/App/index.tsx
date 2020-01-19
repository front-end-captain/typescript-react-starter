import { hot } from "react-hot-loader/root";

import React, { FunctionComponent } from "react";

import { LubanRouter } from "@/router/lib";

import { Layout } from "./components/layout";

import "@/style/reset.css";
import "@/style/base.css";

import { routeConfig } from "@/router/config";
import { getLocalUserRole } from "@/utils/index";

const App: FunctionComponent = () => {
  // return <LubanRouter config={routeConfig} />;

  return (
    <LubanRouter config={routeConfig} role={getLocalUserRole()}>
      {({ renderedTable, breadcrumbPathList, permissionRouteList }) => (
        <Layout
          table={renderedTable}
          breadcrumbPathList={breadcrumbPathList}
          permissionRouteList={permissionRouteList}
        />
      )}
    </LubanRouter>
  );
};

export default hot(App);
