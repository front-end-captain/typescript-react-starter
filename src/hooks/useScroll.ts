import { useState, useEffect } from "react";

interface ScrollState {
  x: number;
  y: number;
}

const getScroll: () => ScrollState = function() {
  return {
    x: typeof window === "undefined" ? 0 : window.pageXOffset || window.scrollX,
    y: typeof window === "undefined" ? 0 : window.pageYOffset || document.documentElement.scrollTop,
  };
};

export const useScroll: () => ScrollState = function() {
  const [scrollState, setScroll] = useState(getScroll());

  useEffect(() => {
    // window.requestAnimationFrame 的返回值是一个非零整数，所以此处初始值为 0
    let requestId = 0;

    const onScroll: () => void = function() {
      if (requestId === 0) {
        requestId = window.requestAnimationFrame(() => {
          setScroll(getScroll());
          requestId = 0;
        });
      }
    };

    // NOTE 设置 body 或者 html 的样式属性 overflow 会使窗口 scroll 事件失效
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(requestId);
    };
  }, []);

  return scrollState;
};
