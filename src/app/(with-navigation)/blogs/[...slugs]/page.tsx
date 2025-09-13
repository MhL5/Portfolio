import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import MDXRemoteComponent from "@/features/MDX-remote/MDXRemoteComponent";
import { fileReader } from "@/utils/fileReader";
import { notFound } from "next/navigation";

export default async function Page({ params }: PageProps<"/blogs/[...slugs]">) {
  const { slugs = [] } = await params;

  if (!slugs || slugs.length === 0) return notFound();

  const content = await fileReader(`contents/blogs/${slugs.join("/")}.mdx`);

  return (
    <main className="prose prose-headings:font-nunito dark:prose-invert mx-auto w-full max-w-4xl overflow-x-hidden px-4 pt-4 pb-10 md:px-6 md:pt-8">
      <Alert variant="warning" className="mb-8">
        <AlertTitle>WORK IN PROGRESS</AlertTitle>
        <AlertDescription>
          This page is still under construction and you are watching a demo of
          it. Please check back later.
        </AlertDescription>
      </Alert>
      <MDXRemoteComponent source={content} />
    </main>
  );
}
