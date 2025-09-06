export default function Layout({ children }: LayoutProps<"/blogs">) {
  return (
    <main className="prose prose-headings:font-nunito dark:prose-invert mx-auto w-full max-w-4xl overflow-x-hidden px-4 pt-4 pb-10 md:px-6 md:pt-8">
      {children}
    </main>
  );
}
