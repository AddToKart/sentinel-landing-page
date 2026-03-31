"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const AnimatedNumber = ({ value, suffix = "" }: { value: string, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");
  const numValue = parseFloat(value) || 0;
  
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
  const rounded = useTransform(spring, (latest) => Math.floor(latest).toString());

  useEffect(() => {
    if (isInView) {
      spring.set(numValue);
    }
  }, [isInView, spring, numValue]);

  useEffect(() => {
    return rounded.onChange((v) => {
      if (value === "∞") {
        setDisplayValue("∞");
      } else {
        setDisplayValue(v);
      }
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
    <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 border-t border-white/10 relative z-1 bg-bg/50 backdrop-blur-sm">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="p-10 border-r border-white/5 flex flex-col gap-3 transition-colors hover:bg-white/5 last:border-r-0 group"
        >
          <div className="font-head text-4xl md:text-5xl font-800 text-accent leading-none tracking-tighter group-hover:scale-105 transition-transform origin-left">
            <AnimatedNumber value={stat.num} suffix={stat.suffix} />
          </div>
          <div className="text-[10px] uppercase font-bold text-muted-text tracking-[0.2em] group-hover:text-text transition-colors">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
