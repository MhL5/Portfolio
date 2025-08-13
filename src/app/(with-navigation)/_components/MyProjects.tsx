import Img from "@/app/(with-navigation)/snippets/components/Img";
import {
  CardAction,
  CardClassName,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import imgExample from "~/public/img-example.jpg";

type ProjectStatus = "active" | "done";

type ProjectCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  date: string; // ISO or readable
  description: string;
  techBadges: string[];
  status: ProjectStatus;
  className?: string;
};

function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const styles =
    status === "done"
      ? "bg-[var(--color-success-bg)] text-[var(--color-success-text)] border-[var(--color-success-border)]"
      : "bg-[var(--color-info-bg)] text-[var(--color-info-text)] border-[var(--color-info-border)]";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium",
        styles,
        className,
      )}
    >
      {status === "done" ? "Done" : "Active development"}
    </span>
  );
}

function TechBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-[var(--color-border)] bg-[var(--color-muted)] px-2 py-1 text-xs text-[var(--color-muted-foreground)]">
      {label}
    </span>
  );
}

function ProjectCard({
  imageAlt,
  title,
  date,
  description,
  techBadges,
  status,
  className,
}: ProjectCardProps) {
  return (
    <Link
      href={`#`}
      className={cn(
        CardClassName,
        "h-full transition-all duration-300 hover:-translate-y-0.75",
        className,
      )}
    >
      <div className="px-6">
        <Img
          src={imgExample}
          alt={imageAlt}
          width={800}
          height={450}
          className="h-52 w-full shrink-0 rounded-lg object-cover"
        />
      </div>

      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardAction>
          <StatusBadge status={status} />
        </CardAction>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {techBadges.map((badge) => (
            <TechBadge key={badge} label={badge} />
          ))}
        </div>
        <div className="text-muted-foreground mt-4 text-xs">
          <time dateTime={date}>{date}</time>
        </div>
      </CardContent>
    </Link>
  );
}

export default function MyProjects({
  className,
  ...props
}: ComponentPropsWithoutRef<"section">) {
  const projects: ProjectCardProps[] = [
    {
      imageSrc: "/img-example.jpg",
      imageAlt: "Project preview",
      title: "Awesome Portfolio",
      date: "2025-08-01",
      description:
        "A modern, fast, and accessible portfolio built with Next.js, Tailwind CSS, and TypeScript.",
      techBadges: ["Next.js", "TypeScript", "Tailwind CSS"],
      status: "active",
    },
    {
      imageSrc: "/img-example.jpg",
      imageAlt: "Project preview",
      title: "Open Source UI Kit",
      date: "2025-05-10",
      description:
        "A reusable component library with strong a11y and theming support.",
      techBadges: ["React", "Radix UI", "Tailwind CSS"],
      status: "done",
    },
    {
      imageSrc: "/img-example.jpg",
      imageAlt: "Project preview",
      title: "Open Source UI Kit",
      date: "2025-05-10",
      description:
        "A reusable component library with strong a11y and theming support.",
      techBadges: ["React", "Radix UI", "Tailwind CSS"],
      status: "done",
    },
    {
      imageSrc: "/img-example.jpg",
      imageAlt: "Project preview",
      title: "Open Source UI Kit",
      date: "2025-05-10",
      description:
        "A reusable component library with strong a11y and theming support.",
      techBadges: ["React", "Radix UI", "Tailwind CSS"],
      status: "done",
    },
    {
      imageSrc: "/img-example.jpg",
      imageAlt: "Project preview",
      title: "Open Source UI Kit",
      date: "2025-05-10",
      description:
        "A reusable component library with strong a11y and theming support.",
      techBadges: ["React", "Radix UI", "Tailwind CSS"],
      status: "done",
    },
    {
      imageSrc: "/img-example.jpg",
      imageAlt: "Project preview",
      title: "Open Source UI Kit",
      date: "2025-05-10",
      description:
        "A reusable component library with strong a11y and theming support.",
      techBadges: ["React", "Radix UI", "Tailwind CSS"],
      status: "done",
    },
  ];

  return (
    <section
      className={cn("mx-auto w-full max-w-7xl space-y-6 px-5", className)}
      {...props}
    >
      <header className="space-y-5 text-center">
        <h2 className="text-5xl font-semibold tracking-tight md:text-6xl">
          Check out my latest work
        </h2>
        <p className="text-muted-foreground md:text-lg">
          I&apos;ve worked on a variety of projects, from simple websites to
          complex web applications. Here are a few of my favorites
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={`${p.title}-${i}`} {...p} />
        ))}
      </div>
    </section>
  );
}
