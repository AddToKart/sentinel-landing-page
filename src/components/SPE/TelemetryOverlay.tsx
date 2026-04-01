"use client";

import { useState } from "react";
import { useSPE } from "@/lib/SPE/SPEProvider";
import { Activity, Cpu, Gauge, Layers, ChevronDown, ChevronUp, X, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const TelemetryOverlay = () => {
  const { metrics } = useSPE();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-bg2/80 backdrop-blur-md border border-accent/20 rounded-full text-accent hover:bg-accent/10 transition-colors pointer-events-auto"
        style={{ boxShadow: "var(--shadow-elevated)" }}
        title="Open SPE Telemetry"
      >
        <BarChart3 className="w-5 h-5" />
      </motion.button>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-50 font-mono select-none pointer-events-auto"
    >
      <div
        className="bg-bg2/90 backdrop-blur-xl border border-border-dim rounded-lg min-w-[220px] overflow-hidden"
        style={{ boxShadow: "var(--shadow-overlay)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-dim bg-bg/35">
          <div className="flex items-center gap-2">
            <Activity className={`w-3.5 h-3.5 ${metrics.fps < 50 ? 'text-red-400' : 'text-accent'} animate-pulse`} />
            <span className="text-[10px] uppercase tracking-widest text-accent font-bold">SPE Engine</span>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 hover:bg-bg3 rounded transition-colors text-muted-text hover:text-text"
            >
              {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-bg3 rounded transition-colors text-muted-text hover:text-red-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-muted-text">
                      <Gauge className="w-3.5 h-3.5" />
                      <span className="text-[11px]">System FPS</span>
                    </div>
                    <span className={`text-[12px] font-bold ${metrics.fps < 50 ? 'text-red-400' : 'text-accent'}`}>
                      {metrics.fps}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-muted-text">
                      <Cpu className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Frame Jitter</span>
                    </div>
                    <span className="text-[11px] text-text">
                      {metrics.frameJitter}ms
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-muted-text">
                      <Layers className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Active Tasks</span>
                    </div>
                    <span className="text-[11px] text-text">
                      {metrics.activeTasks}
                    </span>
                  </div>
                </div>

                {metrics.memoryUsage && (
                  <div className="pt-3 border-t border-border-dim">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[9px] text-muted-text uppercase tracking-tighter">Heap Usage</span>
                      <span className="text-[10px] text-text">{metrics.memoryUsage}MB</span>
                    </div>
                    <div className="w-full h-1 bg-bg3 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (metrics.memoryUsage / 512) * 100)}%` }}
                        className="h-full bg-accent/40" 
                      />
                    </div>
                  </div>
                )}
                
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[9px] text-muted-text uppercase tracking-tighter">GPU Pressure</span>
                  <div className="flex gap-1.5">
                    {["low", "medium", "high"].map((level) => (
                      <div 
                        key={level}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          metrics.gpuPressure === level 
                            ? (level === 'low' ? 'bg-accent shadow-[0_0_8px_rgba(74,222,128,0.5)]' : level === 'medium' ? 'bg-yellow-400' : 'bg-red-500')
                            : 'bg-bg3'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimized/Collapsed indicator bar */}
        {isCollapsed && (
          <div className="h-1 w-full bg-accent/20" />
        )}
      </div>
    </motion.div>
  );
};
