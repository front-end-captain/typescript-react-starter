import styled from "styled-components";

import {
  squareJellyBoxAnimate,
  squareJellyBoxShadow,
  ballClimbingDotJump,
  ballClimbingDotSteps,
} from "@/style/animation.css";
import { secondaryPrimaryColor } from "@/style/theme.css";

const LoadingContainer = styled.div`
  width: 100%;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;

  .suspense-loading-icon {
    font-size: 40px;
    color: #67a6fc;
  }
`;

const PageLoadingWrapper = styled.div`
  display: flex;
  min-height: 400px;
  justify-content: center;
  align-items: center;

  .page-loading-container {
    .la-square-jelly-box {
      position: relative;
      box-sizing: border-box;
      display: block;
      font-size: 0;
      color: #fff;
      width: 64px;
      height: 64px;

      > div {
        position: absolute;
        left: 0;
        width: 100%;
        display: inline-block;
        float: none;
        background-color: currentColor;
        border: 0 solid currentColor;
        box-sizing: border-box;
        animation-play-state: running;
      }

      div:nth-child(1) {
        top: -25%;
        z-index: 1;
        height: 100%;
        border-radius: 10%;
        animation: ${squareJellyBoxAnimate} 0.6s linear -0.1s infinite normal none;
      }

      div:nth-child(2) {
        bottom: -9%;
        height: 10%;
        background: #000;
        border-radius: 50%;
        opacity: 0.2;
        animation: ${squareJellyBoxShadow} 0.6s -0.1s linear infinite;
      }
    }
  }
`;

const FrontendLoadingWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .loading-tip {
    margin-top: 8px;
    font-size: 12px;
    color: #a7a7a7;
  }

  .frontend-loading-container {
    .la-ball-climbing-dot {
      width: 84px;
      height: 64px;
      display: block;
      font-size: 0;
      color: ${secondaryPrimaryColor};
      position: relative;
      box-sizing: border-box;

      > div {
        display: inline-block;
        float: none;
        background-color: currentColor;
        border: 0 solid currentColor;
        box-sizing: border-box;
      }

      div:nth-child(1) {
        width: 28px;
        height: 28px;
        position: absolute;
        bottom: 32%;
        left: 8%;
        border-radius: 100%;
        transform-origin: center bottom;
        animation: ${ballClimbingDotJump} 0.6s ease-in-out infinite;
      }

      div:not(:nth-child(1)) {
        position: absolute;
        top: 0;
        right: 0;
        width: 18px;
        height: 2px;
        border-radius: 0;
        animation: ${ballClimbingDotSteps} 1.8s linear infinite;
      }

      > div:not(:nth-child(1)):nth-child(2) {
        animation-delay: 0ms;
      }

      > div:not(:nth-child(1)):nth-child(3) {
        animation-delay: -600ms;
      }

      > div:not(:nth-child(1)):nth-child(4) {
        animation-delay: -1200ms;
      }
    }
  }
`;

export { LoadingContainer, PageLoadingWrapper, FrontendLoadingWrapper };
