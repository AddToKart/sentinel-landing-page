"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { GridCanvas } from "@/components/GridCanvas";
import { ShowcaseGrid, type Project } from "@/components/ShowcaseGrid";
import { Github, ArrowLeft, Code2, Globe, Sparkles } from "lucide-react";
import Link from "next/link";

/* ─── Nexus Ecosystem Projects ──────────────────── */
const nexusProjects: Project[] = [
  {
    name: "Nexus Task",
    description:
      "AI-powered task management module within the Nexus Ecosystem. Provides intelligent task decomposition, priority scoring, and automated workflow routing for development teams. Designed to plug into any MCP-compatible agent pipeline.",
    tech: ["TypeScript", "FastAPI", "Python", "MongoDB"],
    url: "https://github.com/AddToKart/nexus-task",
    language: "TypeScript",
    accentColor: "#8b5cf6",
    category: "nexus",
  },
  {
    name: "Nexus Context",
    description:
      "A self-hosted platform providing long-term memory for AI agents via the Model Context Protocol (MCP). Combines a Kanban task system with dependency graphs, context logging, and a Discord bot bridge so agents never lose context across sessions.",
    tech: ["TypeScript", "Python", "Discord API", "MongoDB"],
    url: "https://github.com/gennyyyy/nexus-content",
    language: "TypeScript",
    accentColor: "#8b5cf6",
    category: "nexus",
  },
  {
    name: "Nexus Auth",
    description:
      "Unified authentication and authorization layer for the Nexus Ecosystem. Handles OAuth2 flows, API key management, and session tokens so every Nexus service shares a single identity surface. Built as a drop-in middleware.",
    tech: ["TypeScript", "FastAPI", "Python"],
    url: "https://github.com/AddToKart/nexus-auth",
    language: "TypeScript",
    accentColor: "#8b5cf6",
    category: "nexus",
  },
];

/* ─── Personal Projects ─────────────────────────── */
const personalProjects: Project[] = [
  {
    name: "TuneWise",
    description:
      "AI-powered Spotify playlist generator. Describe a vibe or type an artist name and TuneWise uses Google Gemini with OpenRouter fallback to curate playlists with 30-second previews, drag-and-drop reorder, QR sharing, and multi-genre blending.",
    tech: ["Next.js", "TypeScript", "Google Gemini", "Spotify API"],
    url: "https://github.com/AddToKart/TuneWise",
    stars: 1,
    language: "TypeScript",
    accentColor: "#1db954",
    category: "personal",
  },
  {
    name: "LinkNotes",
    description:
      "A peer-to-peer note sharing app where all data is encoded directly in URLs. No server, no accounts. Supports plain text, Markdown, and rich text editors with AES password encryption, expiration timers, and edit-after-share tokens.",
    tech: ["React", "TypeScript", "Vite", "AES Encryption", "TipTap Editor"],
    url: "https://github.com/AddToKart/note-taking-app",
    language: "TypeScript",
    accentColor: "#06b6d4",
    category: "personal",
  },
  {
    name: "Transaction Fraud Detection",
    description:
      "Real-time blockchain transaction monitoring powered by Google Gemini AI. Analyzes transaction patterns, flags anomalies, and generates detailed risk reports. Django backend with MongoDB storage and a Next.js dashboard with Framer Motion animations.",
    tech: ["Next.js", "Django", "MongoDB", "Google Gemini", "Framer Motion"],
    url: "https://github.com/AddToKart/transaction-fraud-detection",
    stars: 1,
    language: "TypeScript",
    accentColor: "#ef4444",
    category: "personal",
  },
  {
    name: "Quill Craft",
    description:
      "An intelligent writing and paraphrasing tool with a full frontend/backend architecture. Leverages NLP to rephrase, summarize, and enhance text while preserving meaning. TypeScript-first with a clean separation of concerns.",
    tech: ["TypeScript", "FastAPI", "Python"],
    url: "https://github.com/AddToKart/quill-craft",
    stars: 1,
    language: "TypeScript",
    accentColor: "#f59e0b",
    category: "personal",
  },
  {
    name: "Barbecue Bot",
    description:
      "A fun Discord bot for managing and sharing barbecue recipes, cooking timers, and meat temperature guides. Supports slash commands, embed-based recipe cards, and community voting on the best smoke rings.",
    tech: ["TypeScript", "Discord API"],
    url: "https://github.com/AddToKart/barbecue-bot",
    language: "TypeScript",
    accentColor: "#f97316",
    category: "personal",
  },
  {
    name: "Sentinel",
    description:
      "A high-performance multi-agent workspace built with Tauri v2 and React 19. Orchestrate multiple AI coding sessions simultaneously in isolated sandboxes, Git worktrees, or Docker containers with real-time telemetry.",
    tech: ["Rust", "Tauri v2", "React 19", "TypeScript"],
    url: "https://github.com/AddToKart/sentinel-v2",
    stars: 1,
    language: "Rust",
    accentColor: "#4ade80",
    category: "personal",
  },
];

/* ─── Nav ───────────────────────────────────────── */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 md:px-10 h-[60px] backdrop-blur-xl bg-bg/80 border-b border-white/[0.06]">
      <Link
        href="/"
        className="font-head font-800 text-[17px] tracking-tight text-text flex items-center gap-2.5 hover:text-accent transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <div className="w-[7px] h-[7px] rounded-full bg-accent" />
        SENTINEL
      </Link>
      <div className="flex gap-2.5 items-center">
        <a
          href="https://github.com/AddToKart"
          target="_blank"
          className="flex items-center gap-2 text-muted-text font-mono text-[11px] border border-white/[0.08] px-3.5 py-1.5 hover:text-text hover:border-white/20 transition-all duration-200 bg-white/[0.02]"
        >
          <Github className="w-3.5 h-3.5" />
          AddToKart
        </a>
      </div>
    </nav>
  );
}

/* ─── Main Page ─────────────────────────────────── */
export default function ProductsPage() {
  return (
    <main className="min-h-screen relative selection:bg-accent selection:text-bg">
      <GridCanvas />
      <Nav />

      {/* ═══ HERO ═══ */}
      <section className="pt-32 pb-20 px-6 relative z-[1] text-center">
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <ScrollReveal>
          <div className="inline-flex items-center gap-2 text-[11px] text-accent/80 tracking-[0.2em] uppercase border border-accent/15 px-4 py-1.5 mb-8 bg-accent/[0.03]">
            <Code2 className="w-3.5 h-3.5" />
            Developer Portfolio
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h1 className="font-head font-800 text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.92] tracking-tighter mb-6">
            Built by{" "}
            <span className="text-accent italic relative">
              AddToKart
              <span className="absolute left-0 bottom-1.5 h-[3px] md:h-[5px] w-full bg-accent/15 -z-10" />
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <p className="max-w-[620px] mx-auto text-muted-text text-lg md:text-xl leading-relaxed mb-6">
            A collection of open-source projects spanning AI agent tooling, developer
            utilities, security research, and creative applications.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={220}>
          <div className="flex flex-wrap justify-center gap-4 text-[11px] font-mono uppercase tracking-[0.15em] text-muted-text/60">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              42 Repositories
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Full-Stack Developer
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Linux Enthusiast
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Arch + Hyprland
            </span>
          </div>
        </ScrollReveal>

        {/* Tech highlights */}
        <ScrollReveal delay={300}>
          <div className="max-w-[700px] mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] border border-white/[0.04]">
            {[
              { icon: Code2, label: "TypeScript", sub: "Primary Language" },
              { icon: Sparkles, label: "AI / Gemini", sub: "ML Integration" },
              { icon: Globe, label: "Full-Stack", sub: "React + Python" },
              { icon: Github, label: "Open Source", sub: "MIT Licensed" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 bg-bg flex flex-col items-center gap-2 hover:bg-white/[0.02] transition-colors duration-300 group"
              >
                <item.icon className="w-4 h-4 text-accent/50 group-hover:text-accent transition-colors duration-200" />
                <div className="font-mono text-[12px] text-text">{item.label}</div>
                <div className="text-[9px] uppercase tracking-[0.15em] text-muted-text/50">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ NEXUS ECOSYSTEM ═══ */}
      <section className="py-28 px-6 relative z-[1] bg-bg2 border-y border-white/[0.04]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-[11px] tracking-[0.2em] uppercase text-purple-400/80 font-bold">
                Collaborative
              </div>
              <div className="h-px flex-1 bg-purple-500/10" />
            </div>
            <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
              Nexus Ecosystem.
            </h2>
            <p className="text-muted-text max-w-[560px] text-lg leading-relaxed mb-14">
              A modular suite of AI agent infrastructure built in collaboration with the
              Nexus Ecosystem. Task management, persistent context, and unified auth for
              MCP-compatible agent pipelines.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <ShowcaseGrid projects={nexusProjects} />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ PERSONAL PROJECTS ═══ */}
      <section className="py-28 px-6 relative z-[1]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 font-bold">
                Personal Projects
              </div>
              <div className="h-px flex-1 bg-accent/10" />
            </div>
            <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
              Side projects &amp; experiments.
            </h2>
            <p className="text-muted-text max-w-[560px] text-lg leading-relaxed mb-14">
              From AI playlist generators to peer-to-peer note sharing and blockchain
              fraud detection — a mix of utilities, tools, and creative experiments.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <ShowcaseGrid projects={personalProjects} />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-28 px-6 relative z-[1] text-center">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />
        <ScrollReveal>
          <h2 className="font-head font-800 text-4xl md:text-6xl tracking-tighter leading-none mb-6">
            Want to collaborate?
          </h2>
          <p className="text-muted-text max-w-[440px] mx-auto text-lg leading-relaxed mb-10">
            All projects are open source. Feel free to star, fork, or open an issue.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="https://github.com/AddToKart"
              target="_blank"
              className="w-full sm:w-auto bg-accent text-bg font-mono text-sm font-bold px-9 py-4 inline-flex items-center justify-center gap-2 hover:brightness-110 transition-all duration-200"
            >
              <Github className="w-4 h-4" />
              View All Repos
            </a>
            <Link
              href="/"
              className="w-full sm:w-auto font-mono text-sm text-text border border-white/[0.08] px-9 py-4 inline-flex items-center justify-center gap-2 hover:bg-white/[0.03] hover:border-white/15 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sentinel
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-white/[0.04] px-6 py-12 bg-bg relative z-[1]">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-3">
            <div className="font-head font-800 tracking-tighter text-text text-xl">
              ADDTOKART.
            </div>
            <p className="text-muted-text text-[13px] max-w-[280px]">
              Open-source developer building AI tooling, developer utilities, and creative
              applications.
            </p>
          </div>
          <div className="flex gap-5 text-[11px] font-mono uppercase tracking-[0.15em] text-muted-text/50">
            <a
              href="https://github.com/AddToKart"
              target="_blank"
              className="hover:text-accent/60 transition-colors duration-150 flex items-center gap-1.5"
            >
              <Github className="w-3 h-3" /> GitHub
            </a>
            <Link
              href="/"
              className="hover:text-accent/60 transition-colors duration-150 flex items-center gap-1.5"
            >
              <Globe className="w-3 h-3" /> Sentinel
            </Link>
          </div>
        </div>
        <div className="max-w-[1100px] mx-auto mt-10 pt-6 border-t border-white/[0.04] text-[9px] uppercase tracking-[0.15em] text-muted-text/40">
          &copy; 2026 AddToKart. All projects are open source under the MIT License.
        </div>
      </footer>
    </main>
  );
}
