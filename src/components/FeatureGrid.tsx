"use client";

import { useRef, MouseEvent } from "react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: "⌗",
    title: "Multi-Tab Workspace",
    desc: "Persistent tabs for Agents Dashboard, terminals, and IDE mode — switching seamlessly while maintaining full process state.",
  },
  {
    icon: "⧉",
    title: "Isolated Agent Sessions",
    desc: "Each agent runs in its own environment. Choose Sandbox Copy for safe experimentation or Git Worktree for parallel branch dev.",
  },
  {
    icon: "⊕",
    title: "Real-Time Telemetry",
    desc: "Monitor CPU, RAM, and process metrics per session refreshed every second. Watch agents work without leaving Sentinel.",
  },
  {
    icon: "◈",
    title: "Code Review & Apply",
    desc: "Automatically track every file changed by agents. Review diffs, apply changes to your main project, and resolve conflicts inline.",
  },
  {
    icon: "▣",
    title: "Monaco IDE Mode",
    desc: "Built-in VS Code editor core with syntax highlighting, integrated persistent terminal, and live file modification indicators.",
  },
  {
    icon: "▷",
    title: "Full Terminal Emulation",
    desc: "xterm.js with portable-pty Rust backend. Auto-resizing, full scrollback, shell integration, and working directory tracking.",
  },
];

const FeatureCard = ({ feature }: { feature: (typeof features)[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    cardRef.current.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="feature-card group relative bg-bg border border-white/5 p-8 overflow-hidden cursor-default transition-colors hover:bg-bg2"
      style={
        {
          "--mx": "50%",
          "--my": "50%",
        } as any
      }
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(74,222,128,0.04)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-accent transition-colors duration-300" />

      <div className="feat-icon w-[38px] h-[38px] flex items-center justify-center border border-white/10 mb-[1.1rem] text-[16px] bg-bg3 transition-colors group-hover:border-accent/40">
        {feature.icon}
      </div>
      <h3 className="font-head font-700 text-[1.05rem] mb-2 text-text">
        {feature.title}
      </h3>
      <p className="text-muted-text text-[13px] leading-[1.7]">
        {feature.desc}
      </p>
    </div>
  );
};

export const FeatureGrid = () => {
  return (
    <div className="features-grid max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/5 border border-white/5">
      {features.map((f, i) => (
        <FeatureCard key={i} feature={f} />
      ))}
    </div>
  );
};
