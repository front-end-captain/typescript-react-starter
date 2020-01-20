import { hot } from "react-hot-loader/root";

import React, { FunctionComponent } from "react";

import { LubanRouter as Router } from "luban-router";

// import { LubanRouter } from "@/router/lib";

import { Layout } from "./components/layout";

import "@/style/reset.css";
import "@/style/base.css";

import { routeConfig } from "@/router/config";
import { getLocalUserRole } from "@/utils/index";

const App: FunctionComponent = () => {
  // return <LubanRouter config={routeConfig} />;

  return (
    <Router config={routeConfig} role={getLocalUserRole()}>
      {({ renderedTable, matchedRouteList, permissionRouteList }) => (
        <Layout
          table={renderedTable}
          matchedRouteList={matchedRouteList}
          permissionRouteList={permissionRouteList}
        />
      )}
    </Router>
  );
};

export default hot(App);
