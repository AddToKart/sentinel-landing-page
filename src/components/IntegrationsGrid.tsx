"use client";

import { Bot, Braces, Cpu, GitBranch, Monitor, Package, Terminal, Zap } from "lucide-react";

const integrations = [
  { icon: Bot, name: "Claude", detail: "Anthropic" },
  { icon: Zap, name: "GPT-4", detail: "OpenAI" },
  { icon: Cpu, name: "Gemini", detail: "Google" },
  { icon: Braces, name: "Codex", detail: "OpenAI" },
  { icon: Terminal, name: "xterm.js", detail: "Terminal" },
  { icon: Monitor, name: "Monaco", detail: "Editor" },
  { icon: GitBranch, name: "Git", detail: "Worktrees" },
  { icon: Package, name: "Bun", detail: "Runtime" },
];

export const IntegrationsGrid = () => {
  return (
    <div className="max-w-[1100px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.04] border border-white/[0.04]">
      {integrations.map((item, i) => (
        <div
          key={i}
          className="integration-card group bg-bg p-8 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:bg-bg2/50 cursor-default contain-layout-style"
          style={{ transitionDelay: `${i * 40}ms` }}
        >
          <div className="w-12 h-12 rounded-xl bg-bg3/60 border border-white/[0.06] flex items-center justify-center text-muted-text transition-all duration-300 group-hover:border-accent/25 group-hover:text-accent group-hover:bg-accent/[0.04]">
            <item.icon className="w-5 h-5" />
          </div>
          <div>
            <div className="font-head font-700 text-sm text-text group-hover:text-accent transition-colors duration-300">
              {item.name}
            </div>
            <div className="text-[11px] text-muted-text mt-0.5">
              {item.detail}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
