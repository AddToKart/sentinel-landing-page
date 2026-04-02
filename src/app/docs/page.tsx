"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
  ChevronRight,
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
      "Autonomous coding entities operating within Sentinel. Each runs in an isolated context with a dedicated terminal, file system view, and process tree.",
    accentColor: "#4ade80",
  },
  {
    icon: Package,
    title: "Sandboxes",
    description:
      "Isolated runtime environments securing your main codebase. Every agent action is tracked, constrained, and fully reversible via snapshotting.",
    accentColor: "#60a5fa",
  },
  {
    icon: Zap,
    title: "Sessions",
    description:
      "A real-time execution context capturing terminal output, file diffs, telemetry, and agent reasoning. Run dozens in parallel.",
    accentColor: "#f59e0b",
  },
  {
    icon: Settings,
    title: "Workflows",
    description:
      "Composable pipelines chaining multiple agents. Define triggers, set isolation modes, and configure approval gates for complex multi-step operations.",
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
      "Install Sentinel, configure your first agent provider, and launch your inaugural session.",
    tag: "Awakening",
    accentColor: "#4ade80",
  },
  {
    icon: Wrench,
    title: "Configuration",
    description:
      "Deep-dive into sentinel.toml — customize sandbox modes, resource limits, and model routing.",
    tag: "Core",
    accentColor: "#60a5fa",
  },
  {
    icon: Cloud,
    title: "Integrations",
    description:
      "Connect Sentinel to GitHub, GitLab, and webhooks. Set up MCP protocol pipelines.",
    tag: "Core",
    accentColor: "#f59e0b",
  },
  {
    icon: Terminal,
    title: "CI/CD Pipelines",
    description:
      "Automate agent sessions in your CI pipeline. Trigger sandboxed code reviews and tests.",
    tag: "Ascended",
    accentColor: "#a78bfa",
  },
];

interface EndpointItem {
  method: string;
  path: string;
  description: string;
}

const endpoints: EndpointItem[] = [
  { method: "GET", path: "/api/v1/sessions", description: "List all active and recent sessions." },
  { method: "POST", path: "/api/v1/sessions", description: "Create a new agent session." },
  { method: "GET", path: "/api/v1/sessions/:id", description: "Retrieve detailed session info." },
  { method: "DELETE", path: "/api/v1/sessions/:id", description: "Terminate a running session." },
  { method: "GET", path: "/api/v1/sandboxes", description: "List available sandboxes." },
  { method: "POST", path: "/api/v1/workflows/trigger", description: "Trigger a workflow pipeline." },
];

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "How do I install Sentinel?",
    a: "Sentinel ships as a native binary for macOS, Windows, and Linux. The binary is under 15MB and requires no runtime dependencies thanks to Tauri v2.",
  },
  {
    q: "What are the system requirements?",
    a: "Sentinel runs on any modern machine with at least 4GB RAM. For multiple parallel agents, we recommend 8GB+ and a multi-core CPU.",
  },
  {
    q: "How does sandbox isolation protect my code?",
    a: "Sandboxes create a completely isolated copy. Agents read, write, and execute freely, but nothing touches your main codebase until explicitly reviewed.",
  },
  {
    q: "Can I use local LLMs?",
    a: "Yes. Sentinel supports CLI/API-based AI providers, including Ollama or LM Studio for full local execution.",
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
    icon: Book,
    title: "Community Discord",
    description: "Real-time help, feature discussions, and community showcase.",
    href: "#",
    accentColor: "#a78bfa",
  },
];

/* ═══════════════════════════════════════════════════════════
   GLOWING CARD
   ═══════════════════════════════════════════════════════════ */

function GlowingCard({ children, accentColor }: { children: React.ReactNode, accentColor: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative bg-bg/80 backdrop-blur-sm border border-border-dim hover:border-border-dim2 transition-colors duration-300 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${accentColor}15,
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 p-7 h-full flex flex-col">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ENDPOINT ROW
   ═══════════════════════════════════════════════════════════ */

function EndpointRow({ method, path, description, index }: EndpointItem & { index: number }) {
  const methodColors: Record<string, string> = {
    GET: "#4ade80",
    POST: "#60a5fa",
    PUT: "#f59e0b",
    DELETE: "#f87171",
  };
  const methodColor = methodColors[method] ?? "#475569";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative flex flex-col md:flex-row md:items-center gap-3 md:gap-6 py-4 px-5 border border-border-dim/50 hover:border-accent/30 bg-bg/40 hover:bg-bg/80 transition-all duration-300 rounded-sm mb-2 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
      
      <span
        className="text-[10px] font-mono font-bold uppercase tracking-[0.1em] w-[60px] text-center py-1 rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ color: methodColor, backgroundColor: `${methodColor}15`, boxShadow: `0 0 10px ${methodColor}20` }}
      >
        {method}
      </span>
      <code className="font-mono text-[13px] text-accent/90 flex-shrink-0 drop-shadow-[0_0_8px_rgba(0,255,255,0.3)]">
        {path}
      </code>
      <span className="text-muted-text text-[13px] leading-relaxed md:ml-auto">
        {description}
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DOCS PAGE
   ═══════════════════════════════════════════════════════════ */

export default function DocsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yHero = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-[100dvh] bg-bg text-text selection:bg-accent/30 selection:text-accent relative overflow-hidden" ref={containerRef}>
      <GridCanvas />
      
      {/* Background Parallax */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute top-[60%] right-[10%] w-[30vw] h-[30vw] bg-purple-500/5 rounded-full blur-[120px]" />
      </motion.div>

      {/* Floating Index (Desktop & Mobile) */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="sticky top-16 xl:fixed xl:left-8 xl:top-1/2 xl:-translate-y-1/2 flex xl:flex-col items-center xl:items-start gap-4 z-50 xl:border-l xl:border-border-dim/50 xl:pl-4 bg-bg/80 xl:bg-transparent backdrop-blur-md xl:backdrop-blur-none px-6 py-4 xl:p-0 overflow-x-auto hide-scrollbar border-b border-border-dim/50 xl:border-b-0 w-full xl:w-auto"
      >
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent/50 xl:mb-2 hidden xl:block">The Codex</div>
        {[
          { id: "awakening", label: "I. The Awakening" },
          { id: "directives", label: "II. Core Directives" },
          { id: "arsenal", label: "III. The Arsenal" },
          { id: "knowledge", label: "IV. Knowledge" }
        ].map((item) => (
          <a key={item.id} href={`#${item.id}`} className="whitespace-nowrap text-xs font-mono text-muted-text hover:text-accent transition-colors duration-200 flex items-center gap-2 group shrink-0">
            <span className="w-1 h-1 rounded-full bg-border-dim group-hover:bg-accent group-hover:shadow-[0_0_8px_var(--accent)] transition-all hidden xl:block" />
            {item.label}
          </a>
        ))}
      </motion.nav>

      <main className="relative z-10 pt-32 pb-32 max-w-[1200px] mx-auto px-6">
        
        {/* HERO */}
        <motion.section 
          style={{ y: yHero, opacity: opacityHero }}
          className="text-center mb-40 pt-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-accent/20 bg-accent/5 text-accent font-mono text-xs uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(0,255,255,0.1)] mb-8"
          >
            <Book className="w-3.5 h-3.5" />
            Sacred Texts of Sentinel
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-head text-5xl md:text-7xl font-900 tracking-tighter mb-6 uppercase"
          >
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500 drop-shadow-[0_0_20px_rgba(0,255,255,0.2)]">Codex</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-muted-text text-lg max-w-2xl mx-auto font-mono"
          >
            Initialization protocols, core directives, and the complete arsenal for integrating Sentinel into your reality.
          </motion.p>
        </motion.section>

        {/* I. THE AWAKENING */}
        <section id="awakening" className="mb-40 scroll-mt-32">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="font-mono text-2xl text-accent/40">01</span>
              <h2 className="font-head text-3xl md:text-4xl font-800 uppercase tracking-tight">The Awakening</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-border-dim to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6 text-muted-text text-lg leading-relaxed">
                <p>
                  To awaken Sentinel is to bring autonomous cognition into your local environment. The entity requires no external dependencies—it stands alone, waiting for your command.
                </p>
                <div className="p-6 bg-bg2/50 border border-border-dim font-mono text-sm relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                  <div className="text-accent/50 mb-2">{`// macOS & Linux Initialization`}</div>
                  <div className="text-text drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">curl -fsSL https://sentinel.dev/install | bash</div>
                  
                  <div className="text-accent/50 mt-6 mb-2">{`// Windows PowerShell Injection`}</div>
                  <div className="text-text drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">iwr https://sentinel.dev/install.ps1 | iex</div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {guides.map((guide, i) => (
                  <motion.div 
                    key={guide.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <GlowingCard accentColor={guide.accentColor}>
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-bg2 rounded-sm border border-border-dim">
                          <guide.icon className="w-5 h-5" style={{ color: guide.accentColor }} />
                        </div>
                        <div>
                          <h3 className="font-head font-700 text-lg mb-1">{guide.title}</h3>
                          <p className="text-sm text-muted-text">{guide.description}</p>
                        </div>
                      </div>
                    </GlowingCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* II. CORE DIRECTIVES */}
        <section id="directives" className="mb-40 scroll-mt-32">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="font-mono text-2xl text-accent/40">02</span>
              <h2 className="font-head text-3xl md:text-4xl font-800 uppercase tracking-tight">Core Directives</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-border-dim to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {concepts.map((concept, i) => (
                <motion.div
                  key={concept.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <GlowingCard accentColor={concept.accentColor}>
                    <div className="flex items-center justify-between mb-6">
                      <concept.icon className="w-8 h-8 drop-shadow-[0_0_10px_currentColor]" style={{ color: concept.accentColor }} />
                      <span className="font-mono text-xs text-muted-text/50 uppercase tracking-[0.2em]">Sys.Comp</span>
                    </div>
                    <h3 className="font-head font-800 text-xl mb-3 uppercase">{concept.title}</h3>
                    <p className="text-muted-text text-sm leading-relaxed flex-1">{concept.description}</p>
                  </GlowingCard>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* III. THE ARSENAL */}
        <section id="arsenal" className="mb-40 scroll-mt-32">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="font-mono text-2xl text-accent/40">03</span>
              <h2 className="font-head text-3xl md:text-4xl font-800 uppercase tracking-tight">The Arsenal (API)</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-border-dim to-transparent" />
            </div>

            <div className="p-1 border border-border-dim/50 bg-bg2/30 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="bg-bg/80 p-6 md:p-8">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-dim/50">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-5 h-5 text-accent" />
                    <span className="font-mono text-sm text-text/80">
                      Nexus: <span className="text-accent drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]">http://localhost:4711/api/v1</span>
                    </span>
                  </div>
                  <span className="hidden md:inline-flex px-3 py-1 bg-accent/10 text-accent font-mono text-xs border border-accent/20">
                    STATUS: ONLINE
                  </span>
                </div>

                <div className="space-y-1">
                  {endpoints.map((ep, i) => (
                    <EndpointRow key={ep.path + ep.method} {...ep} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* IV. KNOWLEDGE */}
        <section id="knowledge" className="scroll-mt-32">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="font-mono text-2xl text-accent/40">04</span>
              <h2 className="font-head text-3xl md:text-4xl font-800 uppercase tracking-tight">Knowledge Base</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-border-dim to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              {resources.map((res, i) => (
                <GlowingCard key={res.title} accentColor={res.accentColor}>
                  <res.icon className="w-6 h-6 mb-4" style={{ color: res.accentColor }} />
                  <h3 className="font-head font-700 text-lg mb-2">{res.title}</h3>
                  <p className="text-sm text-muted-text mb-6 flex-1">{res.description}</p>
                  <a href={res.href} className="inline-flex items-center text-xs font-mono text-accent hover:text-accent/80 transition-colors uppercase tracking-[0.1em]">
                    Access Archive <ChevronRight className="w-3 h-3 ml-1" />
                  </a>
                </GlowingCard>
              ))}
            </div>
          </ScrollReveal>
        </section>

      </main>
    </div>
  );
}
