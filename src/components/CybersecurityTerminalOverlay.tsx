"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScanLine {
  text: string;
  type: 'normal' | 'success' | 'warning' | 'error' | 'highlight';
  delay?: number;
}

interface CybersecurityTerminalOverlayProps {
  onComplete: () => void;
}

const scanPhases = [
  {
    title: 'INITIALIZING SECURITY SCAN',
    lines: [
      { text: '> Loading security modules...', type: 'normal' as const },
      { text: '> Establishing secure connection...', type: 'normal' as const },
      { text: '✓ Connection established [ENCRYPTED]', type: 'success' as const },
      { text: '> Initializing threat detection engine...', type: 'normal' as const },
      { text: '✓ Engine online', type: 'success' as const },
    ]
  },
  {
    title: 'SCANNING NETWORK PERIMETER',
    lines: [
      { text: '> Analyzing firewall rules...', type: 'normal' as const },
      { text: '> Checking port configurations...', type: 'normal' as const },
      { text: '⚠ Port 8080 exposed', type: 'warning' as const },
      { text: '> Scanning for vulnerabilities...', type: 'normal' as const },
      { text: '✓ Perimeter scan complete', type: 'success' as const },
    ]
  },
  {
    title: 'DECRYPTING DATA STREAMS',
    lines: [
      { text: '> Intercepting encrypted packets...', type: 'normal' as const },
      { text: '> Applying decryption algorithms...', type: 'normal' as const },
      { text: '> AES-256 detected...', type: 'highlight' as const },
      { text: '> RSA-4096 detected...', type: 'highlight' as const },
      { text: '✓ Decryption successful', type: 'success' as const },
    ]
  },
  {
    title: 'ANALYZING THREAT VECTORS',
    lines: [
      { text: '> Checking for malware signatures...', type: 'normal' as const },
      { text: '> Analyzing behavioral patterns...', type: 'normal' as const },
      { text: '> Cross-referencing threat database...', type: 'normal' as const },
      { text: '⚠ 3 potential threats identified', type: 'warning' as const },
      { text: '✓ Analysis complete', type: 'success' as const },
    ]
  },
  {
    title: 'SYSTEM SECURED',
    lines: [
      { text: '> Generating security report...', type: 'normal' as const },
      { text: '> Applying security patches...', type: 'normal' as const },
      { text: '✓ All systems operational', type: 'success' as const },
      { text: '✓ Security level: MAXIMUM', type: 'success' as const },
      { text: '> Ready for deployment', type: 'highlight' as const },
    ]
  }
];

export const CybersecurityTerminalOverlay: React.FC<CybersecurityTerminalOverlayProps> = ({ onComplete }) => {
  const [scanLines, setScanLines] = useState<ScanLine[]>([]);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawMatrixRain = () => {
      timeRef.current += 0.016;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = '14px monospace';

      const columns = Math.floor(canvas.width / 14);
      
      for (let i = 0; i < columns; i++) {
        if (Math.random() > 0.975) {
          const x = i * 14;
          const y = Math.random() * canvas.height;
          const char = String.fromCharCode(0x30A0 + Math.random() * 96);
          ctx.fillText(char, x, y);
        }
      }

      requestAnimationFrame(drawMatrixRain);
    };

    const animId = requestAnimationFrame(drawMatrixRain);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, []);

  const addLineRef = useRef<(phaseIndex: number, lineIdx: number) => void>(null);

  const addLine = useCallback((phaseIndex: number, lineIdx: number) => {
    const phase = scanPhases[phaseIndex];
    if (lineIdx < phase.lines.length) {
      setScanLines(prev => [...prev, phase.lines[lineIdx]]);
      setTimeout(() => addLineRef.current!(phaseIndex, lineIdx + 1), 400 + Math.random() * 300);
    } else {
      setTimeout(() => {
        if (phaseIndex + 1 < scanPhases.length) {
          setCurrentPhase(prev => prev + 1);
          setScanLines([]);
        } else {
          setIsScanning(false);
          setTimeout(onComplete, 2000);
        }
      }, 1500);
    }
  }, [onComplete]);

  useEffect(() => {
    addLineRef.current = addLine;
  }, [addLine]);

  useEffect(() => {
    if (currentPhase < scanPhases.length && isScanning) {
      setTimeout(() => addLine(currentPhase, 0), 0);
    }
  }, [currentPhase, isScanning, addLine]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + (100 / (scanPhases.length * 5));
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const getLineColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'highlight': return 'text-cyan-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden flex flex-col items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-20"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-950/10 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          className="w-full max-w-4xl"
        >
          <div className="border-2 border-green-500/30 bg-black/90 backdrop-blur-md rounded-lg shadow-2xl shadow-green-500/20">
            <div className="border-b border-green-500/30 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
                <span className="text-green-400 font-mono text-sm tracking-wider">
                  CYBERSEC-TERMINAL v2.4.1
                </span>
              </div>
              <div className="text-green-400 font-mono text-xs">
                {new Date().toLocaleTimeString()}
              </div>
            </div>

            <div className="p-6 font-mono text-sm">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400 text-xs tracking-wider uppercase">
                    {isScanning ? scanPhases[currentPhase]?.title : 'SCAN COMPLETE'}
                  </span>
                  <span className="text-green-400 text-xs font-bold">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden border border-green-500/30">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-600 to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="space-y-2 h-64 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {scanLines.map((line, index) => (
                    <motion.div
                      key={`${currentPhase}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className={`${getLineColor(line.type)} flex items-start gap-2`}
                    >
                      <span className="text-green-500 opacity-50">{'>'}</span>
                      <span className="flex-1">{line.text}</span>
                      {line.type === 'normal' && (
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="text-green-400"
                        >
                          █
                        </motion.span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {!isScanning && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 border border-green-500/30 rounded bg-green-950/20"
                >
                  <div className="text-green-400 text-center">
                    <div className="text-2xl mb-2">✓</div>
                    <div className="text-lg font-bold mb-1 tracking-widest">SECURITY SCAN COMPLETE</div>
                    <div className="text-xs opacity-70 uppercase">All systems operational and secured</div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="border-t border-green-500/30 px-6 py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <span className="text-green-400">
                  <span className="opacity-50">STATUS:</span> {isScanning ? 'SCANNING' : 'READY'}
                </span>
                <span className="text-green-400">
                  <span className="opacity-50">THREATS:</span> 0
                </span>
              </div>
              <div className="text-green-400 opacity-50 animate-pulse">
                INITIALIZING HANDSHAKE...
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <div className="text-green-400/50 font-mono text-xs tracking-widest uppercase">
            SECURE CONNECTION ESTABLISHED
          </div>
          <div className="text-green-400/30 font-mono text-xs mt-1 uppercase">
            256-BIT ENCRYPTION ACTIVE
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.3);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};
