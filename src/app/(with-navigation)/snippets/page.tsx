import SnippetsList from "@/app/(with-navigation)/snippets/_components/SnippetsList";
import MDXRemoteServer from "@/features/MDX-remote/MDXRemoteServer";
import { fileReader } from "@/utils/fileReader";
import { Suspense } from "react";

export default async function Page() {
  const content = await fileReader("contents/snippets/snippets.mdx");

  return (
    <>
      <MDXRemoteServer source={content} />

      <Suspense>
        <SnippetsList />
      </Suspense>
    </>
  );
}
