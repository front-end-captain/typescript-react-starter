import { hot } from "react-hot-loader/root";

import React, { FunctionComponent } from "react";

import { LubanRouter } from "@/router/lib";

import { Layout } from "./components/layout";

import "@/style/reset.css";
import "@/style/base.css";

import { routeConfig } from "@/router/config";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const getUserLocalRole = () => [1, 2, 3];

// const NotFound: FunctionComponent = () => {
//   return <div>hello, not found</div>;
// };

const App: FunctionComponent = () => {
  // return <LubanRouter config={routeConfig} />;

  return (
    <LubanRouter
      config={routeConfig}
      role={getUserLocalRole()}
      // notFound={<NotFound />}
    >
      {(routerTable, routeList) => <Layout table={routerTable} routeList={routeList} />}
    </LubanRouter>
  );
};

export default hot(App);
