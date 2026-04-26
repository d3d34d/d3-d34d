"use client";

import Link from "next/link";

export const BlogActions = () => {
  return (
    <div className="space-y-4">
      <Link
        href="/contact"
        className="flex w-full items-center justify-center bg-primary px-6 py-5 font-mono text-xs font-bold text-background transition-all hover:scale-[1.02] active:scale-[0.98] rounded-xl"
      >
        REQUEST SECURITY AUDIT
      </Link>
      <button
        onClick={() => window.print()}
        className="flex w-full items-center justify-center border border-white/10 px-6 py-5 font-mono text-xs font-bold text-foreground/60 transition-all hover:bg-white/5 rounded-xl"
      >
        EXPORT_PDF
      </button>
    </div>
  );
};
