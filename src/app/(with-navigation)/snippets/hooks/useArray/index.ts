import { useCallback, useState } from "react";

export function useArray<T>(defaultValue: T[]) {
  const [array, setArray] = useState(defaultValue);

  const push = useCallback((element: T) => {
    setArray((a) => [...a, element]);
  }, []);

  const filter = useCallback((callback: (element: T) => boolean) => {
    setArray((a) => a.filter(callback));
  }, []);

  const update = useCallback((index: number, newElement: T) => {
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);
  }, []);

  const remove = useCallback((index: number) => {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  }, []);

  const clear = useCallback(() => {
    setArray([]);
  }, []);

  return { array, set: setArray, push, filter, update, remove, clear };
}
