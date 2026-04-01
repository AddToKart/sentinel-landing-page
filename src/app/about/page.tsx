"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useSpring, useInView } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { GridCanvas } from "@/components/GridCanvas";
import {
  Github,
  ArrowLeft,
  Zap,
  Shield,
  Users,
  Code2,
  Star,
  Download,
  Terminal,
  Lock,
  BookOpen,
  Database,
  Layers,
  Activity,
  Network
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor: string;
}

const values: ValueItem[] = [
  {
    icon: BookOpen,
    title: "The Open Codex",
    description: "Every line of code is open. Sentinel is MIT-licensed because we believe the best developer tools are built in the open, auditable by anyone, and owned by the community.",
    accentColor: "#00f0ff",
  },
  {
    icon: Zap,
    title: "Hyper-Performance",
    description: "Forged in Rust and Tauri. Sentinel launches in under 2 seconds, uses 90% less RAM, and produces binaries a fraction of the size. No compromises, only speed.",
    accentColor: "#f59e0b",
  },
  {
    icon: Shield,
    title: "Absolute Isolation",
    description: "Your code never leaves your machine unless you explicitly opt in. No telemetry by default. Sandboxed agents run in isolated containers on your local hardware.",
    accentColor: "#60a5fa",
  },
  {
    icon: Users,
    title: "The Collective",
    description: "Sentinel is shaped by its users. Feature requests, bug reports, and pull requests from the community directly influence our roadmap. Every contributor matters.",
    accentColor: "#a78bfa",
  },
];

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
}

const stats: StatItem[] = [
  { value: 2400, suffix: "+", label: "GitHub Stars", icon: Star },
  { value: 18000, suffix: "+", label: "Downloads", icon: Download },
  { value: 350, suffix: "+", label: "Network Nodes", icon: Network },
  { value: 42, suffix: "", label: "Architects", icon: Code2 },
];

/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

function GlowingCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      ref={ref}
      className={`relative group bg-bg/80 backdrop-blur-sm border border-border-dim overflow-hidden transition-colors hover:border-accent/50 ${className}`}
      onMouseMove={onMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(var(--accent-rgb, 0, 240, 255), 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 20 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      setDisplay(Math.floor(latest).toLocaleString());
    });
  }, [spring]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function TerminalCrystal({ values }: { values: ValueItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % values.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [values.length]);

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-none border border-accent/30 bg-bg2/90 shadow-lg dark:shadow-[0_0_40px_rgba(0,240,255,0.05)] overflow-hidden">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] z-20" />
      <motion.div
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 h-32 bg-gradient-to-b from-transparent via-accent/10 to-transparent pointer-events-none z-20"
      />

      <div className="flex border-b border-accent/30 bg-accent/5 px-4 py-2 z-10 relative">
        <div className="flex gap-2 items-center">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="mx-auto flex items-center gap-2 text-xs font-mono text-accent/70 uppercase tracking-widest">
          <Activity className="w-3 h-3" />
          Sentinel_Core_Values.exe
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 bg-bg">
        <div className="col-span-1 border-r border-accent/20 bg-bg/50 p-4 font-mono text-sm flex flex-col gap-2">
          {values.map((v, i) => (
            <button
              key={v.title}
              onClick={() => setActiveIndex(i)}
              className={`text-left px-4 py-3 border-l-2 transition-all duration-300 flex items-center gap-3 ${
                i === activeIndex
                  ? "border-accent text-accent bg-accent/10"
                  : "border-transparent text-muted-text hover:text-text hover:bg-accent/5"
              }`}
            >
              <v.icon className={`w-4 h-4 ${i === activeIndex ? "animate-pulse" : ""}`} />
              <span className="uppercase text-[11px] tracking-wider">{v.title}</span>
            </button>
          ))}
        </div>
        <div className="col-span-2 p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[300px]">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            <div
              className="w-12 h-12 rounded-none flex items-center justify-center mb-6 bg-accent/10 border border-accent/30"
              style={{ boxShadow: `0 0 20px ${values[activeIndex].accentColor}40` }}
            >
              {React.createElement(values[activeIndex].icon, {
                className: "w-6 h-6",
                style: { color: values[activeIndex].accentColor },
              })}
            </div>
            <h3 className="font-head font-800 text-2xl tracking-tight text-text mb-4 uppercase flex items-center gap-3">
              <span className="text-accent">&gt;</span> {values[activeIndex].title}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-3 h-6 bg-accent inline-block"
              />
            </h3>
            <p className="text-muted-text text-base leading-relaxed font-mono">
              {values[activeIndex].description}
            </p>
          </motion.div>
          
          {/* Background matrix glow */}
          <div 
            className="absolute -right-20 -bottom-20 w-64 h-64 blur-[80px] pointer-events-none transition-colors duration-700"
            style={{ backgroundColor: values[activeIndex].accentColor, opacity: 0.15 }}
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 PAGE COMP                                  */
/* -------------------------------------------------------------------------- */

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <main className="min-h-screen relative selection:bg-accent selection:text-bg bg-bg overflow-x-hidden">
      <GridCanvas />

      {/* ----------------- HERO ----------------- */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="hero pt-40 pb-32 px-6 relative z-[1] text-center"
      >
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/[0.05] rounded-full blur-[150px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 text-[10px] text-accent font-mono tracking-[0.3em] uppercase border border-accent/30 px-5 py-2 mb-10 bg-bg2/40 backdrop-blur-md shadow-lg dark:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
        >
          <Database className="w-3 h-3" />
          SYSTEM_ARCHIVE // ORIGINS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-head font-800 text-[clamp(3rem,8vw,7rem)] leading-[0.85] tracking-tighter mb-8 uppercase"
        >
          Genesis of
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-text via-accent to-text relative inline-block">
            The Construct
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
              className="absolute left-0 bottom-2 h-[4px] bg-accent shadow-[0_0_20px_rgba(0,240,255,0.8)]"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[700px] mx-auto text-muted-text text-lg md:text-xl leading-relaxed mb-10 font-mono"
        >
          &gt; Forging the decentralized workspace where autonomous agents synchronize, enabling architects to manipulate code at the speed of thought.
        </motion.p>
      </motion.section>

      {/* ----------------- STORY / MISSION ----------------- */}
      <section className="py-32 px-6 relative z-[1]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="text-[10px] tracking-[0.3em] uppercase text-accent font-mono flex items-center gap-3">
              <span className="w-8 h-px bg-accent" />
              The Prime Directive
            </div>
            <h2 className="font-head font-800 text-4xl md:text-6xl tracking-tighter leading-none uppercase">
              Why We Woke
              <br />
              <span className="text-accent/80">The Sentinel.</span>
            </h2>
            <div className="space-y-6 text-muted-text text-lg font-mono leading-relaxed border-l border-accent/20 pl-6">
              <p>
                <span className="text-text font-bold">&gt; INITIALIZING PROTOCOL...</span>
                <br />
                AI entities were fracturing the workflow. Running multiple agents simultaneously led to overlapping directives, corrupted files, and zero operational isolation. Creators were fighting the very constructs designed to assist them.
              </p>
              <p>
                <span className="text-accent">&gt; EXECUTING OVERRIDE.</span>
                <br />
                Sentinel enforces order through isolated sub-routines (Git worktrees) and secure containers (Docker). One unified nexus, infinite autonomous agents, absolute zero conflict. We forged the nexus we required—then released its source to the grid.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full" />
            <div className="relative grid gap-4">
              {[
                { icon: Terminal, title: "The Chaos", desc: "Fractured agent states, colliding edits, wasted cycles." },
                { icon: Lock, title: "The Containment", desc: "Docker sandboxes. Git isolation. Absolute control." },
                { icon: Zap, title: "The Synchronization", desc: "Parallel multi-agent execution with zero latency." }
              ].map((item, i) => (
                <GlowingCard key={item.title} className="p-6 flex items-start gap-5">
                  <div className="w-12 h-12 rounded-none bg-bg2 border border-accent/30 flex items-center justify-center flex-shrink-0 shadow-sm dark:shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-mono font-bold text-[15px] tracking-tight text-text mb-2 uppercase flex items-center gap-2">
                      <span className="text-accent opacity-50">0{i+1}</span> {item.title}
                    </h4>
                    <p className="text-muted-text text-[13px] font-mono leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </GlowingCard>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ----------------- THE ARCHITECT ----------------- */}
      <section className="py-32 px-6 relative z-[1] bg-bg2/40 border-y border-accent/10">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="text-[10px] tracking-[0.3em] uppercase text-accent font-mono mb-4">
              Creator Identity
            </div>
              <h2 className="font-head font-800 text-5xl md:text-7xl tracking-tighter leading-tight uppercase text-text">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-text">Architect.</span>
              </h2>
          </motion.div>

          <div className="max-w-[600px] mx-auto relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-accent/5 blur-[120px] pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <GlowingCard className="p-10 text-center relative z-10 border-accent/20">
                <div className="w-24 h-24 mx-auto mb-8 relative">
                  <div className="absolute inset-0 border-2 border-accent/30 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-2 border border-accent/50 animate-[spin_15s_linear_infinite_reverse]" />
                  <div className="absolute inset-0 flex items-center justify-center bg-bg/50 backdrop-blur-sm">
                    <Code2 className="w-8 h-8 text-accent drop-shadow-md dark:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
                  </div>
                </div>

                <h3 className="font-mono font-bold text-3xl tracking-tight text-text mb-2 uppercase">
                  AddToKart
                </h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 text-accent font-mono text-xs mb-8 uppercase tracking-widest">
                  <Activity className="w-3 h-3 animate-pulse" />
                  Primary Node
                </div>

                <p className="text-muted-text font-mono text-sm leading-relaxed mb-8">
                  &gt; Full-stack cyber-engineer obsessed with terminal velocity and optimal system architecture. Constructing Sentinel full-time as a decentralized open-source nexus, powered by community nodes.
                </p>

                <a
                  href="https://github.com/AddToKart"
                  target="_blank"
                  className="inline-flex items-center gap-3 font-mono text-[13px] uppercase tracking-widest bg-text text-bg px-8 py-4 hover:bg-accent hover:text-bg transition-all duration-300 font-bold group"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Initialize Link
                </a>
              </GlowingCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ----------------- TERMINAL CRYSTAL (VALUES) ----------------- */}
      <section className="py-32 px-6 relative z-[1]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-[10px] tracking-[0.3em] uppercase text-accent font-mono mb-4">
              System Directives
            </div>
            <h2 className="font-head font-800 text-4xl md:text-6xl tracking-tighter leading-none uppercase mb-6">
              Core Parameters
            </h2>
            <p className="text-muted-text max-w-[600px] mx-auto text-lg font-mono">
              &gt; The immutable laws governing the Construct.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <TerminalCrystal values={values} />
          </motion.div>
        </div>
      </section>

      {/* ----------------- STATS ----------------- */}
      <section className="py-24 px-6 relative z-[1] bg-bg2/60 border-y border-border-dim">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-accent/20 border border-accent/20 p-px">
            {stats.map((stat, i) => (
              <div key={stat.label} className="bg-bg p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <stat.icon className="w-6 h-6 text-accent/40 mb-6 group-hover:text-accent group-hover:scale-110 transition-all duration-500" />
                <div className="font-head text-4xl md:text-5xl font-800 text-text leading-none tracking-tighter mb-3 flex items-baseline">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-mono text-[10px] uppercase text-accent/60 tracking-[0.2em] group-hover:text-accent transition-colors duration-300">
                  {stat.label}
                </div>
                {/* Scanner effect on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-accent/50 -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- CTA ----------------- */}
      <section className="py-40 px-6 relative z-[1] text-center overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/[0.05] rounded-full blur-[150px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="w-16 h-16 mx-auto bg-bg border border-accent/30 flex items-center justify-center mb-8 shadow-sm dark:shadow-[0_0_30px_rgba(0,240,255,0.2)]">
            <Layers className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-head font-800 text-5xl md:text-8xl tracking-tighter leading-none mb-8 uppercase text-text">
            Join The <span className="text-transparent bg-clip-text bg-gradient-to-b from-text to-text/40">Grid.</span>
          </h2>
          <p className="text-muted-text max-w-[500px] mx-auto text-lg font-mono mb-12">
            &gt; Sentinel is forged in the open. Synchronize your node, contribute to the core, and elevate the construct.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="https://github.com/AddToKart/sentinel-v2"
              target="_blank"
              className="group relative px-8 py-4 bg-accent text-bg font-mono text-sm font-bold uppercase tracking-widest overflow-hidden"
            >
              <div className="absolute inset-0 bg-text translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <div className="relative z-10 flex items-center gap-3 mix-blend-difference text-white dark:text-black">
                <Github className="w-5 h-5" />
                Star on GitHub
              </div>
            </a>
            <Link
              href="/"
              className="group px-8 py-4 border border-accent/30 bg-bg2/50 text-text font-mono text-sm uppercase tracking-widest hover:bg-accent/10 hover:border-accent transition-all duration-300 flex items-center gap-3"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return to Nexus
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
