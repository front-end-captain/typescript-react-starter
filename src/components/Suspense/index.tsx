import React, { CSSProperties, FunctionComponent, isValidElement, cloneElement, ReactElement } from "react";
import { Icon } from "antd";

import { primaryColor } from "@/style/theme.css";

import { LoadingContainer, PageLoadingWrapper, FrontendLoadingWrapper } from "./index.css";

export interface SuspenseProps {
  loading: boolean | undefined;
  style?: CSSProperties;
  className?: string;
  indicator?: ReactElement;
}

export interface LoadingComProps {
  className?: string;
  style?: CSSProperties;
  tip?: string;
}

export const Loading: FunctionComponent<LoadingComProps> = ({ className, style }) => {
  return (
    <LoadingContainer className={className}>
      <Icon
        type="loading"
        className="suspense-loading-icon"
        style={{ fontSize: "30px", color: primaryColor, ...style }}
      />
    </LoadingContainer>
  );
};

export const PageLoading: FunctionComponent<LoadingComProps> = ({ className, style }) => {
  return (
    <PageLoadingWrapper className={className} style={style}>
      <div className="page-loading-container">
        <div className="la-square-jelly-box la-2x">
          <div />
          <div />
        </div>
      </div>
    </PageLoadingWrapper>
  );
};

export const FrontendLoading: FunctionComponent<LoadingComProps> = ({ className, style, tip }) => {
  return (
    <FrontendLoadingWrapper className={className} style={style}>
      <div className="frontend-loading-container">
        <div className="la-ball-climbing-dot la-2x">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
      <p className="loading-tip">{tip}</p>
    </FrontendLoadingWrapper>
  );
};

const getIndicator = (element: ReactElement | undefined, className?: string, style?: CSSProperties) => {
  if (isValidElement(element)) {
    return cloneElement<any>(element, { className, style });
  }

  return <Loading className={className} style={style} />;
};

const Suspense: FunctionComponent<SuspenseProps> = ({ indicator, loading, className, style, children }) => {
  if (typeof loading === "object" || (typeof loading === "boolean" && loading)) {
    return getIndicator(indicator, className, style);
  }

  if (typeof children === "function") {
    return children();
  }

  return children;
};

export { Suspense };
