"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useDebouncedValue } from "@/app/(with-navigation)/snippets/hooks/useDebounce";

type DebouncedTextInputProps = {
  value?: string;
  onDebouncedChange: (value: string) => void;
  delay?: number;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  className?: string;
};

export default function DebouncedTextInput({
  value,
  onDebouncedChange,
  delay = 500,
  disabled = false,
  placeholder = "",
  id,
  className = "",
}: DebouncedTextInputProps) {
  const [inputValue, setInputValue] = useState(value || "");
  const debouncedValue = useDebouncedValue(inputValue, delay);

  // Keep internal input state in sync if parent value changes
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  // Call debounced change handler
  useEffect(() => {
    if (debouncedValue !== value) onDebouncedChange(debouncedValue);
  }, [debouncedValue, value, onDebouncedChange]);

  return (
    <Input
      type="text"
      id={id}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
