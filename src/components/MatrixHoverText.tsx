"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MatrixWordProps {
  word: string;
  className?: string;
  letterAnimationDuration?: number;
  letterInterval?: number;
}

const MatrixWord = ({
  word,
  className,
  letterAnimationDuration = 400,
  letterInterval = 40,
}: MatrixWordProps) => {
  const [displayWord, setDisplayWord] = useState(word);
  const [animatingIndices, setAnimatingIndices] = useState<Set<number>>(new Set());

  const animate = useCallback(() => {
    let currentIndex = 0;

    const run = () => {
      if (currentIndex >= word.length) return;

      const charIndex = currentIndex;
      
      // Step 1: Turn to 0/1
      setAnimatingIndices((prev) => new Set(prev).add(charIndex));
      setDisplayWord((prev) => {
        const chars = prev.split("");
        chars[charIndex] = Math.random() > 0.5 ? "1" : "0";
        return chars.join("");
      });

      // Step 2: Turn back
      setTimeout(() => {
        setDisplayWord((prev) => {
          const chars = prev.split("");
          chars[charIndex] = word[charIndex];
          return chars.join("");
        });
        setAnimatingIndices((prev) => {
          const next = new Set(prev);
          next.delete(charIndex);
          return next;
        });
      }, letterAnimationDuration);

      currentIndex++;
      setTimeout(run, letterInterval);
    };

    run();
  }, [word, letterAnimationDuration, letterInterval]);

  return (
    <span
      className={cn("inline-block cursor-default select-none", className)}
      onMouseEnter={animate}
    >
      {displayWord.split("").map((char, i) => (
        <motion.span
          key={i}
          animate={{
            color: animatingIndices.has(i) ? "#00FF9C" : "inherit",
            textShadow: animatingIndices.has(i) ? "0 0 8px rgba(0, 255, 156, 0.8)" : "none",
          }}
          transition={{ duration: 0.1 }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

export const MatrixHoverText = ({ text, className }: { text: string; className?: string }) => {
  // Split text into words but preserve spaces and newlines if possible
  // For simplicity, we split by spaces and re-join
  const words = text.split(/(\s+)/);

  return (
    <span className={className}>
      {words.map((part, i) => {
        if (/\s+/.test(part)) {
          return <span key={i}>{part}</span>;
        }
        return <MatrixWord key={i} word={part} />;
      })}
    </span>
  );
};
