import { useEffect, useState, type RefObject } from "react";

type useIsVisibleOptions = {
  rootMargin?: IntersectionObserverInit["rootMargin"];
  once?: boolean;
};

export default function useIsVisible(
  ref: RefObject<HTMLElement | null>,
  { rootMargin = "0px", once = false }: useIsVisibleOptions = {},
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let isMounted = true;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!isMounted) return;

        setIsVisible(entry.isIntersecting);
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      isMounted = false;
    };
  }, [ref, rootMargin, once]);

  return isVisible;
}
