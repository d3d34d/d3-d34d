import Image from "next/image";
import { siteConfig } from "@/content/site.config";
import { aboutConfig } from "@/content/about.config";
import { Download, Terminal, ChevronRight } from "lucide-react";
import { MatrixHoverText } from "@/components/MatrixHoverText";

export const metadata = {
  title: `About | ${aboutConfig.name}`,
  description: `Learn about ${aboutConfig.name} — ${aboutConfig.title}.`,
};

export default function AboutPage() {
  return (
    <main id="about-page" className="mx-auto w-full max-w-[1200px] px-6 py-12 lg:px-12">
      
      {/* ── Terminal Header ───────────────────────────────────── */}
      <div className="mb-12 flex items-center gap-2 font-mono text-lg md:text-xl animate-in fade-in slide-in-from-left duration-500">
        <span className="text-primary font-bold"><MatrixHoverText text={siteConfig.terminalPath} /></span>
        <span className="text-foreground"><MatrixHoverText text="About" /></span>
        <span className="w-2 h-5 bg-primary animate-pulse ml-1" />
      </div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        
        {/* ── Left Column: Bio & Expertise (8 cols) ─────────── */}
        <div className="lg:col-span-7 space-y-16">
          
          {/* Bio Section (Terminal Window Style) */}
          <section id="about-bio" className="relative group animate-in fade-in slide-in-from-bottom duration-700 delay-150">
            <div className="overflow-hidden rounded-lg border border-border bg-muted/20 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_30px_rgba(0,255,156,0.05)]">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between bg-muted/40 px-4 py-2 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40 group-hover:bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40 group-hover:bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/40 group-hover:bg-green-500/60" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  <Terminal className="w-3 h-3" />
                  <MatrixHoverText text="bio.md" />
                </div>
              </div>
              {/* Content */}
              <div className="p-6 md:p-8">
                {aboutConfig.bio.map((paragraph, i) => (
                  <p key={i} className="font-mono text-muted-foreground leading-relaxed text-sm md:text-base selection:bg-primary selection:text-background">
                    <MatrixHoverText text={paragraph} />
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Expertise Section */}
          <section id="about-expertise" className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-[1px] flex-1 bg-border" />
              <h3 className="font-mono text-lg font-bold text-foreground uppercase tracking-tighter flex items-center gap-2">
                <span className="text-primary"><MatrixHoverText text="01." /></span> <MatrixHoverText text="Core Expertise" />
              </h3>
              <div className="h-[1px] w-12 bg-border" />
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {aboutConfig.expertise.map((item, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <span className="mt-1 text-primary">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="font-mono text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors">
                    <MatrixHoverText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tech Stack Section */}
          <section id="about-tech-stack" className="animate-in fade-in slide-in-from-bottom duration-700 delay-450">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-[1px] flex-1 bg-border" />
              <h3 className="font-mono text-lg font-bold text-foreground uppercase tracking-tighter flex items-center gap-2">
                <span className="text-primary"><MatrixHoverText text="02." /></span> <MatrixHoverText text="Tech Stack" />
              </h3>
              <div className="h-[1px] w-12 bg-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {aboutConfig.skillCategories.map((cat, idx) => (
                <div 
                  key={cat.category} 
                  className="p-6 rounded-lg border border-border bg-muted/5 hover:bg-muted/10 transition-all group relative overflow-hidden"
                >
                  {/* Subtle Background Glow */}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded bg-muted/20 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {cat.icon}
                    </div>
                    <div>
                      <h4 className="font-mono font-bold text-foreground uppercase tracking-wider text-xs">
                        <MatrixHoverText text={cat.category} />
                      </h4>
                      <div className="h-0.5 w-6 bg-primary/30 mt-1" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 rounded bg-muted/40 border border-border/50 font-mono text-[10px] md:text-xs text-muted-foreground hover:text-primary hover:border-primary/50 transition-all cursor-default"
                      >
                        <MatrixHoverText text={skill} />
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Right Column: Photo & Stats (5 cols) ──────────── */}
        <div className="lg:col-span-5 space-y-16">
          
          {/* Profile Photo Card */}
          <div id="about-photo" className="relative group animate-in fade-in slide-in-from-right duration-700 delay-200">
            <div className="relative p-2 rounded-xl bg-muted/10 border border-border overflow-hidden">
              {/* Scanner Line Effect */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/30 shadow-[0_0_10px_rgba(0,255,156,0.5)] z-20 animate-scan pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src={aboutConfig.profileImage}
                  alt={aboutConfig.profileImageAlt}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>
            {/* Metadata overlay */}
            <div className="mt-4 flex justify-between items-center px-2 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                <MatrixHoverText text="profile_01.jpg" />
              </span>
              <span><MatrixHoverText text="73.2 KB" /></span>
            </div>
          </div>

          {/* Education & Certs */}
          <section id="about-education" className="animate-in fade-in slide-in-from-right duration-700 delay-400">
             <div className="flex items-center gap-3 mb-8">
              <h3 className="font-mono text-lg font-bold text-foreground uppercase tracking-tighter">
                <MatrixHoverText text="Education" />
              </h3>
              <div className="h-[1px] flex-1 bg-border" />
            </div>
            <div className="space-y-8">
              {aboutConfig.education.map((edu, i) => (
                <div key={i} className="group flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full border border-primary bg-background z-10 group-hover:bg-primary transition-colors" />
                    {i !== aboutConfig.education.length - 1 && (
                      <div className="w-[1px] flex-1 bg-border mt-2" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="font-mono text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      <MatrixHoverText text={edu.degree} />
                    </p>
                    <p className="font-mono text-xs text-muted-foreground mt-1 flex items-center gap-2">
                      <MatrixHoverText text={edu.institution} /> 
                      {edu.year && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 border border-border">
                          <MatrixHoverText text={edu.year} />
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Action: Resume */}
          <div className="pt-4 animate-in fade-in slide-in-from-right duration-700 delay-600">
            <a 
              href={aboutConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-5 bg-foreground text-background font-mono font-bold rounded-lg hover:bg-primary transition-all duration-300 group shadow-lg hover:shadow-primary/20 hover:-translate-y-1 active:translate-y-0"
            >
              <Download className="w-5 h-5 group-hover:bounce transition-transform" />
              <MatrixHoverText text="DOWNLOAD_RESUME.PDF" />
            </a>
            <div className="mt-4 flex flex-col items-center gap-1">
              <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.3em]">
                <MatrixHoverText text={`System Update: ${aboutConfig.resumeUpdated}`} />
              </p>
              <div className="h-1 w-24 bg-muted/30 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-2/3" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
