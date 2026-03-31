"use client";

import { motion } from "framer-motion";
import { Cpu, Terminal, Code2, Layout, Zap, Activity, Package } from "lucide-react";

export const ArchitectureStack = () => {
  const stack = [
    { icon: Cpu, layer: "Desktop", tech: "Tauri v2", detail: "— Rust backend", badge: "Rust", badgeClass: "bg-amber-400/10 text-amber-400 border-amber-400/25" },
    { icon: Terminal, layer: "Terminal", tech: "xterm.js", detail: "+ portable-pty", badge: "Both", badgeClass: "bg-accent/10 text-accent border-accent/25" },
    { icon: Code2, layer: "Editor", tech: "Monaco Editor", detail: "— VS Code core", badge: "TypeScript", badgeClass: "bg-blue-400/10 text-blue-400 border-blue-400/25" },
    { icon: Layout, layer: "Frontend", tech: "React 19", detail: "+ TypeScript + Vite", badge: "TypeScript", badgeClass: "bg-blue-400/10 text-blue-400 border-blue-400/25" },
    { icon: Zap, layer: "Styling", tech: "Tailwind CSS 4", detail: "— CSS-first", badge: "TypeScript", badgeClass: "bg-blue-400/10 text-blue-400 border-blue-400/25" },
    { icon: Activity, layer: "Metrics", tech: "sysinfo crate", detail: "— process tree", badge: "Rust", badgeClass: "bg-amber-400/10 text-amber-400 border-amber-400/25" },
    { icon: Package, layer: "Packages", tech: "Bun", detail: "— fast package manager", badge: "TypeScript", badgeClass: "bg-blue-400/10 text-blue-400 border-blue-400/25" },
  ];

  return (
    <div className="flex flex-col gap-1 relative">
      {stack.map((row, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center border border-white/5 bg-bg2/30 hover:bg-bg2/80 hover:border-white/10 transition-all duration-300 group overflow-hidden relative"
        >
          {/* Scan line effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
            <div className="absolute top-0 bottom-0 w-[30%] bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-scan-line" />
          </div>

          {/* Left accent on hover */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent/0 group-hover:bg-accent/60 transition-all duration-300" />

          <div className="p-4 w-12 flex items-center justify-center text-muted-text group-hover:text-accent transition-colors duration-300">
            <row.icon className="w-4 h-4" />
          </div>
          <div className="p-4 text-[10px] font-mono font-bold w-24 text-muted-text border-x border-white/5 uppercase tracking-widest text-right">
            {row.layer}
          </div>
          <div className="p-4 text-sm text-text flex-1">
            {row.tech} <span className="text-muted-text hidden md:inline">{row.detail}</span>
          </div>
          <div className={`mr-4 text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-1 border ${row.badgeClass} transition-all duration-300 group-hover:shadow-sm`}>
            {row.badge}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
