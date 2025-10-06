import { mdxComponents } from "@/features/MDX-remote/MdxComponents";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

type MDXRemoteClientProps = {
  source: MDXRemoteSerializeResult;
};

export default function MDXRemoteClient({ source }: MDXRemoteClientProps) {
  return <MDXRemote {...source} components={mdxComponents} />;
}
