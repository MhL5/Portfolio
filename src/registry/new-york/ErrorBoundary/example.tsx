"use client";

import useTimer from "@/registry/hooks/useTimer/useTimer";
import { ErrorBoundary } from "@/registry/new-york/ErrorBoundary/ErrorBoundary";
import { useState } from "react";

export default function Example() {
  return (
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  );
}

function Component() {
  const [error, setError] = useState(false);
  useTimer(
    () => {
      setError(true);
    },
    2000,
    "timeout",
  );

  if (error) throw Error("Error thrown");
  return <div>I will throw an error in 2 seconds</div>;
}
