import { useEffect, useMemo, useState } from "react";

type Direction = "max" | "min";

function useMediaQueryCore(breakpoint: number, direction: Direction) {
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(
      `(${direction}-width: ${breakpoint}rem)`,
    );

    const handleChange = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", handleChange);
    setMatches(mediaQueryList.matches);

    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [direction, breakpoint]);

  return matches;
}

/**
 * Hook for custom breakpoint values
 * @param breakpoint - Numeric value in rem
 * @param direction - Whether to check for min-width or max-width (default: "min")
 * @returns boolean indicating if the media query matches
 * @example
 * ```tsx
 * const isLg = useMediaQuery(64, "min");
 * const isCustom = useMediaQuery(50, "min");
 * const isBelowCustom = useMediaQuery(75, "max");
 * ```
 */
export function useMediaQuery(
  breakpoint: number,
  direction: Direction = "min",
) {
  return useMediaQueryCore(breakpoint, direction);
}

/**
 * based on tailwind v4 breakpoints and some custom xs breakpoints
 * @see https://tailwindcss.com/docs/theme#default-theme-variable-reference
 */
const breakpoints = {
  "3xs": 16, // 352px
  "2xs": 24.25, // 388px
  xs: 28, // 448px
  sm: 40, // 640px
  md: 48, // 768px
  lg: 64, // 1024px
  xl: 80, // 1280px
  "2xl": 96, // 1536px
} as const;

/**
 * Hook for tailwind breakpoints
 * @param breakpoint - Tailwind breakpoint key
 * @param direction - Whether to check for min-width or max-width (default: "min")
 * @returns boolean indicating if the media query matches
 * @example
 * ```tsx
 * const isMobile = useMediaQueryBreakpoint("sm");
 * const isTablet = useMediaQueryBreakpoint("md","max");
 * const isDesktop = useMediaQueryBreakpoint("lg","min");
 * ```
 */
export function useMediaQueryBreakpoint(
  breakpoint: keyof typeof breakpoints,
  direction: Direction = "min",
) {
  const valueInRem = useMemo(() => breakpoints[breakpoint], [breakpoint]);
  return useMediaQueryCore(valueInRem, direction);
}

/**
 * Hook for mobile breakpoint
 * @returns boolean indicating if the media query matches
 * @example
 * ```tsx
 * const isMobile = useIsMobile();
 * ```
 */
export function useIsMobile() {
  return useMediaQueryBreakpoint("md", "max");
}
