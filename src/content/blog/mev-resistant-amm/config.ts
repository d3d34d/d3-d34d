// ================================================================
// BLOG POST: Building MEV-Resistant AMM Protocols
// ================================================================

export const post = {
  // ── IDENTITY ──────────────────────────────────────────────────
  id: "mev-resistant-amm",                   // ← Unique slug (used in URLs)
  order: 1,                                  // ← Lower number = shown first

  // ── METADATA ──────────────────────────────────────────────────
  title: "Building MEV-Resistant AMM Protocols",  // ← Post title
  category: "Analysis",                           // ← Category tag label
  categoryColor: "blue" as const,                 // ← "blue" | "yellow" | "purple" | "green"
  readTime: "5 Minute Read",                      // ← Shown beside the category
  publishedAt: "2025-01-15",                      // ← ISO date for sorting (YYYY-MM-DD)

  // ── CONTENT ───────────────────────────────────────────────────
  excerpt:                                        // ← Short preview shown on cards
    "Exploring techniques to protect users from sandwich attacks and front-running in decentralized exchanges through commit-reveal schemes and time delays.",
  url: "#",                                       // ← Link to full post (external blog, "#", etc.)
};
