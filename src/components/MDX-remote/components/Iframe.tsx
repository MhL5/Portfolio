import type { ComponentProps } from "react";

export default function Iframe(props: ComponentProps<"iframe">) {
  return <iframe loading="lazy" className="h-96 w-full" {...props} />;
}
