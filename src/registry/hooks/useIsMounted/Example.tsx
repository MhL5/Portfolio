"use client";

import { useIsMounted } from "@/registry/hooks/useIsMounted/useIsMounted";

export default function Example() {
  const isMounted = useIsMounted();

  if (!isMounted) return "mounting...";
  return <ClientOnlyRenderedComponent />;
}

function ClientOnlyRenderedComponent() {
  if (typeof window === "undefined")
    throw new Error("I will throw an error if i am rendered on server");

  return <div>I will throw an error if i render on server</div>;
}
