"use client"

import React, { useState, useEffect } from "react"
import { ScanningOverlay } from "./ScanningOverlay"

export function AppInitializer({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    // Using requestAnimationFrame to move state updates out of the immediate effect body
    // and satisfy the react-hooks/set-state-in-effect lint rule.
    const timer = requestAnimationFrame(() => {
      setMounted(true)
      const hasLoaded = sessionStorage.getItem("app_loaded")
      if (!hasLoaded) {
        setShowOverlay(true)
      }
    })
    return () => cancelAnimationFrame(timer)
  }, [])

  const handleComplete = () => {
    setShowOverlay(false)
    sessionStorage.setItem("app_loaded", "true")
  }

  if (!mounted) {
    return null
  }

  if (showOverlay) {
    return <ScanningOverlay onComplete={handleComplete} mode="scanning" duration={3000} />
  }

  return <>{children}</>
}
