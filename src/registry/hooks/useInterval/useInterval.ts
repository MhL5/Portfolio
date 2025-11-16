"use client";

import { useCallback, useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number) {
  const callbackRef = useRef(callback);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const set = useCallback(() => {
    timerRef.current = setInterval(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    if (!timerRef.current) return;

    clearInterval(timerRef.current);
  }, []);

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
  }, [set, clear]);

  return { reset, clear };
}
