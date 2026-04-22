"use client";

import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-primary bg-background py-6">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between px-4 font-mono text-[14px] text-muted md:flex-row lg:px-[110px]">
        <div className="mb-4 md:mb-0">
          © Alex Chen | {currentYear}
        </div>
        <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-primary">
          v20.07.2025
        </div>
      </div>
    </footer>
  );
};
