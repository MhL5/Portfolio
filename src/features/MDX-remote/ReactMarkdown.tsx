import ReactMarkdownComponent from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import Code from "@/features/MDX-remote/components/Code";
import ComponentSourceClient from "@/features/MDX-remote/components/ComponentSourceClient";
import { mdxComponents } from "@/features/MDX-remote/MdxComponents";

export default function ReactMarkdown({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdownComponent
      remarkPlugins={[remarkGfm, remarkToc]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code(props) {
          const { children, className } = props;

          return className?.startsWith("language-") ? (
            <ComponentSourceClient
              lang="tsx"
              code={String(children).replace(/\n$/, "")}
            />
          ) : (
            <Code {...props} />
          );
        },
        ...mdxComponents,
      }}
    >
      {markdown}
    </ReactMarkdownComponent>
  );
}
