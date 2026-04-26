// ================================================================
// PROJECT: DeFiVault Protocol
// ================================================================
// To update this project:
//   • Edit text below
//   • Replace the image at:  public/content/projects/defi-vault/thumbnail.jpg
// ================================================================

export const project = {
  // ── IDENTITY ──────────────────────────────────────────────────
  id: "defi-vault",                          // ← Unique slug (used in URLs, keep lowercase + hyphens)
  title: "DeFiVault Protocol",               // ← Project name shown on cards

  // ── DISPLAY ORDER & FEATURE ────────────────────────────────────
  order: 1,                                  // ← Lower number = shown first in the grid
  featured: true,                            // ← Set to true to show in the large featured card on homepage

  // ── DESCRIPTION ───────────────────────────────────────────────
  shortDescription:                          // ← Shown on cards / grid
    "Explore my journey as a Senior Web3 Developer specializing in blockchain technologies, DeFi protocols, and decentralized applications.",
  fullDescription:                           // ← Shown on full project detail page (future)
    "DeFiVault Protocol is a permissionless, non-custodial yield aggregator that automatically routes funds to the highest-yielding strategies across multiple DeFi protocols. Built with security-first Solidity architecture and a real-time React dashboard.",

  // ── IMAGE ─────────────────────────────────────────────────────
  thumbnail: "/content/projects/defi-vault/thumbnail.jpg", // ← Replace the file at this path

  // ── TAGS ──────────────────────────────────────────────────────
  // color options: "blue" | "yellow" | "purple" | "green"
  tags: [
    { label: "DeFi",     color: "blue"   as const },
    { label: "Security", color: "yellow" as const },
  ],

  // ── LINKS ─────────────────────────────────────────────────────
  liveUrl: "#",                              // ← Live demo URL (or "#" to hide)
  codeUrl: "https://github.com",                              // ← GitHub / source URL (or "#" to hide)

  // ── STATS (only shown for featured project) ────────────────────
  // Add, remove, or reorder stats. Shown in a 2×2 grid beside the project.
  stats: [
    { label: "TVL",      value: "$240.5M" }, // ← Label shown below, value shown large
    { label: "APY",      value: "12.4%" },
    { label: "Users",    value: "1,252" },
    { label: "Exploits", value: "0" },
  ],
};
