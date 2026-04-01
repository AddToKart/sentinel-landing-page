"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GridCanvas } from "@/components/GridCanvas";
import {
  Github,
  ArrowLeft,
  Cpu,
  Smartphone,
  Cloud,
  Users,
  Terminal,
  Server,
  Boxes,
  Shield,
  Rocket,
  Zap,
  GitBranch,
  Plug,
  Settings,
  Code2,
  Container,
  ExternalLink,
  Calendar,
  MessageSquare,
  Repeat,
  Fingerprint,
  FileText,
  Type,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

/* ─── Types ─────────────────────────────────────── */
type ProductStatus = "Available" | "Beta" | "Coming Soon" | "Planning";

interface Product {
  name: string;
  description: string;
  icon: React.ElementType;
  status: ProductStatus;
  year: string;
  url?: string;
}

interface Ecosystem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  accentDim: string;
  products: Product[];
}

/* ─── Ecosystem Data ────────────────────────────── */
const ecosystems: Ecosystem[] = [
  {
    id: "sentinel",
    name: "Sentinel",
    tagline: "AI Agent Workspace",
    description:
      "The core desktop application for orchestrating AI coding agents. Run multiple sessions in isolated sandboxes, Git worktrees, or Docker containers with real-time telemetry and collaborative workflows.",
    accentColor: "#4ade80",
    accentDim: "rgba(74,222,128,0.08)",
    products: [
      {
        name: "Sentinel Core",
        description:
          "High-performance desktop app built with Tauri v2 and React 19. Multi-agent orchestration with sandboxed execution environments.",
        icon: Cpu,
        status: "Beta",
        year: "2025",
        url: "https://github.com/AddToKart/sentinel-v2",
      },
      {
        name: "Sentinel Mobile",
        description:
          "Monitor and control your agent sessions on the go. Real-time notifications, task queues, and session management from your phone.",
        icon: Smartphone,
        status: "Coming Soon",
        year: "2026",
      },
      {
        name: "Sentinel Cloud",
        description:
          "Hosted agent infrastructure with auto-scaling sandbox pools. Deploy agents to the cloud without managing your own servers.",
        icon: Cloud,
        status: "Coming Soon",
        year: "2026",
      },
      {
        name: "Sentinel Teams",
        description:
          "Collaborative multi-agent workspace for teams. Shared context pools, role-based access, and team-wide task orchestration.",
        icon: Users,
        status: "Planning",
        year: "2026",
      },
      {
        name: "Sentinel CLI",
        description:
          "Command-line interface for headless agent management. Script workflows, pipe outputs, and integrate with CI/CD pipelines.",
        icon: Terminal,
        status: "Coming Soon",
        year: "2026",
      },
      {
        name: "Sentinel Studio",
        description:
          "Advanced agent visual debugger and workflow designer. Model complex interactions as state machines with real-time message monitoring.",
        icon: Zap,
        status: "Planning",
        year: "2026",
      },
    ],
  },
  {
    id: "aegis",
    name: "Aegis",
    tagline: "Academic Intelligence",
    description:
      "A specialized ecosystem of AI agents designed for academic integrity, high-fidelity research, and natural language optimization. Protecting your academic ethos with high-performance intelligence.",
    accentColor: "#f59e0b",
    accentDim: "rgba(245,158,11,0.08)",
    products: [
      {
        name: "Aegis-Logos",
        description:
          "The core academic co-pilot for reasoning and brainstorming. Handles complex inquiries with a focus on logical consistency and verified data.",
        icon: MessageSquare,
        status: "Beta",
        year: "2026",
      },
      {
        name: "Aegis-Lexis",
        description:
          "High-performance paraphrasing and vocabulary optimization. Enhances lexical density while strictly preserving original academic meaning.",
        icon: Repeat,
        status: "Planning",
        year: "2026",
      },
      {
        name: "Aegis-Ethos",
        description:
          "Academic humanizer that optimizes AI-generated text to match human Authorial Voice. Removes robotic patterns for authoritative results.",
        icon: Fingerprint,
        status: "Planning",
        year: "2026",
      },
      {
        name: "Aegis-Synopsis",
        description:
          "Advanced summarization engine for high-density research papers. Compresses multi-page documents into high-signal executive summaries.",
        icon: FileText,
        status: "Coming Soon",
        year: "2026",
      },
      {
        name: "Aegis-Vellum",
        description:
          "Document structural integrity and citation engine. Handles complex formatting and bibliography management with clinical precision.",
        icon: Type,
        status: "Planning",
        year: "2026",
      },
    ],
  },
  {
    id: "nexus",
    name: "Nexus",
    tagline: "AI Infrastructure",
    description:
      "A modular suite of AI agent infrastructure modules. Task management, persistent context, and unified authentication for MCP-compatible agent pipelines.",
    accentColor: "#8b5cf6",
    accentDim: "rgba(139,92,246,0.08)",
    products: [
      {
        name: "Nexus Task",
        description:
          "AI-powered task management with intelligent decomposition, priority scoring, and automated workflow routing for development teams.",
        icon: Boxes,
        status: "Available",
        year: "2025",
        url: "https://github.com/AddToKart/nexus-task",
      },
      {
        name: "Nexus Context",
        description:
          "Self-hosted long-term memory for AI agents via the Model Context Protocol. Kanban tasks, dependency graphs, and context logging.",
        icon: Server,
        status: "Available",
        year: "2025",
        url: "https://github.com/gennyyyy/nexus-content",
      },
      {
        name: "Nexus Auth",
        description:
          "Unified authentication and authorization layer. OAuth2 flows, API key management, and session tokens as drop-in middleware.",
        icon: Shield,
        status: "Available",
        year: "2025",
        url: "https://github.com/AddToKart/nexus-auth",
      },
    ],
  },
  {
    id: "forge",
    name: "Forge",
    tagline: "DevOps Automation",
    description:
      "Next-generation DevOps automation for the Sentinel ecosystem. Streamlined CI/CD, deployment orchestration, and infrastructure monitoring built for AI-native workflows.",
    accentColor: "#f97316",
    accentDim: "rgba(249,115,22,0.08)",
    products: [
      {
        name: "Forge Pipeline",
        description:
          "Visual CI/CD pipeline builder with AI-assisted configuration. Auto-detect frameworks, generate build steps, and optimize cache strategies.",
        icon: GitBranch,
        status: "Planning",
        year: "2026",
      },
      {
        name: "Forge Deploy",
        description:
          "One-click deployment orchestration across cloud providers. Blue-green deploys, canary releases, and automatic rollback on failure detection.",
        icon: Rocket,
        status: "Planning",
        year: "2026",
      },
      {
        name: "Forge Monitor",
        description:
          "Real-time infrastructure monitoring with AI-powered anomaly detection. Unified dashboards, alert routing, and predictive scaling.",
        icon: Zap,
        status: "Planning",
        year: "2026",
      },
    ],
  },
];

/* ─── Status Badge ──────────────────────────────── */
function StatusBadge({ status, accentColor }: { status: ProductStatus; accentColor: string }) {
  const config: Record<ProductStatus, { bg: string; text: string; dot: string }> = {
    Available: {
      bg: `${accentColor}15`,
      text: accentColor,
      dot: accentColor,
    },
    Beta: {
      bg: "rgba(250,204,21,0.12)",
      text: "#facc15",
      dot: "#facc15",
    },
    "Coming Soon": {
      bg: "rgba(96,165,250,0.12)",
      text: "#60a5fa",
      dot: "#60a5fa",
    },
    Planning: {
      bg: "rgba(255,255,255,0.05)",
      text: "#7a7870",
      dot: "#7a7870",
    },
  };

  const c = config[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.15em] px-2.5 py-1 border"
      style={{
        color: c.text,
        borderColor: `${c.text}25`,
        backgroundColor: c.bg,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: c.dot }}
      />
      {status}
    </span>
  );
}

/* ─── Product Card ──────────────────────────────── */
function ProductCard({
  product,
  accentColor,
}: {
  product: Product;
  accentColor: string;
}) {
  const Icon = product.icon;

  return (
    <a
      href={product.url || "#"}
      target={product.url ? "_blank" : undefined}
      rel={product.url ? "noopener noreferrer" : undefined}
      className={`group relative flex flex-col h-full bg-bg2 border border-border-dim hover:border-border-dim2 transition-all duration-300 overflow-hidden ${
        !product.url ? "cursor-default" : ""
      }`}
    >
      {/* Hover accent top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-all duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)`,
        }}
      />

      {/* Hover gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${accentColor}06, transparent 70%)`,
        }}
      />

      <div className="p-6 md:p-7 flex-1 flex flex-col relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center border shrink-0"
              style={{
                borderColor: `${accentColor}20`,
                backgroundColor: `${accentColor}08`,
              }}
            >
              <Icon className="w-5 h-5" style={{ color: accentColor }} />
            </div>
            <div>
              <h3 className="font-head font-800 text-lg tracking-tight text-text group-hover:text-accent transition-colors duration-300">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge status={product.status} accentColor={accentColor} />
              </div>
            </div>
          </div>
          {product.url && (
            <ExternalLink className="w-4 h-4 text-muted-text/40 group-hover:text-accent transition-colors duration-200 mt-1 flex-shrink-0" />
          )}
        </div>

        {/* Description */}
        <p className="text-muted-text text-[13px] leading-[1.75] mb-5 flex-1 group-hover:text-muted-text/90 transition-colors duration-300">
          {product.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border-dim">
          <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.15em] text-muted-text/50">
            <Calendar className="w-3 h-3" />
            {product.year}
          </span>
          {product.url ? (
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-accent/50 group-hover:text-accent transition-colors duration-200">
              View Repo &rarr;
            </span>
          ) : (
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-text/30">
              In Development
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

/* ─── Ecosystem Overview Card ───────────────────── */
function EcosystemOverviewCard({
  ecosystem,
  index,
}: {
  ecosystem: Ecosystem;
  index: number;
}) {
  const icons = [Code2, Plug, Container];
  const Icon = icons[index] || Code2;

  return (
    <ScrollReveal delay={index * 120} className="h-full">
      <a
        href={`#${ecosystem.id}`}
        className="group relative flex flex-col h-full bg-bg2 border border-border-dim hover:border-border-dim2 transition-all duration-300 overflow-hidden"
      >
        {/* Hover accent top border */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${ecosystem.accentColor}80, transparent)`,
          }}
        />

        {/* Hover gradient */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 20%, ${ecosystem.accentColor}08, transparent 60%)`,
          }}
        />

        <div className="p-7 md:p-8 relative z-10 flex-1 flex flex-col">
          <div
            className="w-12 h-12 flex items-center justify-center border mb-5 transition-colors duration-300"
            style={{
              borderColor: `${ecosystem.accentColor}25`,
              backgroundColor: `${ecosystem.accentColor}08`,
            }}
          >
            <Icon
              className="w-6 h-6 transition-colors duration-300"
              style={{ color: ecosystem.accentColor }}
            />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-head font-800 text-2xl tracking-tight text-text group-hover:text-accent transition-colors duration-300">
              {ecosystem.name}
            </h3>
            {ecosystem.id === "forge" && (
              <span className="text-[9px] font-mono uppercase tracking-[0.15em] px-2 py-0.5 border border-orange-500/25 text-orange-400 bg-orange-500/[0.06]">
                NEW
              </span>
            )}
          </div>

          <p
            className="text-[11px] font-mono uppercase tracking-[0.15em] mb-3"
            style={{ color: ecosystem.accentColor }}
          >
            {ecosystem.tagline}
          </p>

          <p className="text-muted-text text-[13px] leading-[1.7] flex-1">
            {ecosystem.description}
          </p>

          <div className="mt-5 pt-4 border-t border-border-dim flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-text/50">
              {ecosystem.products.length} Products
            </span>
            <span
              className="text-[10px] font-mono uppercase tracking-[0.15em] transition-colors duration-200"
              style={{
                color: `${ecosystem.accentColor}60`,
              }}
            >
              Explore &darr;
            </span>
          </div>
        </div>
      </a>
    </ScrollReveal>
  );
}

/* ─── Ecosystem Section ─────────────────────────── */
function EcosystemSection({ ecosystem }: { ecosystem: Ecosystem }) {
  return (
    <section
      id={ecosystem.id}
      className="py-28 px-6 relative z-[1] border-y border-border-dim"
      style={{
        backgroundColor: ecosystem.id === "sentinel" ? undefined : "#0a0a0d",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[150px] pointer-events-none"
        style={{ backgroundColor: `${ecosystem.accentColor}04` }}
      />

      <div className="max-w-[1100px] mx-auto relative">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="text-[11px] tracking-[0.2em] uppercase font-bold"
              style={{ color: `${ecosystem.accentColor}cc` }}
            >
              {ecosystem.tagline}
            </div>
            <div
              className="h-px flex-1"
              style={{ backgroundColor: `${ecosystem.accentColor}15` }}
            />
          </div>
          <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
            {ecosystem.name}{" "}
            <span style={{ color: ecosystem.accentColor }}>.</span>
          </h2>
          <p className="text-muted-text max-w-[560px] text-lg leading-relaxed mb-14">
            {ecosystem.description}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-bg3 border border-border-dim">
            {ecosystem.products.map((product) => (
              <ProductCard
                key={product.name}
                product={product}
                accentColor={ecosystem.accentColor}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Nav ───────────────────────────────────────── */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 md:px-10 h-[60px] backdrop-blur-xl bg-bg/80 border-b border-border-dim">
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
          className="flex items-center gap-2 text-muted-text font-mono text-[11px] border border-border-dim2 px-3.5 py-1.5 hover:text-text hover:border-border-dim2 transition-all duration-200 bg-bg2"
        >
          <Github className="w-3.5 h-3.5" />
          AddToKart
        </a>
      </div>
    </nav>
  );
}

/* ─── Main Page ─────────────────────────────────── */
export default function EcosystemPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main className="min-h-screen relative selection:bg-accent selection:text-bg">
      <GridCanvas />
      <Nav />

      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 px-6 relative z-[1] text-center overflow-hidden"
      >
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <ScrollReveal>
          <div className="inline-flex items-center gap-2 text-[11px] text-accent/80 tracking-[0.2em] uppercase border border-accent/15 px-4 py-1.5 mb-8 bg-accent/[0.03]">
            <Boxes className="w-3.5 h-3.5" />
            Ecosystem Overview
          </div>
        </ScrollReveal>

        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <ScrollReveal delay={80}>
            <h1 className="font-head font-800 text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.92] tracking-tighter mb-6">
              The Sentinel{" "}
              <span className="text-accent italic relative">
                Ecosystem
                <span className="absolute left-0 bottom-1.5 h-[3px] md:h-[5px] w-full bg-accent/15 -z-10" />
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="max-w-[620px] mx-auto text-muted-text text-lg md:text-xl leading-relaxed mb-6">
              A unified development environment spanning AI agent orchestration,
              infrastructure modules, and DevOps automation — built to work
              together.
            </p>
          </ScrollReveal>
        </motion.div>

        <ScrollReveal delay={220}>
          <div className="flex flex-wrap justify-center gap-4 text-[11px] font-mono uppercase tracking-[0.15em] text-muted-text/60">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              3 Ecosystems
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              11 Products
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Open Source
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              MCP Compatible
            </span>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ ECOSYSTEM OVERVIEW CARDS ═══ */}
      <section className="py-20 px-6 relative z-[1] bg-bg2 border-y border-border-dim">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-head font-800 text-3xl md:text-4xl tracking-tighter leading-tight mb-4">
                Three ecosystems, one platform.
              </h2>
              <p className="text-muted-text max-w-[500px] mx-auto text-lg leading-relaxed">
                Each ecosystem serves a distinct purpose, but they&apos;re
                designed to compose seamlessly.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-bg3 border border-border-dim">
            {ecosystems.map((eco, i) => (
              <EcosystemOverviewCard key={eco.id} ecosystem={eco} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SENTINEL SECTION ═══ */}
      <EcosystemSection ecosystem={ecosystems[0]} />

      {/* ═══ AEGIS SECTION ═══ */}
      <EcosystemSection ecosystem={ecosystems[1]} />

      {/* ═══ NEXUS SECTION ═══ */}
      <EcosystemSection ecosystem={ecosystems[2]} />

      {/* ═══ FORGE SECTION ═══ */}
      <EcosystemSection ecosystem={ecosystems[3]} />

      {/* ═══ CTA ═══ */}
      <section className="py-28 px-6 relative z-[1] text-center">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <ScrollReveal>
          <div className="inline-flex items-center gap-2 text-[11px] text-accent/80 tracking-[0.2em] uppercase border border-accent/15 px-4 py-1.5 mb-8 bg-accent/[0.03]">
            <Plug className="w-3.5 h-3.5" />
            Open Platform
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 className="font-head font-800 text-4xl md:text-6xl tracking-tighter leading-none mb-6">
            Build within the{" "}
            <span className="text-accent italic">ecosystem</span>.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <p className="text-muted-text max-w-[480px] mx-auto text-lg leading-relaxed mb-10">
            Every product is open source and designed for extensibility. Contribute
            to existing modules or build your own on top of the Sentinel platform.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={240}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="https://github.com/AddToKart"
              target="_blank"
              className="w-full sm:w-auto bg-accent text-bg font-mono text-sm font-bold px-9 py-4 inline-flex items-center justify-center gap-2 hover:brightness-110 transition-all duration-200"
            >
              <Github className="w-4 h-4" />
              View on GitHub
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
              A unified ecosystem of open-source AI agent tooling, infrastructure,
              and developer automation.
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
              <Code2 className="w-3 h-3" /> Home
            </Link>
            <Link
              href="/products"
              className="hover:text-accent/60 transition-colors duration-150 flex items-center gap-1.5"
            >
              <Boxes className="w-3 h-3" /> Showcase
            </Link>
          </div>
        </div>
        <div className="max-w-[1100px] mx-auto mt-10 pt-6 border-t border-border-dim text-[9px] uppercase tracking-[0.15em] text-muted-text/40">
          &copy; 2026 Sentinel Ecosystem. All projects are open source under the
          MIT License.
        </div>
      </footer>
    </main>
  );
}
