// ================================================================
// ABOUT PAGE CONFIGURATION
// Edit this file to update your bio, skills, and profile photo.
// ================================================================

export const aboutConfig = {
  // ── PROFILE IMAGE ─────────────────────────────────────────────
  // Replace the file at public/content/profile.jpg to update your photo.
  profileImage: "/content/profile.jpg",      // ← Path to your photo
  profileImageAlt: "Alex Chen - Profile",    // ← Alt text for accessibility

  // ── INTRO ─────────────────────────────────────────────────────
  greeting: "Hello, I'm",                    // ← Greeting prefix
  name: "Alex Chen",                         // ← Your displayed name
  title: "Senior Web3 Developer",            // ← Your job title / role

  // ── BIO ───────────────────────────────────────────────────────
  // Each string in this array becomes a separate paragraph.
  bio: [
    "I'm a Senior Full Stack Engineer specializing in blockchain technologies, DeFi protocols, and decentralized applications. With 5+ years of experience building on EVM-compatible chains, I craft secure, scalable smart contracts and intuitive front-end experiences.",
    "My work sits at the intersection of cryptographic security and user experience — making complex systems feel simple. I've shipped products handling over $240M in TVL with zero exploits.",
    "When I'm not writing Solidity, I'm exploring zero-knowledge proofs, contributing to open-source DeFi tooling, and writing about the future of the decentralized web.",
  ],

  // ── SKILLS ────────────────────────────────────────────────────
  // Add or remove skill categories. Each category has a label and list of items.
  skillCategories: [
    {
      category: "Languages",         // ← Section heading
      skills: ["TypeScript", "Solidity", "Rust", "Python", "Go"],
    },
    {
      category: "Frontend",
      skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "GraphQL"],
    },
    {
      category: "Blockchain",
      skills: ["Ethereum", "Hardhat", "Foundry", "Ethers.js", "Wagmi", "The Graph"],
    },
    {
      category: "Infrastructure",
      skills: ["Docker", "AWS", "Vercel", "PostgreSQL", "Redis", "IPFS"],
    },
  ],
};
