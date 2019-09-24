import styled, { createGlobalStyle } from "styled-components";
import { navMenuMaxWidth, PAGE_MIN_WIDTH } from "@/style/theme.css";

const LearnGlobalStyle = createGlobalStyle`
  @media screen and (min-height: 730px) {
    body,
    html {
      height: 100%;
    }
  }

  @media screen and (max-height: 730px) and (min-height: 560px) {
    html,
    body {
      height: auto;
    }
  }

  @media screen and (max-height: 560px) {
    body,
    html {
      height: auto;
    }
  }
`;

const BackendGlobalStyle = createGlobalStyle`
  @media screen and (min-height: 730px) {
    body,
    html {
      height: 100%;
    }
  }

  @media screen and (max-height: 730px) and (min-height: 560px) {
    body,
    html {
      height: 100%;
    }
  }

  @media screen and (max-height: 560px) {
    body,
    html {
      height: auto;
    }
  }
`;

const BasicContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  min-height: 100%;
  padding-bottom: 60px;
  background-color: rgb(234, 233, 233);

  .main-container {
    width: 1200px;
    max-width: 1200px;
    min-width: 1200px;
    margin: 0 auto;
    padding-bottom: 30px;
  }
`;

const LearningWrapper = styled.div`
  width: 90%;
  min-width: 980px;
  margin: 0 auto;
  height: 100%;
`;

const BackendLayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  min-height: 100vh;

  .backend-layout-container {
    display: flex;
    flex: auto;
    flex-direction: column;
    position: relative;
    background: #fff;
    width: calc(100% - ${navMenuMaxWidth}px);
    min-width: calc(${PAGE_MIN_WIDTH}px - ${navMenuMaxWidth}px);
    overflow-x: scroll;

    .main-container {
      padding: 0 24px;
      flex: auto;
      min-height: 0;
    }
  }
`;

const PageHeaderWrapper = styled.div`
  position: relative;
  height: 64px;
  min-height: 64px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;

  .user-avatar {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 30px;
      height: 30px;
      border-radius: 100%;
      margin-right: 10px;
    }

    span {
      color: #555;
      font-size: 14px;
    }
  }
`;

const PageFooterWrapper = styled.div`
  display: inline-block;
  background: #f1f1f1;
  width: 100%;
  padding: 16px 0;
  margin-top: 32px;

  p {
    text-align: center;
    font-size: 12px;
    color: #ccc;

    span:nth-child(2) {
      margin: 0 16px;
    }
  }
`;

export {
  BasicContainer,
  LearningWrapper,
  BackendLayoutWrapper,
  PageHeaderWrapper,
  PageFooterWrapper,
  LearnGlobalStyle,
  BackendGlobalStyle,
};
