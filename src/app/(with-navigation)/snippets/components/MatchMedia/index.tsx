"use client";

import {
  useMediaQuery,
  useMediaQueryBreakpoint,
} from "@/app/(with-navigation)/snippets/hooks/useMediaQuery";
import type { ReactNode } from "react";

type MatchMediaProps = {
  direction?: Parameters<typeof useMediaQuery>[1];
  breakpoint: Parameters<typeof useMediaQuery>[0];

  children: ReactNode;
  fallback?: ReactNode;
};

export function MatchMedia({ fallback, children, ...props }: MatchMediaProps) {
  const matches = useMediaQuery(props.breakpoint, props.direction);

  if (matches === undefined) {
    if (!fallback) return children;
    return fallback;
  }

  if (!matches) return null;
  return children;
}

type MatchMediaBreakpointProps = {
  direction?: Parameters<typeof useMediaQueryBreakpoint>[1];
  breakpoint: Parameters<typeof useMediaQueryBreakpoint>[0];

  children: ReactNode;
  fallback?: ReactNode;
};

export function MatchMediaBreakpoint({
  fallback,
  children,
  ...props
}: MatchMediaBreakpointProps) {
  const matches = useMediaQueryBreakpoint(props.breakpoint, props.direction);

  if (matches === undefined) {
    if (!fallback) return children;
    return fallback;
  }

  if (!matches) return null;
  return children;
}
