// ================================================================
// EXPERIENCE / WORK HISTORY CONFIGURATION
// Edit this file to update your work history timeline.
// ================================================================

export const experienceConfig = {
  heading: "Work Experience",
  subheading: "My professional journey in Web3 and software development.",

  // ── WORK HISTORY ──────────────────────────────────────────────
  // Add or remove roles. The list is displayed top-to-bottom (most recent first).
  roles: [
    {
      // ── Role ──────────────────────────────────────────────────
      title: "Senior Web3 Engineer",           // ← Job title
      company: "DeFiCorp Labs",                // ← Company name
      companyUrl: "https://example.com",       // ← Company website (or "#")
      location: "Remote",                      // ← Location
      startDate: "Jan 2023",                   // ← Start date (freeform text)
      endDate: "Present",                      // ← End date or "Present"
      type: "Full-time",                       // ← Employment type

      // ── Summary ───────────────────────────────────────────────
      summary:
        "Led smart contract development for a DeFi protocol managing $240M+ TVL. Architected yield aggregation strategies and implemented zero-exploit security practices.",

      // ── Key Achievements ──────────────────────────────────────
      // Each string becomes a bullet point
      achievements: [
        "Built and audited 12 Solidity contracts with zero critical vulnerabilities",
        "Reduced gas costs by 40% through EIP-2929 and storage optimization",
        "Led a team of 4 engineers across frontend, backend, and smart contracts",
        "Integrated Chainlink oracles and The Graph for real-time data feeds",
      ],

      // ── Tech Stack ────────────────────────────────────────────
      stack: ["Solidity", "TypeScript", "React", "Hardhat", "AWS"],
    },
    {
      title: "Full Stack Developer",
      company: "CryptoStudio",
      companyUrl: "#",
      location: "San Francisco, CA",
      startDate: "Mar 2021",
      endDate: "Dec 2022",
      type: "Full-time",
      summary:
        "Developed NFT marketplace and DAO tooling for enterprise clients. Built cross-chain bridges and wallet integration flows.",
      achievements: [
        "Shipped NFT marketplace processing $1M+ monthly in secondary sales",
        "Implemented gasless meta-transactions using EIP-2612 permit signatures",
        "Delivered DAO governance dashboard for 3 client protocols",
      ],
      stack: ["Next.js", "Solidity", "GraphQL", "Ethers.js", "PostgreSQL"],
    },
    {
      title: "Frontend Engineer",
      company: "StartupXYZ",
      companyUrl: "#",
      location: "New York, NY",
      startDate: "Jun 2019",
      endDate: "Feb 2021",
      type: "Full-time",
      summary:
        "Built consumer-facing React applications and internal tooling. First exposure to Web3 — integrated MetaMask and wallet providers into existing SaaS products.",
      achievements: [
        "Rebuilt core dashboard, improving performance by 60%",
        "Integrated WalletConnect and MetaMask for Web3 login",
        "Mentored 2 junior engineers",
      ],
      stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    },
  ],
};
