// ================================================================
// SITE CONFIGURATION
// Edit this file to update global settings across the whole site.
// ================================================================

export const siteConfig = {
  // ── IDENTITY ──────────────────────────────────────────────────
  ownerName: "d3.d34d",           // ← YOUR NAME (used in footer, meta)
  siteTitle: "d3.d34d | Home", // ← Browser tab title
  siteDescription:
    "Security Analyst & IT Professional. Specializing in threat detection, network security, and offensive defense.",

  // ── HEADER ────────────────────────────────────────────────────
  terminalPath: "d3.d34d@portfolio:~$",  // ← Top-left terminal text
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
  footerCopyright: "d3.d34d",    // ← Name in "© [Name] | [Year]"
  footerVersion: "v20.07.2025",           // ← Version tag badge
};
