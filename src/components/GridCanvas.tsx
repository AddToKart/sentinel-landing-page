"use client";

import { useEffect, useRef } from "react";

export const GridCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ctx = el.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Capture in non-null locals for closure safety
    const canvas = el;
    const c = ctx;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0, H = 0;
    let dots: { x: number; y: number; phase: number; speed: number }[] = [];
    const mouse = { x: -9999, y: -9999 };
    let animId = 0;
    let visible = true;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      c.setTransform(dpr, 0, 0, dpr, 0, 0);

      const spacing = 56;
      const cols = Math.ceil(W / spacing) + 1;
      const rows = Math.ceil(H / spacing) + 1;
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

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const wave = 0.04 + 0.08 * Math.sin(t * d.speed + d.phase);
        const dx = d.x - mx;
        const dy = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = dist < 150 ? (1 - dist / 150) * 0.35 : 0;
        const alpha = wave + proximity;

        if (alpha < 0.01) continue;

        c.beginPath();
        c.arc(d.x, d.y, 1, 0, Math.PI * 2);
        c.fillStyle = `rgba(74,222,128,${alpha})`;
        c.fill();

        if (dist < 80 && dist > 10) {
          c.beginPath();
          c.moveTo(d.x, d.y);
          c.lineTo(mx, my);
          c.strokeStyle = `rgba(74,222,128,${(1 - dist / 80) * 0.04})`;
          c.lineWidth = 0.5;
          c.stroke();
        }
      }

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
