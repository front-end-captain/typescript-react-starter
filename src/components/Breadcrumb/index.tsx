import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import React, { FunctionComponent } from "react";

import { Breadcrumb } from "antd";
import pathToRegexp from "path-to-regexp";

import { flatRoutes } from "@/router/config";

import { disabledColor, linkColor } from "@/style/theme.css";

const BreadCrumbComponent: FunctionComponent<RouteComponentProps> = ({ location }) => {
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

    const matchUrl = flatRoutes.find((route) => {
      const reg = pathToRegexp(route.path, [], { strict: true });
      return reg.test(url);
    });

    if (matchUrl === undefined) {
      return null;
    }

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url} style={{ color: location.pathname === url ? linkColor : disabledColor }}>
          {matchUrl ? matchUrl.name : ""}
        </Link>
      </Breadcrumb.Item>
    );
  });

  const style = {
    lineHeight: "48px",
    paddingLeft: "24px",
  };

  return <Breadcrumb style={style}>{extraBreadcrumbItems}</Breadcrumb>;
};

const BreadCrumb = withRouter(BreadCrumbComponent);

export { BreadCrumb };
