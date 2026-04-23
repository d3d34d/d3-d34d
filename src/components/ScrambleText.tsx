"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

class Scrambler {
  chars: string;
  queue: Array<{ from: string; to: string; start: number; end: number; char?: string }>;
  frame: number;
  frameRequest: number;
  resolve: (value: void | PromiseLike<void>) => void;

  constructor() {
    this.chars = "!<>-_\\/[]{}—=+*^?#";
    this.queue = [];
    this.frame = 0;
    this.frameRequest = 0;
    this.resolve = () => {};
    this.update = this.update.bind(this);
  }

  setText(el: HTMLElement, newText: string) {
    const oldText = el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => (this.resolve = resolve));
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update(el);
    return promise;
  }

  update(el: HTMLElement) {
    let output = "";
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span class="text-primary opacity-70">${char}</span>`;
      } else {
        output += from;
      }
    }

    el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(() => this.update(el));
      this.frame++;
    }
  }
}

export const ScrambleText = ({ text, delay = 0, triggerInView = true }: { text: string; delay?: number; triggerInView?: boolean }) => {
  const elRef = useRef<HTMLSpanElement>(null);
  const scramblerRef = useRef<Scrambler | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!scramblerRef.current) {
      scramblerRef.current = new Scrambler();
    }
  }, []);

  const startAnimation = () => {
    if (elRef.current && scramblerRef.current && !hasAnimated) {
      setTimeout(() => {
        scramblerRef.current?.setText(elRef.current!, text);
        setHasAnimated(true);
      }, delay);
    }
  };

  return (
    <motion.span
      ref={elRef}
      onViewportEnter={() => triggerInView && startAnimation()}
      onMouseEnter={() => !triggerInView && startAnimation()}
      className="inline-block"
    >
      {text}
    </motion.span>
  );
};
