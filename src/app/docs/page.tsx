"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GridCanvas } from "@/components/GridCanvas";
import {
  Github,
  ArrowLeft,
  Book,
  Code2,
  Terminal,
  Settings,
  Package,
  Cloud,
  Zap,
  ExternalLink,
  FileText,
  Wrench,
  Cpu,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

interface ConceptItem {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor: string;
}

const concepts: ConceptItem[] = [
  {
    icon: Cpu,
    title: "Agents",
    description:
      "AI-powered coding assistants that operate autonomously within Sentinel. Each agent runs in its own isolated context with a dedicated terminal, file system view, and process tree. Configure agents with different models — Claude, GPT-4, Gemini, or local LLMs via Ollama.",
    accentColor: "#4ade80",
  },
  {
    icon: Package,
    title: "Sandboxes",
    description:
      "Isolated runtime environments that keep agent experiments separate from your main codebase. Choose between Sandbox Copy (directory duplication) or Git Worktree (branch isolation) depending on your workflow. Every change is tracked and reversible.",
    accentColor: "#60a5fa",
  },
  {
    icon: Zap,
    title: "Sessions",
    description:
      "A single agent execution context with its own telemetry stream. Sessions capture terminal output, file diffs, CPU/RAM usage, and agent reasoning in real-time. Run dozens of sessions in parallel — each one fully independent and killable.",
    accentColor: "#f59e0b",
  },
  {
    icon: Settings,
    title: "Workflows",
    description:
      "Composable pipelines that chain multiple agent sessions together. Define triggers (file change, git push, manual), assign agents, set isolation modes, and configure approval gates. Workflows turn repetitive multi-step tasks into one-click operations.",
    accentColor: "#a78bfa",
  },
];

interface GuideItem {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
  accentColor: string;
}

const guides: GuideItem[] = [
  {
    icon: Settings,
    title: "Initial Setup",
    description:
      "Install Sentinel, configure your first agent provider, and launch your inaugural session in under 5 minutes.",
    tag: "Beginner",
    accentColor: "#4ade80",
  },
  {
    icon: Wrench,
    title: "Configuration",
    description:
      "Deep-dive into sentinel.toml — customize sandbox modes, resource limits, model routing, and telemetry preferences.",
    tag: "Intermediate",
    accentColor: "#60a5fa",
  },
  {
    icon: Cloud,
    title: "Integrations",
    description:
      "Connect Sentinel to GitHub, GitLab, Discord, Slack, and custom webhooks. Set up MCP protocol pipelines with external tools.",
    tag: "Intermediate",
    accentColor: "#f59e0b",
  },
  {
    icon: Terminal,
    title: "CI/CD Pipelines",
    description:
      "Automate agent sessions in your CI pipeline. Trigger sandboxed code reviews, test generation, and refactoring on every PR.",
    tag: "Advanced",
    accentColor: "#a78bfa",
  },
];

interface EndpointItem {
  method: string;
  path: string;
  description: string;
}

const endpoints: EndpointItem[] = [
  {
    method: "GET",
    path: "/api/v1/sessions",
    description: "List all active and recent sessions with status and telemetry summary.",
  },
  {
    method: "POST",
    path: "/api/v1/sessions",
    description: "Create a new agent session with specified model, sandbox mode, and workspace path.",
  },
  {
    method: "GET",
    path: "/api/v1/sessions/:id",
    description: "Retrieve detailed session info including terminal output, file diffs, and resource usage.",
  },
  {
    method: "DELETE",
    path: "/api/v1/sessions/:id",
    description: "Terminate a running session and clean up its sandbox environment.",
  },
  {
    method: "GET",
    path: "/api/v1/sandboxes",
    description: "List all available sandbox environments and their current state.",
  },
  {
    method: "POST",
    path: "/api/v1/workflows/trigger",
    description: "Manually trigger a configured workflow pipeline with optional parameter overrides.",
  },
];

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "How do I install Sentinel?",
    a: "Sentinel ships as a native binary for macOS, Windows, and Linux. Download the latest release from GitHub Releases, or install via your platform's package manager. The binary is under 15MB and requires no runtime dependencies thanks to Tauri v2.",
  },
  {
    q: "What are the system requirements?",
    a: "Sentinel runs on any modern machine with at least 4GB RAM. For running multiple agents in parallel, we recommend 8GB+ and a multi-core CPU. Docker is required for container-based sandboxing but optional if you use Git Worktree mode.",
  },
  {
    q: "How does sandbox isolation protect my code?",
    a: "Sandboxes create a completely isolated copy of your project. Agents operate within this copy — they can read, write, and execute freely, but nothing touches your main codebase until you explicitly review and apply changes through the diff/apply workflow.",
  },
  {
    q: "Can I use my own AI model or a local LLM?",
    a: "Yes. Sentinel supports any CLI-based or API-based AI provider. For local models, configure Ollama or LM Studio as your provider. Each agent session can use a different model, so you can mix cloud and local inference in the same workspace.",
  },
  {
    q: "Is the REST API available in the free version?",
    a: "Yes. The REST API is part of the open-source core. All endpoints for session management, sandbox control, and workflow triggers are available under the MIT license. Authentication is handled via API keys generated in Sentinel's settings panel.",
  },
  {
    q: "Where can I get help if I'm stuck?",
    a: "Join our Discord community for real-time support, check the GitHub Discussions for longer-form questions, or file an issue on the repo if you've found a bug. The community is active and responsive — most questions get answered within a few hours.",
  },
];

interface ResourceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  accentColor: string;
}

const resources: ResourceItem[] = [
  {
    icon: Github,
    title: "GitHub Repository",
    description: "Source code, issues, releases, and contribution guidelines.",
    href: "https://github.com/AddToKart/sentinel-v2",
    accentColor: "#475569",
  },
  {
    icon: FileText,
    title: "README & Guides",
    description: "Comprehensive guides covering setup, configuration, and advanced usage.",
    href: "https://github.com/AddToKart/sentinel-v2/blob/main/README.md",
    accentColor: "#4ade80",
  },
  {
    icon: Code2,
    title: "API Reference",
    description: "Full REST API documentation with request/response examples.",
    href: "#api-reference",
    accentColor: "#60a5fa",
  },
  {
    icon: Book,
    title: "Community Discord",
    description: "Real-time help, feature discussions, and community showcase.",
    href: "#",
    accentColor: "#a78bfa",
  },
];

/* ═══════════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════════ */

function Nav() {
  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 md:px-10 h-[60px] backdrop-blur-xl bg-bg/80 border-b border-border-dim"
    >
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
          href="https://github.com/AddToKart/sentinel-v2"
          target="_blank"
          className="flex items-center gap-2 text-muted-text font-mono text-[11px] border border-border-dim2 px-3.5 py-1.5 hover:text-text hover:border-border-dim2 transition-all duration-200 bg-bg2"
        >
          <Github className="w-3.5 h-3.5" />
          GitHub
        </a>
      </div>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONCEPT CARD
   ═══════════════════════════════════════════════════════════ */

function ConceptCard({
  icon: Icon,
  title,
  description,
  accentColor,
  index,
}: ConceptItem & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative bg-bg border border-border-dim p-7 hover:border-border-dim2 transition-all duration-300"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}30, transparent)`,
        }}
      />

      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 transition-colors duration-200"
        style={{ backgroundColor: `${accentColor}10` }}
      >
        <Icon className="w-5 h-5" style={{ color: accentColor, opacity: 0.8 }} />
      </div>

      <h3 className="font-head font-800 text-lg tracking-tight text-text mb-2.5">
        {title}
      </h3>
      <p className="text-muted-text text-[13px] leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   GUIDE CARD
   ═══════════════════════════════════════════════════════════ */

function GuideCard({
  icon: Icon,
  title,
  description,
  tag,
  accentColor,
  index,
}: GuideItem & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative bg-bg2 border border-border-dim p-6 hover:border-border-dim2 transition-all duration-300 flex flex-col"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}30, transparent)`,
        }}
      />

      <div className="flex items-start justify-between mb-5">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
          style={{ backgroundColor: `${accentColor}10` }}
        >
          <Icon className="w-5 h-5" style={{ color: accentColor, opacity: 0.8 }} />
        </div>
        <span
          className="text-[9px] font-mono uppercase tracking-[0.15em] px-2 py-0.5 border"
          style={{
            color: accentColor,
            borderColor: `${accentColor}30`,
            backgroundColor: `${accentColor}08`,
          }}
        >
          {tag}
        </span>
      </div>

      <h3 className="font-head font-800 text-[15px] tracking-tight text-text mb-2">
        {title}
      </h3>
      <p className="text-muted-text text-[13px] leading-relaxed mb-5 flex-1">
        {description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-border-dim">
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-text/50">
          Read Guide
        </span>
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="rotate-[-45deg]"
          >
            <path
              d="M1 5H9M9 5L5 1M9 5L5 9"
              stroke={accentColor}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ENDPOINT ROW
   ═══════════════════════════════════════════════════════════ */

function EndpointRow({
  method,
  path,
  description,
  index,
}: EndpointItem & { index: number }) {
  const methodColors: Record<string, string> = {
    GET: "#4ade80",
    POST: "#60a5fa",
    PUT: "#f59e0b",
    DELETE: "#f87171",
  };
  const methodColor = methodColors[method] ?? "#475569";

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-4 border-b border-border-dim last:border-b-0 group hover:bg-bg2 px-4 -mx-4 transition-colors duration-200"
    >
      <span
        className="text-[10px] font-mono font-bold uppercase tracking-[0.1em] w-[52px] text-center py-0.5 rounded"
        style={{ color: methodColor, backgroundColor: `${methodColor}10` }}
      >
        {method}
      </span>
      <code className="font-mono text-[13px] text-text/80 flex-shrink-0">
        {path}
      </code>
      <span className="text-muted-text text-[12px] leading-relaxed sm:ml-auto">
        {description}
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FAQ ITEM
   ═══════════════════════════════════════════════════════════ */

function FaqAccordion({
  items,
}: {
  items: FaqItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-[720px] mx-auto">
      {items.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="border-b border-border-dim group"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between py-6 text-left cursor-pointer"
            >
              <span
                className={`font-head font-600 text-[15px] pr-4 transition-colors duration-200 ${
                  isOpen ? "text-accent" : "text-text group-hover:text-accent/80"
                }`}
              >
                {faq.q}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-muted-text flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-accent" : ""
                }`}
              />
            </button>
            <div
              className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                maxHeight: isOpen ? "300px" : "0",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <p className="text-muted-text text-[14px] leading-[1.7] pb-6 pr-8">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   RESOURCE CARD
   ═══════════════════════════════════════════════════════════ */

function ResourceCard({
  icon: Icon,
  title,
  description,
  href,
  accentColor,
  index,
}: ResourceItem & { index: number }) {
  const isExternal = href.startsWith("http");
  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative bg-bg border border-border-dim p-6 hover:border-border-dim2 transition-all duration-300 flex items-start gap-4 block"
    >
      {/* Left accent */}
      <div
        className="absolute left-0 top-4 bottom-4 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: accentColor }}
      />

      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200"
        style={{ backgroundColor: `${accentColor}10` }}
      >
        <Icon className="w-5 h-5" style={{ color: accentColor, opacity: 0.7 }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <h3 className="font-head font-800 text-[15px] tracking-tight text-text">
            {title}
          </h3>
          {isExternal && (
            <ExternalLink className="w-3 h-3 text-muted-text/40 group-hover:text-accent/60 transition-colors duration-200" />
          )}
        </div>
        <p className="text-muted-text text-[12px] leading-relaxed">
          {description}
        </p>
      </div>
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════════
   DOCS PAGE
   ═══════════════════════════════════════════════════════════ */

export default function DocsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.97]);
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, 60]);

  return (
    <main className="min-h-screen relative selection:bg-accent selection:text-bg">
      <GridCanvas />
      <Nav />

      {/* ═══ HERO ═══ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="hero pt-32 pb-20 px-6 relative z-[1] text-center overflow-hidden"
      >
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 text-[11px] text-accent/80 tracking-[0.2em] uppercase border border-accent/15 px-4 py-1.5 mb-8 bg-accent/[0.03]"
        >
          <Book className="w-3.5 h-3.5" />
          Documentation
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-head font-800 text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.92] tracking-tighter mb-6"
        >
          Get started with
          <br />
          <span className="text-accent italic relative">
            Sentinel
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 bottom-1.5 h-[3px] md:h-[5px] bg-accent/15 -z-10"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[620px] mx-auto text-muted-text text-lg md:text-xl leading-relaxed mb-10"
        >
          Everything you need to install, configure, and scale your multi-agent
          workspace. From first run to production pipelines.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-4 text-[11px] font-mono uppercase tracking-[0.15em] text-muted-text/60"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            v2.1 Stable
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
            REST API
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
            MIT Licensed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400" />
            MCP Compatible
          </span>
        </motion.div>
      </motion.section>

      {/* ═══ GETTING STARTED ═══ */}
      <section className="py-28 px-6 relative z-[1] bg-bg2 border-y border-border-dim">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <ScrollReveal variant="fade-left">
            <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
              Quick Start
            </div>
            <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-7">
              Up and running
              <br />
              <span className="text-accent/70">in minutes.</span>
            </h2>
            <p className="text-muted-text text-lg leading-relaxed mb-6">
              Get Sentinel installed, connect your first AI agent, and launch an
              isolated session. Three steps to parallel agent workflows.
            </p>
            <p className="text-muted-text text-[15px] leading-relaxed">
              Sentinel ships as a single native binary — no Docker required for
              basic usage, no npm install, no runtime dependencies. Download,
              run, configure your API key, and you&apos;re ready.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-right" delay={100}>
            <div className="bg-bg border border-border-dim p-8 space-y-6">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-accent/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent/80 font-mono text-[12px] font-bold">1</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-head font-800 text-[15px] tracking-tight text-text mb-2">
                    Install Sentinel
                  </h4>
                  <div className="bg-bg2 border border-border-dim p-3.5 font-mono text-[12px] text-accent/80 leading-relaxed overflow-x-auto">
                    <span className="text-muted-text/50"># macOS / Linux</span>
                    <br />
                    curl -fsSL https://sentinel.dev/install | bash
                    <br />
                    <br />
                    <span className="text-muted-text/50"># Windows (PowerShell)</span>
                    <br />
                    iwr https://sentinel.dev/install.ps1 | iex
                  </div>
                </div>
              </div>

              <div className="h-px bg-border-dim" />

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-accent/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent/80 font-mono text-[12px] font-bold">2</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-head font-800 text-[15px] tracking-tight text-text mb-2">
                    Configure your provider
                  </h4>
                  <div className="bg-bg2 border border-border-dim p-3.5 font-mono text-[12px] text-accent/80 leading-relaxed overflow-x-auto">
                    sentinel config set provider anthropic
                    <br />
                    sentinel config set api-key sk-ant-...
                  </div>
                </div>
              </div>

              <div className="h-px bg-border-dim" />

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-accent/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent/80 font-mono text-[12px] font-bold">3</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-head font-800 text-[15px] tracking-tight text-text mb-2">
                    Launch your first session
                  </h4>
                  <div className="bg-bg2 border border-border-dim p-3.5 font-mono text-[12px] text-accent/80 leading-relaxed overflow-x-auto">
                    sentinel session start --sandbox copy --project ./my-app
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CORE CONCEPTS ═══ */}
      <section className="py-28 px-6 relative z-[1]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
              Core Concepts
            </div>
            <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
              Understand the building blocks.
            </h2>
            <p className="text-muted-text max-w-[520px] text-lg leading-relaxed mb-14">
              Sentinel is built around four primitives that compose to handle
              any agent workflow — from single-session debugging to full CI/CD
              pipelines.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {concepts.map((concept, i) => (
              <ConceptCard key={concept.title} {...concept} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GUIDES ═══ */}
      <section className="py-28 px-6 relative z-[1] bg-bg2 border-y border-border-dim">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 font-bold">
                Guides
              </div>
              <div className="h-px flex-1 bg-accent/10" />
            </div>
            <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
              Step-by-step walkthroughs.
            </h2>
            <p className="text-muted-text max-w-[560px] text-lg leading-relaxed mb-14">
              From your first install to production-grade integrations. Each
              guide includes code samples, configuration snippets, and
              troubleshooting tips.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guides.map((guide, i) => (
              <GuideCard key={guide.title} {...guide} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ API REFERENCE ═══ */}
      <section id="api-reference" className="py-28 px-6 relative z-[1]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
              API Reference
            </div>
            <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
              REST API endpoints.
            </h2>
            <p className="text-muted-text max-w-[560px] text-lg leading-relaxed mb-14">
              Control Sentinel programmatically. Manage sessions, sandboxes,
              and workflows via a local REST API running on your machine.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="bg-bg2 border border-border-dim p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-dim">
                <Terminal className="w-4 h-4 text-accent/60" />
                <span className="font-mono text-[12px] text-muted-text">
                  Base URL:{" "}
                  <span className="text-accent/70">http://localhost:4711/api/v1</span>
                </span>
              </div>

              <div className="space-y-0">
                {endpoints.map((endpoint, i) => (
                  <EndpointRow key={`${endpoint.method} ${endpoint.path}`} {...endpoint} index={i} />
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border-dim flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-muted-text/40" />
                <span className="text-[11px] text-muted-text/50">
                  Full OpenAPI spec available in the GitHub repository
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-28 px-6 relative z-[1] bg-bg2 border-y border-border-dim">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
                FAQ
              </div>
              <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
                Common questions.
              </h2>
              <p className="text-muted-text max-w-[480px] mx-auto text-[15px] leading-relaxed">
                Quick answers to the questions developers ask most about
                Sentinel.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <FaqAccordion items={faqs} />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ RESOURCES ═══ */}
      <section className="py-28 px-6 relative z-[1]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
              Resources
            </div>
            <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
              Dive deeper.
            </h2>
            <p className="text-muted-text max-w-[520px] text-lg leading-relaxed mb-14">
              Source code, community channels, and extended documentation.
              Everything you need to go from prototype to production.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource, i) => (
              <ResourceCard key={resource.title} {...resource} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-36 px-6 relative z-[1] text-center overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <ScrollReveal>
          <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-6 font-bold">
            Start Building
          </div>
          <h2 className="font-head font-800 text-5xl md:text-7xl tracking-tighter leading-none mb-8">
            Install Sentinel.
            <br />
            <span className="text-accent italic">Ship faster.</span>
          </h2>
          <p className="text-muted-text max-w-[480px] mx-auto text-lg leading-relaxed mb-10">
            Open-source, MIT-licensed, and built for developers who run
            multiple AI agents. Get started in under 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="https://github.com/AddToKart/sentinel-v2"
              target="_blank"
              className="w-full sm:w-auto bg-accent text-bg font-mono text-sm font-bold px-9 py-4 inline-flex items-center justify-center gap-2 group relative overflow-hidden hover:brightness-110 transition-all duration-200"
            >
              <Github className="w-4 h-4" />
              <span className="relative z-10">View on GitHub</span>
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 group-hover:left-full" />
            </a>
            <Link
              href="/"
              className="w-full sm:w-auto font-mono text-sm text-text border border-border-dim2 px-9 py-4 inline-flex items-center justify-center gap-2 hover:bg-bg3 hover:border-border-dim2 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-border-dim px-6 py-12 bg-bg relative z-[1]">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-3">
            <div className="font-head font-800 tracking-tighter text-text text-xl">
              SENTINEL.
            </div>
            <p className="text-muted-text text-[13px] max-w-[280px]">
              The parallel workspace for the next generation of AI-driven
              engineering.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div className="space-y-3">
              <div className="text-[9px] uppercase tracking-[0.15em] text-accent/70 font-bold">
                Product
              </div>
              <ul className="space-y-1.5 text-[13px] text-muted-text">
                <li>
                  <Link
                    href="/"
                    className="hover:text-text transition-colors duration-150"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="hover:text-text transition-colors duration-150"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="hover:text-text transition-colors duration-150"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/roadmap"
                    className="hover:text-text transition-colors duration-150"
                  >
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="text-[9px] uppercase tracking-[0.15em] text-accent/70 font-bold">
                Resources
              </div>
              <ul className="space-y-1.5 text-[13px] text-muted-text">
                <li>
                  <a
                    href="https://github.com/AddToKart/sentinel-v2"
                    target="_blank"
                    className="hover:text-text transition-colors duration-150"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="hover:text-text transition-colors duration-150"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-text transition-colors duration-150"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <div className="text-[9px] uppercase tracking-[0.15em] text-accent/70 font-bold">
                Legal
              </div>
              <ul className="space-y-1.5 text-[13px] text-muted-text">
                <li>
                  <a
                    href="https://github.com/AddToKart/sentinel-v2/blob/main/LICENSE"
                    target="_blank"
                    className="hover:text-text transition-colors duration-150"
                  >
                    MIT License
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-text transition-colors duration-150"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-[1100px] mx-auto mt-10 pt-6 border-t border-border-dim flex flex-col sm:flex-row justify-between gap-4 text-[9px] uppercase tracking-[0.15em] text-muted-text/40">
          <span>&copy; 2026 Sentinel Open Source Project.</span>
          <div className="flex gap-5">
            <Link
              href="/"
              className="hover:text-accent/60 transition-colors duration-150"
            >
              Back to Sentinel
            </Link>
            <span>Built with Tauri &amp; React</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
