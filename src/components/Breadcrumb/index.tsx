import { Link, useLocation } from "react-router-dom";
import React, { FunctionComponent } from "react";

import { Breadcrumb } from "antd";

import { disabledColor, linkColor } from "@/style/theme.css";

import { BasicRouterItem } from "@/router/lib/definitions";

interface BreadCrumbComponentProps {
  extraBreadcrumbRouteList: BasicRouterItem[];
}

const BreadCrumb: FunctionComponent<BreadCrumbComponentProps> = ({ extraBreadcrumbRouteList }) => {
  const style = {
    lineHeight: "48px",
    paddingLeft: "24px",
  };

  return (
    <Breadcrumb style={style}>
      {extraBreadcrumbRouteList.map((route: BasicRouterItem) => {
        return (
          <Breadcrumb.Item key={route.path}>
            <Link to={route.path}>
              {route ? route.name : ""}
            </Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export { BreadCrumb };
