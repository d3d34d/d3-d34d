"use client";

import React from "react";
import { motion } from "framer-motion";
import { heroConfig } from "@/content/hero.config";
import { PongSubtitle } from "./PongSubtitle";

export const Hero = () => {
  return (
    <motion.section
      id="hero-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mx-auto my-10 flex w-full max-w-[800px] flex-col items-center justify-center gap-6 border-[3px] border-double border-primary bg-background p-10 shadow-[0_0_15px_rgba(0,255,156,0.2)] lg:my-[40px]"
    >
      {/* ── ASCII Art ──────────────────────────────────────────── */}
      {/* Edit: src/content/hero.config.ts → asciiArt */}
      <pre
        id="hero-ascii-art"
        className="overflow-x-auto whitespace-pre font-mono text-[10px] leading-tight text-primary sm:text-[14px]"
      >
        {heroConfig.asciiArt}
      </pre>

      {/* ── Subtitle (Interactive Pong Game) ───────────────────── */}
      {/* Edit: src/content/hero.config.ts → subtitle */}
      <PongSubtitle text={heroConfig.subtitle} />
    </motion.section>
  );
};
