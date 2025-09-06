import MDXRemoteComponent from "@/features/MDX-remote/MDXRemoteComponent";
import { isDev } from "@/registry/utils/checks/checks";
import { fileReader } from "@/utils/fileReader";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: PageProps<"/blogs/[...slugs]">) {
  const { slugs = [] } = await params;

  if (!isDev()) return redirect("/");
  if (!slugs || slugs.length === 0) return notFound();

  const content = await fileReader(`contents/blogs/${slugs.join("/")}.mdx`);

  return <MDXRemoteComponent source={content} />;
}
