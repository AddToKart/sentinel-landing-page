"use client";

import { motion } from "framer-motion";
import { FolderOpen, Bot, Activity, CheckCircle2 } from "lucide-react";

export const WorkflowGrid = () => {
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
    <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/5 bg-bg shadow-2xl">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          className="p-8 md:p-10 border border-white/5 relative bg-bg overflow-hidden group transition-all hover:bg-bg2/50"
        >
          {i < steps.length - 1 && (
            <div className="hidden lg:flex absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 items-center justify-center z-[2] text-accent/20 text-[24px] group-hover:text-accent group-hover:translate-x-1 transition-all">
              ›
            </div>
          )}
          <div className="font-head text-5xl font-800 text-white/5 leading-none mb-6 group-hover:text-accent/10 transition-colors">
            {step.num}
          </div>
          <div className="w-10 h-10 rounded-lg bg-accent/5 flex items-center justify-center text-accent mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-bg transition-all">
            <step.icon className="w-5 h-5" />
          </div>
          <h3 className="font-head text-xl font-700 mb-3 group-hover:text-accent transition-colors">
            {step.title}
          </h3>
          <p className="text-[14px] text-muted-text leading-relaxed">
            {step.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
