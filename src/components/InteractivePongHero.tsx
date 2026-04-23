"use client";

import React, { useEffect, useRef, useCallback } from "react";

// Theme colors
const COLOR_PRIMARY = "#00FF9C";
const COLOR_PRIMARY_DARK = "#004D30";
const BALL_COLOR = "#00FF9C";
const PADDLE_COLOR = "#00FF9C";

const LETTER_SPACING = 1;
const WORD_SPACING = 3;

const PIXEL_MAP: Record<string, number[][]> = {
  P: [[1, 1, 1, 1], [1, 0, 0, 1], [1, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0]],
  R: [[1, 1, 1, 1], [1, 0, 0, 1], [1, 1, 1, 1], [1, 0, 1, 0], [1, 0, 0, 1]],
  O: [[1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1]],
  M: [[1, 0, 0, 0, 1], [1, 1, 0, 1, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
  T: [[1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]],
  I: [[1, 1, 1], [0, 1, 0], [0, 1, 0], [0, 1, 0], [1, 1, 1]],
  N: [[1, 0, 0, 0, 1], [1, 1, 0, 0, 1], [1, 0, 1, 0, 1], [1, 0, 0, 1, 1], [1, 0, 0, 0, 1]],
  G: [[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 1, 1, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1]],
  S: [[1, 1, 1, 1], [1, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 1], [1, 1, 1, 1]],
  A: [[0, 1, 1, 0], [1, 0, 0, 1], [1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1]],
  L: [[1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 1]],
  Y: [[1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]],
  U: [[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1]],
  D: [[1, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 0]],
  E: [[1, 1, 1, 1], [1, 0, 0, 0], [1, 1, 1, 1], [1, 0, 0, 0], [1, 1, 1, 1]],
  W: [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 1, 0, 1, 1], [1, 0, 0, 0, 1]],
  B: [[1, 1, 1, 0], [1, 0, 0, 1], [1, 1, 1, 0], [1, 0, 0, 1], [1, 1, 1, 0]],
  V: [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0]],
  F: [[1, 1, 1, 1], [1, 0, 0, 0], [1, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0]],
  H: [[1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1]],
  "3": [[1, 1, 1, 1], [0, 0, 0, 1], [0, 1, 1, 1], [0, 0, 0, 1], [1, 1, 1, 1]],
  "'": [[0, 1], [0, 1], [0, 0], [0, 0], [0, 0]],
};

interface Pixel {
  x: number;
  y: number;
  size: number;
  hit: boolean;
  isAscii?: boolean;
}

interface Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
}

interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
  targetY: number;
  isVertical: boolean;
}

interface InteractivePongHeroProps {
  subtitle: string;
}

export function InteractivePongHero({ subtitle }: InteractivePongHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const ballRef = useRef<Ball>({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 });
  const paddlesRef = useRef<Paddle[]>([]);
  const scaleRef = useRef(1);

  const resetGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const scale = scaleRef.current;
    const PIXEL_SIZE = 3 * scale;
    const BALL_SPEED = 3.5 * scale;
    
    ballRef.current = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      dx: (Math.random() > 0.5 ? 1 : -1) * BALL_SPEED,
      dy: (Math.random() > 0.5 ? 1 : -1) * BALL_SPEED,
      radius: PIXEL_SIZE * 1.5,
    };
    pixelsRef.current.forEach(p => p.hit = false);
  }, []);

  const initializeGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scale = scaleRef.current;
    const PIXEL_SIZE = 3 * scale;

    pixelsRef.current = [];

    // ── 1. Process Name into Pixels ─────────────────────
    const name = "DHEBOBROTHA DHIBO";
    const words = [subtitle.toUpperCase()];
    const NAME_PIXEL_SIZE = 7 * scale;
    
    const calculateWordWidth = (word: string, size: number) => {
      return (
        word.split("").reduce((width, letter) => {
          if (letter === " ") return width + WORD_SPACING * size;
          const letterWidth = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]?.[0]?.length ?? 4;
          return width + letterWidth * size + LETTER_SPACING * size;
        }, 0) - LETTER_SPACING * size
      );
    };

    const totalNameWidth = calculateWordWidth(name, NAME_PIXEL_SIZE);
    let startXName = (canvas.width - totalNameWidth) / 2;
    const startYName = 30 * scale;

    name.split("").forEach((letter) => {
      if (letter === " ") {
        startXName += WORD_SPACING * NAME_PIXEL_SIZE;
        return;
      }
      const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP];
      if (!pixelMap) return;

      for (let i = 0; i < pixelMap.length; i++) {
        for (let j = 0; j < pixelMap[i].length; j++) {
          if (pixelMap[i][j]) {
            pixelsRef.current.push({
              x: startXName + j * NAME_PIXEL_SIZE,
              y: startYName + i * NAME_PIXEL_SIZE,
              size: NAME_PIXEL_SIZE,
              hit: false,
              isAscii: true
            });
          }
        }
      }
      startXName += (pixelMap[0].length + LETTER_SPACING) * NAME_PIXEL_SIZE;
    });

    // ── 2. Process Subtitle into Pixels ──────────────────────
    const lineHeights = [5 * PIXEL_SIZE];
    const spaceBetweenLines = 15 * PIXEL_SIZE;
    
    let startYSubtitle = startYName + (5 * NAME_PIXEL_SIZE) + (40 * scale);

    words.forEach((line, lineIndex) => {
      const totalWidth = calculateWordWidth(line, PIXEL_SIZE);
      let startX = (canvas.width - totalWidth) / 2;

      line.split("").forEach((letter) => {
        if (letter === " ") {
          startX += WORD_SPACING * PIXEL_SIZE;
          return;
        }
        const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP];
        if (!pixelMap) {
          startX += 4 * PIXEL_SIZE;
          return;
        }

        for (let i = 0; i < pixelMap.length; i++) {
          for (let j = 0; j < pixelMap[i].length; j++) {
            if (pixelMap[i][j]) {
              pixelsRef.current.push({
                x: startX + j * PIXEL_SIZE,
                y: startYSubtitle + i * PIXEL_SIZE,
                size: PIXEL_SIZE,
                hit: false
              });
            }
          }
        }
        startX += (pixelMap[0].length + LETTER_SPACING) * PIXEL_SIZE;
      });
      startYSubtitle += lineHeights[lineIndex] + spaceBetweenLines;
    });

    // ── 3. Initialize Ball & Paddles ────────────────────────
    resetGame();

    const paddleWidth = 6 * scale;
    const paddleLength = 60 * scale;

    paddlesRef.current = [
      { x: 2, y: canvas.height / 2 - paddleLength / 2, width: paddleWidth, height: paddleLength, targetY: canvas.height / 2 - paddleLength / 2, isVertical: true },
      { x: canvas.width - paddleWidth - 2, y: canvas.height / 2 - paddleLength / 2, width: paddleWidth, height: paddleLength, targetY: canvas.height / 2 - paddleLength / 2, isVertical: true },
      { x: canvas.width / 2 - paddleLength / 2, y: 2, width: paddleLength, height: paddleWidth, targetY: canvas.width / 2 - paddleLength / 2, isVertical: false },
      { x: canvas.width / 2 - paddleLength / 2, y: canvas.height - paddleWidth - 2, width: paddleLength, height: paddleWidth, targetY: canvas.width / 2 - paddleLength / 2, isVertical: false },
    ];
  }, [subtitle, resetGame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      scaleRef.current = Math.min(canvas.width / 700, 1);
      initializeGame();
    };

    const updateGame = () => {
      const ball = ballRef.current;
      const paddles = paddlesRef.current;

      ball.x += ball.dx;
      ball.y += ball.dy;

      // Out of bounds reset
      if (ball.y < -ball.radius || ball.y > canvas.height + ball.radius || 
          ball.x < -ball.radius || ball.x > canvas.width + ball.radius) {
        resetGame();
      }

      // Paddle collisions
      paddles.forEach((paddle) => {
        const jitter = (Math.random() - 0.5) * 0.2;
        if (paddle.isVertical) {
          if (
            ball.x - ball.radius < paddle.x + paddle.width &&
            ball.x + ball.radius > paddle.x &&
            ball.y > paddle.y &&
            ball.y < paddle.y + paddle.height
          ) {
            ball.dx = -Math.abs(ball.dx) * (paddle.x <= 2 ? -1 : 1);
            ball.dy += jitter;
            // Prevent sticking
            ball.x = paddle.x <= 2 ? paddle.width + ball.radius + 1 : canvas.width - paddle.width - ball.radius - 3;
          }
        } else {
          if (
            ball.y - ball.radius < paddle.y + paddle.height &&
            ball.y + ball.radius > paddle.y &&
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width
          ) {
            ball.dy = -Math.abs(ball.dy) * (paddle.y <= 2 ? -1 : 1);
            ball.dx += jitter;
            // Prevent sticking
            ball.y = paddle.y <= 2 ? paddle.height + ball.radius + 1 : canvas.height - paddle.height - ball.radius - 3;
          }
        }
      });

      // AI follow
      paddles.forEach((paddle) => {
        if (paddle.isVertical) {
          paddle.targetY = ball.y - paddle.height / 2;
          paddle.targetY = Math.max(0, Math.min(canvas.height - paddle.height, paddle.targetY));
          paddle.y += (paddle.targetY - paddle.y) * 0.12;
        } else {
          paddle.targetY = ball.x - paddle.width / 2;
          paddle.targetY = Math.max(0, Math.min(canvas.width - paddle.width, paddle.targetY));
          paddle.x += (paddle.targetY - paddle.x) * 0.12;
        }
      });

      // Pixel collisions
      pixelsRef.current.forEach((pixel) => {
        if (
          !pixel.hit &&
          ball.x + ball.radius > pixel.x &&
          ball.x - ball.radius < pixel.x + pixel.size &&
          ball.y + ball.radius > pixel.y &&
          ball.y - ball.radius < pixel.y + pixel.size
        ) {
          pixel.hit = true;
          const centerX = pixel.x + pixel.size / 2;
          const centerY = pixel.y + pixel.size / 2;
          if (Math.abs(ball.x - centerX) > Math.abs(ball.y - centerY)) {
            ball.dx *= -1;
          } else {
            ball.dy *= -1;
          }
        }
      });

      // Reset logic: if more than 80% of pixels hit, reset
      const hitCount = pixelsRef.current.filter(p => p.hit).length;
      if (hitCount > pixelsRef.current.length * 0.9) {
        pixelsRef.current.forEach(p => p.hit = false);
      }
    };

    const drawGame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pixelsRef.current.forEach((pixel) => {
        ctx.fillStyle = pixel.hit ? COLOR_PRIMARY_DARK : COLOR_PRIMARY;
        if (pixel.isAscii) {
          ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
        } else {
          ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
        }
      });

      ctx.fillStyle = BALL_COLOR;
      ctx.beginPath();
      ctx.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = PADDLE_COLOR;
      paddlesRef.current.forEach((paddle) => {
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
      });
    };

    let animationId: number;
    const gameLoop = () => {
      updateGame();
      drawGame();
      animationId = requestAnimationFrame(gameLoop);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    gameLoop();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [initializeGame, resetGame]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-label="Interactive Pong Hero Section"
    />
  );
}
