import type Image from "next/image";
import type { ComponentProps } from "react";
import nextJsSetupImg from "~/public/blogs/my-next-js-setups.jpeg";

type Blog = {
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  slug: string;
  path: string;
  image: ComponentProps<typeof Image>["src"];
};

export const blogs: Blog[] = [
  {
    title: "Next.js Setup",
    summary: "How i like to setup my next js projects",
    label: "Tutorial",
    author: "Mohammad Lashani",
    published: "2025-09-09T10:58:40.203Z",
    slug: "my-next-js-setups",
    path: "my-next-js-setups.mdx",
    image: nextJsSetupImg,
  },
];
