import React, { FunctionComponent } from "react";
import { Icon } from "antd";

import { PageHeaderWrapper } from "./../index.css";

interface PageHeaderProps {
  toggleNavMenuCollapse: () => void;
  // 左侧菜单导航收起/展开状态
  navMenuCollapsedStatus: boolean;
}

const PageHeader: FunctionComponent<PageHeaderProps> = ({ navMenuCollapsedStatus, toggleNavMenuCollapse }) => {
  return (
    <PageHeaderWrapper className="page-header">
      <div className="nav-menu-trigger-wrapper">
        <Icon type={navMenuCollapsedStatus ? "menu-fold" : "menu-unfold"} onClick={toggleNavMenuCollapse} />
      </div>
    </PageHeaderWrapper>
  );
};

export { PageHeader };
