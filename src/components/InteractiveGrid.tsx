"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Dot {
  x: number;
  y: number;
  render: (ctx: CanvasRenderingContext2D, mouse: { x: number; y: number }, hue: number, params: CanvasParams) => void;
}

interface CanvasParams {
  dotDistance: number;
  dotRadius: number;
  minProximity: number;
  repaintAlpha: number;
}

interface InteractiveGridProps {
  dotDistance?: number;
  dotRadius?: number;
  minProximity?: number;
  repaintAlpha?: number;
}

export function InteractiveGrid({
  dotDistance = 30,
  dotRadius = 1.5,
  minProximity = 180,
  repaintAlpha = 1,
}: InteractiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [params] = useState<CanvasParams>({
    dotDistance,
    dotRadius,
    minProximity,
    repaintAlpha,
  });
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
  const [hue, setHue] = useState(160); // Starting with a green/cyan hue to match terminal theme
  const dotsRef = useRef<Dot[]>([]);
  const minProxSquaredRef = useRef(params.minProximity * params.minProximity);

  const createDots = useCallback((w: number, h: number) => {
    const newDots: Dot[] = [];
    for (let x = 0; x < w + params.dotDistance; x += params.dotDistance) {
      for (let y = 0; y < h + params.dotDistance; y += params.dotDistance) {
        newDots.push({
          x,
          y,
          render: (ctx, mousePos, currentHue, p) => {
            const dX = x - mousePos.x;
            const dY = y - mousePos.y;
            const distSquared = dX * dX + dY * dY;

            if (distSquared <= minProxSquaredRef.current) {
              const dist = Math.sqrt(distSquared);
              const proximityRatio = 1 - dist / p.minProximity;
              
              // Interaction color (using hue based on position)
              const color = `hsla(${currentHue}, 100%, 50%, ${proximityRatio * 0.4})`;
              
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.lineWidth = proximityRatio * 1.5;

              // Draw dot
              ctx.beginPath();
              ctx.arc(x, y, p.dotRadius * (1 + proximityRatio), 0, Math.PI * 2);
              ctx.fill();

              // Draw line to mouse
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(mousePos.x, mousePos.y);
              ctx.stroke();
            } else {
              // Idle dots
              ctx.fillStyle = "rgba(0, 255, 156, 0.1)"; // Very dim primary green
              ctx.beginPath();
              ctx.arc(x, y, p.dotRadius, 0, Math.PI * 2);
              ctx.fill();
            }
          },
        });
      }
    }
    dotsRef.current = newDots;
  }, [params.dotDistance]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createDots(canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMouse({ x, y });
      setHue(((x / canvas.width + y / canvas.height) * 360) % 360);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [createDots]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dotsRef.current.forEach((dot) => dot.render(ctx, mouse, hue, params));
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [params, mouse, hue]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 h-full w-full overflow-hidden bg-background">
      <canvas
        ref={canvasRef}
        className="block h-full w-full opacity-50"
      />
      {/* Dark gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/20 to-background/80" />
    </div>
  );
}
