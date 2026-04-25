import Image from "next/image";
import { aboutConfig } from "@/content/about.config";

export const metadata = {
  title: "About | Dhebobrotha Dhibo",
  description: "Learn about Dhebobrotha Dhibo — Cybersecurity Analyst.",
};

export default function AboutPage() {
  return (
    <main id="about-page" className="mx-auto w-full max-w-[1440px] px-4 py-16 lg:px-[110px]">

      {/* ── Page Heading ──────────────────────────────────────── */}
      <h1 id="about-heading" className="mb-12 font-mono text-[32px] font-bold text-primary">
        {`> about`}
      </h1>

      <div className="flex flex-col gap-16 lg:flex-row">

        {/* ── Left: Profile Image ───────────────────────────────── */}
        {/* Replace: public/content/profile.jpg                      */}
        <div id="about-photo" className="flex flex-col items-center lg:items-start">
          <div className="relative h-64 w-64 overflow-hidden border-[3px] border-primary shadow-[0_0_20px_rgba(0,255,156,0.2)]">
            <Image
              src={aboutConfig.profileImage}
              alt={aboutConfig.profileImageAlt}
              fill
              className="object-cover"
            />
          </div>
          {/* Name + Title below photo */}
          <div className="mt-4 text-center lg:text-left">
            <p id="about-greeting" className="font-mono text-muted-foreground">{aboutConfig.greeting}</p>
            <h2 id="about-name" className="font-mono text-2xl font-bold text-primary">{aboutConfig.name}</h2>
            <p id="about-title" className="font-mono text-secondary">{aboutConfig.title}</p>
          </div>
        </div>

        {/* ── Right: Bio + Skills ───────────────────────────────── */}
        <div className="flex-1">

          {/* Bio — edit: src/content/about.config.ts → bio[] */}
          <div id="about-bio" className="mb-10 space-y-4">
            {aboutConfig.bio.map((paragraph, i) => (
              <p key={i} className="font-mono leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Skills — edit: src/content/about.config.ts → skillCategories[] */}
          <div id="about-skills">
            <h3 className="mb-6 font-mono text-xl font-bold text-primary">
              {`// tech_stack`}
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {aboutConfig.skillCategories.map((cat) => (
                <div key={cat.category} id={`skill-category-${cat.category.toLowerCase()}`}>
                  <h4 className="mb-3 font-mono text-sm text-secondary uppercase tracking-wider">
                    {cat.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="border border-primary/30 px-2 py-1 font-mono text-xs text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
