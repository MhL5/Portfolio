"use client";

import { type ComponentProps, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/registry/hooks/useDebounce/useDebounce";

type DebouncedInputProps = {
  onDebouncedChange: (value: string) => void;
  value?: string;
  delay?: number;
} & Omit<ComponentProps<typeof Input>, "value">;

export default function DebouncedInput({
  value,
  onDebouncedChange,
  delay = 200,
  onChange,
  ...props
}: DebouncedInputProps) {
  const [inputValue, setInputValue] = useState(value || "");

  useDebounce(
    () => {
      onDebouncedChange(inputValue);
    },
    delay,
    [inputValue],
  );

  // keeps internal state in sync with the value prop
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  return (
    <Input
      value={inputValue}
      onChange={(e) => {
        onChange?.(e);
        setInputValue(e.target.value);
      }}
      {...props}
    />
  );
}
