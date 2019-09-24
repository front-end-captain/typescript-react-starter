import { useRef, useEffect } from "react";

type inputValue = string | boolean | number;

const useChange = (value: inputValue, callback?: (value?: inputValue) => void) => {
  const valueRef = useRef<inputValue>(value);

  useEffect(() => {
    if (value !== valueRef.current) {
      if (typeof callback === "function") {
        callback(value);
      }
    }

    valueRef.current = value;
  }, [value]);
};

export { useChange };
