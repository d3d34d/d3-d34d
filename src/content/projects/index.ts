// ================================================================
// PROJECTS INDEX
// ================================================================

import { project as amarBornomala } from "./amar-bornomala/config";

// All projects — sorted by the `order` field in their config
export const allProjects = [amarBornomala].sort(
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
  codeUrlLabel?: string;
  stats: ProjectStat[];
};
