import Image from "next/image";
import { allProjects, type Project } from "@/content/projects/index";

export const metadata = {
  title: "Projects | CLIfolio",
  description: "All projects by Alex Chen.",
};

const tagColorMap: Record<string, string> = {
  blue:   "border-[#8BBDFF] bg-[#1D2433] text-[#8BBDFF]",
  yellow: "border-[#FFB800] bg-[#332B1D] text-[#FFB800]",
  purple: "border-[#D18BFF] bg-[#2B1D33] text-[#D18BFF]",
  green:  "border-primary   bg-primary/10 text-primary",
};

export default function ProjectsPage() {
  return (
    <main id="projects-page" className="mx-auto w-full max-w-[1440px] px-4 py-16 lg:px-[110px]">

      {/* ── Page Heading ──────────────────────────────────────── */}
      <h1 id="projects-page-heading" className="mb-4 font-mono text-[32px] font-bold text-primary">
        {`> projects`}
      </h1>
      <p className="mb-12 font-mono text-muted-foreground">
        {/* Edit in this file ↓ */}
        A collection of things I&apos;ve built — smart contracts, DeFi protocols, and web apps.
      </p>

      {/* ── Full project list ──────────────────────────────────── */}
      {/* Edit individual projects: src/content/projects/[name]/config.ts  */}
      {/* Add/remove: src/content/projects/index.ts                        */}
      <div id="all-projects-grid" className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {allProjects.map((project: Project) => (
          <article
            key={project.id}
            id={`projects-page-card-${project.id}`}
            className="group flex flex-col border border-primary bg-background transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,156,0.15)]"
          >
            {/* Thumbnail — replace: public/content/projects/[id]/thumbnail.jpg */}
            <div className="relative aspect-video w-full overflow-hidden border-b border-primary">
              <Image
                src={project.thumbnail}
                alt={`${project.title} preview`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {project.featured && (
                <span className="absolute right-3 top-3 rounded-full bg-primary px-2 py-0.5 font-mono text-xs font-bold text-background">
                  Featured
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-6">
              {/* Title */}
              <h2 id={`projects-page-title-${project.id}`} className="mb-2 font-mono text-xl font-bold text-primary">
                {project.title}
              </h2>

              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`rounded-[4px] border px-2 py-0.5 font-mono text-xs ${tagColorMap[tag.color ?? "green"]}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="mb-6 flex-1 font-mono text-sm leading-relaxed text-muted-foreground">
                {project.shortDescription}
              </p>

              {/* Links */}
              <div className="flex gap-3">
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="border border-primary px-3 py-1.5 font-mono text-sm text-primary hover:bg-primary hover:text-background transition-colors">
                    Live Demo
                  </a>
                )}
                {project.codeUrl && project.codeUrl !== "#" && (
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer"
                    className="border border-primary/50 px-3 py-1.5 font-mono text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                    Code
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

    </main>
  );
}
