"use client";

import { useEffect, useRef } from "react";

export const GridCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ctx = el.getContext("2d", { alpha: true });
    if (!ctx) return;

    const canvas = el;
    const c = ctx;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0, H = 0;
    let dots: { x: number; y: number; phase: number; speed: number }[] = [];
    const spacing = 56;
    let cols = 0;
    let rows = 0;
    
    const mouse = { x: -9999, y: -9999 };
    let animId = 0;
    let visible = true;

    // Pre-render a single dot sprite to an offscreen canvas for better performance
    const dotSprite = typeof document !== "undefined" ? document.createElement("canvas") : null;
    if (dotSprite) {
      dotSprite.width = 4 * dpr;
      dotSprite.height = 4 * dpr;
      const sCtx = dotSprite.getContext("2d");
      if (sCtx) {
        sCtx.scale(dpr, dpr);
        sCtx.beginPath();
        sCtx.arc(2, 2, 1, 0, Math.PI * 2);
        sCtx.fillStyle = "#4ade80";
        sCtx.fill();
      }
    }

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      c.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(W / spacing) + 1;
      rows = Math.ceil(H / spacing) + 1;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let cl = 0; cl < cols; cl++) {
          dots.push({
            x: cl * spacing,
            y: r * spacing,
            phase: (cl + r) * 0.3,
            speed: 0.0008 + ((cl * 7 + r * 13) % 10) * 0.0001,
          });
        }
      }
    }

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onVis = () => {
      visible = !document.hidden;
    };

    function draw() {
      if (!visible) {
        animId = requestAnimationFrame(draw);
        return;
      }

      c.clearRect(0, 0, W, H);
      const t = performance.now();
      const mx = mouse.x;
      const my = mouse.y;

      // 1. Identify "Active" dots near mouse using grid indexing (O(1) lookup)
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

      // 2. Draw all dots (Batch drawing optimization)
      // We still need to loop through all dots for the base wave, but we avoid heavy math for most
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const wave = 0.04 + 0.08 * Math.sin(t * d.speed + d.phase);
        let alpha = wave;

        if (activeIndices.has(i)) {
          const dx = d.x - mx;
          const dy = d.y - my;
          const distSq = dx * dx + dy * dy; // Use squared distance for optimization
          if (distSq < proximityRadius * proximityRadius) {
            const dist = Math.sqrt(distSq);
            alpha += (1 - dist / proximityRadius) * 0.35;
            
            // Draw connection line
            if (dist < lineRadius && dist > 10) {
              c.beginPath();
              c.moveTo(d.x, d.y);
              c.lineTo(mx, my);
              c.strokeStyle = `rgba(74,222,128,${(1 - dist / lineRadius) * 0.04})`;
              c.lineWidth = 0.5;
              c.stroke();
            }
          }
        }

        if (alpha < 0.01) continue;

        // Use drawImage with pre-rendered sprite if available, otherwise fallback
        if (dotSprite) {
          c.globalAlpha = alpha;
          c.drawImage(dotSprite, d.x - 2, d.y - 2, 4, 4);
        } else {
          c.beginPath();
          c.arc(d.x, d.y, 1, 0, Math.PI * 2);
          c.fillStyle = `rgba(74,222,128,${alpha})`;
          c.fill();
        }
      }
      
      c.globalAlpha = 1.0;
      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(animId);
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
