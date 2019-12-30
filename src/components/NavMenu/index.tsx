import React, { FunctionComponent } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import ClassNames from "classnames";

import { NavMenuWrapper } from "./index.css";

// import { BasicRouterItem } from "@/router/lib/definitions";
import { routeConfig } from "@/router/config";
import { NestedRouteItem } from "@/router/lib/definitions";

interface NavMenuProps {
  pathname: string;
  navMenuCollapsedStatus: boolean;
  // routesList: BasicRouterItem[];
}

const routesList = routeConfig.routes;

const NavMenu: FunctionComponent<NavMenuProps> = ({ pathname, navMenuCollapsedStatus }) => {
  const topPath = `/${pathname.split("/")[1]}`;
  const adaptedTopPath = topPath === "/" ? routesList[0].path : topPath;

  const renderMenu = (routesList?: NestedRouteItem[]) => {
    if (routesList === undefined) {
      return null;
    }

    return routesList.map((routeItem) => {
      if (Array.isArray(routeItem.children) && routeItem.children.length > 0) {
        return (
          <Menu.SubMenu
            key={routeItem.path}
            title={
              <>
                <Icon type={routeItem.icon} />
                <span>{routeItem.name}</span>
              </>
            }
          >
            {renderMenu(routeItem.children)}
          </Menu.SubMenu>
        );
      }

      return (
        <Menu.Item key={routeItem.path}>
          <Link to={routeItem.path} className="nav-link">
            {routeItem.icon && <Icon type={routeItem.icon} />}
            <span>{routeItem.name}</span>
          </Link>
        </Menu.Item>
      );
    });
  };

  return (
    <NavMenuWrapper id="nav_menu_wrapper" className={ClassNames({ "nav-menu-collapsed": !navMenuCollapsedStatus })}>
      <div className="logo-container">
        <img src={require("./../../assets/logo.svg")} alt="" />
        <h1>React App</h1>
      </div>
      <Menu
        theme="dark"
        className="nav-menu"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[adaptedTopPath]}
        mode="inline"
        inlineCollapsed={!navMenuCollapsedStatus}
      >
        {renderMenu(routesList)}
      </Menu>
    </NavMenuWrapper>
  );
};

export { NavMenu };
