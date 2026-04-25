"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { profileConfig } from "@/content/profile.config";
import { siteConfig } from "@/content/site.config";
import { ScrambleText } from "./ScrambleText";


const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = React.useState("");

  React.useEffect(() => {
    let i = 0;
    const startTimeout = setTimeout(() => {
      const timer = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i === text.length) clearInterval(timer);
      }, 50);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return <span>{displayedText}</span>;
};

export const ProfileSection = () => {
  const [animationKey, setAnimationKey] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="profile-info-section" className="mx-auto mb-20 flex w-full flex-col gap-10 md:flex-row md:items-start md:justify-between lg:mb-[100px]">
      {/* ── Left Side: Text Info ────────────────────────────────── */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-8 md:max-w-[60%]"
      >
        {/* Info List - Terminal Style */}
        <div 
          key={animationKey}
          className="relative p-4 rounded-lg bg-black/70 border border-primary/20 backdrop-blur-sm max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs font-mono text-primary/70 ml-2">{siteConfig.terminalPath}</span>
          </div>

          <div className="flex flex-col gap-2 font-mono text-sm md:text-base">
            <p className="text-primary font-bold mb-1">
              <TypewriterText text="Portfolio Information:" />
              <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, times: [0, 0.5, 0.51, 1], ease: "linear" }}
                className="ml-1 inline-block h-[1em] w-[6px] bg-primary align-middle"
              />
            </p>
            {profileConfig.details.map((detail, idx) => (
              <div key={detail.label} className="flex flex-col">
                <span className="text-primary/70 text-xs md:text-sm leading-tight">
                  <ScrambleText text={detail.label} delay={400 + idx * 100} />:
                </span>
                <span className="text-foreground leading-tight">
                  <ScrambleText text={detail.value} delay={600 + idx * 100} />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Welcome Message */}
        <div className="flex flex-col gap-4">
          <h2 className="font-mono text-xl font-bold text-primary">
            {profileConfig.welcomeTitle}
          </h2>
          <p className="font-mono text-base leading-relaxed text-foreground/80">
            {profileConfig.welcomeDescription}
          </p>
        </div>
      </motion.div>

      {/* ── Right Side: Profile Image ───────────────────────────── */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative h-[280px] w-[240px] shrink-0 self-center md:self-start"
      >
        <div className="absolute inset-0 border border-primary/30 shadow-[0_0_20px_rgba(0,255,156,0.15)]" />
        <div className="relative h-full w-full overflow-hidden grayscale contrast-125 brightness-90 sepia-[0.3] hue-rotate-[100deg]">
          <Image
            src={profileConfig.imagePath}
            alt={profileConfig.imageAlt}
            fill
            className="object-cover"
            priority
          />
          {/* Scanline overlay for that terminal look */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        </div>
      </motion.div>
    </section>
  );
};
