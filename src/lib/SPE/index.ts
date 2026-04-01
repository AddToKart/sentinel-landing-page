/**
 * SPE: Sentinel Performance Engine
 * Core Orchestrator for High-Fidelity Web Performance.
 */

import { useEffect } from "react";

export enum TaskPriority {
  CRITICAL = 0, // Input, UI Response (RAF immediate)
  ANIMATION = 1, // Active visual elements (RAF sync)
  VISIBLE = 2, // Visible but non-essential updates
  BACKGROUND = 3, // Off-screen warming, non-visible logic (IdleCallback)
}

export type SPEMetrics = {
  fps: number;
  frameJitter: number;
  memoryUsage: number | null;
  activeTasks: number;
  gpuPressure: "low" | "medium" | "high";
};

export class SentinelPerformanceEngine {
  private static instance: SentinelPerformanceEngine;
  private tasks: Map<string, { callback: () => void; priority: TaskPriority }> = new Map();
  private metrics: SPEMetrics = { fps: 60, frameJitter: 0, memoryUsage: null, activeTasks: 0, gpuPressure: "low" };
  private listeners: Set<(m: SPEMetrics) => void> = new Set();
  
  private lastFrameTime = 0;
  private jitterSum = 0;
  private isRunning = false;

  private constructor() {
    if (typeof window !== "undefined") {
      this.start();
    }
  }

  public static getInstance(): SentinelPerformanceEngine {
    if (!SentinelPerformanceEngine.instance) {
      SentinelPerformanceEngine.instance = new SentinelPerformanceEngine();
    }
    return SentinelPerformanceEngine.instance;
  }

  public registerTask(id: string, priority: TaskPriority, callback: () => void) {
    this.tasks.set(id, { callback, priority });
    this.metrics.activeTasks = this.tasks.size;
  }

  public unregisterTask(id: string) {
    this.tasks.delete(id);
    this.metrics.activeTasks = this.tasks.size;
  }

  public onMetricsUpdate(cb: (m: SPEMetrics) => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastFrameTime = performance.now();
    requestAnimationFrame(this.loop.bind(this));
    setInterval(() => this.updateSystemMetrics(), 500);
  }

  private loop(now: number) {
    const delta = now - this.lastFrameTime;
    this.lastFrameTime = now;

    this.calculateFPS(delta);

    for (const [id, task] of this.tasks) {
      if (task.priority <= TaskPriority.ANIMATION) {
        task.callback();
      }
    }

    const elapsedSinceStart = performance.now() - now;
    if (elapsedSinceStart < 12) {
      for (const [id, task] of this.tasks) {
        if (task.priority === TaskPriority.VISIBLE) {
          task.callback();
        }
      }
    }

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as any).requestIdleCallback(() => {
        for (const [id, task] of this.tasks) {
          if (task.priority === TaskPriority.BACKGROUND) {
            task.callback();
          }
        }
      });
    }

    requestAnimationFrame(this.loop.bind(this));
  }

  private calculateFPS(delta: number) {
    const currentFps = 1000 / Math.max(delta, 1);
    this.metrics.fps = Math.round(this.metrics.fps * 0.9 + currentFps * 0.1);
    
    const jitter = Math.abs(delta - 16.67);
    this.jitterSum = this.jitterSum * 0.95 + jitter * 0.05;
    this.metrics.frameJitter = Number(this.jitterSum.toFixed(2));

    if (this.metrics.fps < 45 || this.metrics.frameJitter > 8) {
      this.metrics.gpuPressure = "high";
    } else if (this.metrics.fps < 55 || this.metrics.frameJitter > 3) {
      this.metrics.gpuPressure = "medium";
    } else {
      this.metrics.gpuPressure = "low";
    }
  }

  private updateSystemMetrics() {
    if (typeof window !== "undefined" && (performance as any).memory) {
      this.metrics.memoryUsage = Math.round((performance as any).memory.usedJSHeapSize / 1048576);
    }
    this.listeners.forEach(cb => cb({ ...this.metrics }));
  }
}

export const spe = SentinelPerformanceEngine.getInstance();

/**
 * useSPETask Hook: Simplifies component integration with the engine.
 */
export const useSPETask = (id: string, priority: TaskPriority, callback: () => void) => {
  useEffect(() => {
    spe.registerTask(id, priority, callback);
    return () => spe.unregisterTask(id);
  }, [id, priority, callback]);
};
