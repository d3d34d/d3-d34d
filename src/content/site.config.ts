// ================================================================
// SITE CONFIGURATION
// Edit this file to update global settings across the whole site.
// ================================================================

export const siteConfig = {
  // ── IDENTITY ──────────────────────────────────────────────────
  ownerName: "Alex Chen",                  // ← YOUR NAME (used in footer, meta)
  siteTitle: "CLIfolio | Alex Chen",       // ← Browser tab title
  siteDescription:
    "Senior Full Stack Engineer & DeFi Architect. Building the future of the internet through code.",

  // ── HEADER ────────────────────────────────────────────────────
  terminalPath: "alex.chen@portfolio:~$",  // ← Top-left terminal text
  statusText: "Available",                 // ← Top-right status label
  statusColor: "#00E3FF",                  // ← Dot color (cyan by default)

  // ── NAVIGATION ────────────────────────────────────────────────
  // Add, remove, or reorder links here. href = internal path or external URL.
  navLinks: [
    { name: "About",      href: "/about" },
    { name: "Projects",   href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "Blog",       href: "/blog" },
    { name: "Contact",    href: "/contact" },
  ],

  // ── FOOTER ────────────────────────────────────────────────────
  footerCopyright: "Alex Chen",            // ← Name in "© [Name] | [Year]"
  footerVersion: "v20.07.2025",           // ← Version tag badge
};
