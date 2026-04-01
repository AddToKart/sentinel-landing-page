"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GridCanvas } from "@/components/GridCanvas";
import {
  Cpu,
  Smartphone,
  Cloud,
  Users,
  Terminal,
  Server,
  Boxes,
  Shield,
  Rocket,
  Github,
  ArrowLeft,
  Zap,
  GitBranch,
  Plug,
  Wifi,
  Lock,
  Webhook,
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

interface EcosystemItem {
  icon: LucideIcon;
  title: string;
  description: string;
  status: "stable" | "beta" | "alpha" | "planned";
  year: string;
  accentColor?: string;
}

const ecosystemCards: EcosystemItem[] = [
  {
    icon: Cpu,
    title: "Sentinel Core",
    description:
      "The original multi-agent workspace. Orchestrate parallel AI coding sessions in isolated sandboxes with Git worktrees and Docker containers.",
    status: "stable",
    year: "2025",
    accentColor: "#4ade80",
  },
  {
    icon: Smartphone,
    title: "Sentinel Mobile",
    description:
      "Monitor sessions, review diffs, and approve changes remotely. Push alerts for CPU/RAM with encrypted sync over the wire.",
    status: "beta",
    year: "2026",
    accentColor: "#a78bfa",
  },
  {
    icon: Cloud,
    title: "Sentinel Cloud",
    description:
      "Hosted agent infrastructure with managed sandboxes, shared context pools, and team-level access controls. Zero-config deployment.",
    status: "alpha",
    year: "2026",
    accentColor: "#60a5fa",
  },
  {
    icon: Users,
    title: "Sentinel Teams",
    description:
      "Collaborative agent orchestration for engineering orgs. Shared sessions, role-based permissions, and audit trails for compliance.",
    status: "beta",
    year: "2026",
    accentColor: "#f59e0b",
  },
  {
    icon: Terminal,
    title: "Sentinel CLI",
    description:
      "Headless agent management from your terminal. Spin up sessions, pipe output, and script workflows without leaving the shell.",
    status: "alpha",
    year: "2026",
    accentColor: "#fb923c",
  },
  {
    icon: Server,
    title: "Sentinel Edge",
    description:
      "On-premise agent runtime for air-gapped and regulated environments. Full feature parity with Sentinel Cloud, zero data leaves your infra.",
    status: "planned",
    year: "2027",
    accentColor: "#6b7280",
  },
];

interface TimelineItem {
  quarter: string;
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  items: string[];
}

const timelineData: TimelineItem[] = [
  {
    quarter: "Q1",
    year: "2026",
    title: "Foundation & Mobile",
    description: "Core platform stabilization and mobile beta launch.",
    icon: Rocket,
    items: [
      "Sentinel v2.1 stable release with plugin architecture",
      "Mobile companion app beta for iOS and Android",
      "MCP protocol v2 support with streaming context",
      "Unified settings sync across desktop and mobile",
    ],
  },
  {
    quarter: "Q2",
    year: "2026",
    title: "Cloud & Collaboration",
    description: "Hosted infrastructure and team features go live.",
    icon: Cloud,
    items: [
      "Sentinel Cloud public beta with managed sandboxes",
      "Real-time collaborative sessions for teams",
      "Shared context pools across team workspaces",
      "CI/CD integration hooks for GitHub Actions and GitLab",
    ],
  },
  {
    quarter: "Q3",
    year: "2026",
    title: "Ecosystem Expansion",
    description: "CLI, plugins, and third-party integrations.",
    icon: Boxes,
    items: [
      "Sentinel CLI for headless agent management",
      "Public plugin marketplace with signed extensions",
      "VS Code and JetBrains IDE extensions",
      "Custom model provider API and self-hosted LLM routing",
    ],
  },
  {
    quarter: "Q4",
    year: "2026",
    title: "Enterprise & Edge",
    description: "On-premise deployment and enterprise security.",
    icon: Shield,
    items: [
      "Sentinel Edge for air-gapped and regulated environments",
      "SSO/SAML integration with Okta and Azure AD",
      "SOC 2 Type II compliance certification",
      "Advanced audit logging and data retention policies",
    ],
  },
];

interface InDevFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  progress: number;
  category: string;
  accentColor: string;
}

const inDevFeatures: InDevFeature[] = [
  {
    icon: Plug,
    title: "Plugin Architecture",
    description:
      "A sandboxed extension system allowing community-built plugins to hook into session lifecycle, UI panels, and agent pipelines.",
    progress: 72,
    category: "Core",
    accentColor: "#4ade80",
  },
  {
    icon: Wifi,
    title: "Remote Session Sync",
    description:
      "End-to-end encrypted session state synchronization between desktop and mobile clients via WebSocket relay.",
    progress: 48,
    category: "Mobile",
    accentColor: "#a78bfa",
  },
  {
    icon: Lock,
    title: "Sandbox Isolation v2",
    description:
      "Next-gen microVM sandboxing using Firecracker with per-session resource quotas, network policies, and snapshot restore.",
    progress: 35,
    category: "Security",
    accentColor: "#60a5fa",
  },
  {
    icon: Webhook,
    title: "CI/CD Webhooks",
    description:
      "First-class webhook integration for triggering agent sessions from GitHub, GitLab, and Bitbucket push events and PR reviews.",
    progress: 61,
    category: "Integrations",
    accentColor: "#f59e0b",
  },
  {
    icon: GitBranch,
    title: "Git Worktree Manager",
    description:
      "Visual worktree lifecycle management with automatic branch creation, merge conflict detection, and stash coordination.",
    progress: 85,
    category: "Core",
    accentColor: "#4ade80",
  },
  {
    icon: Zap,
    title: "Streaming Context Engine",
    description:
      "Real-time context window optimization that dynamically adjusts token allocation across agents based on priority scoring.",
    progress: 29,
    category: "AI",
    accentColor: "#ec4899",
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
      className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 md:px-10 h-[60px] backdrop-blur-xl bg-bg/80 border-b border-white/[0.06]"
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
          className="flex items-center gap-2 text-muted-text font-mono text-[11px] border border-white/[0.08] px-3.5 py-1.5 hover:text-text hover:border-white/20 transition-all duration-200 bg-white/[0.02]"
        >
          <Github className="w-3.5 h-3.5" />
          GitHub
        </a>
      </div>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   STATUS BADGE
   ═══════════════════════════════════════════════════════════ */

function StatusBadge({ status }: { status: EcosystemItem["status"] }) {
  const config: Record<
    EcosystemItem["status"],
    { label: string; className: string }
  > = {
    stable: {
      label: "Stable",
      className: "bg-accent/10 text-accent border-accent/20",
    },
    beta: {
      label: "Beta",
      className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    alpha: {
      label: "Alpha",
      className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    planned: {
      label: "Planned",
      className: "bg-white/[0.04] text-muted-text border-white/[0.08]",
    },
  };

  const { label, className } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.15em] px-2 py-0.5 border ${className}`}
    >
      <span
        className={`w-1 h-1 rounded-full ${
          status === "stable"
            ? "bg-accent"
            : status === "beta"
            ? "bg-amber-400"
            : status === "alpha"
            ? "bg-blue-400"
            : "bg-muted-text/40"
        } ${status === "stable" ? "animate-pulse" : ""}`}
      />
      {label}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   ECOSYSTEM CARD
   ═══════════════════════════════════════════════════════════ */

function EcosystemCard({
  icon: Icon,
  title,
  description,
  status,
  year,
  accentColor = "#4ade80",
  index,
}: EcosystemItem & { index: number }) {
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
      className="group relative bg-bg2 border border-white/[0.04] p-6 hover:border-white/[0.08] transition-all duration-300 flex flex-col"
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
        <StatusBadge status={status} />
      </div>

      <h3 className="font-head font-800 text-lg tracking-tight text-text mb-2">
        {title}
      </h3>
      <p className="text-muted-text text-[13px] leading-relaxed mb-5 flex-1">
        {description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-text/50">
          Launch {year}
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
   TIMELINE ITEM
   ═══════════════════════════════════════════════════════════ */

function TimelineItem({
  quarter,
  year,
  title,
  description,
  icon: Icon,
  items,
  index,
  isLast,
}: TimelineItem & { index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">
      {/* Vertical line & dot */}
      <div className="relative flex flex-col items-center flex-shrink-0">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-10 h-10 rounded-full bg-bg2 border border-accent/30 flex items-center justify-center"
        >
          <Icon className="w-4 h-4 text-accent/80" />
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <div className="relative w-px flex-1 bg-white/[0.06] overflow-hidden">
            <motion.div
              style={{ scaleY: lineScale, transformOrigin: "top" }}
              className="absolute inset-0 bg-accent/30"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.05,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`flex-1 ${isLast ? "pb-0" : "pb-12 md:pb-16"}`}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-accent/70 font-bold">
            {quarter} {year}
          </span>
          <div className="h-px flex-1 bg-accent/10" />
        </div>
        <h3 className="font-head font-800 text-2xl md:text-3xl tracking-tight text-text mb-2">
          {title}
        </h3>
        <p className="text-muted-text text-[14px] leading-relaxed mb-5 max-w-[480px]">
          {description}
        </p>
        <ul className="space-y-2.5">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.15 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-start gap-3 text-[13px] text-muted-text"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-1.5 flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   IN-DEV CARD
   ═══════════════════════════════════════════════════════════ */

function InDevCard({
  icon: Icon,
  title,
  description,
  progress,
  category,
  accentColor,
  index,
}: InDevFeature & { index: number }) {
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
      className="group bg-bg border border-white/[0.04] p-6 hover:border-white/[0.08] transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}10` }}
        >
          <Icon className="w-[18px] h-[18px]" style={{ color: accentColor, opacity: 0.8 }} />
        </div>
        <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-muted-text/50">
          {category}
        </span>
      </div>

      <h4 className="font-head font-800 text-[15px] tracking-tight text-text mb-1.5">
        {title}
      </h4>
      <p className="text-muted-text text-[12px] leading-relaxed mb-5 line-clamp-2">
        {description}
      </p>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-text/40">
            Progress
          </span>
          <span
            className="text-[11px] font-mono font-bold"
            style={{ color: accentColor }}
          >
            {progress}%
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-bg2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              delay: 0.2 + index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="h-full rounded-full"
            style={{ backgroundColor: accentColor }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROADMAP PAGE
   ═══════════════════════════════════════════════════════════ */

export default function RoadmapPage() {
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
          <Rocket className="w-3.5 h-3.5" />
          Product Roadmap 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-head font-800 text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.92] tracking-tighter mb-6"
        >
          The future of
          <br />
          <span className="text-accent italic relative">
            agent orchestration
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
          From a desktop agent runner to a full ecosystem — here&apos;s where
          Sentinel is headed and what we&apos;re building right now.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-4 text-[11px] font-mono uppercase tracking-[0.15em] text-muted-text/60"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            1 Stable Release
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            2 In Beta
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            2 In Alpha
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-text/40" />
            1 Planned
          </span>
        </motion.div>
      </motion.section>

      {/* ═══ ECOSYSTEM GRID ═══ */}
      <section className="py-28 px-6 relative z-[1] bg-bg2 border-y border-white/[0.04]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
              Sentinel Ecosystem
            </div>
            <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
              One vision. Six products.
            </h2>
            <p className="text-muted-text max-w-[560px] text-lg leading-relaxed mb-14">
              The Sentinel ecosystem is expanding from a single desktop app into a
              full platform for AI agent orchestration — desktop, mobile, cloud,
              and on-premise.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ecosystemCards.map((card, i) => (
              <EcosystemCard key={card.title} {...card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="py-28 px-6 relative z-[1]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
                Release Timeline
              </div>
              <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
                Quarter by quarter.
              </h2>
              <p className="text-muted-text max-w-[480px] mx-auto text-[15px] leading-relaxed">
                Our planned milestones for 2026. Dates may shift as we prioritize
                based on community feedback and engineering constraints.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-[700px] mx-auto">
            {timelineData.map((item, i) => (
              <TimelineItem
                key={item.quarter + item.year}
                {...item}
                index={i}
                isLast={i === timelineData.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ IN DEVELOPMENT ═══ */}
      <section className="py-28 px-6 relative z-[1] bg-bg2 border-y border-white/[0.04]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 font-bold">
                Active Development
              </div>
              <div className="h-px flex-1 bg-accent/10" />
            </div>
            <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
              What we&apos;re building now.
            </h2>
            <p className="text-muted-text max-w-[560px] text-lg leading-relaxed mb-14">
              Features currently in active development. Progress bars reflect
              engineering completion — not launch readiness, which includes testing,
              docs, and polish.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inDevFeatures.map((feature, i) => (
              <InDevCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-36 px-6 relative z-[1] text-center overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <ScrollReveal>
          <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-6 font-bold">
            Open Development
          </div>
          <h2 className="font-head font-800 text-5xl md:text-7xl tracking-tighter leading-none mb-8">
            Shape the roadmap.
            <br />
            <span className="text-accent italic">Star the repo.</span>
          </h2>
          <p className="text-muted-text max-w-[480px] mx-auto text-lg leading-relaxed mb-10">
            Sentinel is built in public. Your feedback directly influences what we
            build next. Star the repo to stay updated.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="https://github.com/AddToKart/sentinel-v2"
              target="_blank"
              className="w-full sm:w-auto bg-accent text-bg font-mono text-sm font-bold px-9 py-4 inline-flex items-center justify-center gap-2 group relative overflow-hidden hover:brightness-110 transition-all duration-200"
            >
              <Github className="w-4 h-4" />
              <span className="relative z-10">Star on GitHub</span>
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 group-hover:left-full" />
            </a>
            <Link
              href="/"
              className="w-full sm:w-auto font-mono text-sm text-text border border-white/[0.08] px-9 py-4 inline-flex items-center justify-center gap-2 hover:bg-white/[0.03] hover:border-white/15 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-white/[0.04] px-6 py-12 bg-bg relative z-[1]">
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
                  <a
                    href="#"
                    className="hover:text-text transition-colors duration-150"
                  >
                    Roadmap
                  </a>
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
                  <a
                    href="https://github.com/AddToKart/sentinel-v2/blob/main/README.md"
                    target="_blank"
                    className="hover:text-text transition-colors duration-150"
                  >
                    Documentation
                  </a>
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
        <div className="max-w-[1100px] mx-auto mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between gap-4 text-[9px] uppercase tracking-[0.15em] text-muted-text/40">
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
