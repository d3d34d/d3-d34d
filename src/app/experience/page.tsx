import { experienceConfig } from "@/content/experience/index";

export const metadata = {
  title: "Experience | CLIfolio",
  description: "Work history and professional experience.",
};

export default function ExperiencePage() {
  return (
    <main id="experience-page" className="mx-auto w-full max-w-[1440px] px-4 py-16 lg:px-[110px]">

      {/* ── Page Heading ──────────────────────────────────────── */}
      {/* Edit: src/content/experience/index.ts → heading / subheading */}
      <h1 id="experience-heading" className="mb-4 font-mono text-[32px] font-bold text-primary">
        {`> experience`}
      </h1>
      <p id="experience-subheading" className="mb-16 font-mono text-muted-foreground">
        {experienceConfig.subheading}
      </p>

      {/* ── Timeline ──────────────────────────────────────────── */}
      {/* Edit roles: src/content/experience/index.ts → roles[]  */}
      <div id="experience-timeline" className="relative space-y-0">

        {/* Vertical timeline line */}
        <div className="absolute left-0 top-0 hidden h-full w-px bg-primary/20 md:block" aria-hidden="true" />

        {experienceConfig.roles.map((role, index) => (
          <div
            key={`${role.company}-${role.startDate}`}
            id={`experience-role-${index}`}
            className="relative pb-12 md:pl-10"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[5px] top-[6px] hidden h-[10px] w-[10px] rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,156,0.6)] md:block" />

            {/* Role card */}
            <div className="border border-primary/30 bg-background p-6 transition-colors hover:border-primary">

              {/* Header row */}
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  {/* Job title — edit: roles[].title */}
                  <h2 id={`role-title-${index}`} className="font-mono text-xl font-bold text-primary">
                    {role.title}
                  </h2>
                  {/* Company — edit: roles[].company + companyUrl */}
                  <a
                    href={role.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`role-company-${index}`}
                    className="font-mono text-secondary hover:underline"
                  >
                    {role.company}
                  </a>
                </div>

                {/* Dates + location + type */}
                <div className="text-right font-mono text-sm text-muted-foreground">
                  <div id={`role-dates-${index}`}>
                    {role.startDate} – {role.endDate}
                  </div>
                  <div>{role.location} · {role.type}</div>
                </div>
              </div>

              {/* Summary — edit: roles[].summary */}
              <p id={`role-summary-${index}`} className="mb-4 font-mono text-sm leading-relaxed text-muted-foreground">
                {role.summary}
              </p>

              {/* Achievements — edit: roles[].achievements[] */}
              <ul id={`role-achievements-${index}`} className="mb-4 space-y-1">
                {role.achievements.map((item, i) => (
                  <li key={i} className="flex gap-2 font-mono text-sm text-muted-foreground">
                    <span className="text-primary shrink-0">{"▶"}</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Tech stack — edit: roles[].stack[] */}
              <div id={`role-stack-${index}`} className="flex flex-wrap gap-2">
                {role.stack.map((tech) => (
                  <span key={tech} className="border border-primary/30 px-2 py-0.5 font-mono text-xs text-primary">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}
