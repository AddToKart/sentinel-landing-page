"use client";

import { Cpu, Terminal, Code2, Layout, Zap, Activity, Package } from "lucide-react";

export const ArchitectureStack = () => {
  const stack = [
    { icon: Cpu, layer: "Desktop", tech: "Tauri v2", detail: "— Rust backend", badge: "Rust", badgeClass: "bg-amber-400/10 text-amber-400 border-amber-400/20" },
    { icon: Terminal, layer: "Terminal", tech: "xterm.js", detail: "+ portable-pty", badge: "Both", badgeClass: "bg-accent/10 text-accent border-accent/20" },
    { icon: Code2, layer: "Editor", tech: "Monaco Editor", detail: "— VS Code core", badge: "TypeScript", badgeClass: "bg-blue-400/10 text-blue-400 border-blue-400/20" },
    { icon: Layout, layer: "Frontend", tech: "React 19", detail: "+ TypeScript + Vite", badge: "TypeScript", badgeClass: "bg-blue-400/10 text-blue-400 border-blue-400/20" },
    { icon: Zap, layer: "Styling", tech: "Tailwind CSS 4", detail: "— CSS-first", badge: "TypeScript", badgeClass: "bg-blue-400/10 text-blue-400 border-blue-400/20" },
    { icon: Activity, layer: "Metrics", tech: "sysinfo crate", detail: "— process tree", badge: "Rust", badgeClass: "bg-amber-400/10 text-amber-400 border-amber-400/20" },
    { icon: Package, layer: "Packages", tech: "Bun", detail: "— fast package manager", badge: "TypeScript", badgeClass: "bg-blue-400/10 text-blue-400 border-blue-400/20" },
  ];

  return (
    <div className="flex flex-col gap-px relative">
      {stack.map((row, i) => (
        <div
          key={i}
          className="arch-row flex items-center border border-white/[0.04] bg-bg2/30 hover:bg-bg2/70 hover:border-white/[0.08] transition-all duration-300 group overflow-hidden relative contain-layout-style"
        >
          {/* Scan line on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden transition-opacity duration-300">
            <div className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-accent/[0.03] to-transparent animate-scan-sweep" />
          </div>

          {/* Left accent */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-accent/0 group-hover:bg-accent/50 transition-colors duration-300" />

          <div className="p-4 w-12 flex items-center justify-center text-muted-text/60 group-hover:text-accent transition-colors duration-300">
            <row.icon className="w-[15px] h-[15px]" />
          </div>
          <div className="p-4 text-[10px] font-mono font-bold w-24 text-muted-text/60 border-x border-white/[0.04] uppercase tracking-widest text-right">
            {row.layer}
          </div>
          <div className="p-4 text-sm text-text flex-1">
            {row.tech} <span className="text-muted-text/50 hidden md:inline">{row.detail}</span>
          </div>
          <div className={`mr-4 text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 border ${row.badgeClass}`}>
            {row.badge}
          </div>
        </div>
      ))}
    </div>
  );
};
