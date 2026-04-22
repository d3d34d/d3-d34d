"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalIcon } from "./icons";
import { Stats } from "./Stats";
import { featuredProject, gridProjects, type Project } from "@/content/projects/index";

// Tag color map
const tagColorMap: Record<string, string> = {
  blue:   "border-[#8BBDFF] bg-[#1D2433] text-[#8BBDFF]",
  yellow: "border-[#FFB800] bg-[#332B1D] text-[#FFB800]",
  purple: "border-[#D18BFF] bg-[#2B1D33] text-[#D18BFF]",
  green:  "border-primary   bg-primary/10 text-primary",
};

// ── Project Tag Badge ──────────────────────────────────────────────
const TagBadge = ({ label, color = "green" }: { label: string; color?: string }) => (
  <span className={`rounded-[4px] border px-2 py-0.5 font-mono text-xs ${tagColorMap[color] ?? tagColorMap.green}`}>
    {label}
  </span>
);

// ── Grid Card (non-featured projects) ─────────────────────────────
const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    id={`project-card-${project.id}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group flex flex-col border border-primary bg-card-bg transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,156,0.2)]"
  >
    {/* Thumbnail — replace: public/content/projects/[id]/thumbnail.jpg */}
    <div className="relative aspect-video w-full overflow-hidden border-b border-primary">
      <Image
        src={project.thumbnail}
        alt={`${project.title} thumbnail`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>

    <div className="flex flex-col flex-1 p-6">
      {/* Project title — edit: config.ts → title */}
      <h4 id={`project-title-${project.id}`} className="mb-2 font-mono text-xl font-bold text-primary">
        {project.title}
      </h4>

      {/* Tags — edit: config.ts → tags[] */}
      <div className="mb-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <TagBadge key={tag.label} label={tag.label} color={tag.color} />
        ))}
      </div>

      {/* Description — edit: config.ts → shortDescription */}
      <p className="font-mono text-sm text-muted-foreground">
        {project.shortDescription}
      </p>

      {/* Links */}
      <div className="mt-4 flex gap-3">
        {project.liveUrl && project.liveUrl !== "#" && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="font-mono text-sm text-primary underline hover:opacity-80">
            Live Demo
          </a>
        )}
        {project.codeUrl && project.codeUrl !== "#" && (
          <a href={project.codeUrl} target="_blank" rel="noopener noreferrer"
            className="font-mono text-sm text-primary underline hover:opacity-80">
            Code
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

// ── Main ProjectGrid component ─────────────────────────────────────
export const ProjectGrid = () => {
  return (
    <section id="projects-section" className="py-[60px]">

      {/* Section heading */}
      <h2 id="projects-heading" className="mb-10 font-mono text-[32px] font-bold text-primary">
        Featured Projects
      </h2>

      {/* ── Featured Project Card (large) ─────────────────────── */}
      {/* Edit content: src/content/projects/[featured-project]/config.ts */}
      {featuredProject && (
        <motion.div
          id={`featured-project-${featuredProject.id}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 overflow-hidden border border-primary bg-background shadow-[0_0_15px_rgba(0,255,156,0.1)]"
        >
          <div className="flex flex-col lg:flex-row">

            {/* Left: Project info */}
            <div className="flex flex-1 flex-col p-8 lg:p-10">
              {/* Title — edit: config.ts → title */}
              <h3 id={`featured-title-${featuredProject.id}`} className="mb-4 font-mono text-3xl font-bold text-primary">
                {featuredProject.title}
              </h3>

              {/* Tags — edit: config.ts → tags[] */}
              <div className="mb-6 flex flex-wrap gap-2">
                {featuredProject.tags.map((tag) => (
                  <TagBadge key={tag.label} label={tag.label} color={tag.color} />
                ))}
              </div>

              {/* Description — edit: config.ts → shortDescription */}
              <p id={`featured-description-${featuredProject.id}`} className="mb-8 font-mono text-muted-foreground lg:max-w-[400px]">
                {featuredProject.shortDescription}
              </p>

              {/* Buttons — edit: config.ts → liveUrl / codeUrl */}
              <div className="mt-auto flex flex-wrap gap-4">
                {featuredProject.liveUrl && featuredProject.liveUrl !== "#" && (
                  <a href={featuredProject.liveUrl} target="_blank" rel="noopener noreferrer"
                    id={`featured-live-btn-${featuredProject.id}`}
                    className="flex items-center gap-2 bg-primary px-6 py-3 font-mono font-bold text-background transition-opacity hover:opacity-90">
                    <ExternalIcon className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
                {featuredProject.codeUrl && featuredProject.codeUrl !== "#" && (
                  <a href={featuredProject.codeUrl} target="_blank" rel="noopener noreferrer"
                    id={`featured-code-btn-${featuredProject.id}`}
                    className="flex items-center gap-2 border border-primary px-6 py-3 font-mono font-bold text-primary transition-colors hover:bg-primary/10">
                    Code
                  </a>
                )}
              </div>
            </div>

            {/* Right: Stats — edit: config.ts → stats[] */}
            {featuredProject.stats && featuredProject.stats.length > 0 && (
              <div className="flex-1 border-t border-primary p-8 lg:border-l lg:border-t-0">
                <Stats stats={featuredProject.stats} />
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ── Grid Projects ─────────────────────────────────────── */}
      {/* Edit: src/content/projects/index.ts to add/remove/reorder */}
      <div id="project-grid" className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {gridProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

    </section>
  );
};
