/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { useRef, useEffect } from "react";

type Handler = (event: Event) => void;

type BeforeUnloadEventHandler = (event: BeforeUnloadEvent) => string | void;

/**
 * DOM 元素事件监听
 *
 * @param {string} eventName 事件名
 * @param {Function} handler 监听器
 * @param {any} element DOM 元素
 */
const useEventListener: (eventName: string, handler: Handler, element: any) => void = function(
  eventName,
  handler = () => {},
  element = document,
) {
  // eslint-disable-next-line
  const saveHandler = useRef((_event: Event) => {});

  useEffect(() => {
    saveHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const supported = element && element.addEventListener;
    if (!supported) {
      return;
    }

    const listener = (event: Event) => saveHandler.current(event);

    element.addEventListener(eventName, listener);

    return () => {
      element.removeEventListener(eventName, listener);
    };
  }, [eventName, element]);
};

/**
 * 窗口卸载事件
 * Some browsers display the returned string in the dialog box, others display a fixed message.
 *
 * @example useWindowBeforeUnload(() => "you will lose your data")
 * @example useWindowBeforeUnload((event) => event.preventDefault());
 *
 * @param {BeforeUnloadEventHandler} handler
 */
const useWindowBeforeUnload: (handler: BeforeUnloadEventHandler) => void = function(
  handler: BeforeUnloadEventHandler = () => "",
) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const handleBeforeunload = (event: BeforeUnloadEvent) => {
      let returnValue = "";

      if (typeof handlerRef.current === "function") {
        returnValue = handlerRef.current(event) || "";
      }

      if (event.defaultPrevented) {
        event.returnValue = "";
      }

      // 虽然 returnValue 是个 string 但是还是得判断类型，不然不会弹框
      if (typeof returnValue === "string") {
        event.returnValue = returnValue;
      }

      return returnValue;
    };

    window.addEventListener("beforeunload", handleBeforeunload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeunload);
    };
  }, []);
};

export { useEventListener, useWindowBeforeUnload };
