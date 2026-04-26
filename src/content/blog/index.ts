import { blogConfig as agenticAi } from "./agentic-ai-threats/config";
import { blogConfig as deepfakeSocial } from "./deepfake-social-engineering/config";
import { blogConfig as supplyChain } from "./supply-chain-fragility/config";
import { blogConfig as quantumDecryption } from "./quantum-decryption-risks/config";
import { blogConfig as zeroTrust } from "./zero-trust-2026/config";
import { blogConfig as continuousExposure } from "./continuous-exposure-management/config";

export const allPosts = [
  {
    id: "agentic-ai",
    slug: "agentic-ai-threats",
    url: "/blog/agentic-ai-threats",
    categoryColor: "blue",
    excerpt: agenticAi.description,
    readTime: agenticAi.readingTime,
    ...agenticAi,
  },
  {
    id: "deepfake-social",
    slug: "deepfake-social-engineering",
    url: "/blog/deepfake-social-engineering",
    categoryColor: "yellow",
    excerpt: deepfakeSocial.description,
    readTime: deepfakeSocial.readingTime,
    ...deepfakeSocial,
  },
  {
    id: "supply-chain",
    slug: "supply-chain-fragility",
    url: "/blog/supply-chain-fragility",
    categoryColor: "purple",
    excerpt: supplyChain.description,
    readTime: supplyChain.readingTime,
    ...supplyChain,
  },
  {
    id: "quantum-decryption",
    slug: "quantum-decryption-risks",
    url: "/blog/quantum-decryption-risks",
    categoryColor: "blue",
    excerpt: quantumDecryption.description,
    readTime: quantumDecryption.readingTime,
    ...quantumDecryption,
  },
  {
    id: "zero-trust",
    slug: "zero-trust-2026",
    url: "/blog/zero-trust-2026",
    categoryColor: "green",
    excerpt: zeroTrust.description,
    readTime: zeroTrust.readingTime,
    ...zeroTrust,
  },
  {
    id: "continuous-exposure",
    slug: "continuous-exposure-management",
    url: "/blog/continuous-exposure-management",
    categoryColor: "purple",
    excerpt: continuousExposure.description,
    readTime: continuousExposure.readingTime,
    ...continuousExposure,
  },
];
