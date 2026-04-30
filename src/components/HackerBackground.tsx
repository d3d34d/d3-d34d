"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Settings, Terminal, Code, Cpu } from 'lucide-react';

interface Character {
  char: string;
  opacity: number;
}

interface Strand {
  x: number;
  y: number;
  speed: number;
  length: number;
  characters: Character[];
  showCursor: boolean;
  layer: number;
  scale: number;
}

interface HackerBackgroundProps {
  showSettings?: boolean;
}

export const HackerBackground: React.FC<HackerBackgroundProps> = ({ showSettings: initialShowSettings = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showSettings, setShowSettings] = useState(initialShowSettings);
  const [fontSize, setFontSize] = useState(14);
  const [speed, setSpeed] = useState(0.4);
  const [density, setDensity] = useState(1);
  const [textColor, setTextColor] = useState('#00FF41');
  const [theme, setTheme] = useState<'matrix' | 'cyber' | 'terminal'>('matrix');
  
  const animationFrameId = useRef<number | null>(null);
  const strands = useRef<Strand[]>([]);
  const lastTime = useRef<number>(0);
  const cursorBlinkTime = useRef<number>(0);
  
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,./<>?';
  
  const getRandomChar = useCallback(() => {
    return characters.charAt(Math.floor(Math.random() * characters.length));
  }, []);

  const createStrand = useCallback((x: number) => {
    const layer = Math.floor(Math.random() * 3);
    const scale = layer === 0 ? 0.8 : layer === 1 ? 1 : 1.2;
    const length = Math.floor(Math.random() * 15) + 15;
    
    const chars: Character[] = Array(length).fill(null).map(() => ({
      char: getRandomChar(),
      opacity: 1
    }));

    return {
      x,
      y: -length * (fontSize * scale),
      speed: (Math.random() * 0.3 + 0.7) * speed * fontSize * (layer === 2 ? 1.2 : layer === 1 ? 1 : 0.8),
      length,
      characters: chars,
      showCursor: true,
      layer,
      scale
    };
  }, [fontSize, getRandomChar, speed]);

  const updateStrands = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, deltaTime: number) => {
    const spacing = fontSize * 1.5;
    const maxStrands = Math.floor(width / spacing) * density * 1.5;
    
    if (strands.current.length < maxStrands) {
      const availableSlots = Array.from({ length: Math.floor(width / spacing) })
        .map((_, i) => i * spacing)
        .filter(x => !strands.current.some(strand => strand.x === x));
      
      if (availableSlots.length > 0 && Math.random() < 0.1 * density) {
        const x = availableSlots[Math.floor(Math.random() * availableSlots.length)];
        strands.current.push(createStrand(x));
      }
    }
    
    cursorBlinkTime.current += deltaTime;
    if (cursorBlinkTime.current >= 500) {
      strands.current.forEach(strand => {
        strand.showCursor = !strand.showCursor;
      });
      cursorBlinkTime.current = 0;
    }
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    
    strands.current.sort((a, b) => a.layer - b.layer);
    
    strands.current = strands.current.filter(strand => {
      strand.y += strand.speed * deltaTime * 0.05;
      
      const baseOpacity = strand.layer === 0 ? 0.3 : strand.layer === 1 ? 0.6 : 0.9;
      const blur = strand.layer === 0 ? 1 : strand.layer === 1 ? 2 : 3;
      
      const scaledFontSize = fontSize * strand.scale;
      ctx.font = `${scaledFontSize}px monospace`;
      ctx.shadowBlur = blur;
      ctx.shadowColor = textColor;

      strand.characters.forEach((char, i) => {
        const y = strand.y + (i * scaledFontSize);
        
        if (y > -scaledFontSize && y < height + scaledFontSize) {
          ctx.fillStyle = textColor;
          ctx.globalAlpha = baseOpacity;
          ctx.fillText(char.char, strand.x, y);
          
          if (i === strand.characters.length - 1 && strand.showCursor) {
            ctx.fillStyle = '#FFFFFF';
            ctx.globalAlpha = baseOpacity;
            ctx.fillRect(strand.x, y + 2, scaledFontSize * 0.8, 2);
          }
        }
      });

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      if (Math.random() < 0.02) {
        const randomIndex = Math.floor(Math.random() * strand.characters.length);
        strand.characters[randomIndex].char = getRandomChar();
      }

      return strand.y - (strand.length * (fontSize * strand.scale)) < height;
    });
  }, [density, fontSize, getRandomChar, textColor, createStrand]);
  
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const container = canvas.parentElement;
    if (!container) return;
    
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }, []);
  
  const animateRef = useRef<(time: number) => void>(null);

  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const deltaTime = time - lastTime.current;
    lastTime.current = time;
    
    if (canvas.width !== canvas.parentElement?.clientWidth || 
        canvas.height !== canvas.parentElement?.clientHeight) {
      resizeCanvas();
    }
    
    updateStrands(ctx, canvas.width, canvas.height, deltaTime);
    
    animationFrameId.current = requestAnimationFrame(animateRef.current!);
  }, [resizeCanvas, updateStrands]);

  useEffect(() => {
    animateRef.current = animate;
  }, [animate]);
  
  useEffect(() => {
    resizeCanvas();
    lastTime.current = performance.now();
    cursorBlinkTime.current = 0;
    animationFrameId.current = requestAnimationFrame(animateRef.current!);
    
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  const applyTheme = (selectedTheme: 'matrix' | 'cyber' | 'terminal') => {
    setTheme(selectedTheme);
    switch (selectedTheme) {
      case 'matrix':
        setTextColor('#00FF41');
        setSpeed(0.4);
        break;
      case 'cyber':
        setTextColor('#00CFFF');
        setSpeed(0.6);
        break;
      case 'terminal':
        setTextColor('#33FF33');
        setSpeed(0.3);
        break;
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-black pointer-events-none">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-5 bg-repeat"
          style={{
            backgroundImage: 'url("https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png")',
            backgroundSize: '149.76px'
          }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      
      <div className="absolute top-4 right-4 z-50 flex gap-2 pointer-events-auto">
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="bg-black/70 text-primary p-2 rounded-full hover:bg-black/90 transition-colors backdrop-blur-sm border border-primary/30"
          aria-label="Settings"
        >
          <Settings size={24} />
        </button>
      </div>
      
      {showSettings && (
        <div className="absolute top-16 right-4 bg-black/90 backdrop-blur-md p-6 rounded-lg border border-primary/30 text-primary w-80 shadow-2xl z-50 pointer-events-auto">
          <div className="flex items-center gap-2 mb-6">
            <Terminal className="w-6 h-6" />
            <h2 className="text-xl font-bold">Hacker Settings</h2>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium flex items-center gap-2">
                <Code className="w-4 h-4" />
                Theme Preset
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => applyTheme('matrix')}
                  className={`px-3 py-2 rounded text-xs font-medium transition-all ${
                    theme === 'matrix' 
                      ? 'bg-primary/20 border-primary text-primary' 
                      : 'bg-black/50 border-primary/30 text-primary/70 hover:bg-primary/10'
                  } border`}
                >
                  Matrix
                </button>
                <button
                  onClick={() => applyTheme('cyber')}
                  className={`px-3 py-2 rounded text-xs font-medium transition-all ${
                    theme === 'cyber' 
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' 
                      : 'bg-black/50 border-primary/30 text-primary/70 hover:bg-primary/10'
                  } border`}
                >
                  Cyber
                </button>
                <button
                  onClick={() => applyTheme('terminal')}
                  className={`px-3 py-2 rounded text-xs font-medium transition-all ${
                    theme === 'terminal' 
                      ? 'bg-lime-500/20 border-lime-500 text-lime-400' 
                      : 'bg-black/50 border-primary/30 text-primary/70 hover:bg-primary/10'
                  } border`}
                >
                  Terminal
                </button>
              </div>
            </div>

            <div className="h-px bg-primary/20" />
            
            <div>
              <label className="block mb-2 text-sm font-medium">Font Size: {fontSize}px</label>
              <input 
                type="range" 
                min={8} 
                max={24} 
                value={fontSize} 
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full h-2 bg-black/50 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Speed: {speed.toFixed(1)}x</label>
              <input 
                type="range" 
                min={0.1} 
                max={3} 
                step={0.1}
                value={speed} 
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-2 bg-black/50 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Density: {density.toFixed(1)}x</label>
              <input 
                type="range" 
                min={0.2} 
                max={2} 
                step={0.1}
                value={density} 
                onChange={(e) => setDensity(Number(e.target.value))}
                className="w-full h-2 bg-black/50 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Text Color</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={textColor} 
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-12 h-12 rounded border-2 border-primary/30 cursor-pointer bg-black"
                />
                <span className="font-mono text-sm">{textColor}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-primary/20 text-xs opacity-70 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>Hacker Background v1.0</span>
          </div>
        </div>
      )}

      <style>{`
        input[type="color"] {
          -webkit-appearance: none;
          padding: 0;
          border: none;
          border-radius: 4px;
          overflow: hidden;
        }

        input[type="color"]::-webkit-color-swatch-wrapper {
          padding: 0;
        }

        input[type="color"]::-webkit-color-swatch {
          border: none;
          border-radius: 4px;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00FF9C;
          cursor: pointer;
          border: 2px solid #000;
        }

        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00FF9C;
          cursor: pointer;
          border: 2px solid #000;
        }
      `}</style>
    </div>
  );
};
