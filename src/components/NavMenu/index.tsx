/* eslint-disable operator-linebreak */
import React, { FunctionComponent } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import ClassNames from "classnames";

import { routes } from "@/router/config";

import { NavMenuWrapper } from "./index.css";

interface NavMenuProps {
  pathname: string;
  navMenuCollapsedStatus: boolean;
}

const NavMenu: FunctionComponent<NavMenuProps> = ({ pathname, navMenuCollapsedStatus }) => {
  const permissionNav = routes.filter((route) => {
    if (!route.name) {
      return false;
    }

    return route;
  });

  const topPath = `/${pathname.split("/")[1]}`;
  const adaptedTopPath = topPath === "/" ? permissionNav[0].path : topPath;


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
        {permissionNav.map((routeItem) => {
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
                {Array.isArray(routeItem.children) &&
                  routeItem.children.map((child) => {
                    return (
                      <Menu.Item key={child.path}>
                        <Link to={child.path} className="nav-link">
                          <Icon type={child.icon} />
                          <span>{child.name}</span>
                        </Link>
                      </Menu.Item>
                    );
                  })}
              </Menu.SubMenu>
            );
          }

          return (
            <Menu.Item key={routeItem.path}>
              <Link to={routeItem.path} className="nav-link">
                <Icon type={routeItem.icon} />
                <span>{routeItem.name}</span>
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </NavMenuWrapper>
  );
};

export { NavMenu };
