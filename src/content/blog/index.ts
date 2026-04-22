// ================================================================
// BLOG INDEX
// ================================================================
// HOW TO ADD A NEW POST:
//   1. Create a new folder:  src/content/blog/my-post-slug/
//   2. Copy a config.ts from an existing post into it
//   3. Edit the config (change id, title, excerpt, etc.)
//   4. Import and add it to allPosts[] below
//
// HOW TO REMOVE A POST:
//   • Delete the import and remove it from allPosts[]
//
// HOW TO REORDER POSTS:
//   • Change the `order` value in each post's config.ts
// ================================================================

import { post as mevAMM }                  from "./mev-resistant-amm/config";
import { post as smartContractVulns }      from "./smart-contract-vulnerabilities/config";
import { post as crossChainDApp }          from "./cross-chain-dapp/config";

// All posts — sorted by the `order` field
export const allPosts = [mevAMM, smartContractVulns, crossChainDApp].sort(
  (a, b) => a.order - b.order
);

// ── TYPE EXPORT ───────────────────────────────────────────────────
export type BlogPost = {
  id: string;
  order: number;
  title: string;
  category: string;
  categoryColor: "blue" | "yellow" | "purple" | "green";
  readTime: string;
  publishedAt: string;
  excerpt: string;
  url: string;
};
