"use client";

import useTimer from "@/registry/hooks/useTimer/useTimer";
import { useEffect, useState } from "react";

export function useDebounce(
  callback: () => void,
  delay: number,
  dependencies: unknown[],
) {
  const { reset, clear } = useTimer(callback, delay, "timeout");
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, [clear]);
}

export function useDebouncedValue<T>(inputValue: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useDebounce(
    () => {
      setDebouncedValue(inputValue);
    },
    delay,
    [inputValue],
  );

  return debouncedValue;
}
