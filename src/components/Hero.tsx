"use client";

import React from "react";
import { motion } from "framer-motion";

const asciiArt = `
░░  ░     ░░░░░░░    ░       ░░░░ ░    ░░░░░░░░    ░
 ░  ░ ░     ░      ░  ░       ░     ░    ░░     ░░   ░
▒    ▒▒     ▒▒▒▒▒   ▒▒        ▒     ▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒  ▒
▒▒▒▒▒▒▒     ▒▒▒▒▒   ▒▒        ▒     ▒▒▒▒▒▒▒▒▒▒▒ ▒  ▒▒▒
▓    ▓▓     ▓      ▓  ▓       ▓     ▓    ▓▓     ▓   ▓▓
▓    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓    ▓       ▓▓▓▓ ▓    ▓▓▓▓▓▓▓▓    ▓
`;

export const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mx-auto my-10 flex w-full max-w-[800px] flex-col items-center justify-center gap-6 border-[3px] border-double border-primary bg-background p-10 shadow-[0_0_15px_rgba(0,255,156,0.2)] lg:my-[40px]"
    >
      <pre className="overflow-x-auto whitespace-pre font-mono text-[10px] leading-tight text-primary sm:text-[14px]">
        {asciiArt}
      </pre>
      <div className="text-center font-mono text-xl font-bold uppercase tracking-[1px] text-primary">
        Senior Web3 Developer&apos;s Portfolio
      </div>
    </motion.section>
  );
};
