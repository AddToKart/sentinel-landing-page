"use client";

import { useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const AnimatedNumber = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");
  const numValue = parseFloat(value) || 0;

  const spring = useSpring(0, { stiffness: 35, damping: 18 });
  const rounded = useTransform(spring, (latest) => Math.floor(latest).toString());

  useEffect(() => {
    if (isInView) {
      spring.set(numValue);
    }
  }, [isInView, spring, numValue]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      setDisplayValue(value === "∞" ? "∞" : v);
    });
  }, [rounded, value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

export const StatsBar = () => {
  const stats = [
    { num: "∞", label: "Concurrent Sessions", suffix: "" },
    { num: "2", label: "Isolation Modes", suffix: "" },
    { num: "0", label: "Cold Start Overhead", suffix: "ms" },
    { num: "1", label: "Telemetry Refresh", suffix: "s" },
  ];

  return (
    <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 border-t border-border-dim relative z-1 contain-layout">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="stat-cell p-10 border-r border-border-dim flex flex-col gap-3 transition-all duration-500 hover:bg-bg2 last:border-r-0 group relative overflow-hidden contain-layout-style"
          style={{ transitionDelay: `${i * 50}ms` }}
        >
          <div className="font-head text-4xl md:text-5xl font-800 text-accent leading-none tracking-tighter">
            <AnimatedNumber value={stat.num} suffix={stat.suffix} />
          </div>
          <div className="text-[10px] uppercase font-bold text-muted-text tracking-[0.2em] group-hover:text-text transition-colors duration-300">
            {stat.label}
          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/0 group-hover:bg-accent/25 transition-colors duration-500" />
        </div>
      ))}
    </div>
  );
};
