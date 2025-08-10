"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import {
  createContext,
  use,
  useMemo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

type ContextType = {
  iconXPosition?: "right" | "left" | "both";
};

const Context = createContext<ContextType | null>(null);

type ContextProviderProps = {
  children: ReactNode;
} & ContextType;

function ContextProvider({
  children,
  iconXPosition = "left",
}: ContextProviderProps) {
  const values = useMemo(() => ({ iconXPosition }), [iconXPosition]);
  return <Context value={values}>{children}</Context>;
}

function useContext() {
  const context = use(Context);
  if (!context)
    throw new Error("useContext must be used within a ContextProvider");
  return context;
}

type InputWithIconProps = Omit<ContextType, "both"> &
  ComponentPropsWithoutRef<"div">;

function InputWithIcon({
  className,
  iconXPosition,
  ...props
}: InputWithIconProps) {
  return (
    <ContextProvider iconXPosition={iconXPosition}>
      <div className={cn("relative", className)} {...props} />
    </ContextProvider>
  );
}

type InputWithIconInputProps = ComponentPropsWithoutRef<typeof Input> & {
  asChild?: boolean;
};

function InputWithIconInput({
  className,
  asChild,
  ...props
}: InputWithIconInputProps) {
  const { iconXPosition } = useContext();
  const Component = asChild ? Slot : Input;

  return (
    <Component
      className={cn(
        "h-[inherit] w-full",
        iconXPosition === "right" ? "pr-8 rtl:pl-8" : "",
        iconXPosition === "left" ? "pl-8 rtl:pr-8" : "",
        iconXPosition === "both" ? "pr-8 pl-8" : "",
        className,
      )}
      {...props}
    />
  );
}

type InputWithIconIconSlotProps = ComponentPropsWithoutRef<typeof Slot> &
  Omit<ContextType, "both">;

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
