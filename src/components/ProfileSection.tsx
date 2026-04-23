"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { profileConfig } from "@/content/profile.config";
import { ScrambleText } from "./ScrambleText";

const LocalRainingLetters = () => {
  const [chars, setChars] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    const newChars = Array.from({ length: 20 }).map(() => ({
      char: symbols[Math.floor(Math.random() * symbols.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      speed: 0.2 + Math.random() * 0.5,
      opacity: 0.1 + Math.random() * 0.3,
    }));
    setChars(newChars);
    
    let frame: number;
    const animate = () => {
      setChars(prev => prev.map(c => ({
        ...c,
        top: c.top >= 100 ? -5 : c.top + c.speed,
        char: Math.random() < 0.05 ? symbols[Math.floor(Math.random() * symbols.length)] : c.char
      })));
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      {chars.map((c, i) => (
        <span 
          key={i} 
          className="absolute text-[10px] font-mono text-primary/40"
          style={{ left: `${c.left}%`, top: `${c.top}%` }}
        >
          {c.char}
        </span>
      ))}
    </div>
  );
};

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
  return (
    <section id="profile-info-section" className="mx-auto mb-20 flex w-full flex-col gap-10 md:flex-row md:items-start md:justify-between lg:mb-[100px]">
      {/* ── Left Side: Text Info ────────────────────────────────── */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-8 md:max-w-[60%]"
      >
        {/* Info List */}
        <div className="relative flex flex-col gap-4 overflow-hidden border border-primary/20 bg-primary/5 p-6 backdrop-blur-sm">
          <LocalRainingLetters />
          <h3 className="relative flex items-center font-mono text-lg font-bold text-secondary">
            <span className="mr-2 text-primary">{">"}</span>
            <TypewriterText text={profileConfig.infoTitle} />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "steps(2)" }}
              className="ml-1 inline-block h-[1.2em] w-[8px] bg-secondary align-middle"
            />
          </h3>
          <div className="relative flex flex-col gap-2 font-mono text-base">
            {profileConfig.details.map((detail, idx) => (
              <div key={detail.label} className="flex gap-2">
                <span className="text-primary/70">
                  <ScrambleText text={detail.label} delay={400 + idx * 100} />:
                </span>
                <span className="text-foreground">
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
