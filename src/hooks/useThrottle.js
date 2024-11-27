import { useRef } from "react";

export default function useThrottle(func, delay) {
  const timeoutRef = useRef(null);
  const lastExecutedRef = useRef(0);

  const throttledFunction = (...args) => {
    const now = Date.now();
    const remainingTime = delay - (now - lastExecutedRef.current);

    if (remainingTime <= 0 || !lastExecutedRef.current) {
      func(...args);
      lastExecutedRef.current = now;
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    } else if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        func(...args);
        lastExecutedRef.current = Date.now();
        timeoutRef.current = null;
      }, remainingTime);
    }
  };

  return throttledFunction;
}
