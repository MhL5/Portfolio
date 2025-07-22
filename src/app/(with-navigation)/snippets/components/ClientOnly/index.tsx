"use client";

import { useIsMounted } from "@/app/(with-navigation)/snippets/hooks/useIsMounted";
import { type ReactNode } from "react";

type ClientOnlyProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

/**
 * renders children only on the client
 */
export default function ClientOnly({ children, fallback }: ClientOnlyProps) {
  const isMounted = useIsMounted();

  if (!isMounted) return fallback;
  return children;
}
