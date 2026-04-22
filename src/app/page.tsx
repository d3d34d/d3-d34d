import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Blog } from "@/components/Blog";

export default function Home() {
  return (
    // Header and Footer are in layout.tsx (shared across all pages)
    <div id="homepage" className="mx-auto w-full max-w-[1440px] px-4 lg:px-[110px]">
      {/* Hero: edit src/content/hero.config.ts */}
      <Hero />
      {/* Projects: edit src/content/projects/ */}
      <ProjectGrid />
      {/* Blog: edit src/content/blog/ */}
      <Blog />
    </div>
  );
}
