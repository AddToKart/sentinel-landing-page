"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { spe, SPEMetrics } from "./index";

interface SPEContextType {
  metrics: SPEMetrics;
  engine: typeof spe;
}

const SPEContext = createContext<SPEContextType | null>(null);

export const SPEProvider = ({ children }: { children: ReactNode }) => {
  const [metrics, setMetrics] = useState<SPEMetrics>({
    fps: 60,
    frameJitter: 0,
    memoryUsage: null,
    activeTasks: 0,
    gpuPressure: "low",
  });

  useEffect(() => {
    return spe.onMetricsUpdate((newMetrics) => {
      setMetrics(newMetrics);
    });
  }, []);

  return (
    <SPEContext.Provider value={{ metrics, engine: spe }}>
      {children}
    </SPEContext.Provider>
  );
};

export const useSPE = () => {
  const context = useContext(SPEContext);
  if (!context) {
    throw new Error("useSPE must be used within an SPEProvider");
  }
  return context;
};
