import React, { FunctionComponent, CSSProperties } from "react";
import { Icon } from "antd";
import ClassNames from "classnames";

import { useScroll } from "@/hooks/useScroll";

import { BackTopWrapper } from "./index.css";

interface BackTopProps {
  className?: string;
  style?: CSSProperties;
}

const BackTop: FunctionComponent<BackTopProps> = (props) => {
  const { y } = useScroll();

  return (
    <BackTopWrapper
      className={ClassNames({ "back-top-visible": y > window.innerHeight / 3 })}
      onClick={() => window.scrollTo(0, 0)}
      title="回到顶部"
      {...props}
    >
      <Icon type="arrow-up" />
    </BackTopWrapper>
  );
};

export { BackTop };
