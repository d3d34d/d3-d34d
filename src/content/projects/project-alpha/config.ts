// ================================================================
// PROJECT: Project Alpha
// ================================================================
// To update this project:
//   • Edit text below
//   • Replace the image at:  public/content/projects/project-alpha/thumbnail.jpg
// ================================================================

export const project = {
  // ── IDENTITY ──────────────────────────────────────────────────
  id: "project-alpha",                       // ← Unique slug
  title: "Project Alpha",                    // ← Project name

  // ── DISPLAY ORDER & FEATURE ────────────────────────────────────
  order: 2,                                  // ← Lower number = shown first
  featured: false,                           // ← Set to true to show as featured card

  // ── DESCRIPTION ───────────────────────────────────────────────
  shortDescription:
    "A decentralized exchange aggregator with low slippage, routing orders across multiple AMMs for optimal execution.",
  fullDescription:
    "Project Alpha aggregates liquidity from Uniswap, SushiSwap, Curve, and other DEXs to find the best swap routes. Built with Solidity and a TypeScript backend, it processes $1M+ in daily volume.",

  // ── IMAGE ─────────────────────────────────────────────────────
  thumbnail: "/content/projects/project-alpha/thumbnail.jpg", // ← Replace this file to update

  // ── TAGS ──────────────────────────────────────────────────────
  // color options: "blue" | "yellow" | "purple" | "green"
  tags: [
    { label: "Solidity", color: "green"  as const },
    { label: "React",    color: "blue"   as const },
  ],

  // ── LINKS ─────────────────────────────────────────────────────
  liveUrl: "#",
  codeUrl: "https://github.com",

  // ── STATS ─────────────────────────────────────────────────────
  // Only shown if this project is "featured: true"
  stats: [],
};
