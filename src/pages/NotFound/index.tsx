import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router-dom";

const NotFound: FunctionComponent<RouteComponentProps> = ({ history }) => {
  return <div>not found page <a onClick={() => history.push("/")}>回到首页</a></div>;
};

export { NotFound };
