"use client";

import { siteConfig } from "@/content/site.config";
import { experienceConfig } from "@/content/experience/index";
import { MatrixHoverText } from "@/components/MatrixHoverText";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

export default function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main id="experience-page" ref={containerRef} className="mx-auto w-full max-w-[1440px] px-4 py-24 lg:px-[110px]">

      {/* ── Terminal Header ───────────────────────────────────── */}
      <div className="mb-12 flex items-center gap-2 font-mono text-lg md:text-xl animate-in fade-in slide-in-from-left duration-500">
        <span className="text-primary font-bold">{siteConfig.terminalPath}</span>
        <span className="text-foreground italic">
          <MatrixHoverText text="profile --history" />
        </span>
        <span className="w-2 h-5 bg-primary animate-pulse ml-1" />
      </div>

      {/* ── Page Heading Subheading ───────────────────────────── */}
      <div className="mb-20 space-y-6">
        <h1 className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          <MatrixHoverText text="Professional_Operations" />
        </h1>
        <p id="experience-subheading" className="font-mono text-foreground/60 lg:max-w-[800px] text-lg leading-relaxed">
          {experienceConfig.subheading}
        </p>
      </div>

      {/* ── Timeline ──────────────────────────────────────────── */}
      <div id="experience-timeline" className="relative space-y-12">

        {/* Vertical timeline line (Static base) */}
        <div className="absolute left-0 top-0 hidden h-full w-px bg-white/5 md:block" aria-hidden="true" />
        
        {/* Progressing timeline line (Animated) */}
        <motion.div 
          style={{ scaleY }}
          className="absolute left-0 top-0 hidden w-px bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top md:block h-full z-10" 
          aria-hidden="true" 
        />

        {experienceConfig.roles.map((role, index) => (
          <motion.div
            key={`${role.company}-${role.startDate}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
            id={`experience-role-${index}`}
            className="relative pb-12 md:pl-12"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[5px] top-2 hidden h-[11px] w-[11px] rounded-full bg-primary shadow-[0_0_15px_rgba(0,255,156,0.8)] md:block border-2 border-[#0A0A0A] z-20" />

            {/* Role card */}
            <div className="group relative border border-white/5 bg-[#0B0E0E]/50 p-8 transition-all duration-500 hover:border-primary/30 rounded-2xl backdrop-blur-sm overflow-hidden">
              
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="font-mono text-4xl font-bold text-primary italic">0{index + 1}</span>
              </div>

              {/* Header row */}
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <h2 id={`role-title-${index}`} className="font-mono text-2xl font-bold text-foreground">
                    <MatrixHoverText text={role.title} />
                  </h2>
                  <a
                    href={role.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`role-company-${index}`}
                    className="inline-block font-mono text-primary/80 hover:text-primary transition-colors text-sm uppercase tracking-[0.1em]"
                  >
                    {role.company}
                  </a>
                </div>

                <div className="text-left sm:text-right font-mono text-xs space-y-1">
                  <div id={`role-dates-${index}`} className="text-foreground font-bold tracking-widest">
                    {role.startDate.toUpperCase()} — {role.endDate.toUpperCase()}
                  </div>
                  <div className="text-muted-foreground/50 uppercase tracking-wider">{role.location} · {role.type}</div>
                </div>
              </div>

              {/* Summary */}
              <p id={`role-summary-${index}`} className="mb-8 font-mono text-[15px] leading-relaxed text-foreground/70 italic border-l-2 border-white/5 pl-6">
                {role.summary}
              </p>

              {/* Achievements */}
              <ul id={`role-achievements-${index}`} className="mb-10 space-y-4">
                {role.achievements.map((item, i) => (
                  <li key={i} className="flex gap-4 font-mono text-sm text-foreground/60 leading-relaxed group/item">
                    <span className="text-primary shrink-0 opacity-50 group-hover/item:opacity-100 transition-opacity">▶</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tech stack */}
              <div id={`role-stack-${index}`} className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                {role.stack.map((tech) => (
                  <span key={tech} className="rounded-md bg-white/[0.03] border border-white/5 px-3 py-1 font-mono text-[10px] text-primary/70 uppercase tracking-widest hover:bg-primary/5 hover:text-primary transition-all duration-300">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Terminal ID Decoration */}
              <div className="absolute bottom-4 right-4 font-mono text-[8px] text-muted-foreground/10 uppercase tracking-[0.5em] pointer-events-none">
                OP_SEC_TRACE_{role.company.substring(0, 3).toUpperCase()}_{role.startDate.substring(0, 4)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </main>
  );
}
