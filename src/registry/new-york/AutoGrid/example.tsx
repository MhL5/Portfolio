"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import AutoGrid from "@/registry/new-york/AutoGrid/AutoGrid";

export default function Example() {
  const [size, setSize] = useState(300);
  const [maxColCount, setMaxColCount] = useState(2);
  const [minColSize, setMinColSize] = useState(100);
  const [gap, setGap] = useState(10);

  return (
    <div className="relative flex w-full flex-col flex-wrap items-center gap-3">
      <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="grid w-full max-w-sm gap-2">
          <label htmlFor="slider-size">Width: {size}px</label>
          <Input
            id="slider-size"
            className="w-full"
            type="number"
            step={1}
            min={250}
            max={700}
            value={size.toString()}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </div>
        <div className="grid w-full max-w-sm gap-2">
          <label htmlFor="max-col-count">Max Columns</label>
          <Input
            id="max-col-count"
            type="number"
            value={maxColCount}
            onChange={(e) => setMaxColCount(Number(e.target.value))}
          />
        </div>
        <div className="grid w-full max-w-sm gap-2">
          <label htmlFor="min-col-size">Min Col size</label>
          <Input
            id="min-col-size"
            type="number"
            value={minColSize}
            onChange={(e) => setMinColSize(Number(e.target.value))}
          />
        </div>
        <div className="grid w-full max-w-sm gap-2">
          <label htmlFor="gap">Gap</label>
          <Input
            id="gap"
            type="number"
            value={gap}
            onChange={(e) => setGap(Number(e.target.value))}
          />
        </div>
      </div>

      <AutoGrid
        as="ul"
        maxColCount={maxColCount}
        minColSize={`${minColSize}px`}
        gap={`${gap}px`}
        className="w-full rounded-sm border border-dashed p-3"
        style={{
          width: `${size}px`,
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <li
            className="grid w-full place-items-center rounded border p-2"
            key={`Column-${index + 1}`}
          >
            {index + 1}
          </li>
        ))}
      </AutoGrid>
    </div>
  );
}
