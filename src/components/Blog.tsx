"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const posts = [
  {
    title: "Building MEV-Resistant AMM Protocols",
    category: "Analysis",
    readTime: "5 Minute Read",
    description: "Exploring techniques to protect users from sandwich attacks and front-running in decentralized exchanges through commit-reveal schemes and time delays.",
  },
  {
    title: "Common Smart Contract Vulnerabilities in 2025",
    category: "Security",
    readTime: "3 Minute Read",
    description: "Updated analysis of the latest attack vectors, including flash loan exploits, governance attacks, and oracle manipulation techniques with prevention strategies.",
  },
  {
    title: "Building Your First Cross-Chain dApp",
    category: "Tutorial",
    readTime: "8 Minute Read",
    description: "Step-by-step guide to creating applications that work across multiple blockchains using LayerZero, Axelar, and other interoperability protocols.",
  },
];

export const Blog = () => {
  return (
    <section className="py-[60px]">
      <div className="mb-10">
        <h2 className="flex items-center font-mono text-[24px] font-bold text-primary">
          Latest Blog Posts
          <span className="ml-2 animate-pulse text-primary">|</span>
        </h2>
        <p className="mt-4 font-mono text-muted lg:max-w-[800px]">
          Insights and updates on Web3, blockchain innovations, and modern web development trends. Exploring decentralized technologies, coding best practices, and the future of the internet through hands-on experience.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {posts.map((post, index) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group border border-primary p-8 transition-colors hover:bg-primary/5"
          >
            <div className="mb-6 flex items-center justify-between font-mono text-sm">
              <span className={cn(
                "rounded-[4px] px-2 py-0.5",
                post.category === "Analysis" && "bg-[#1D2433] text-[#8BBDFF]",
                post.category === "Security" && "bg-[#332B1D] text-[#FFB800]",
                post.category === "Tutorial" && "bg-[#2B1D33] text-[#D18BFF]"
              )}>
                {post.category}
              </span>
              <span className="text-muted">{post.readTime}</span>
            </div>
            <h3 className="mb-4 font-mono text-xl font-bold text-primary">
              {post.title}
            </h3>
            <p className="mb-6 line-clamp-4 font-mono text-sm leading-relaxed text-muted">
              {post.description}
            </p>
            <a
              href="#"
              className="inline-block border border-primary px-4 py-2 font-mono text-sm text-primary transition-colors hover:bg-primary hover:text-background"
            >
              Read the blog
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
