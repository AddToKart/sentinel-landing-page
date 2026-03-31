"use client";

import { useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
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

    // Subtle 3D tilt
    const tiltX = ((y - 50) / 50) * 3;
    const tiltY = ((x - 50) / 50) * -3;
    cardRef.current.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.01)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 5 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="feature-card group relative bg-bg border border-white/5 p-8 overflow-hidden cursor-default transition-all duration-300 hover:bg-bg2/80"
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          transformStyle: "preserve-3d",
          willChange: "transform",
        } as any
      }
    >
      {/* Cursor-following radial glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(74,222,128,0.08)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-transparent group-hover:bg-accent/60 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(74,222,128,0.3)]" />
      
      {/* Left accent on hover */}
      <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-transparent group-hover:bg-accent/20 transition-all duration-700 delay-100" />

      {/* Icon */}
      <div className="feat-icon w-12 h-12 flex items-center justify-center border border-white/10 mb-6 bg-bg3 transition-all duration-500 group-hover:border-accent/40 group-hover:scale-110 group-hover:text-accent group-hover:shadow-[0_0_20px_rgba(74,222,128,0.15)]">
        <feature.icon className="w-5 h-5" />
      </div>
      
      <h3 className="font-head font-700 text-lg mb-3 text-text group-hover:text-accent transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-muted-text text-[14px] leading-relaxed group-hover:text-muted-text/80 transition-colors">
        {feature.desc}
      </p>

      {/* Corner decoration */}
      <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-white/5 group-hover:border-accent/20 transition-colors duration-500" />
    </motion.div>
  );
};

export const FeatureGrid = () => {
  return (
    <div className="features-grid max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/5 border border-white/5">
      {features.map((f, i) => (
        <FeatureCard key={i} index={i} feature={f} />
      ))}
    </div>
  );
};
