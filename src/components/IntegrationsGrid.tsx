"use client";

import { Bot, Braces, Cpu, GitBranch, Monitor, Package, Terminal, Zap, Sparkles, Box, Cloud, Container, Code2 } from "lucide-react";

const integrations = [
  // AI Agents
  { icon: Bot, name: "Claude", detail: "Anthropic" },
  { icon: Braces, name: "Codex", detail: "OpenAI" },
  { icon: Cpu, name: "Gemini", detail: "Google" },
  { icon: Sparkles, name: "Qwen", detail: "Alibaba" },
  { icon: Box, name: "Kilo", detail: "AI Agent" },
  { icon: Cloud, name: "Kimi", detail: "Moonshot" },
  // Tools & Runtime
  { icon: Terminal, name: "xterm.js", detail: "Terminal" },
  { icon: Monitor, name: "Monaco", detail: "Editor" },
  { icon: GitBranch, name: "Git", detail: "Worktrees" },
  { icon: Package, name: "Bun", detail: "Runtime" },
  { icon: Container, name: "Docker", detail: "Containers" },
  { icon: Code2, name: "VS Code", detail: "Extensions" },
];

export const IntegrationsGrid = () => {
  return (
    <div className="max-w-[1100px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-px bg-border-dim border border-border-dim">
      {integrations.map((item, i) => (
        <div
          key={i}
          className="integration-card group bg-bg p-8 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:bg-bg2/50 cursor-default contain-layout-style"
          style={{ transitionDelay: `${i * 40}ms` }}
        >
          <div className="w-12 h-12 rounded-xl bg-bg3/60 border border-border-dim flex items-center justify-center text-muted-text transition-all duration-300 group-hover:border-accent/25 group-hover:text-accent group-hover:bg-accent/[0.04]">
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
