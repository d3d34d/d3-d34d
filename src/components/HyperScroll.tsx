"use client";

import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { motion, useScroll, useTransform } from "framer-motion";

// Configuration for the effect
const CONFIG = {
  itemCount: 20,
  starCount: 150,
  zGap: 800,
  camSpeed: 2.5,
  texts: ["BREACH", "FIREWALL", "ENCRYPT", "DECRYPT", "EXPLOIT", "ROOTKIT", "MALWARE", "DEFENSE", "SECURITY", "PHISHING"],
};

export const HyperScroll = () => {
  const worldRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [fps, setFps] = useState(60);
  const [velocity, setVelocity] = useState(0);
  const [scrollCoord, setScrollCoord] = useState(0);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // Calculate loop size based on item count
    const loopSize = CONFIG.itemCount * CONFIG.zGap;

    // --- INIT ITEMS ---
    const newItems: any[] = [];
    
    // Create Content Items (Cards and Text)
    for (let i = 0; i < CONFIG.itemCount; i++) {
      const isHeading = i % 4 === 0;
      const text = CONFIG.texts[i % CONFIG.texts.length];
      
      if (isHeading) {
        newItems.push({
          id: `text-${i}`,
          type: "text",
          text: text,
          x: 0,
          y: 0,
          rot: 0,
          baseZ: -i * CONFIG.zGap,
        });
      } else {
        const angle = (i / CONFIG.itemCount) * Math.PI * 6;
        const x = Math.cos(angle) * (window.innerWidth * 0.2);
        const y = Math.sin(angle) * (window.innerHeight * 0.2);
        const rot = (Math.random() - 0.5) * 30;
        const randId = Math.floor(Math.random() * 9999);
        
        newItems.push({
          id: `card-${i}`,
          type: "card",
          text: text,
          cardId: `SEC-ID-${randId}`,
          grid: `${Math.floor(Math.random() * 10)}x${Math.floor(Math.random() * 10)}`,
          dataSize: (Math.random() * 100).toFixed(1),
          x,
          y,
          rot,
          baseZ: -i * CONFIG.zGap,
        });
      }
    }

    // Create Stars
    for (let i = 0; i < CONFIG.starCount; i++) {
      newItems.push({
        id: `star-${i}`,
        type: "star",
        x: (Math.random() - 0.5) * 3000,
        y: (Math.random() - 0.5) * 3000,
        baseZ: -Math.random() * loopSize,
      });
    }

    setItems(newItems);

    // --- LENIS SETUP ---
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
      orientation: "vertical",
    });

    let currentScroll = 0;
    let currentVelocity = 0;

    lenis.on('scroll', (e: any) => {
      currentScroll = e.scroll;
      currentVelocity = e.velocity;
      setScrollCoord(currentScroll);
      setVelocity(currentVelocity);
    });

    let lastTime = 0;
    let frameCount = 0;
    let lastFpsUpdate = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    function raf(time: number) {
      lenis.raf(time);
      
      // Use the values from the scroll event
      // currentScroll and currentVelocity are updated in the lenis.on callback

      // FPS Calculation
      frameCount++;
      if (time - lastFpsUpdate > 1000) {
        setFps(Math.round((frameCount * 1000) / (time - lastFpsUpdate)));
        frameCount = 0;
        lastFpsUpdate = time;
      }

      // --- RENDER LOGIC ---
      if (worldRef.current && viewportRef.current) {
        // 1. Camera Tilt
        const tiltX = mouseY * 5 - currentVelocity * 0.5;
        const tiltY = mouseX * 5;
        worldRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

        // 2. Dynamic Perspective (Warp)
        const baseFov = 1000;
        const fov = baseFov - Math.min(Math.abs(currentVelocity) * 10, 600);
        viewportRef.current.style.perspective = `${fov}px`;

        // 3. Item Loop
        const cameraZ = currentScroll * CONFIG.camSpeed;
        const itemElements = worldRef.current.children;

        for (let i = 0; i < newItems.length; i++) {
          const item = newItems[i];
          const el = itemElements[i] as HTMLElement;
          if (!el) continue;

          let relZ = item.baseZ + cameraZ;
          let vizZ = ((relZ % loopSize) + loopSize) % loopSize;
          if (vizZ > 500) vizZ -= loopSize;

          // Opacity
          let alpha = 1;
          if (vizZ < -3000) alpha = 0;
          else if (vizZ < -2000) alpha = (vizZ + 3000) / 1000;
          if (vizZ > 100 && item.type !== "star") alpha = 1 - (vizZ - 100) / 400;
          if (alpha < 0) alpha = 0;
          
          el.style.opacity = alpha.toString();

          if (alpha > 0) {
            // 4. Wave Flow Logic
            const waveFreq = 0.001;
            const waveAmp = 50;
            const waveShift = scrollCoord * 0.05;
            const waveX = Math.sin((vizZ + waveShift) * waveFreq) * waveAmp;
            const waveY = Math.cos((vizZ + waveShift) * waveFreq * 0.8) * waveAmp;

            let trans = `translate3d(${item.x + waveX}px, ${item.y + waveY}px, ${vizZ}px)`;

            if (item.type === "star") {
              const stretch = Math.max(1, Math.min(1 + Math.abs(currentVelocity) * 0.1, 10));
              trans += ` scale3d(1, 1, ${stretch})`;
            } else if (item.type === "text") {
              trans += ` rotateZ(${item.rot}deg)`;
              if (Math.abs(currentVelocity) > 1) {
                const offset = currentVelocity * 2;
                el.style.textShadow = `${offset}px 0 #00FF9C, ${-offset}px 0 #00E3FF`;
              } else {
                el.style.textShadow = "none";
              }
            } else {
              const t = time * 0.001;
              const float = Math.sin(t + i) * 10;
              const waveRot = (waveX / waveAmp) * 5; // Tilt based on wave
              trans += ` rotateZ(${item.rot + waveRot}deg) rotateY(${float}deg)`;
              
              // Dynamic Glow
              const hue = (vizZ * 0.1) % 360;
              el.style.borderColor = `hsla(${150 + Math.sin(vizZ * 0.001) * 30}, 100%, 50%, 0.2)`;
            }
            el.style.transform = trans;
          }
        }
      }

      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full bg-[#030303] text-[#e0e0e0] font-syncopate overflow-hidden select-none">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;800&family=Syncopate:wght@400;700&display=swap');
        
        :root {
          --cyber-primary: #00FF9C;
          --cyber-secondary: #00E3FF;
        }

        .font-syncopate { font-family: 'Syncopate', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        .scanlines {
          position: fixed;
          inset: 0;
          background: linear-gradient(to bottom, transparent, transparent 50%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.2));
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 10;
        }

        .vignette {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle, transparent 40%, #000 120%);
          z-index: 11;
          pointer-events: none;
        }

        .noise {
          position: fixed;
          inset: 0;
          z-index: 12;
          opacity: 0.07;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .item {
          position: absolute;
          left: 0;
          top: 0;
          backface-visibility: hidden;
          transform-origin: center center;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform, opacity;
        }

        .card {
          width: 300px;
          height: 400px;
          background: rgba(10, 10, 10, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          backdrop-filter: blur(8px);
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5), 0 20px 50px rgba(0, 0, 0, 0.5);
          transition: border-color 0.3s, box-shadow 0.3s;
          transform: translate(-50%, -50%);
        }

        .card:hover {
          border-color: var(--cyber-primary);
          box-shadow: 0 0 30px rgba(0, 255, 156, 0.2);
        }

        .card::before, .card::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          border: 1px solid transparent;
          transition: 0.3s;
        }
        .card::before { top: -1px; left: -1px; border-top-color: #e0e0e0; border-left-color: #e0e0e0; }
        .card::after { bottom: -1px; right: -1px; border-bottom-color: #e0e0e0; border-right-color: #e0e0e0; }
        .card:hover::before, .card:hover::after { width: 100%; height: 100%; border-color: var(--cyber-primary); }

        .big-text {
          font-size: 12vw;
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.15);
          text-transform: uppercase;
          white-space: nowrap;
          transform: translate(-50%, -50%);
          pointer-events: none;
          letter-spacing: -0.2rem;
          mix-blend-mode: overlay;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          transform: translate(-50%, -50%);
        }

        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(100%); }
        }
      `}</style>

      {/* OVERLAYS */}
      <div className="scanlines" />
      <div className="vignette" />
      <div className="noise" />

      {/* HUD */}
      <div className="fixed inset-8 z-20 pointer-events-none flex flex-col justify-between font-mono text-[10px] text-white/50 uppercase">
        <div className="flex justify-between items-center">
          <span>SEC.SYSTEM.READY</span>
          <div className="flex-1 h-[1px] bg-white/20 mx-4 relative">
            <div className="absolute right-0 top-[-2px] w-[5px] h-[5px] bg-[#00FF9C]" />
          </div>
          <span>FPS: <strong className="text-[#00E3FF]">{fps}</strong></span>
        </div>

        <div className="flex justify-between items-center">
          <span>THREAT_LEVEL: <strong className="text-[#00E3FF]">{scrollCoord.toFixed(0)}</strong></span>
          <div className="flex-1 h-[1px] bg-white/20 mx-4 relative">
            <div className="absolute right-0 top-[-2px] w-[5px] h-[5px] bg-[#00FF9C]" />
          </div>
          <span>NODE_VER 2.0.4 [STABLE]</span>
        </div>
      </div>

      {/* 3D WORLD */}
      <div ref={viewportRef} className="fixed inset-0 perspective-[1000px] overflow-hidden z-1">
        <div ref={worldRef} className="absolute top-1/2 left-1/2 preserve-3d will-change-transform">
          {items.map((item) => (
            <div key={item.id} className="item">
              {item.type === "text" ? (
                <div className="big-text">{item.text}</div>
              ) : item.type === "card" ? (
                <div className="card">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                    <span className="font-mono text-[#00FF9C] text-[10px]">{item.cardId}</span>
                    <div className="w-2.5 h-2.5 bg-[#00FF9C]" />
                  </div>
                  <h2 className="text-[2.5rem] leading-[0.9] m-0 uppercase font-bold text-white mix-blend-hard-light">
                    {item.text}
                  </h2>
                  <div className="mt-auto font-mono text-[10px] text-white/40 flex justify-between uppercase">
                    <span>SECTOR: {item.grid}</span>
                    <span>PACKET: {item.dataSize}KB</span>
                  </div>
                  <div className="absolute bottom-8 right-8 text-6xl opacity-10 font-black">
                    0{items.indexOf(item)}
                  </div>
                </div>
              ) : (
                <div className="star" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SCROLL PROXY */}
      <div className="h-[8000vh] w-full" />
    </div>
  );
};
