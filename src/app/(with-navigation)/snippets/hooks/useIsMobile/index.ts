"use client";

import { useMediaQuery } from "@/app/(with-navigation)/snippets/hooks/useMediaQuery";

export function useIsMobile() {
  return useMediaQuery({ breakpoint: "md", direction: "max" });
}
