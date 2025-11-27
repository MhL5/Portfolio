import { type ComponentProps, useId } from "react";

// Do not touch
const cssCalculations = `
--grid-col-size-calc: calc(
  (100% - var(--grid-gap) * var(--grid-max-col-count)) /
    var(--grid-max-col-count)
);
--grid-col-min-size-calc: min(
  100%,
  max(var(--grid-min-col-size), var(--grid-col-size-calc))
);
display: grid;
gap: var(--grid-gap);
grid-template-columns: repeat(
  auto-fit,
  minmax(var(--grid-col-min-size-calc), 1fr)
);
`;

type AutoGridProps<T extends keyof HTMLElementTagNameMap> = {
  maxColCount: number;
  minColSize: `${number}rem` | `${number}px`;
  gap: `${number}rem` | `${number}px`;

  as: T;
} & ComponentProps<T>;

/**
 * AutoGrid is a component that automatically adjusts the grid columns based on the screen size.
 */
export default function AutoGrid<T extends keyof HTMLElementTagNameMap>({
  gap,
  maxColCount,
  minColSize,
  as,
  ...props
}: AutoGridProps<T>) {
  const Component = as || "div";
  const id = useId();

  return (
    <>
      <style>
        {`
          #${id} {
            --grid-max-col-count: ${maxColCount || 5};
            --grid-min-col-size: ${minColSize || `5rem`};
            --grid-gap: ${gap || `1rem`};
            ${cssCalculations}
        `}
      </style>
      {/* @ts-expect-error todo: temp solution */}
      <Component id={id} {...props} />
    </>
  );
}
