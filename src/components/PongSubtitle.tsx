"use client";

import { useEffect, useRef } from "react";

// Theme colors from globals.css
const COLOR_PRIMARY = "#00FF9C";
const COLOR_PRIMARY_DARK = "#004D30";
const BALL_COLOR = "#00FF9C";
const PADDLE_COLOR = "#00FF9C";

const LETTER_SPACING = 1;
const WORD_SPACING = 3;

const PIXEL_MAP = {
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
  "3": [[1, 1, 1, 1], [0, 0, 0, 1], [0, 1, 1, 1], [0, 0, 0, 1], [1, 1, 1, 1]],
  "'": [[0, 1], [0, 1], [0, 0], [0, 0], [0, 0]],
};

interface Pixel {
  x: number;
  y: number;
  size: number;
  hit: boolean;
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

export function PongSubtitle({ text }: { text: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const ballRef = useRef<Ball>({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 });
  const paddlesRef = useRef<Paddle[]>([]);
  const scaleRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = 200; // Fixed height for the game area
      scaleRef.current = Math.min(canvas.width / 800, 1);
      initializeGame();
    };

    const initializeGame = () => {
      const scale = scaleRef.current;
      const PIXEL_SIZE = 4 * scale;
      const BALL_SPEED = 4 * scale;

      pixelsRef.current = [];
      
      // Split "Senior Web3 Developer's Portfolio" into two lines
      const words = text.toUpperCase() === "SENIOR WEB3 DEVELOPER'S PORTFOLIO"
        ? ["SENIOR WEB3", "DEVELOPER'S PORTFOLIO"]
        : [text.toUpperCase()];

      const calculateWordWidth = (word: string, size: number) => {
        return (
          word.split("").reduce((width, letter) => {
            if (letter === " ") return width + WORD_SPACING * size;
            const letterWidth = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]?.[0]?.length ?? 3;
            return width + letterWidth * size + LETTER_SPACING * size;
          }, 0) - LETTER_SPACING * size
        );
      };

      const lineHeights = words.length === 1 ? [5 * PIXEL_SIZE] : [5 * PIXEL_SIZE, 5 * PIXEL_SIZE];
      const spaceBetweenLines = 10 * PIXEL_SIZE;
      const totalTextHeight = lineHeights.reduce((a, b) => a + b, 0) + (words.length > 1 ? spaceBetweenLines : 0);

      let startY = (canvas.height - totalTextHeight) / 2;

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
            // Default block for unknown characters
            startX += 4 * PIXEL_SIZE;
            return;
          }

          for (let i = 0; i < pixelMap.length; i++) {
            for (let j = 0; j < pixelMap[i].length; j++) {
              if (pixelMap[i][j]) {
                const x = startX + j * PIXEL_SIZE;
                const y = startY + i * PIXEL_SIZE;
                pixelsRef.current.push({ x, y, size: PIXEL_SIZE, hit: false });
              }
            }
          }
          startX += (pixelMap[0].length + LETTER_SPACING) * PIXEL_SIZE;
        });
        startY += lineHeights[lineIndex] + spaceBetweenLines;
      });

      ballRef.current = {
        x: canvas.width * 0.8,
        y: canvas.height * 0.2,
        dx: -BALL_SPEED,
        dy: BALL_SPEED,
        radius: PIXEL_SIZE,
      };

      const paddleWidth = 4 * scale;
      const paddleLength = 40 * scale;

      paddlesRef.current = [
        { x: 0, y: canvas.height / 2 - paddleLength / 2, width: paddleWidth, height: paddleLength, targetY: canvas.height / 2 - paddleLength / 2, isVertical: true },
        { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleLength / 2, width: paddleWidth, height: paddleLength, targetY: canvas.height / 2 - paddleLength / 2, isVertical: true },
        { x: canvas.width / 2 - paddleLength / 2, y: 0, width: paddleLength, height: paddleWidth, targetY: canvas.width / 2 - paddleLength / 2, isVertical: false },
        { x: canvas.width / 2 - paddleLength / 2, y: canvas.height - paddleWidth, width: paddleLength, height: paddleWidth, targetY: canvas.width / 2 - paddleLength / 2, isVertical: false },
      ];
    };

    const updateGame = () => {
      const ball = ballRef.current;
      const paddles = paddlesRef.current;

      ball.x += ball.dx;
      ball.y += ball.dy;

      // Bounce off walls if no paddle hit
      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
      }
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx;
      }

      // Paddle collisions
      paddles.forEach((paddle) => {
        if (paddle.isVertical) {
          if (
            ball.x - ball.radius < paddle.x + paddle.width &&
            ball.x + ball.radius > paddle.x &&
            ball.y > paddle.y &&
            ball.y < paddle.y + paddle.height
          ) {
            ball.dx = -Math.abs(ball.dx) * (paddle.x === 0 ? -1 : 1);
          }
        } else {
          if (
            ball.y - ball.radius < paddle.y + paddle.height &&
            ball.y + ball.radius > paddle.y &&
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width
          ) {
            ball.dy = -Math.abs(ball.dy) * (paddle.y === 0 ? -1 : 1);
          }
        }
      });

      // AI follow
      paddles.forEach((paddle) => {
        if (paddle.isVertical) {
          paddle.targetY = ball.y - paddle.height / 2;
          paddle.targetY = Math.max(0, Math.min(canvas.height - paddle.height, paddle.targetY));
          paddle.y += (paddle.targetY - paddle.y) * 0.15;
        } else {
          paddle.targetY = ball.x - paddle.width / 2;
          paddle.targetY = Math.max(0, Math.min(canvas.width - paddle.width, paddle.targetY));
          paddle.x += (paddle.targetY - paddle.x) * 0.15;
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
            ball.dx = -ball.dx;
          } else {
            ball.dy = -ball.dy;
          }
        }
      });

      // Reset if all hit
      if (pixelsRef.current.every(p => p.hit)) {
        setTimeout(() => {
          pixelsRef.current.forEach(p => p.hit = false);
        }, 1000);
      }
    };

    const drawGame = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pixelsRef.current.forEach((pixel) => {
        ctx.fillStyle = pixel.hit ? COLOR_PRIMARY_DARK : COLOR_PRIMARY;
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
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
  }, [text]);

  return (
    <div className="relative w-full h-[200px] flex items-center justify-center overflow-hidden border border-primary/20 bg-black/40 backdrop-blur-sm rounded-lg">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-label="Interactive Pong Portfolio Subtitle"
      />
    </div>
  );
}
