import { keyframes } from "styled-components";

export const baseFadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const baseFadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translateY(-50px);
  }
`;

export const squareJellyBoxAnimate = keyframes`
  17% {
    border-bottom-right-radius: 10%;
  }

  25% {
    transform: translateY(25%) rotate(22.5deg);
    transform: translateY(25%) rotate(22.5deg);
  }

  50% {
    border-bottom-right-radius: 100%;
    transform: translateY(50%) scale(1, 0.9) rotate(45deg);
    transform: translateY(50%) scale(1, 0.9) rotate(45deg);
  }

  75% {
    transform: translateY(25%) rotate(67.5deg);
    transform: translateY(25%) rotate(67.5deg);
  }

  100% {
    transform: translateY(0) rotate(90deg);
    transform: translateY(0) rotate(90deg);
  }
`;

export const squareJellyBoxShadow = keyframes`
  50% {
    transform: scale(1.25, 1);
  }
`;

export const ballClimbingDotJump = keyframes`
  0% {
    transform: scale(1, 0.7);
  }

  20% {
    transform: scale(0.7, 1.2);
  }

  40% {
    transform: scale(1, 1);
  }

  50% {
    bottom: 125%;
  }

  46% {
    transform: scale(1, 1);
  }

  80% {
    transform: scale(0.7, 1.2);
  }

  90% {
    transform: scale(0.7, 1.2);
  }

  100% {
    transform: scale(1, 0.7);
  }
`;

export const ballClimbingDotSteps = keyframes`
  0% {
    top: 0;
    right: 0;
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    top: 100%;
    right: 100%;
    opacity: 0;
  }
`;
