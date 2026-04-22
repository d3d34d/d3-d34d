"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/site.config";
import { HomeIcon, AboutIcon, ProjectsIcon, ExperienceIcon, BlogIcon, ContactIcon } from "./icons";

// Map nav link names to their icons
const iconMap: Record<string, React.ElementType> = {
  About:      AboutIcon,
  Projects:   ProjectsIcon,
  Experience: ExperienceIcon,
  Blog:       BlogIcon,
  Contact:    ContactIcon,
};

export const Header = () => {
  const pathname = usePathname();

  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 h-[76px] w-full border-b border-primary bg-background/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 lg:px-[110px]">

        {/* ── Terminal Path (left) ──────────────────────────────── */}
        {/* Edit: src/content/site.config.ts → terminalPath */}
        <div className="hidden items-center font-mono text-sm text-primary md:flex">
          <Link href="/" className="hover:opacity-80">
            <span className="opacity-60">{">. "}</span>
            {siteConfig.terminalPath}
          </Link>
        </div>

        {/* Mobile home icon */}
        <div className="flex md:hidden">
          <Link href="/">
            <HomeIcon className="h-5 w-5 text-primary" />
          </Link>
        </div>

        {/* ── Navigation (center) ──────────────────────────────── */}
        {/* Edit: src/content/site.config.ts → navLinks */}
        <nav id="site-nav" className="flex items-center gap-4 lg:gap-8">
          {siteConfig.navLinks.map((link) => {
            const Icon = iconMap[link.name] ?? HomeIcon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                id={`nav-link-${link.name.toLowerCase()}`}
                className={cn(
                  "flex items-center gap-2 font-mono text-[14px] text-primary transition-all hover:opacity-80",
                  isActive && "rounded-[4px] bg-primary px-2 py-1 text-background"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-background" : "text-primary")} />
                <span className="hidden sm:inline">{link.name.toLowerCase()}</span>
              </Link>
            );
          })}
        </nav>

        {/* ── Status Indicator (right) ──────────────────────────── */}
        {/* Edit: src/content/site.config.ts → statusText / statusColor */}
        <div id="site-status" className="flex items-center gap-2 font-mono text-[14px] text-primary">
          <div
            className="h-2 w-2 animate-pulse rounded-full"
            style={{ backgroundColor: siteConfig.statusColor, boxShadow: `0 0 8px ${siteConfig.statusColor}` }}
          />
          <span className="hidden lg:inline">{siteConfig.statusText}</span>
        </div>

      </div>
    </header>
  );
};
