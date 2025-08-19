"use client";

import { useKey } from "@/registry/hooks/useKey";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Test() {
  const [count, setCount] = useState(false);
  async function handleClick() {
    setCount((s) => !s);
  }

  useKey({
    eventName: "keydown",
    key: "enter",
    handler: handleClick,
  });

  return (
    <div
      className={cn(
        "rounded-xl px-3 py-2.5",
        count ? "bg-purple-500 text-purple-100" : "bg-gray-500 text-gray-100",
      )}
    >
      hit Enter to change my color
    </div>
  );
}
