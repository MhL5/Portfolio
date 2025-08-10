"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithoutRef } from "react";

type IconXPosition = "right" | "left" | "both";

type InputWithIconProps = ComponentPropsWithoutRef<"div">;

function InputWithIcon({ className, ...props }: InputWithIconProps) {
  return <div className={cn("relative", className)} {...props} />;
}

type InputWithIconInputProps = ComponentPropsWithoutRef<typeof Input> & {
  asChild?: boolean;
  iconsOn: IconXPosition;
};

function InputWithIconInput({
  className,
  asChild,
  iconsOn,
  ...props
}: InputWithIconInputProps) {
  const Component = asChild ? Slot : Input;

  return (
    <Component
      className={cn(
        "h-[inherit] w-full",
        iconsOn === "right" ? "pr-8 rtl:pl-8" : "",
        iconsOn === "left" ? "pl-8 rtl:pr-8" : "",
        iconsOn === "both" ? "pr-8 pl-8" : "",
        className,
      )}
      {...props}
    />
  );
}

type InputWithIconIconSlotProps = ComponentPropsWithoutRef<typeof Slot> & {
  iconXPosition: Omit<IconXPosition, "both">;
};

function InputWithIconIconSlot({
  className,
  iconXPosition,
  ...props
}: InputWithIconIconSlotProps) {
  return (
    <>
      <Slot
        data-slot="input-with-icon-icon"
        className={cn(
          "absolute top-1/2 size-4 -translate-y-1/2 stroke-2",
          iconXPosition === "right"
            ? "right-2.5 rtl:right-auto rtl:left-2.5"
            : "",
          iconXPosition === "left"
            ? "left-2.5 rtl:right-2.5 rtl:left-auto"
            : "",
          className,
        )}
        {...props}
      />
    </>
  );
}

export { InputWithIcon, InputWithIconIconSlot, InputWithIconInput };
