import React, { memo } from "react";
import { parseRemainingMillisecond } from "@/utils/index";

import { useCountDown } from "@/hooks/useCountdown";

export interface CountDownProps {
  remainingTime: number;
  onLessThenZero: () => void;
}

/**
 * 接收一个时间戳(毫秒), 这个时间戳可能立即被传入，也有可能被稍后传入，比如从服务端获取，这个时间戳可能会在每隔 20s 更新一次
 * 时间走到 0，调用外部回调函数，这个回调函可能会设置一个新的时间戳然后传入
 * 传入的剩余时间变更了，即 props 变了
 * 上一次传入的剩余时间和下一次传入的剩余时间相等 或者传入的剩余时间为 0，即跳过某些渲染
 */
const CountDown = memo<CountDownProps>((props) => {
  const { remainingTime = 0, onLessThenZero } = props;

  const { countdown } = useCountDown(remainingTime, onLessThenZero);

  if (countdown === 0) {
    return <strong>{parseRemainingMillisecond(0)}</strong>;
  }

  return <strong>{parseRemainingMillisecond(countdown)}</strong>;
});

export { CountDown };
