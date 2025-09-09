import BlogCard from "@/app/(with-navigation)/blogs/_components/BlogCard";
import { blogs } from "@/app/(with-navigation)/blogs/constants/blogsConstants";
import Typography from "@/registry/new-york/Typography/Typography";

export default function Page() {
  return (
    <section className="mx-auto mt-5 min-h-svh w-full max-w-7xl px-5">
      <div className="flex w-full flex-col items-center text-center">
        <Typography
          variant="h1"
          className="mb-3 font-semibold text-pretty md:mb-4 lg:mb-6"
        >
          Blogs
        </Typography>
        <Typography
          variant="p"
          effect="muted"
          className="mb-8 w-full text-center text-base lg:max-w-2xl lg:text-lg"
        >
          Welcome to my collection of blog posts! This is where I share my
          thoughts, experiences, and insights from my journey as a developer.
        </Typography>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {blogs.map((post) => (
          <BlogCard
            key={post.title}
            title={post.title}
            summary={post.summary}
            slug={post.slug}
            image={post.image}
          />
        ))}
      </div>
    </section>
  );
}
