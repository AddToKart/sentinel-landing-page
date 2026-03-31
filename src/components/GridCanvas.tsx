"use client";

import { useEffect, useRef } from "react";

export const GridCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number, cols: number, rows: number;
    let dots: { x: number; y: number; o: number; speed: number }[] = [];
    let mouse = { x: -1000, y: -1000 };

    function resize(el: HTMLCanvasElement) {
      W = el.width = window.innerWidth;
      H = el.height = window.innerHeight;
      const spacing = 48;
      cols = Math.ceil(W / spacing) + 1;
      rows = Math.ceil(H / spacing) + 1;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: c * spacing,
            y: r * spacing,
            o: Math.random() * 0.4 + 0.05,
            speed: Math.random() * 0.005 + 0.002,
          });
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    function draw(c: CanvasRenderingContext2D) {
      c.clearRect(0, 0, W, H);
      const t = Date.now() * 0.001;
      for (const d of dots) {
        d.o = 0.05 + 0.12 * Math.sin(t * d.speed * 100 + d.x * 0.02 + d.y * 0.02);
        const dx = d.x - mouse.x,
          dy = d.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const boost = Math.max(0, 1 - dist / 150) * 0.5;
        c.beginPath();
        c.arc(d.x, d.y, 1, 0, Math.PI * 2);
        c.fillStyle = `rgba(74,222,128,${d.o + boost})`;
        c.fill();
      }
      requestAnimationFrame(() => draw(c));
    }

    resize(canvas);
    const handleResize = () => resize(canvas);
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    const animId = requestAnimationFrame(() => draw(ctx));

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-35"
    />
  );
};
