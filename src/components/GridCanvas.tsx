"use client";

import { useEffect, useRef, useCallback } from "react";
import { useSPETask, TaskPriority } from "@/lib/SPE/index";

export const GridCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const stateRef = useRef({
    W: 0,
    H: 0,
    dots: [] as { x: number; y: number; phase: number; speed: number }[],
    spacing: 56,
    cols: 0,
    rows: 0,
    mouse: { x: -9999, y: -9999 },
    dotSprite: null as HTMLCanvasElement | null,
    visible: true,
  });

  // Task callback for the Performance Engine
  const draw = useCallback(() => {
    const ctx = contextRef.current;
    const state = stateRef.current;
    if (!ctx || !state.visible) return;

    const { W, H, dots, mouse, spacing, cols, rows, dotSprite } = state;
    ctx.clearRect(0, 0, W, H);
    
    const t = performance.now();
    const mx = mouse.x;
    const my = mouse.y;

    const proximityRadius = 150;
    const lineRadius = 80;
    
    const startCol = Math.max(0, Math.floor((mx - proximityRadius) / spacing));
    const endCol = Math.min(cols - 1, Math.floor((mx + proximityRadius) / spacing));
    const startRow = Math.max(0, Math.floor((my - proximityRadius) / spacing));
    const endRow = Math.min(rows - 1, Math.floor((my + proximityRadius) / spacing));

    const activeIndices = new Set<number>();
    for (let r = startRow; r <= endRow; r++) {
      for (let cl = startCol; cl <= endCol; cl++) {
        activeIndices.add(r * cols + cl);
      }
    }

    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      const wave = 0.04 + 0.08 * Math.sin(t * d.speed + d.phase);
      let alpha = wave;

      if (activeIndices.has(i)) {
        const dx = d.x - mx;
        const dy = d.y - my;
        const distSq = dx * dx + dy * dy;
        if (distSq < proximityRadius * proximityRadius) {
          const dist = Math.sqrt(distSq);
          alpha += (1 - dist / proximityRadius) * 0.35;
          
          if (dist < lineRadius && dist > 10) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(74,222,128,${(1 - dist / lineRadius) * 0.04})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      if (alpha < 0.01) continue;

      if (dotSprite) {
        ctx.globalAlpha = alpha;
        ctx.drawImage(dotSprite, d.x - 2, d.y - 2, 4, 4);
      } else {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,222,128,${alpha})`;
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1.0;
  }, []);

  // Register with SPE
  useSPETask("grid-canvas-draw", TaskPriority.ANIMATION, draw);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ctx = el.getContext("2d", { alpha: true });
    if (!ctx) return;
    contextRef.current = ctx;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const initSprite = () => {
      const sprite = document.createElement("canvas");
      sprite.width = 4 * dpr;
      sprite.height = 4 * dpr;
      const sCtx = sprite.getContext("2d");
      if (sCtx) {
        sCtx.scale(dpr, dpr);
        sCtx.beginPath();
        sCtx.arc(2, 2, 1, 0, Math.PI * 2);
        sCtx.fillStyle = "#4ade80";
        sCtx.fill();
      }
      stateRef.current.dotSprite = sprite;
    };

    const resize = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      el.width = W * dpr;
      el.height = H * dpr;
      el.style.width = W + "px";
      el.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(W / stateRef.current.spacing) + 1;
      const rows = Math.ceil(H / stateRef.current.spacing) + 1;
      const dots = [];
      for (let r = 0; r < rows; r++) {
        for (let cl = 0; cl < cols; cl++) {
          dots.push({
            x: cl * stateRef.current.spacing,
            y: r * stateRef.current.spacing,
            phase: (cl + r) * 0.3,
            speed: 0.0008 + ((cl * 7 + r * 13) % 10) * 0.0001,
          });
        }
      }
      stateRef.current = { ...stateRef.current, W, H, cols, rows, dots };
    };

    const onMouse = (e: MouseEvent) => {
      stateRef.current.mouse = { x: e.clientX, y: e.clientY };
    };

    const onVis = () => {
      stateRef.current.visible = !document.hidden;
    };

    initSprite();
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-25 contain-strict"
      aria-hidden="true"
    />
  );
};
