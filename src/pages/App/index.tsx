import { hot } from "react-hot-loader/root";

import React, { FunctionComponent } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { LubanRouter } from "luban-router";

import { Layout } from "./components/layout";

import "@/style/reset.css";
import "@/style/base.css";

import { routes } from "@/router/config";

const App: FunctionComponent = () => {
  return (
    <Router>
      <Layout router={() => <LubanRouter routes={routes} />} />
    </Router>
  );
};

export default hot(App);
