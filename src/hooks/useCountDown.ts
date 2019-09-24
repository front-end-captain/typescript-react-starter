import { useEffect, useState, useRef } from "react";

const INTERVAL = 1000;
const STEP = 1000;

/**
 * 传入一个时间戳，返回一个每隔 INTERVAL 时间，递减 STEP 的时间戳，并在时间戳小于等于 0 时，调用回调函数
 * 返回的 countDown 预期不会小于零的
 *
 * @param {number} remainingTime 毫秒数
 * @param {() => void | undefined} callback
 *
 * @returns {{ countdown: number }}
 */
const useCountDown = (remainingTime: number, callback?: () => void): { countdown: number } => {
  const [countdown, setCountDown] = useState(remainingTime);
  const timer = useRef<number>(0);

  const ignore = useRef<boolean>(false);

  useEffect(() => {
    setCountDown(remainingTime);
  }, [remainingTime]);

  useEffect(() => {
    if (countdown !== 0) {
      timer.current = setInterval(() => {
        setCountDown(countdown === 0 ? 0 : Math.abs(countdown) - STEP);
      }, INTERVAL);

      ignore.current = true;
    }

    return () => clearInterval(timer.current);
  }, [countdown]);

  if (countdown === 0 && ignore.current) {
    if (typeof callback === "function") {
      callback();
    }

    ignore.current = false;
  }

  return { countdown };
};

export { useCountDown };
