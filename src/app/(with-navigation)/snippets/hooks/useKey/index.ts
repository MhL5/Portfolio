"use client";

import useEventListener from "@/app/(with-navigation)/snippets/hooks/useEventListener";

type useKeyProps = {
  key: KeyboardEvent["key"];
  eventName: "keydown" | "keyup" | "keypress";
  handler: () => void;
};

export function useKey({ eventName, key, handler }: useKeyProps) {
  useEventListener(
    eventName,
    (e) => {
      if (!(e instanceof KeyboardEvent)) return;
      if (e.key.toLowerCase() === key.toLowerCase()) handler();
    },
    document,
  );
}
