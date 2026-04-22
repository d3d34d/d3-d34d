// ================================================================
// PROJECT: Project Beta
// ================================================================
// To update this project:
//   • Edit text below
//   • Replace the image at:  public/content/projects/project-beta/thumbnail.jpg
// ================================================================

export const project = {
  // ── IDENTITY ──────────────────────────────────────────────────
  id: "project-beta",                        // ← Unique slug
  title: "Project Beta",                     // ← Project name

  // ── DISPLAY ORDER & FEATURE ────────────────────────────────────
  order: 3,                                  // ← Lower number = shown first
  featured: false,

  // ── DESCRIPTION ───────────────────────────────────────────────
  shortDescription:
    "NFT marketplace for digital artists with on-chain royalty enforcement and gasless minting.",
  fullDescription:
    "Project Beta is an ERC-721 marketplace where artists retain royalties on every secondary sale, enforced at the contract level. Features IPFS metadata, batch minting, and a creator dashboard.",

  // ── IMAGE ─────────────────────────────────────────────────────
  thumbnail: "/content/projects/project-beta/thumbnail.jpg",

  // ── TAGS ──────────────────────────────────────────────────────
  tags: [
    { label: "ERC-721",  color: "purple" as const },
    { label: "Next.js",  color: "blue"   as const },
  ],

  // ── LINKS ─────────────────────────────────────────────────────
  liveUrl: "#",
  codeUrl: "#",

  // ── STATS ─────────────────────────────────────────────────────
  stats: [],
};
