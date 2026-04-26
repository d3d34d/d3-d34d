import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site.config";
import { allProjects, type Project } from "@/content/projects/index";
import { Eye, Globe } from "lucide-react";
import { MatrixHoverText } from "@/components/MatrixHoverText";

export const metadata = {
  title: "Projects | Dhebobrotha Dhibo",
  description: "All projects by Dhebobrotha Dhibo.",
};

// Custom Github Icon as it might be missing from this version of lucide-react
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Custom Live Status Icon for Demo buttons
const LiveStatusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="32"
    height="32"
    {...props}
  >
    <g>
      <path d="M1.52 30.475h28.96v-1.52H32v-10.67h-1.52v-1.52H1.52v1.52H0v10.67h1.52Zm24.38 -10.66h3.05v3.05H25.9Zm-7.61 0h4.57v1.52h-3.05v1.53h3.05v1.52h-3.05v1.52h3.05v1.53h-4.57Zm-6.1 0h1.52v6.09h1.53v-6.09h1.52v6.09h-1.52v1.53h-1.53v-1.53h-1.52Zm-3.05 0h1.53v7.62H9.14Zm-6.09 0h1.52v6.09h3.05v1.53H3.05Z" fill="currentColor"></path>
      <path d="M25.9 7.625h1.53v1.52H25.9Z" fill="currentColor"></path>
      <path d="M24.38 6.095h1.52v1.53h-1.52Z" fill="currentColor"></path>
      <path d="M22.86 10.665h1.52v1.53h-1.52Z" fill="currentColor"></path>
      <path d="M21.33 9.145h1.53v1.52h-1.53Z" fill="currentColor"></path>
      <path d="M21.33 4.575h3.05v1.52h-3.05Z" fill="currentColor"></path>
      <path d="M18.29 7.625h3.04v1.52h-3.04Z" fill="currentColor"></path>
      <path d="M18.29 12.195h1.52v1.52h-1.52Z" fill="currentColor"></path>
      <path d="M18.29 3.055h3.04v1.52h-3.04Z" fill="currentColor"></path>
      <path d="M13.71 10.665h4.58v1.53h-4.58Z" fill="currentColor"></path>
      <path d="M13.71 6.095h4.58v1.53h-4.58Z" fill="currentColor"></path>
      <path d="M13.71 1.525h4.58v1.53h-4.58Z" fill="currentColor"></path>
      <path d="M12.19 12.195h1.52v1.52h-1.52Z" fill="currentColor"></path>
      <path d="M10.67 3.055h3.04v1.52h-3.04Z" fill="currentColor"></path>
      <path d="M10.67 7.625h3.04v1.52h-3.04Z" fill="currentColor"></path>
      <path d="M9.14 9.145h1.53v1.52H9.14Z" fill="currentColor"></path>
      <path d="M7.62 4.575h3.05v1.52H7.62Z" fill="currentColor"></path>
      <path d="M7.62 10.665h1.52v1.53H7.62Z" fill="currentColor"></path>
      <path d="M6.1 6.095h1.52v1.53H6.1Z" fill="currentColor"></path>
      <path d="M4.57 7.625H6.1v1.52H4.57Z" fill="currentColor"></path>
    </g>
  </svg>
);

export default function ProjectsPage() {
  return (
    <main id="projects-page" className="w-full">
      {/* ── Visual Hero Section ────────────────────────────────── */}

      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 lg:px-[110px]">
        {/* ── Terminal Header ───────────────────────────────────── */}
        <div className="mb-12 flex items-center gap-2 font-mono text-lg md:text-xl animate-in fade-in slide-in-from-left duration-500">
          <span className="text-primary font-bold"><MatrixHoverText text={siteConfig.terminalPath} /></span>
          <span className="text-foreground"><MatrixHoverText text="Projects" /></span>
          <span className="w-2 h-5 bg-primary animate-pulse ml-1" />
        </div>

      {/* ── Page Heading ──────────────────────────────────────── */}
        <div className="mb-16 animate-in fade-in slide-in-from-left duration-500">
          <p className="max-w-2xl font-mono text-muted-foreground leading-relaxed">
            <MatrixHoverText text="A technical archive of cybersecurity research, vulnerability assessments, and defensive intelligence reports. Showcasing real-world audits, threat detection methodologies, and secure infrastructure deployments." />
          </p>
        </div>

      {/* ── Full project list ──────────────────────────────────── */}
      <div id="all-projects-grid" className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
        {allProjects.map((project: Project, idx: number) => (
          <article
            key={project.id}
            id={`projects-page-card-${project.id}`}
            className="group flex flex-col border border-primary/10 bg-[#0B0E0E]/80 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(0,255,156,0.05)] hover:-translate-y-2 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-700"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Thumbnail */}
            <Link href={`/projects/${project.id}`} className="relative aspect-video w-full overflow-hidden block">
              <Image
                src={project.thumbnail}
                alt={`${project.title} preview`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E0E] via-transparent to-transparent opacity-60" />
              {project.featured && (
                <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 font-mono text-[10px] font-bold text-background shadow-xl z-10">
                  FEATURED
                </span>
              )}
            </Link>

            <div className="flex flex-1 flex-col p-8">
              {/* Title */}
              <h2 id={`projects-page-title-${project.id}`} className="mb-3 font-mono text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                <MatrixHoverText text={project.title} />
              </h2>

              {/* Description */}
              <p className="mb-8 font-mono text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {project.shortDescription}
              </p>

              {/* Tech Stack Section - Exact Screenshot Style */}
              <div className="mb-10 space-y-4">
                <h3 className="font-mono text-sm font-bold text-primary uppercase tracking-[0.1em]">
                  <MatrixHoverText text="Tech Stack" />
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-[11px] text-primary transition-all hover:border-primary/40 hover:bg-primary/5"
                    >
                      <MatrixHoverText text={tag.label} />
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons - Exact Screenshot Style */}
              <div className="mt-auto flex gap-4">
                <Link
                  href={`/projects/${project.id}`}
                  className="flex-[3] flex items-center justify-center gap-3 bg-[#00FF9C] py-4 rounded-xl font-mono text-sm font-bold text-black hover:shadow-[0_0_20px_rgba(0,255,156,0.3)] transition-all active:scale-[0.98]"
                >
                  <Eye className="w-5 h-5" />
                  View Project
                </Link>
                
                {project.codeUrl && project.codeUrl !== "#" && (
                  <a 
                    href={project.codeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center border border-[#00FF9C] bg-black py-4 rounded-xl font-mono text-sm font-bold text-[#00FF9C] hover:bg-[#00FF9C]/5 transition-all active:scale-[0.98]"
                    aria-label={project.codeUrlLabel || "GitHub Repository"}
                  >
                    {project.codeUrlLabel ? (
                      <LiveStatusIcon className="w-5 h-5" />
                    ) : (
                      <GithubIcon className="w-5 h-5" />
                    )}
                    <span className="hidden sm:inline ml-2">{project.codeUrlLabel || "Github"}</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      </div>
    </main>
  );
}
