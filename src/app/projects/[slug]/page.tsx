import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allProjects } from "@/content/projects/index";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((p) => p.id === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Dhebobrotha Dhibo`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  const tagColorMap: Record<string, string> = {
    blue: "border-[#8BBDFF] bg-[#1D2433] text-[#8BBDFF]",
    yellow: "border-[#FFB800] bg-[#332B1D] text-[#FFB800]",
    purple: "border-[#D18BFF] bg-[#2B1D33] text-[#D18BFF]",
    green: "border-primary bg-primary/10 text-primary",
  };

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-16 lg:px-[110px]">
      {/* ── Breadcrumbs ────────────────────────────────────────── */}
      <nav className="mb-8 font-mono text-sm">
        <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">
          {`> projects`}
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span className="text-primary">{project.id}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* ── Left Column: Media & Description ──────────────────── */}
        <div className="lg:col-span-8">
          <div className="relative aspect-video w-full overflow-hidden border border-primary bg-black/20 mb-8">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="mb-4 font-mono text-4xl font-bold text-primary">
            {project.title}
          </h1>

          <div className="mb-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag.label}
                className={`rounded-[4px] border px-3 py-1 font-mono text-xs ${tagColorMap[tag.color ?? "green"]}`}
              >
                {tag.label}
              </span>
            ))}
          </div>

          <div className="prose prose-invert max-w-none border-t border-primary/20 pt-8">
            <p className="font-mono text-lg leading-relaxed text-foreground/90 mb-6">
              {project.fullDescription}
            </p>
            
            {/* You can add more sections here if you update the data structure (e.g., features, stack details) */}
          </div>
        </div>

        {/* ── Right Column: Metadata & Links ────────────────────── */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-8">
            {/* Stats / Info Card */}
            <div className="border border-primary bg-black/40 p-6 backdrop-blur-sm">
              <h3 className="mb-6 font-mono text-sm text-secondary uppercase tracking-wider">
                {`// project_stats`}
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {project.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-mono text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="space-y-4">
              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center bg-primary px-6 py-4 font-mono font-bold text-background transition-opacity hover:opacity-90"
                >
                  LIVE DEMO
                </a>
              )}
              {project.codeUrl && project.codeUrl !== "#" && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center border border-primary px-6 py-4 font-mono font-bold text-primary transition-colors hover:bg-primary/10"
                >
                  GITHUB REPOSITORY
                </a>
              )}
            </div>

            {/* Terminal Decoration */}
            <div className="hidden border border-primary/20 p-4 font-mono text-[10px] text-muted-foreground lg:block">
              <p className="mb-2">TERMINAL_OUTPUT_ID: {project.id.toUpperCase()}</p>
              <p className="mb-2">SECURE_LINK: ENABLED</p>
              <p>STATUS: DEPLOYED_PRODUCTION</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.id,
  }));
}
