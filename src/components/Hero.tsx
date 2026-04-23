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
      className="mx-auto my-10 flex min-h-[280px] w-full max-w-[700px] flex-col items-center justify-center bg-transparent relative overflow-hidden"
    >
      <InteractivePongHero 
        subtitle={heroConfig.subtitle} 
      />
    </motion.section>
  );
};
