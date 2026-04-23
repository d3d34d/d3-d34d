"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface FallingHackerGridProps {
  color?: string;
  backgroundColor?: string;
  duration?: number;
  blurIntensity?: string;
  density?: number;
  className?: string;
}

export function FallingHackerGrid({
  color = "#00FF9C", // Hacker green
  backgroundColor = "transparent",
  duration = 40, // Faster falling
  blurIntensity = "0px", // Keep it sharp and visible
  density = 1,
  className,
}: FallingHackerGridProps) {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = { damping: 25, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate background image style with customizable color
  const generateBackgroundImage = () => {
    const patterns = [
      `radial-gradient(2px 100px at 0px 235px, ${color}, transparent)`,
      `radial-gradient(2px 100px at 300px 235px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 117.5px, ${color} 100%, transparent 150%)`,
      `radial-gradient(2px 100px at 0px 252px, ${color}, transparent)`,
      `radial-gradient(2px 100px at 300px 252px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 126px, ${color} 100%, transparent 150%)`,
      `radial-gradient(2px 100px at 0px 150px, ${color}, transparent)`,
      `radial-gradient(2px 100px at 300px 150px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 75px, ${color} 100%, transparent 150%)`,
      `radial-gradient(2px 100px at 0px 253px, ${color}, transparent)`,
      `radial-gradient(2px 100px at 300px 253px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 126.5px, ${color} 100%, transparent 150%)`,
    ];
    return patterns.join(", ");
  };

  const backgroundSizes = [
    "300px 235px", "300px 235px", "300px 235px",
    "300px 252px", "300px 252px", "300px 252px",
    "300px 150px", "300px 150px", "300px 150px",
    "300px 253px", "300px 253px", "300px 253px",
  ].join(", ");

  const startPositions = "0px 0px, 3px 0px, 151.5px 117.5px, 25px 0px, 28px 0px, 176.5px 126px, 50px 0px, 53px 0px, 201.5px 75px, 75px 0px, 78px 0px, 226.5px 126.5px";
  const endPositions = "0px 1000px, 3px 1000px, 151.5px 1117.5px, 25px 1000px, 28px 1000px, 176.5px 1126px, 50px 1000px, 53px 1000px, 201.5px 1075px, 75px 1000px, 78px 1000px, 226.5px 1126.5px";

  // Using a custom hook for the dynamic mask to avoid SSR issues
  const [maskStyle, setMaskStyle] = useState<any>({});

  useEffect(() => {
    const unsubscribeX = smoothMouseX.on("change", (latestX) => {
      const latestY = smoothMouseY.get();
      setMaskStyle({
        WebkitMaskImage: `radial-gradient(circle 120px at ${latestX}px ${latestY}px, transparent 0%, black 100%)`,
        maskImage: `radial-gradient(circle 120px at ${latestX}px ${latestY}px, transparent 0%, black 100%)`,
      });
    });
    return () => unsubscribeX();
  }, [smoothMouseX, smoothMouseY]);

  return (
    <div className={cn("pointer-events-none fixed inset-0 -z-10 h-full w-full overflow-hidden", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-full w-full"
      >
        <motion.div
          className="relative h-full w-full"
          style={{
            backgroundColor,
            backgroundImage: generateBackgroundImage(),
            backgroundSize: backgroundSizes,
            ...maskStyle,
          }}
          animate={{
            backgroundPosition: [startPositions, endPositions],
          }}
          transition={{
            duration: duration,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </motion.div>
      
      {/* Background grain / subtle noise for depth */}
      <div className="absolute inset-0 z-1 opacity-20" 
           style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
    </div>
  );
}
