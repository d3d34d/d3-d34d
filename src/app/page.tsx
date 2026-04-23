import { Hero } from "@/components/Hero";
import { ProfileSection } from "@/components/ProfileSection";

export default function Home() {
  return (
    // Header and Footer are in layout.tsx (shared across all pages)
    <div id="homepage" className="mx-auto w-full max-w-[1440px] px-4 lg:px-[110px]">
      {/* Hero: edit src/content/hero.config.ts */}
      <Hero />
      {/* Profile: edit src/content/profile.config.ts */}
      <ProfileSection />
    </div>
  );
}
