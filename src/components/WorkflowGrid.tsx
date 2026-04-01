"use client";

import { FolderOpen, Bot, Activity, CheckCircle2 } from "lucide-react";

export const WorkflowGrid = () => {
  const steps = [
    { num: "01", icon: FolderOpen, title: "Open Repository", desc: "Point Sentinel at any Git project. Use Ctrl+K to open the Global Action Bar instantly." },
    { num: "02", icon: Bot, title: "Spawn Agents", desc: "Launch as many agent sessions as needed. Each gets its own fully isolated workspace." },
    { num: "03", icon: Activity, title: "Monitor Live", desc: "Watch real-time CPU, RAM, file diffs, and process trees across all sessions simultaneously." },
    { num: "04", icon: CheckCircle2, title: "Apply & Commit", desc: "Review changes, resolve conflicts, and create Git commits directly from agent sessions." },
  ];

  return (
    <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-border-dim bg-bg">
      {steps.map((step, i) => (
        <div
          key={i}
          className="workflow-step p-8 md:p-10 border border-border-dim relative bg-bg overflow-hidden group transition-all duration-500 hover:bg-bg2/50 contain-layout-style"
        >
          {/* Flow dot connector (between steps) */}
          {i < steps.length - 1 && (
            <div className="hidden lg:block absolute right-0 top-1/2 w-px h-12 -translate-y-1/2 bg-border-dim2">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors duration-300" />
              {/* Animated flow dot */}
              <div className="absolute top-0 left-0 w-1 h-1 rounded-full bg-accent/60 animate-flow-dot" style={{ animationDuration: "2.5s", animationDelay: `${i * 0.6}s` }} />
            </div>
          )}

          {/* Step number */}
          <div className="font-head text-5xl font-800 text-muted-text/30 leading-none mb-6 group-hover:text-accent/[0.08] transition-colors duration-500 select-none">
            {step.num}
          </div>

          {/* Icon */}
          <div className="w-10 h-10 rounded-lg bg-accent/[0.04] flex items-center justify-center text-accent/70 mb-6 transition-all duration-300 group-hover:bg-accent group-hover:text-bg">
            <step.icon className="w-[18px] h-[18px]" />
          </div>

          <h3 className="font-head text-lg font-700 mb-2.5 group-hover:text-accent transition-colors duration-300">
            {step.title}
          </h3>
          <p className="text-[13px] text-muted-text leading-[1.7]">
            {step.desc}
          </p>

          {/* Bottom line reveal */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      ))}
    </div>
  );
};
