import MDXRemoteComponent from "@/features/MDX-remote/MDXRemoteComponent";
import { isDev } from "@/registry/utils/checks/checks";
import { fileReader } from "@/utils/fileReader";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: PageProps<"/blogs/[...slugs]">) {
  const { slugs = [] } = await params;

  if (!isDev()) return redirect("/");
  if (!slugs || slugs.length === 0) return notFound();

  const content = await fileReader(`contents/blogs/${slugs.join("/")}.mdx`);

  return (
    <main className="prose prose-headings:font-nunito dark:prose-invert mx-auto w-full max-w-4xl overflow-x-hidden px-4 pt-4 pb-10 md:px-6 md:pt-8">
      <MDXRemoteComponent source={content} />
    </main>
  );
}
