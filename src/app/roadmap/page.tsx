"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
  Eye,
  Activity,
  Infinity,
  Database,
  Search,
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

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
    title: "Sentinel",
    description:
      "The core multi-agent workspace. Orchestrate parallel AI coding sessions in isolated sandboxes with Git worktrees and Docker containers.",
    status: "stable",
    year: "2025",
    accentColor: "#4ade80",
  },
  {
    icon: Shield,
    title: "Aegis",
    description:
      "Enterprise-grade security perimeter. Enforces network policies, data loss prevention, and strict sandboxing for agent runtimes.",
    status: "beta",
    year: "2026",
    accentColor: "#a78bfa",
  },
  {
    icon: Users,
    title: "Nexus",
    description:
      "Collaborative agent orchestration for engineering orgs. Shared sessions, role-based permissions, and audit trails.",
    status: "alpha",
    year: "2026",
    accentColor: "#60a5fa",
  },
  {
    icon: Terminal,
    title: "Forge",
    description:
      "Headless agent management and CI/CD integration. Spin up sessions, pipe output, and script workflows natively.",
    status: "alpha",
    year: "2026",
    accentColor: "#f59e0b",
  },
  {
    icon: Eye,
    title: "Argus",
    description:
      "Advanced perception layer. Allows agents to visually inspect UI changes, run visual regression tests, and browse the web.",
    status: "planned",
    year: "2027",
    accentColor: "#fb923c",
  },
  {
    icon: Activity,
    title: "Iatros",
    description:
      "Self-healing diagnostics system. Automatically detects regressions, analyzes stack traces, and patches code in real-time.",
    status: "planned",
    year: "2028",
    accentColor: "#ec4899",
  },
];

interface TimelinePhase {
  phase: string;
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  items: string[];
  projects: string[];
}

const timelineData: TimelinePhase[] = [
  {
    phase: "Phase I",
    year: "2025",
    title: "Foundation & Core",
    description: "Establishing the core platform and unbreachable security perimeter.",
    icon: Rocket,
    projects: ["Sentinel", "Aegis"],
    items: [
      "Sentinel v1.0 stable release with Docker sandboxing",
      "Aegis beta launch for network policy enforcement",
      "Git worktree isolation and multi-agent orchestration",
      "Local LLM routing and streaming context engine",
    ],
  },
  {
    phase: "Phase II",
    year: "2026",
    title: "Collaborative Intelligence",
    description: "Bringing teams together and integrating with headless environments.",
    icon: Users,
    projects: ["Nexus", "Forge"],
    items: [
      "Nexus beta: shared workspaces and multiplayer agent sessions",
      "Forge CLI alpha for headless CI/CD integration",
      "Role-based access control (RBAC) and audit logging",
      "Seamless state synchronization across the network",
    ],
  },
  {
    phase: "Phase III",
    year: "2026",
    title: "Perception & Vision",
    description: "Giving agents eyes to see and understand the visual world.",
    icon: Eye,
    projects: ["Argus"],
    items: [
      "Argus alpha: visual regression testing capabilities",
      "Agent-driven UI/UX validation and DOM analysis",
      "Headless browser integration for end-to-end testing",
      "Image-to-code multimodal capabilities",
    ],
  },
  {
    phase: "Phase IV",
    year: "2027",
    title: "Predictive Analysis",
    description: "Anticipating issues before they happen with vast data streams.",
    icon: Database,
    projects: ["Oracle"],
    items: [
      "Oracle integration: predictive bug detection",
      "Historical repository analysis and codebase mapping",
      "Intelligent code completion based on global repo context",
      "Dependency vulnerability forecasting",
    ],
  },
  {
    phase: "Phase V",
    year: "2027",
    title: "Adaptive Evolution",
    description: "Self-modifying infrastructure that evolves with the workload.",
    icon: Boxes,
    projects: ["Proteus"],
    items: [
      "Proteus alpha: dynamic sandbox resizing and scaling",
      "Morphing architecture based on computational load",
      "Automated infrastructure-as-code generation",
      "Fluid resource allocation across agent swarms",
    ],
  },
  {
    phase: "Phase VI",
    year: "2027",
    title: "Truth & Validation",
    description: "Cryptographic proof of agent actions and code integrity.",
    icon: Search,
    projects: ["Aletheia"],
    items: [
      "Aletheia consensus engine for code verification",
      "Cryptographically signed commits and agent identities",
      "Deterministic reproducible builds guaranteed by agents",
      "Zero-trust compliance checks",
    ],
  },
  {
    phase: "Phase VII",
    year: "2028",
    title: "Self-Healing",
    description: "Autonomous detection and remediation of production issues.",
    icon: Activity,
    projects: ["Iatros"],
    items: [
      "Iatros beta: continuous production monitoring",
      "Automated hot-patch generation for runtime errors",
      "Memory leak detection and automated refactoring",
      "Self-healing Kubernetes clusters managed by agents",
    ],
  },
  {
    phase: "Phase VIII",
    year: "2028+",
    title: "Multi-dimensional Mastery",
    description: "Operating across past, present, and future states of the codebase.",
    icon: Infinity,
    projects: ["Janus"],
    items: [
      "Janus protocol: bidirectional chronological code generation",
      "Simultaneous refactoring of legacy code and forward feature building",
      "Branch timeline simulation and outcome prediction",
      "True autonomous engineering organization",
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
    category: "Sentinel",
    accentColor: "#4ade80",
  },
  {
    icon: Lock,
    title: "Aegis Zero-Trust",
    description:
      "Next-gen microVM sandboxing using Firecracker with per-session resource quotas, network policies, and snapshot restore.",
    progress: 65,
    category: "Aegis",
    accentColor: "#a78bfa",
  },
  {
    icon: Users,
    title: "Multiplayer Engine",
    description:
      "End-to-end encrypted session state synchronization between clients via WebSocket relay for shared agent sessions.",
    progress: 48,
    category: "Nexus",
    accentColor: "#60a5fa",
  },
  {
    icon: Webhook,
    title: "Forge Webhooks",
    description:
      "First-class webhook integration for triggering agent sessions from GitHub, GitLab, and Bitbucket push events and PR reviews.",
    progress: 81,
    category: "Forge",
    accentColor: "#f59e0b",
  },
  {
    icon: GitBranch,
    title: "Git Worktree Manager",
    description:
      "Visual worktree lifecycle management with automatic branch creation, merge conflict detection, and stash coordination.",
    progress: 85,
    category: "Sentinel",
    accentColor: "#4ade80",
  },
  {
    icon: Zap,
    title: "Streaming Context Engine",
    description:
      "Real-time context window optimization that dynamically adjusts token allocation across agents based on priority scoring.",
    progress: 29,
    category: "Core AI",
    accentColor: "#ec4899",
  },
];

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
      className: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    },
    alpha: {
      label: "Alpha",
      className: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    },
    planned: {
      label: "Planned",
      className: "bg-border-dim text-muted-text border-border-dim2",
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
            ? "bg-amber-500 dark:bg-amber-400"
            : status === "alpha"
            ? "bg-blue-500 dark:bg-blue-400"
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
        <StatusBadge status={status} />
      </div>

      <h3 className="font-head font-800 text-lg tracking-tight text-text mb-2">
        {title}
      </h3>
      <p className="text-muted-text text-[13px] leading-relaxed mb-5 flex-1">
        {description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-border-dim">
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
      className="group bg-bg border border-border-dim p-6 hover:border-border-dim2 transition-all duration-300"
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
   ANIMATED TIMELINE SECTION
   ═══════════════════════════════════════════════════════════ */

function GrandTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  // Calculate container height dynamically to draw SVG path
  const [height, setHeight] = useState(0);
  
  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.scrollHeight);
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        setHeight(containerRef.current.scrollHeight);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-[900px] mx-auto py-10">
      
      {/* BACKGROUND LINE */}
      <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-px bg-border-dim2 -translate-x-1/2 hidden md:block" />
      <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-px bg-border-dim2 -translate-x-1/2 block md:hidden" />

      {/* DRAWING SVG LINE */}
      <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[40px] -translate-x-1/2 pointer-events-none z-10 hidden md:block">
        <svg width="40" height={height || 1000} viewBox={`0 0 40 ${height || 1000}`} className="w-full h-full">
          <motion.line
            x1="20"
            y1="0"
            x2="20"
            y2={height || 1000}
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: smoothProgress }}
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="50%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute left-[39px] md:hidden top-0 bottom-0 w-[40px] -translate-x-1/2 pointer-events-none z-10">
        <svg width="40" height={height || 1000} viewBox={`0 0 40 ${height || 1000}`} className="w-full h-full">
          <motion.line
            x1="20"
            y1="0"
            x2="20"
            y2={height || 1000}
            stroke="url(#gradient-mobile)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: smoothProgress }}
          />
          <defs>
            <linearGradient id="gradient-mobile" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="50%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-20 flex flex-col gap-12 md:gap-24">
        {timelineData.map((item, i) => {
          const isEven = i % 2 === 0;
          const Icon = item.icon;
          
          return (
            <div key={item.phase} className="relative flex items-center md:justify-between flex-col md:flex-row gap-6 md:gap-0 group">
              
              {/* Desktop Left Side / Mobile Content */}
              <motion.div 
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? 'md:text-right md:pr-12' : 'md:order-2 md:text-left md:pl-12'}`}
              >
                <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent/80 font-bold">
                    {item.phase} • {item.year}
                  </span>
                  <div className="flex gap-2">
                    {item.projects.map(proj => (
                      <span key={proj} className="text-[9px] font-mono uppercase tracking-[0.1em] px-2 py-0.5 border border-border-dim2 bg-bg2 text-muted-text rounded-sm">
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
                
                <h3 className="font-head font-800 text-2xl md:text-3xl tracking-tight text-text mb-3">
                  {item.title}
                </h3>
                
                <p className="text-muted-text text-[14px] leading-relaxed mb-5">
                  {item.description}
                </p>
                
                <ul className={`space-y-3 ${isEven ? 'md:flex md:flex-col md:items-end' : ''}`}>
                  {item.items.map((listItem, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + j * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`flex items-start gap-3 text-[13px] text-muted-text max-w-[400px] ${isEven ? 'md:flex-row-reverse md:text-right' : ''}`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-1.5 flex-shrink-0" />
                      {listItem}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Center Dot (Desktop & Mobile) */}
              <div className="absolute left-[39px] md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center pointer-events-none">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-12 h-12 rounded-full bg-bg border-2 border-border-dim flex items-center justify-center relative z-20 group-hover:border-accent/50 group-hover:scale-110 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-muted-text group-hover:text-accent transition-colors duration-300" />
                  
                  {/* Pulse effect */}
                  <div className="absolute inset-0 rounded-full border border-accent/0 group-hover:border-accent/30 group-hover:animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </div>

              {/* Empty placeholder for alignment */}
              <div className="hidden md:block w-[45%]" />
            </div>
          );
        })}
      </div>
    </div>
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
    <main className="min-h-[100dvh] relative selection:bg-accent selection:text-bg">
      <GridCanvas />
      {/* ═══ HERO ═══ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="hero pt-32 pb-20 px-6 relative z-[1] text-center overflow-hidden"
      >
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 text-[11px] text-accent/80 tracking-[0.2em] uppercase border border-accent/15 px-4 py-1.5 mb-8 bg-accent/[0.03]"
        >
          <Rocket className="w-3.5 h-3.5" />
          The Grand Vision
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
            autonomous systems
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
          From a desktop agent runner to a multi-dimensional platform for AI orchestration across the entire development lifecycle.
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
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
            1 In Beta
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
            2 In Alpha
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-text/40" />
            6 Planned
          </span>
        </motion.div>
      </motion.section>

      {/* ═══ ECOSYSTEM GRID ═══ */}
      <section className="py-28 px-6 relative z-[1] bg-bg2 border-y border-border-dim">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
              Tenets of the Core
            </div>
            <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
              Ten projects. One intelligence.
            </h2>
            <p className="text-muted-text max-w-[600px] text-lg leading-relaxed mb-14">
              The ecosystem is expanding into specialized domains, each represented by a mythological project name. Together, they form an unyielding architecture for autonomous engineering.
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
      <section className="py-32 px-6 relative z-[1]">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-24">
              <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
                Evolution Protocol
              </div>
              <h2 className="font-head font-800 text-4xl md:text-6xl tracking-tighter leading-tight mb-6">
                The Architect&apos;s Roadmap.
              </h2>
              <p className="text-muted-text max-w-[500px] mx-auto text-[16px] leading-relaxed">
                A structured execution plan guiding our expansion from core foundations to multi-dimensional intelligence.
              </p>
            </div>
          </ScrollReveal>

          <GrandTimeline />
        </div>
      </section>

      {/* ═══ IN DEVELOPMENT ═══ */}
      <section className="py-28 px-6 relative z-[1] bg-bg2 border-y border-border-dim">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 font-bold">
                Active Forging
              </div>
              <div className="h-px flex-1 bg-accent/10" />
            </div>
            <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
              What&apos;s in the furnace.
            </h2>
            <p className="text-muted-text max-w-[560px] text-lg leading-relaxed mb-14">
              Features currently in active development across the ecosystem. Progress bars reflect engineering completion.
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
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] h-[250px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

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
              className="w-full sm:w-auto font-mono text-sm text-text border border-border-dim2 px-9 py-4 inline-flex items-center justify-center gap-2 hover:bg-bg3 hover:border-border-dim2 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ FOOTER ═══ */}
      
    </main>
  );
}
