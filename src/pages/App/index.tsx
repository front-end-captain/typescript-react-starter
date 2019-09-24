import { hot } from "react-hot-loader/root";

import React, { FunctionComponent } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Layout } from "./components/layout";

import "@/style/reset.css";
import "@/style/base.css";

import { AppRouter } from "@/router/router";
import { flatRoutes } from "@/router/config";

const App: FunctionComponent = () => {
  return (
    <Router>
      <Layout router={() => <AppRouter routes={flatRoutes} />} />
    </Router>
  );
};

export default hot(App);
