// ================================================================
// PROJECTS INDEX
// ================================================================
// HOW TO ADD A NEW PROJECT:
//   1. Create a new folder:  src/content/projects/my-project/
//   2. Copy any config.ts from an existing project into it
//   3. Edit the config (change id, title, description, etc.)
//   4. Add the image to: public/content/projects/my-project/thumbnail.jpg
//   5. Import and add it to the `allProjects` array below
//
// HOW TO REMOVE A PROJECT:
//   • Just delete the import and remove it from allProjects[]
//   • The folder can stay or be deleted — your choice
//
// HOW TO REORDER PROJECTS:
//   • Change the `order` value in each project's config.ts
//   • Lower number = shown first
// ================================================================

import { project as defiVault }    from "./defi-vault/config";
import { project as projectAlpha } from "./project-alpha/config";
import { project as projectBeta }  from "./project-beta/config";

// All projects — sorted by the `order` field in their config
export const allProjects = [defiVault, projectAlpha, projectBeta].sort(
  (a, b) => a.order - b.order
);

// The one project shown in the large featured card on the homepage
export const featuredProject = allProjects.find((p) => p.featured) ?? allProjects[0];

// Grid projects — everything except the featured one
export const gridProjects = allProjects.filter((p) => !p.featured);

// ── TYPE EXPORT ───────────────────────────────────────────────────
export type ProjectTag = {
  label: string;
  color?: "blue" | "yellow" | "purple" | "green";
};

export type ProjectStat = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  title: string;
  order: number;
  featured: boolean;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  tags: ProjectTag[];
  liveUrl?: string;
  codeUrl?: string;
  stats: ProjectStat[];
};
