"use client";

import { siteConfig } from "@/content/site.config";
import { allPosts } from "@/content/blog/index";
import { MatrixHoverText } from "@/components/MatrixHoverText";
import { motion } from "motion/react";
import Image from "next/image";

const categoryColorMap: Record<string, string> = {
  blue:   "bg-[#1D2433] text-[#8BBDFF] border-[#8BBDFF]/20",
  yellow: "bg-[#332B1D] text-[#FFB800] border-[#FFB800]/20",
  purple: "bg-[#2B1D33] text-[#D18BFF] border-[#D18BFF]/20",
  green:  "bg-primary/10 text-primary border-primary/20",
};

export default function BlogPage() {
  return (
    <main id="blog-page" className="mx-auto w-full max-w-[1440px] px-4 py-24 lg:px-[110px]">

      {/* ── Terminal Header ───────────────────────────────────── */}
      <div className="mb-12 flex items-center gap-2 font-mono text-lg md:text-xl animate-in fade-in slide-in-from-left duration-500">
        <span className="text-primary font-bold">{siteConfig.terminalPath}</span>
        <span className="text-foreground italic">
          <MatrixHoverText text="fetch --logs" />
        </span>
        <span className="w-2 h-5 bg-primary animate-pulse ml-1" />
      </div>

      {/* ── Page Heading ──────────────────────────────────────── */}
      <div className="mb-20 space-y-6">
        <h1 className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          <MatrixHoverText text="Threat_Intelligence_Reports" />
        </h1>
        <p id="blog-page-description" className="font-mono text-foreground/60 lg:max-w-[800px] text-lg leading-relaxed">
          Critical insights into the evolving landscape of autonomous cyber threats, quantum decryption, and digital infrastructure resilience. Stay ahead of the perimeter with our deep-dive analysis.
        </p>
      </div>

      {/* ── All Blog Posts Grid ────────────────────────────────── */}
      <div id="blog-page-grid" className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {allPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col bg-[#0B0E0E] border border-white/5 hover:border-primary/40 transition-all duration-500 rounded-2xl overflow-hidden"
          >
            {/* Thumbnail Container */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={post.thumbnail || "/images/blog/placeholder.png"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E0E] via-transparent to-transparent opacity-60" />
              
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]" />
            </div>

            <div className="flex flex-col flex-1 p-8">
              {/* Top Row: Category & Read Time */}
              <div className="mb-6 flex items-center justify-between">
                <span className={`rounded-full px-4 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em] border ${categoryColorMap[post.categoryColor] ?? categoryColorMap.green}`}>
                  {post.category}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-[0.2em]">
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h2 className="mb-4 font-mono text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                <MatrixHoverText text={post.title} />
              </h2>

              {/* Excerpt */}
              <p className="mb-8 flex-1 font-mono text-sm leading-relaxed text-muted-foreground/70">
                {post.excerpt}
              </p>

              {/* Action Button */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground/30">{post.date}</span>
                <a
                  href={post.url}
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold text-primary transition-all hover:gap-3 group/link"
                >
                  <MatrixHoverText text="ACCESS_REPORT" />
                  <span className="text-lg">→</span>
                </a>
              </div>
            </div>

            {/* Hover Corner Decoration */}
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
              <div className="absolute top-2 right-2 w-full h-[1px] bg-primary/0 group-hover:bg-primary/40 transition-all" />
              <div className="absolute top-2 right-2 h-full w-[1px] bg-primary/0 group-hover:bg-primary/40 transition-all" />
            </div>
          </motion.article>
        ))}
      </div>

    </main>
  );
}
