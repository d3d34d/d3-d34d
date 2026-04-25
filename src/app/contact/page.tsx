import { contactConfig } from "@/content/contact.config";

export const metadata = {
  title: "Contact | Dhebobrotha Dhibo",
  description: "Get in touch with Dhebobrotha Dhibo.",
};

export default function ContactPage() {
  return (
    <main id="contact-page" className="mx-auto w-full max-w-[1440px] px-4 py-16 lg:px-[110px]">

      {/* ── Page Heading ──────────────────────────────────────── */}
      {/* Edit: src/content/contact.config.ts → heading / subheading */}
      <h1 id="contact-heading" className="mb-4 font-mono text-[32px] font-bold text-primary">
        {`> contact`}
      </h1>

      <div className="max-w-2xl">

        {/* Availability badge */}
        <div id="contact-availability-badge" className="mb-6 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-sm text-primary">
          {contactConfig.availabilityBadge}
        </div>

        {/* Subheading */}
        <p id="contact-subheading" className="mb-4 font-mono text-xl text-muted-foreground">
          {contactConfig.subheading}
        </p>

        {/* Availability note */}
        <p id="contact-availability-note" className="mb-12 font-mono text-sm text-muted-foreground">
          {contactConfig.availabilityNote}
        </p>

        {/* ── Email CTA ─────────────────────────────────────────── */}
        {/* Edit: src/content/contact.config.ts → email / emailLabel */}
        <div id="contact-email-section" className="mb-12 border border-primary p-6">
          <p className="mb-1 font-mono text-xs text-muted-foreground uppercase tracking-wider">Email</p>
          <a
            href={`mailto:${contactConfig.email}`}
            id="contact-email-link"
            className="font-mono text-xl text-primary hover:underline"
          >
            {contactConfig.email}
          </a>
          <div className="mt-4">
            <a
              href={`mailto:${contactConfig.email}`}
              className="inline-block bg-primary px-6 py-3 font-mono font-bold text-background transition-opacity hover:opacity-90"
            >
              {contactConfig.emailLabel}
            </a>
          </div>
        </div>

        {/* ── Social Links ──────────────────────────────────────── */}
        {/* Edit: src/content/contact.config.ts → socials[] */}
        <div id="contact-socials">
          <h2 className="mb-4 font-mono text-sm text-muted-foreground uppercase tracking-wider">
            {`// elsewhere`}
          </h2>
          <div className="flex flex-col gap-3">
            {contactConfig.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                id={`contact-social-${social.platform.toLowerCase().replace(/\s+/g, "-")}`}
                className="group flex items-center justify-between border border-primary/30 p-4 transition-colors hover:border-primary"
              >
                <span className="font-mono text-muted-foreground">{social.platform}</span>
                <span className="font-mono text-primary group-hover:underline">{social.handle}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
