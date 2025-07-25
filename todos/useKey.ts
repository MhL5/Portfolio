"use client";

import useEventListener from "@/app/(with-navigation)/snippets/hooks/useEventListener";

type useKeyProps = {
  key: KeyboardEvent["key"];
  eventName: keyof DocumentEventMap;
  handler: () => void;
};

export function useKey({ eventName, key, handler }: useKeyProps) {
  useEventListener(
    eventName,
    (e) => {
      if (
        e instanceof KeyboardEvent &&
        e.key.toLowerCase() === key.toLowerCase()
      )
        handler();
    },
    document,
  );
}
