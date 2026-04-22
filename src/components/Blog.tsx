"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { allPosts } from "@/content/blog/index";

// Category tag color map
const categoryColorMap: Record<string, string> = {
  blue:   "bg-[#1D2433] text-[#8BBDFF]",
  yellow: "bg-[#332B1D] text-[#FFB800]",
  purple: "bg-[#2B1D33] text-[#D18BFF]",
  green:  "bg-primary/10 text-primary",
};

export const Blog = () => {
  return (
    <section id="blog-section" className="py-[60px]">

      {/* ── Section Heading ───────────────────────────────────── */}
      {/* The blinking | is a terminal-style cursor */}
      <div className="mb-10">
        <h2 id="blog-heading" className="flex items-center font-mono text-[24px] font-bold text-primary">
          Latest Blog Posts
          <span id="blog-cursor" className="ml-2 animate-pulse text-primary" aria-hidden="true">|</span>
        </h2>

        {/* ── Section description ─────────────────────────────── */}
        {/* Edit: hardcoded below — change to suit your blog */}
        <p id="blog-description" className="mt-4 font-mono text-muted-foreground lg:max-w-[800px]">
          Insights and updates on Web3, blockchain innovations, and modern web development trends. Exploring decentralized technologies, coding best practices, and the future of the internet through hands-on experience.
        </p>
      </div>

      {/* ── Blog Post Cards ───────────────────────────────────── */}
      {/* Edit posts: src/content/blog/[post-slug]/config.ts     */}
      {/* Add/remove: src/content/blog/index.ts                  */}
      <div id="blog-posts-grid" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {allPosts.map((post, index) => (
          <motion.article
            key={post.id}
            id={`blog-card-${post.id}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group border border-primary p-8 transition-colors hover:bg-primary/5"
          >
            {/* ── Meta row: category + read time ───────────────── */}
            <div className="mb-6 flex items-center justify-between font-mono text-sm">
              {/* Category badge — edit: config.ts → category + categoryColor */}
              <span
                id={`post-category-${post.id}`}
                className={cn(
                  "rounded-[4px] px-2 py-0.5",
                  categoryColorMap[post.categoryColor] ?? categoryColorMap.green
                )}
              >
                {post.category}
              </span>

              {/* Read time — edit: config.ts → readTime */}
              <span id={`post-readtime-${post.id}`} className="text-muted-foreground">
                {post.readTime}
              </span>
            </div>

            {/* Post title — edit: config.ts → title */}
            <h3 id={`post-title-${post.id}`} className="mb-4 font-mono text-xl font-bold text-primary">
              {post.title}
            </h3>

            {/* Post excerpt — edit: config.ts → excerpt */}
            <p id={`post-excerpt-${post.id}`} className="mb-6 line-clamp-4 font-mono text-sm leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>

            {/* Read more link — edit: config.ts → url */}
            <a
              href={post.url}
              id={`post-link-${post.id}`}
              className="inline-block border border-primary px-4 py-2 font-mono text-sm text-primary transition-colors hover:bg-primary hover:text-background"
            >
              Read the blog
            </a>
          </motion.article>
        ))}
      </div>

    </section>
  );
};
