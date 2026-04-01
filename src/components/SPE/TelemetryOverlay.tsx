"use client";

import { useSPE } from "@/lib/SPE/SPEProvider";
import { Activity, Cpu, Gauge, Layers } from "lucide-react";

export const TelemetryOverlay = () => {
  const { metrics } = useSPE();

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono pointer-events-none select-none">
      <div className="bg-bg2/80 backdrop-blur-md border border-white/10 p-4 rounded-lg shadow-2xl min-w-[200px]">
        <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
          <Activity className="w-4 h-4 text-accent animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-accent font-bold">SPE Engine Online</span>
        </div>

        <div className="space-y-3">
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

          {metrics.memoryUsage && (
            <div className="pt-2 mt-2 border-t border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-muted-text uppercase tracking-tighter">Heap Usage</span>
                <span className="text-[11px] text-text">{metrics.memoryUsage}MB</span>
              </div>
              <div className="w-full h-1 bg-white/5 mt-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent/40 transition-all duration-500" 
                  style={{ width: `${Math.min(100, (metrics.memoryUsage / 512) * 100)}%` }}
                />
              </div>
            </div>
          )}
          
          <div className="pt-2 flex items-center justify-between">
            <span className="text-[10px] text-muted-text uppercase tracking-tighter">GPU Pressure</span>
            <div className="flex gap-1">
              {["low", "medium", "high"].map((level) => (
                <div 
                  key={level}
                  className={`w-2 h-2 rounded-full ${
                    metrics.gpuPressure === level 
                      ? (level === 'low' ? 'bg-accent' : level === 'medium' ? 'bg-yellow-400' : 'bg-red-500')
                      : 'bg-white/5'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
