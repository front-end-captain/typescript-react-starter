import { Link } from "react-router-dom";
import React, { FunctionComponent } from "react";

import { Breadcrumb } from "antd";

import { disabledColor, linkColor } from "@/style/theme.css";

import { BreadcrumbPath } from "@/router/lib/definitions";

interface BreadCrumbComponentProps {
  breadcrumbPathList: BreadcrumbPath[];
}

const BreadCrumb: FunctionComponent<BreadCrumbComponentProps> = ({ breadcrumbPathList }) => {
  const style = {
    lineHeight: "48px",
    paddingLeft: "24px",
  };

  return (
    <Breadcrumb style={style}>
      {breadcrumbPathList.map((route: BreadcrumbPath) => {
        return (
          <Breadcrumb.Item key={route.path}>
            <Link to={route.path} style={{ color: route.active ? linkColor : disabledColor }}>
              {route ? route.name : ""}
            </Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export { BreadCrumb };
