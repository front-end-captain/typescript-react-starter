import React, { FunctionComponent, CSSProperties } from "react";
import { RouteComponentProps } from "react-router-dom";

const NotFound: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const NotfoundStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.4rem",
    color: "#ccc",
  };
  return (
    <div style={NotfoundStyle}>
      Not found page&nbsp; <a onClick={() => history.push("/")}>回到首页</a>
    </div>
  );
};

export { NotFound };
