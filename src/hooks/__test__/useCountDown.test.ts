import { renderHook } from "@testing-library/react-hooks";

import { useCountDown } from "./../useCountDown";
import { parseRemainingMillisecond } from "./../../utils/index";

describe("test hook countdown", () => {
  it("should init right countdown", () => {
    const { result } = renderHook(() => useCountDown(5000));
    const showTime = parseRemainingMillisecond(5000);

    expect(result.current.countdown).toBe(5000);
    expect(parseRemainingMillisecond(result.current.countdown)).toBe(showTime);
  });

  it("should invoke callback function when countdown time equal 0", () => {
    const onCountDownLessThenZero = jest.fn();
    const { result } = renderHook(() => useCountDown(5000, onCountDownLessThenZero));

    setTimeout(() => {
      expect(result.current.countdown).toBe(0);
      expect(onCountDownLessThenZero).toBeCalled();
    }, 5000);
  });
});
