"use client";

import { motion } from "framer-motion";
import { FolderOpen, Bot, Activity, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const WorkflowGrid = () => {
  const [activeStep, setActiveStep] = useState(-1);

  const steps = [
    {
      num: "01",
      icon: FolderOpen,
      title: "Open Repository",
      desc: "Point Sentinel at any Git project. Use Ctrl+K to open the Global Action Bar instantly.",
    },
    {
      num: "02",
      icon: Bot,
      title: "Spawn Agents",
      desc: "Launch as many agent sessions as needed. Each gets its own fully isolated workspace.",
    },
    {
      num: "03",
      icon: Activity,
      title: "Monitor Live",
      desc: "Watch real-time CPU, RAM, file diffs, and process trees across all sessions simultaneously.",
    },
    {
      num: "04",
      icon: CheckCircle2,
      title: "Apply & Commit",
      desc: "Review changes, resolve conflicts, and create Git commits directly from agent sessions.",
    },
  ];

  return (
    <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/5 bg-bg shadow-2xl relative">
      {/* Animated connection line across the top on desktop */}
      <div className="hidden lg:block absolute top-0 left-0 right-0 h-[1px] bg-white/5 z-[2]">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-accent to-transparent"
          initial={{ width: "0%", opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        />
      </div>

      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setActiveStep(i)}
          onMouseLeave={() => setActiveStep(-1)}
          className="p-8 md:p-10 border border-white/5 relative bg-bg overflow-hidden group transition-all duration-500 hover:bg-bg2/50"
        >
          {/* Animated background glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top,rgba(74,222,128,0.04)_0%,transparent_70%)]" />

          {/* Arrow connector */}
          {i < steps.length - 1 && (
            <div className="hidden lg:flex absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 items-center justify-center z-[2] text-accent/20 text-[24px] group-hover:text-accent transition-all duration-300">
              <motion.span
                animate={activeStep === i ? { x: [0, 4, 0] } : {}}
                transition={{ duration: 0.8, repeat: activeStep === i ? Infinity : 0 }}
              >
                ›
              </motion.span>
            </div>
          )}

          {/* Step number */}
          <motion.div
            className="font-head text-5xl font-800 text-white/5 leading-none mb-6 group-hover:text-accent/10 transition-colors duration-500"
            animate={activeStep === i ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: activeStep === i ? Infinity : 0 }}
          >
            {step.num}
          </motion.div>

          {/* Icon */}
          <div className="w-10 h-10 rounded-lg bg-accent/5 flex items-center justify-center text-accent mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-bg transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]">
            <step.icon className="w-5 h-5" />
          </div>

          <h3 className="font-head text-xl font-700 mb-3 group-hover:text-accent transition-colors duration-300">
            {step.title}
          </h3>
          <p className="text-[14px] text-muted-text leading-relaxed">
            {step.desc}
          </p>

          {/* Bottom line reveal */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </motion.div>
      ))}
    </div>
  );
};
