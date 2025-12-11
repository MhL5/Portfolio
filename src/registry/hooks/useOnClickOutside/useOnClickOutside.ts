"use client";

import type { RefObject } from "react";
import useEventListener from "@/registry/hooks/useEventListener/useEventListener";
import { isBrowser } from "@/registry/utils/checks/checks";

export default function useOnClickOutside(
  ref: RefObject<HTMLElement | null>,
  cb: (e: MouseEvent) => void,
) {
  const element = isBrowser() ? document : undefined;

  useEventListener(
    "click",
    (e) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) cb(e);
    },
    element,
  );
}
