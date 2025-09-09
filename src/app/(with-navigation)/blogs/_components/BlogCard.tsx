import { CardClassName } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Img from "@/registry/new-york/Img/Img";
import Typography from "@/registry/new-york/Typography/Typography";
import { calcContainerBorderRadius } from "@/utils/calcContainerBorderRadius";
import Link from "next/link";
import type { ComponentProps } from "react";

export type BlogCardProps = {
  title: string;
  summary: string;
  slug: string;
  image: ComponentProps<typeof Img>["src"];
};

export default function BlogCard({
  title,
  summary,
  slug,
  image,
}: BlogCardProps) {
  return (
    <Link
      href={`/blogs/${slug}`}
      className={cn(CardClassName, "flex flex-col gap-3 overflow-hidden p-3")}
      style={{
        borderRadius: calcContainerBorderRadius({
          padding: 8,
          innerRadius: 12,
          unit: "px",
        }),
      }}
    >
      <Img
        width={500}
        height={300}
        src={image}
        alt={`image of ${title} blog`}
        className="h-52 w-full rounded-md object-cover"
      />

      <Typography
        variant="h3"
        className="mx-0 text-xl font-semibold hover:underline"
      >
        {title}
      </Typography>

      <Typography
        variant="p"
        effect="removePMargin"
        className="text-muted-foreground mx-0 line-clamp-3 text-sm"
      >
        {summary}
      </Typography>
    </Link>
  );
}
