import { Link, useLocation } from "react-router-dom";
import React, { FunctionComponent } from "react";

import { Breadcrumb } from "antd";
import pathToRegexp from "path-to-regexp";

import { disabledColor, linkColor } from "@/style/theme.css";

import { BasicRouterItem } from "@/router/lib/definitions";

interface BreadCrumbComponentProps {
  routeList: BasicRouterItem[];
}

const BreadCrumb: FunctionComponent<BreadCrumbComponentProps> = ({ routeList }) => {
  const { pathname } = useLocation();

  const pathSnippets = pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

    const matchUrl = routeList.find((route) => {
      const reg = pathToRegexp(route.path, [], { strict: true });
      return reg.test(url);
    });

    if (matchUrl === undefined) {
      return null;
    }

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url} style={{ color: pathname === url ? linkColor : disabledColor }}>
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

export { BreadCrumb };
