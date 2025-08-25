"use client";

import { useCallback, useEffect, useRef } from "react";

export default function useTimer(
  callback: () => void,
  delay: number,
  type: "timeout" | "interval",
) {
  const callbackRef = useRef(callback);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const set = useCallback(() => {
    timerRef.current =
      type === "timeout"
        ? setTimeout(() => callbackRef.current(), delay)
        : setInterval(() => callbackRef.current(), delay);
  }, [delay, type]);

  const clear = useCallback(() => {
    if (!timerRef.current) return;

    if (type === "timeout") clearTimeout(timerRef.current);
    else clearInterval(timerRef.current);
  }, [type]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  return { reset, clear };
}
