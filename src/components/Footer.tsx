"use client";

import React from "react";
import { siteConfig } from "@/content/site.config";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="site-footer" className="w-full border-t border-primary bg-background py-6">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between px-4 font-mono text-[14px] text-muted-foreground md:flex-row lg:px-[110px]">

        {/* ── Copyright ─────────────────────────────────────────── */}
        {/* Edit: src/content/site.config.ts → footerCopyright */}
        <div id="footer-copyright" className="mb-4 md:mb-0">
          © {siteConfig.footerCopyright} | {currentYear}
        </div>

        {/* ── Version Tag ───────────────────────────────────────── */}
        {/* Edit: src/content/site.config.ts → footerVersion */}
        <div
          id="footer-version"
          className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-primary"
        >
          {siteConfig.footerVersion}
        </div>

      </div>
    </footer>
  );
};
