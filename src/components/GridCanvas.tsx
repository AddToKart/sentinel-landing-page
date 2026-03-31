"use client";

import { useEffect, useRef } from "react";

export const GridCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const ctxNonNull = ctx;

    let W: number, H: number, cols: number, rows: number;
    let dots: { x: number; y: number; o: number; speed: number; phase: number; size: number }[] = [];
    let mouse = { x: -1000, y: -1000 };
    let scrollY = 0;
    let animId = 0;

    // Floating particles
    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }[] = [];

    function spawnParticle() {
      if (particles.length > 15) return;
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.1,
        life: 0,
        maxLife: 200 + Math.random() * 300,
        size: Math.random() * 2 + 0.5,
      });
    }

    function resize(el: HTMLCanvasElement) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      el.width = W * dpr;
      el.height = H * dpr;
      el.style.width = W + "px";
      el.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

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
            phase: Math.random() * Math.PI * 2,
            size: Math.random() > 0.95 ? 1.5 : 1,
          });
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    function draw(c: CanvasRenderingContext2D) {
      c.clearRect(0, 0, W, H);
      const t = Date.now() * 0.001;
      const parallaxOffset = scrollY * 0.08;

      // Draw dots with parallax and mouse interaction
      for (const d of dots) {
        const parallaxY = d.y - parallaxOffset * (0.3 + d.phase * 0.1);
        const wrappedY = ((parallaxY % H) + H) % H;

        d.o = 0.04 + 0.1 * Math.sin(t * d.speed * 80 + d.phase);

        const dx = d.x - mouse.x;
        const dy = wrappedY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const boost = Math.max(0, 1 - dist / 180) * 0.6;

        // Connection lines to nearby mouse
        if (dist < 100) {
          c.beginPath();
          c.moveTo(d.x, wrappedY);
          c.lineTo(mouse.x, mouse.y);
          c.strokeStyle = `rgba(74,222,128,${(1 - dist / 100) * 0.06})`;
          c.lineWidth = 0.5;
          c.stroke();
        }

        c.beginPath();
        c.arc(d.x, wrappedY, d.size, 0, Math.PI * 2);
        c.fillStyle = `rgba(74,222,128,${d.o + boost})`;
        c.fill();
      }

      // Floating particles
      if (Math.random() < 0.03) spawnParticle();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.2 ? progress / 0.2 : progress > 0.8 ? (1 - progress) / 0.2 : 1;
        c.beginPath();
        c.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        c.fillStyle = `rgba(74,222,128,${alpha * 0.15})`;
        c.fill();
      }

      // Mouse glow orb
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = c.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        gradient.addColorStop(0, "rgba(74,222,128,0.04)");
        gradient.addColorStop(1, "rgba(74,222,128,0)");
        c.fillStyle = gradient;
        c.fillRect(mouse.x - 120, mouse.y - 120, 240, 240);
      }

      animId = requestAnimationFrame(() => draw(c));
    }

    resize(canvas);
    window.addEventListener("resize", () => resize(canvas));
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    if (ctx) {
      animId = requestAnimationFrame(() => draw(ctxNonNull));
    }

    return () => {
      window.removeEventListener("resize", () => resize(canvas));
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-30"
    />
  );
};
