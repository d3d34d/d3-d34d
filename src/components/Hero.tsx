"use client";

import React from "react";
import { motion } from "framer-motion";
import { heroConfig } from "@/content/hero.config";
import { InteractivePongHero } from "./InteractivePongHero";

export const Hero = () => {
  return (
    <motion.section
      id="hero-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mx-auto my-10 flex min-h-[280px] w-full max-w-[700px] flex-col items-center justify-center border-[3px] border-double border-primary bg-background p-10 shadow-[0_0_15px_rgba(0,255,156,0.2)] lg:my-[40px] relative overflow-hidden"
    >
      <InteractivePongHero 
        subtitle={heroConfig.subtitle} 
      />
    </motion.section>
  );
};
