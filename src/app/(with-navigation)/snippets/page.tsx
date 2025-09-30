import SnippetsList from "@/app/(with-navigation)/snippets/_components/SnippetsList";
import MDXRemoteComponent from "@/features/MDX-remote/MDXRemoteComponent";
import { fileReader } from "@/utils/fileReader";
import { Suspense } from "react";

export default async function Page() {
  const content = await fileReader("contents/snippets/snippets.mdx");

  return (
    <>
      <MDXRemoteComponent source={content} />

      <Suspense>
        <SnippetsList />
      </Suspense>
    </>
  );
}
