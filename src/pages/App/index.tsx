import { hot } from "react-hot-loader/root";

import React, { FunctionComponent } from "react";

import { LubanRouter } from "@/router/lib";

import { Layout } from "./components/layout";

import "@/style/reset.css";
import "@/style/base.css";

import { routeConfig } from "@/router/config";

const getUserLocalRole = () => [1, 2, 3];

const App: FunctionComponent = () => {
  // return <LubanRouter config={routeConfig} />;

  return (
    <LubanRouter
      config={routeConfig}
      role={getUserLocalRole()}
    >
      {(routerTable, routeList) => <Layout table={routerTable} routeList={routeList} />}
    </LubanRouter>
  );
};

export default hot(App);
