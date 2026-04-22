"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalIcon } from "./icons";
import { Stats } from "./Stats";

const featuredProject = {
  title: "DeFiVault Protocol",
  description: "Explore my journey as a Senior Web3 Developer specializing in blockchain technologies, DeFi protocols, and decentralized applications.",
  tags: ["DeFi", "Security"],
  image: "/images/project-1.jpg",
  liveUrl: "#",
  codeUrl: "#",
};

const otherProjects = [
  {
    title: "Project Alpha",
    description: "A decentralized exchange aggregator with low slippage.",
    tags: ["Solidity", "React"],
    image: "/images/project-2.jpg",
  },
  {
    title: "Project Beta",
    description: "NFT marketplace for digital artists with royalty support.",
    tags: ["ERC-721", "Next.js"],
    image: "/images/project-3.jpg",
  },
];

export const ProjectGrid = () => {
  return (
    <section className="py-[60px]">
      <h2 className="mb-10 font-mono text-[32px] font-bold text-primary">
        Featured Projects
      </h2>

      {/* Featured Project Card (Large) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 overflow-hidden border border-primary bg-background shadow-[0_0_15px_rgba(0,255,156,0.1)]"
      >
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-1 flex-col p-8 lg:p-10">
            <h3 className="mb-4 font-mono text-3xl font-bold text-primary">
              {featuredProject.title}
            </h3>
            <div className="mb-6 flex gap-2">
              {featuredProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[4px] border border-secondary bg-secondary/10 px-2 py-1 font-mono text-xs text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mb-8 font-mono text-muted lg:max-w-[400px]">
              {featuredProject.description}
            </p>
            <div className="mt-auto flex gap-4">
              <a
                href={featuredProject.liveUrl}
                className="flex items-center gap-2 bg-primary px-6 py-3 font-mono font-bold text-background transition-opacity hover:opacity-90"
              >
                <ExternalIcon className="h-4 w-4" />
                Live Demo
              </a>
              <a
                href={featuredProject.codeUrl}
                className="flex items-center gap-2 border border-primary px-6 py-3 font-mono font-bold text-primary transition-colors hover:bg-primary/10"
              >
                Code
              </a>
            </div>
          </div>
          <div className="flex-1 border-t border-primary p-8 lg:border-l lg:border-t-0">
            <Stats />
          </div>
        </div>
      </motion.div>

      {/* Other Projects Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {otherProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group flex flex-col border border-primary bg-card-bg transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,156,0.2)]"
          >
            <div className="relative aspect-video w-full overflow-hidden border-b border-primary">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h4 className="mb-2 font-mono text-xl font-bold text-primary">
                {project.title}
              </h4>
              <div className="mb-4 flex gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-secondary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="font-mono text-sm text-muted">
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
