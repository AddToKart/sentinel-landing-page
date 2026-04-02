"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Github, ArrowLeft, ExternalLink, Code2, Sparkles, Cpu, ShieldAlert, Terminal, Database, Globe } from "lucide-react";
import Link from "next/link";
import { GridCanvas } from "@/components/GridCanvas";

// --- Types ---
type Project = {
  name: string;
  description: string;
  tech: string[];
  url?: string;
  accentColor: string;
};

// --- Data ---
const coreProjects: Project[] = [
  {
    name: "Sentinel",
    description:
      "A high-performance multi-agent workspace built with Tauri v2 and React 19. Orchestrate multiple AI coding sessions simultaneously in isolated sandboxes, Git worktrees, or Docker containers with real-time telemetry.",
    tech: ["Rust", "Tauri v2", "React 19", "TypeScript"],
    url: "https://github.com/AddToKart/sentinel-v2",
    accentColor: "#4ade80",
  },
  {
    name: "Aegis-Logos",
    description:
      "Advanced academic co-pilot for high-fidelity reasoning and brainstorming. Maintains logical consistency across complex research inquiries with clinical precision.",
    tech: ["TypeScript", "NVIDIA NIM", "Llama 3.1"],
    accentColor: "#f59e0b",
  },
  {
    name: "Aegis-Lexis",
    description:
      "Technical paraphrasing engine that optimizes lexical density and sentence structure while strictly preserving original academic meaning.",
    tech: ["TypeScript", "Python", "NLP"],
    accentColor: "#f59e0b",
  },
  {
    name: "Aegis-Ethos",
    description:
      "Authorial voice optimizer that adjusts AI-generated content to match a specific human persona, removing robotic patterns for authoritative results.",
    tech: ["TypeScript", "OpenAI", "React"],
    accentColor: "#f59e0b",
  },
];

const nexusProjects: Project[] = [
  {
    name: "Nexus Task",
    description:
      "AI-powered task management module within the Nexus Ecosystem. Provides intelligent task decomposition, priority scoring, and automated workflow routing for development teams. Designed to plug into any MCP-compatible agent pipeline.",
    tech: ["TypeScript", "FastAPI", "Python", "MongoDB"],
    url: "https://github.com/AddToKart/nexus-task",
    accentColor: "#8b5cf6",
  },
  {
    name: "Nexus Context",
    description:
      "A self-hosted platform providing long-term memory for AI agents via the Model Context Protocol (MCP). Combines a Kanban task system with dependency graphs, context logging, and a Discord bot bridge so agents never lose context across sessions.",
    tech: ["TypeScript", "Python", "Discord API", "MongoDB"],
    url: "https://github.com/gennyyyy/nexus-content",
    accentColor: "#8b5cf6",
  },
  {
    name: "Nexus Auth",
    description:
      "Unified authentication and authorization layer for the Nexus Ecosystem. Handles OAuth2 flows, API key management, and session tokens so every Nexus service shares a single identity surface. Built as a drop-in middleware.",
    tech: ["TypeScript", "FastAPI", "Python"],
    url: "https://github.com/AddToKart/nexus-auth",
    accentColor: "#8b5cf6",
  },
];

const personalProjects: Project[] = [
  {
    name: "TuneWise",
    description:
      "AI-powered Spotify playlist generator. Describe a vibe or type an artist name and TuneWise uses Google Gemini with OpenRouter fallback to curate playlists with 30-second previews, drag-and-drop reorder, QR sharing, and multi-genre blending.",
    tech: ["Next.js", "TypeScript", "Google Gemini", "Spotify API"],
    url: "https://github.com/AddToKart/TuneWise",
    accentColor: "#1db954",
  },
  {
    name: "LinkNotes",
    description:
      "A peer-to-peer note sharing app where all data is encoded directly in URLs. No server, no accounts. Supports plain text, Markdown, and rich text editors with AES password encryption, expiration timers, and edit-after-share tokens.",
    tech: ["React", "TypeScript", "Vite", "AES Encryption", "TipTap Editor"],
    url: "https://github.com/AddToKart/note-taking-app",
    accentColor: "#06b6d4",
  },
  {
    name: "Transaction Fraud Detection",
    description:
      "Real-time blockchain transaction monitoring powered by Google Gemini AI. Analyzes transaction patterns, flags anomalies, and generates detailed risk reports. Django backend with MongoDB storage and a Next.js dashboard with Framer Motion animations.",
    tech: ["Next.js", "Django", "MongoDB", "Google Gemini", "Framer Motion"],
    url: "https://github.com/AddToKart/transaction-fraud-detection",
    accentColor: "#ef4444",
  },
  {
    name: "Quill Craft",
    description:
      "An intelligent writing and paraphrasing tool with a full frontend/backend architecture. Leverages NLP to rephrase, summarize, and enhance text while preserving meaning. TypeScript-first with a clean separation of concerns.",
    tech: ["TypeScript", "FastAPI", "Python"],
    url: "https://github.com/AddToKart/quill-craft",
    accentColor: "#f59e0b",
  },
  {
    name: "Barbecue Bot",
    description:
      "A fun Discord bot for managing and sharing barbecue recipes, cooking timers, and meat temperature guides. Supports slash commands, embed-based recipe cards, and community voting on the best smoke rings.",
    tech: ["TypeScript", "Discord API"],
    url: "https://github.com/AddToKart/barbecue-bot",
    accentColor: "#f97316",
  },
];

// --- Components ---

function SpotlightCard({ project, index }: { project: Project; index: number }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-xl bg-bg2/40 border border-border-dim backdrop-blur-sm transition-colors duration-500 hover:border-border-dim2"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${project.accentColor}15, transparent 40%)`,
        }}
      />
      
      <div className="relative z-10 p-8 h-full flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center bg-bg/50 border border-border-dim shadow-inner"
              style={{ boxShadow: `inset 0 1px 1px 0 rgba(255, 255, 255, 0.05), inset 0 -1px 4px 0 ${project.accentColor}20` }}
            >
              <Cpu className="w-5 h-5" style={{ color: project.accentColor }} />
            </div>
            <h3 className="font-head text-xl font-bold tracking-tight text-text group-hover:text-accent transition-colors duration-300">
              {project.name}
            </h3>
          </div>
          {project.url && (
            <a 
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-bg border border-border-dim flex items-center justify-center text-muted-text hover:text-accent hover:border-accent/50 transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
        
        <p className="text-muted-text text-sm leading-relaxed mb-8 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-border-dim/50">
          {project.tech.map((tech, i) => (
            <span 
              key={i} 
              className="px-2.5 py-1 text-xs font-mono rounded-md bg-bg border border-border-dim text-muted-text/80 transition-colors duration-300 group-hover:border-border-dim2 group-hover:text-muted-text"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function FloatingBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.1, 0.15, 0.1],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[10%] w-full max-w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.05, 0.1, 0.05],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[20%] right-[10%] w-full max-w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]"
      />
    </div>
  );
}

// --- Main Page ---
export default function ProductsPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="min-h-[100dvh] relative selection:bg-accent selection:text-bg bg-bg text-text overflow-hidden">
      <GridCanvas />
      <FloatingBackground />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent transform-origin-left z-50"
        style={{ scaleX }}
      />

      {/* ═══ HERO ═══ */}
      <motion.section 
        style={{ y: headerY, opacity: headerOpacity }}
        className="pt-40 pb-32 px-6 relative z-10 text-center flex flex-col items-center justify-center min-h-[70vh]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 text-xs text-accent/80 tracking-[0.2em] uppercase border border-accent/20 px-4 py-2 mb-8 bg-accent/5 backdrop-blur-sm rounded-full"
        >
          <Terminal className="w-4 h-4" />
          System Catalog
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-head font-800 text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-tighter mb-6"
        >
          Architected by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-purple-500 italic relative">
            AddToKart
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-[620px] mx-auto text-muted-text text-lg md:text-xl leading-relaxed mb-10"
        >
          A matrix of autonomous agents, unified ecosystem protocols, and experimental paradigms pushing the boundaries of what is possible.
        </motion.p>
      </motion.section>

      {/* ═══ THE CORE CONSTRUCT ═══ */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <ShieldAlert className="w-6 h-6 text-accent" />
              <h2 className="font-head font-800 text-3xl md:text-5xl tracking-tighter uppercase">
                The Core Construct
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent ml-4" />
            </div>
            <p className="text-muted-text text-lg max-w-2xl">
              Foundational architecture for advanced AI operations. High-performance multi-agent sandboxes and specialized reasoning engines.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreProjects.map((project, i) => (
              <SpotlightCard key={project.name} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE NEXUS SUBROUTINES ═══ */}
      <section className="py-24 px-6 relative z-10 bg-bg2/30 border-y border-border-dim/50 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <Database className="w-6 h-6 text-purple-500" />
              <h2 className="font-head font-800 text-3xl md:text-5xl tracking-tighter uppercase">
                The Nexus Subroutines
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-purple-500/30 to-transparent ml-4" />
            </div>
            <p className="text-muted-text text-lg max-w-2xl">
              A modular suite of AI agent infrastructure. Task management, persistent context, and unified auth for MCP-compatible pipelines.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nexusProjects.map((project, i) => (
              <SpotlightCard key={project.name} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PERSONAL EXPERIMENTS ═══ */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <Code2 className="w-6 h-6 text-cyan-500" />
              <h2 className="font-head font-800 text-3xl md:text-5xl tracking-tighter uppercase">
                Personal Experiments
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent ml-4" />
            </div>
            <p className="text-muted-text text-lg max-w-2xl">
              Sandbox environments and utility constructs. Exploring the edges of peer-to-peer data, generative AI, and decentralized architectures.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalProjects.map((project, i) => (
              <SpotlightCard key={project.name} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-32 px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <Globe className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-head font-800 text-4xl md:text-6xl tracking-tighter leading-none mb-6">
            Initialize Connection
          </h2>
          <p className="text-muted-text max-w-[440px] mx-auto text-lg leading-relaxed mb-10">
            All protocols are open source. Inspect the source code, fork the repos, or contribute to the network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://github.com/AddToKart"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-text text-bg font-mono text-sm font-bold px-8 py-4 flex items-center justify-center gap-2 hover:bg-accent transition-all duration-300 rounded-md"
            >
              <Github className="w-4 h-4" />
              Access GitHub
            </a>
            <Link
              href="/"
              className="w-full sm:w-auto font-mono text-sm text-text border border-border-dim2 px-8 py-4 flex items-center justify-center gap-2 hover:bg-bg3 hover:border-border-dim2 transition-all duration-300 rounded-md bg-bg2/50 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Sentinel
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
