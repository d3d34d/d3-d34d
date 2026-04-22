"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { HomeIcon, AboutIcon, ProjectsIcon, ExperienceIcon, BlogIcon, ContactIcon } from "./icons";

const navItems = [
  { name: "About", href: "/about", icon: AboutIcon },
  { name: "Projects", href: "/projects", icon: ProjectsIcon },
  { name: "Experience", href: "/experience", icon: ExperienceIcon },
  { name: "Blog", href: "/blog", icon: BlogIcon },
  { name: "Contact", href: "/contact", icon: ContactIcon },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 h-[76px] w-full border-b border-primary bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 lg:px-[110px]">
        {/* Terminal Path */}
        <div className="hidden items-center gap-2 font-mono text-sm text-primary md:flex">
          <Link href="/" className="hover:opacity-80">
            <span className="opacity-60">{">. "}</span>
            alex.chen@portfolio:~$
          </Link>
        </div>

        {/* Mobile Logo (Home Icon) */}
        <div className="flex md:hidden">
           <Link href="/">
              <HomeIcon className="h-5 w-5 text-primary" />
           </Link>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-4 lg:gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 font-mono text-[14px] text-primary transition-all hover:opacity-80",
                  isActive && "rounded-[4px] bg-primary px-2 py-1 text-background"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-background" : "text-primary")} />
                <span className="hidden sm:inline">{item.name.toLowerCase()}</span>
              </Link>
            );
          })}
        </nav>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 font-mono text-[14px] text-primary">
          <div className="h-2 w-2 animate-pulse rounded-full bg-secondary shadow-[0_0_8px_#00E3FF]" />
          <span className="hidden lg:inline">Available</span>
        </div>
      </div>
    </header>
  );
};
