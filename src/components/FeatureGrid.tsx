"use client";

import React, { useRef, MouseEvent } from "react";
import { Layout, Terminal, Code2, Activity, Shield, Share2 } from "lucide-react";

const features = [
  {
    icon: Layout,
    title: "Multi-Tab Workspace",
    desc: "Persistent tabs for Agents Dashboard, terminals, and IDE mode — switching seamlessly while maintaining full process state.",
  },
  {
    icon: Shield,
    title: "Isolated Agent Sessions",
    desc: "Each agent runs in its own environment. Choose Sandbox Copy for safe experimentation or Git Worktree for parallel branch dev.",
  },
  {
    icon: Activity,
    title: "Real-Time Telemetry",
    desc: "Monitor CPU, RAM, and process metrics per session refreshed every second. Watch agents work without leaving Sentinel.",
  },
  {
    icon: Share2,
    title: "Code Review & Apply",
    desc: "Automatically track every file changed by agents. Review diffs, apply changes to your main project, and resolve conflicts inline.",
  },
  {
    icon: Code2,
    title: "Monaco IDE Mode",
    desc: "Built-in VS Code editor core with syntax highlighting, integrated persistent terminal, and live file modification indicators.",
  },
  {
    icon: Terminal,
    title: "Full Terminal Emulation",
    desc: "xterm.js with portable-pty Rust backend. Auto-resizing, full scrollback, shell integration, and working directory tracking.",
  },
];

const FeatureCard = ({ feature, index }: { feature: (typeof features)[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    cardRef.current.style.setProperty("--mx", `${x}%`);
    cardRef.current.style.setProperty("--my", `${y}%`);

    // Subtle 3D tilt (max 2deg)
    const tiltX = ((y - 50) / 50) * 2;
    const tiltY = ((x - 50) / 50) * -2;
    cardRef.current.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="feature-card group relative bg-bg border border-white/[0.06] p-8 overflow-hidden cursor-default gpu-accelerated contain-layout-style"
      style={{ "--mx": "50%", "--my": "50%", transitionDelay: `${index * 60}ms` } as React.CSSProperties}
    >
      {/* Cursor-following highlight (subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(74,222,128,0.04)_0%,transparent_50%)]" />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-transparent group-hover:bg-accent/40 transition-colors duration-500" />

      <div className="feat-icon w-11 h-11 flex items-center justify-center border border-white/[0.08] mb-5 bg-bg3/50 transition-all duration-500 group-hover:border-accent/30 group-hover:text-accent">
        <feature.icon className="w-[18px] h-[18px]" />
      </div>
      
      <h3 className="font-head font-700 text-[17px] mb-2.5 text-text group-hover:text-accent transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-muted-text text-[13px] leading-[1.7]">
        {feature.desc}
      </p>

      {/* Bottom corner accent */}
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-white/[0.03] group-hover:border-accent/15 transition-colors duration-500" />
    </div>
  );
};

export const FeatureGrid = () => {
  return (
    <div className="features-grid max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] border border-white/[0.04]">
      {features.map((f, i) => (
        <FeatureCard key={i} index={i} feature={f} />
      ))}
    </div>
  );
};
