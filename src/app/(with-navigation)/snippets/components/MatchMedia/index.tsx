"use client";

import {
  useMediaQuery,
  useMediaQueryBreakpoint,
} from "@/app/(with-navigation)/snippets/hooks/useMediaQuery";
import type { ReactNode } from "react";

type MatchMediaProps = {
  query: Parameters<typeof useMediaQuery>[0];
  children: ReactNode;
  fallback?: ReactNode;
};

export function MatchMedia({ fallback, children, query }: MatchMediaProps) {
  const matches = useMediaQuery(query);

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
