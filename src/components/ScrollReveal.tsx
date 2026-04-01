"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use a slightly larger margin for the "preparation" observer if we wanted to be super fancy,
    // but for now, we'll just apply will-change when intersecting and remove after duration.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimating(true);
          // Small delay to ensure will-change is picked up before the transition starts
          requestAnimationFrame(() => {
            setIsRevealed(true);
          });

          if (once) observer.unobserve(el);

          // Remove will-change after animation is done to free up GPU memory
          const totalTime = delay + duration + 100;
          setTimeout(() => {
            setIsAnimating(false);
          }, totalTime);
        } else if (!once) {
          setIsRevealed(false);
          setIsAnimating(false);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold, delay, duration]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal sr-${variant} ${isRevealed ? "revealed" : ""} ${className}`}
      style={{
        position: "relative",
        "--sr-delay": `${delay}ms`,
        "--sr-duration": `${duration}ms`,
        // Only apply will-change during the actual animation phase
        willChange: isAnimating ? "opacity, transform" : "auto",
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
