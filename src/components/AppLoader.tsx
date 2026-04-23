"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { CybersecurityTerminalOverlay } from "@/components/CybersecurityTerminalOverlay";

export const AppLoader = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if this is the first load in the current session
    if (typeof window !== "undefined") {
      const hasLoadedBefore = sessionStorage.getItem("hasLoadedPortfolio");
      if (hasLoadedBefore) {
        setTimeout(() => setIsLoading(false), 0);
      }
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("hasLoadedPortfolio", "true");
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <CybersecurityTerminalOverlay 
            key="terminal-loader" 
            onComplete={handleLoadingComplete} 
          />
        )}
      </AnimatePresence>
      
      <div style={{ 
        visibility: isLoading ? 'hidden' : 'visible', 
        height: isLoading ? '100vh' : 'auto', 
        overflow: isLoading ? 'hidden' : 'visible' 
      }}>
        {children}
      </div>
    </>
  );
};
