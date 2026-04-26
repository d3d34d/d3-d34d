"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Scan } from 'lucide-react'

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ')
}

interface ScanningOverlayProps {
  onComplete?: () => void
  duration?: number
  mode?: 'scanning' | 'decrypting'
}

export const ScanningOverlay: React.FC<ScanningOverlayProps> = ({
  onComplete,
  duration = 3000,
  mode = 'scanning'
}) => {
  const [progress, setProgress] = useState(0)
  const [currentLine, setCurrentLine] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const scanningLines = [
    '> Initializing security protocols...',
    '> Establishing encrypted connection...',
    '> Verifying authentication tokens...',
    '> Scanning network perimeter...',
    '> Analyzing threat vectors...',
    '> Decrypting payload...',
    '> Access granted. Welcome.'
  ]

  const decryptingLines = [
    '> Decrypting data stream...',
    '> Breaking cipher [AES-256]...',
    '> Analyzing encryption patterns...',
    '> Bypassing security layers...',
    '> Extracting payload...',
    '> Verification complete...',
    '> Decryption successful.'
  ]

  const lines = mode === 'scanning' ? scanningLines : decryptingLines

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsComplete(true)
          setTimeout(() => {
            onComplete?.()
          }, 500)
          return 100
        }
        return prev + (100 / (duration / 50))
      })
    }, 50)

    return () => clearInterval(progressInterval)
  }, [duration, onComplete])

  useEffect(() => {
    const lineInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev >= lines.length - 1) {
          clearInterval(lineInterval)
          return prev
        }
        return prev + 1
      })
    }, duration / lines.length)

    return () => clearInterval(lineInterval)
  }, [duration, lines.length])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          <div className="w-full max-w-2xl px-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0a0a0a] border border-[#0CF2A0]/30 rounded-lg p-8 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                {mode === 'scanning' ? (
                  <Scan className="w-6 h-6 text-[#0CF2A0] animate-pulse" />
                ) : (
                  <Lock className="w-6 h-6 text-[#0CF2A0] animate-pulse" />
                )}
                <h2 className="text-xl font-bold text-[#0CF2A0] font-mono">
                  {mode === 'scanning' ? 'SCANNING...' : 'DECRYPTING...'}
                </h2>
              </div>

              <div className="space-y-2 mb-6 h-48 overflow-hidden">
                {lines.slice(0, currentLine + 1).map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      'font-mono text-sm',
                      index === currentLine
                        ? 'text-[#0CF2A0]'
                        : 'text-gray-500'
                    )}
                  >
                    {line}
                    {index === currentLine && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          repeatType: 'reverse'
                        }}
                        className="inline-block ml-1"
                      >
                        _
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-gray-400">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#0CF2A0] to-[#00d4aa]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
