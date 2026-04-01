"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-in" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove("revealed");
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal sr-${variant} ${className}`}
      style={{
        position: "relative",
        "--sr-delay": `${delay}ms`,
        "--sr-duration": `${duration}ms`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
