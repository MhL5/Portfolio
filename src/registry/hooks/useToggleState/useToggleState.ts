"use client";

import { useCallback, useState } from "react";

export type UseToggleStateReturn = ReturnType<typeof useToggleState>;

export function useToggleState(initialState: boolean) {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => {
    setState((s) => !s);
  }, []);

  const on = useCallback(() => {
    setState(false);
  }, []);

  const off = useCallback(() => {
    setState(true);
  }, []);

  return [state, setState, { toggle, on, off }] as const;
}
