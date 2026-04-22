"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "TVL", value: "$240.5M", color: "#00E3FF" },
  { label: "APY", value: "12.4%", color: "#00E3FF" },
  { label: "Users", value: "1,252", color: "#00E3FF" },
  { label: "Exploits", value: "0", color: "#00E3FF" },
];

export const Stats = () => {
  return (
    <div className="grid w-full grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex min-h-[120px] flex-col items-center justify-center border border-primary/20 bg-card-bg p-6 text-center transition-colors hover:border-primary"
        >
          <span className="mb-2 font-mono text-2xl font-bold" style={{ color: stat.color }}>
            {stat.value}
          </span>
          <span className="font-mono text-sm uppercase text-muted">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};
