"use client";

import React from "react";
import { motion } from "framer-motion";
import { type ProjectStat } from "@/content/projects/index";

interface StatsProps {
  stats: ProjectStat[];
}

// Color map for stat values
const valueColor = "#00E3FF";

import { SpecialText } from "./ui/special-text";

export const Stats = ({ stats }: StatsProps) => {
  return (
    // ── Stats Grid ────────────────────────────────────────────
    // Edit stats: src/content/projects/[project-name]/config.ts → stats[]
    <div id="project-stats-grid" className="grid w-full grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          id={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex min-h-[120px] flex-col items-center justify-center border border-primary/20 bg-card-bg p-6 text-center transition-colors hover:border-primary"
        >
          {/* Stat value (e.g. "$240.5M") */}
          <span className="mb-2 font-mono text-2xl font-bold" style={{ color: valueColor }}>
            <SpecialText triggerOnHover={true}>{stat.value}</SpecialText>
          </span>
          {/* Stat label (e.g. "TVL") */}
          <span className="font-mono text-sm uppercase text-muted-foreground">
            <SpecialText triggerOnHover={true}>{stat.label}</SpecialText>
          </span>
        </motion.div>
      ))}
    </div>
  );
};
