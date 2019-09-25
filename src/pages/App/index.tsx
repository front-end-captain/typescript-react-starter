import { hot } from "react-hot-loader/root";

import React, { FunctionComponent } from "react";

import "@/style/reset.css";
import "@/style/base.css";

import "./index.css";

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={require("./../../assets/logo.svg")} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/page/App/index.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
};

export default hot(App);
