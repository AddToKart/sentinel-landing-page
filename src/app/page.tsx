"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { GridCanvas } from "@/components/GridCanvas";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TypewriterTerminal } from "@/components/TypewriterTerminal";
import { Ticker } from "@/components/Ticker";
import { StatsBar } from "@/components/StatsBar";
import { FeatureGrid } from "@/components/FeatureGrid";
import { WorkflowGrid } from "@/components/WorkflowGrid";
import { ArchitectureStack } from "@/components/ArchitectureStack";
import { MobileTeaser } from "@/components/MobileTeaser";
import { RoadmapGrid } from "@/components/RoadmapGrid";
import { IntegrationsGrid } from "@/components/IntegrationsGrid";
import { TestimonialsGrid } from "@/components/TestimonialsGrid";
import { FAQ } from "@/components/FAQ";
import { MagneticWrapper } from "@/components/MagneticWrapper";
import { Newsletter } from "@/components/Newsletter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { GitHubFeed } from "@/components/GitHubFeed";
import { Github, Download, Star, Activity, Globe, Zap, Terminal, Code2 } from "lucide-react";
import Link from "next/link";



/* ─── Main Page ───────────────────────────────────────── */
export default function Home() {
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
      {/* ═══ HERO ═══ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="hero min-h-screen flex flex-col items-center justify-center px-6 py-32 relative text-center z-[1] overflow-hidden"
      >
        {/* Single subtle radial glow */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 text-[11px] text-accent tracking-[0.2em] uppercase border border-accent/15 px-4 py-1.5 mb-8 bg-accent/[0.03]"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Production-Ready V2
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-head font-800 text-[clamp(2.8rem,10vw,7rem)] leading-[0.9] tracking-tighter mb-8"
        >
          Run AI agents
          <br />
          <span className="text-accent relative italic px-2">
            in parallel.
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 bottom-2 h-[3px] md:h-[6px] bg-accent/15 -z-10"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[560px] text-muted-text text-lg md:text-xl leading-relaxed mb-12"
        >
          Sentinel is a high-performance multi-agent workspace. Orchestrate multiple AI coding sessions
          simultaneously in isolated sandboxes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-3 items-center mb-20"
        >
          <MagneticWrapper>
            <a
              href="https://github.com/AddToKart/sentinel-v2#installation"
              target="_blank"
              className="w-full sm:w-auto bg-accent text-bg font-mono text-[13px] font-bold px-8 py-3.5 inline-flex items-center justify-center gap-2 relative overflow-hidden group hover:brightness-110 transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-text/20 to-transparent transition-all duration-700 group-hover:left-full" />
            </a>
          </MagneticWrapper>
          <MagneticWrapper>
            <a
              href="https://github.com/AddToKart/sentinel-v2"
              target="_blank"
              className="w-full sm:w-auto font-mono text-[13px] text-text border border-border-dim px-8 py-3.5 inline-flex items-center justify-center gap-2 hover:bg-bg3 hover:border-border-dim2 transition-all duration-200"
            >
              <Star className="w-4 h-4 text-accent" />
              Star on GitHub
            </a>
          </MagneticWrapper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[960px] mx-auto"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <TypewriterTerminal />
          </motion.div>
        </motion.div>
      </motion.section>

      <Ticker />

      <div className="relative z-1">
        <StatsBar />
      </div>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-28 px-6 relative z-[1] grain-texture">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
              Engineering Excellence
            </div>
            <h2 className="font-head font-800 text-4xl md:text-6xl tracking-tighter leading-tight mb-5">
              Built for agents.
              <br />
              <span className="text-accent/70">Optimized for you.</span>
            </h2>
            <p className="text-muted-text max-w-[520px] text-lg leading-relaxed mb-14">
              Leveraging Tauri v2 and React 19 for a lightning-fast desktop experience with native Rust performance.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FeatureGrid />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ WORKFLOW ═══ */}
      <section className="py-28 px-6 relative z-[1] bg-bg2 border-y border-border-dim">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
                Operational Flow
              </div>
              <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight">
                Streamlined Orchestration.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <WorkflowGrid />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ ARCHITECTURE ═══ */}
      <section id="architecture" className="py-28 px-6 relative z-[1]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
          <ScrollReveal variant="fade-left">
            <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
              Core Architecture
            </div>
            <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-7">
              Native speed.
              <br />
              <span className="text-accent/70">Modern stack.</span>
            </h2>
            <p className="text-muted-text text-lg leading-relaxed mb-8">
              Sentinel bypasses the bloat of Electron by using Tauri&apos;s Rust-based runtime, resulting in 90%
              smaller binaries and 3x less RAM usage.
            </p>
            <div className="bg-bg2 p-5 border border-border-dim space-y-4">
              <div className="flex justify-between text-[10px] font-mono uppercase tracking-[0.15em] text-muted-text/60">
                <span>Codebase Composition</span>
                <span className="text-accent/70">V2.0.4</span>
              </div>
              <div className="h-3 flex rounded-full overflow-hidden bg-bg">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "50.6%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-amber-500/80 dark:bg-amber-400/80"
                />
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "47.3%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-blue-500/80 dark:bg-blue-400/80"
                />
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "2.1%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-muted-text"
                />
              </div>
              <div className="flex gap-5 text-[10px] font-mono text-muted-text/60">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80 dark:bg-amber-400/80" />
                  <span>50.6% Rust</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80 dark:bg-blue-400/80" />
                  <span>47.3% TypeScript</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="fade-right" delay={100}>
            <ArchitectureStack />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ INTEGRATIONS (NEW) ═══ */}
      <section className="py-28 px-6 relative z-[1] bg-bg2 border-y border-border-dim">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
                AI Agents & Tools
              </div>
              <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
                Powered by top-tier agents.
              </h2>
              <p className="text-muted-text max-w-[520px] mx-auto text-[15px] leading-relaxed">
                Sentinel runs Claude, Codex, Gemini, Qwen, Kilo, Kimi and more — with full sandbox isolation and parallel execution.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <IntegrationsGrid />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ INTERACTIVE TERMINAL ═══ */}
      <section className="py-28 px-6 relative z-[1]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
                Try It Now
              </div>
              <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
                Experience the power.
              </h2>
              <p className="text-muted-text max-w-[520px] mx-auto text-[15px] leading-relaxed">
                Watch Sentinel orchestrate AI agents in real-time. Click a scenario below to see it in action.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <InteractiveTerminal />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-28 px-6 relative z-[1]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
                Social Proof
              </div>
              <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight">
                Trusted by Engineers.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <TestimonialsGrid />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ GITHUB FEED ═══ */}
      <section className="py-28 px-6 relative z-[1] bg-bg2 border-y border-border-dim">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
                Latest Activity
              </div>
              <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight">
                What&apos;s happening now.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <GitHubFeed />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ MOBILE ═══ */}
      <section id="mobile" className="py-28 px-6 relative z-[1] overflow-hidden">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
          <ScrollReveal variant="scale-in" className="order-2 lg:order-1">
            <MobileTeaser />
          </ScrollReveal>
          <ScrollReveal variant="fade-right" className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase border border-violet-700/20 dark:border-purple-500/20 px-3 py-1 mb-7 bg-violet-600/10 dark:bg-purple-500/[0.04] text-violet-700/85 dark:text-purple-400/80 font-bold">
              <Activity className="w-3 h-3" />
              Mobile Telemetry
            </div>
            <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-7">
              Your agents,
              <br />
              <span className="text-violet-700 dark:text-purple-400 italic">everywhere.</span>
            </h2>
            <p className="text-muted-text text-lg leading-relaxed mb-8">
              Monitor active sessions, review diffs, and approve changes directly from your mobile device with
              encrypted remote sync.
            </p>
            <ul className="space-y-3.5 mb-8">
              {[
                { icon: Zap, text: "Live session monitoring & kill-switch" },
                { icon: Terminal, text: "Remote terminal access (SSH-secured)" },
                { icon: Activity, text: "Real-time CPU/RAM push alerts" },
                { icon: Code2, text: "Review & approve code on the go" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3.5 text-muted-text group">
                  <div className="w-8 h-8 rounded-lg bg-violet-600/10 dark:bg-purple-500/[0.06] flex items-center justify-center text-violet-700/80 dark:text-purple-400/70 group-hover:bg-violet-600/15 dark:group-hover:bg-purple-500/10 group-hover:text-violet-700 dark:group-hover:text-purple-400 transition-all duration-200">
                    <item.icon className="w-[15px] h-[15px]" />
                  </div>
                  <span className="text-[14px] group-hover:text-text transition-colors duration-200">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 font-mono text-sm bg-bg2 border border-border-dim text-text px-4 py-3 focus:border-violet-700/35 dark:focus:border-purple-400/50 outline-none transition-all duration-200 placeholder:text-muted-text/40"
              />
              <button className="bg-violet-700 text-white dark:bg-purple-500/90 dark:text-bg font-mono text-[11px] font-bold px-7 py-3 hover:bg-violet-600 dark:hover:bg-purple-400 transition-colors duration-200 whitespace-nowrap">
                Join Mobile Beta
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-28 px-6 relative z-[1]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">Common Questions</div>
              <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight">
                Everything you need to know.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <FAQ />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ ROADMAP ═══ */}
      <section id="roadmap" className="py-28 px-6 relative z-[1] bg-bg2 border-y border-border-dim">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">Future trajectory</div>
            <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-8">
              The path forward.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <RoadmapGrid />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="py-28 px-6 relative z-[1]">
        <div className="max-w-[1100px] mx-auto">
          <Newsletter />
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-36 px-6 relative z-[1] text-center overflow-hidden">
        {/* Single ambient glow (not excessive) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <ScrollReveal>
          <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-6 font-bold">Community Driven</div>
          <h2 className="font-head font-800 text-5xl md:text-7xl tracking-tighter leading-none mb-8">
            Built in public.
            <br />
            <span className="text-accent italic">Free forever.</span>
          </h2>
          <p className="text-muted-text max-w-[480px] mx-auto text-lg leading-relaxed mb-10">
            Download Sentinel today or contribute to the next generation of AI development tooling.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="https://github.com/AddToKart/sentinel-v2#installation"
              target="_blank"
              className="w-full sm:w-auto bg-accent text-bg font-mono text-sm font-bold px-9 py-4 inline-flex items-center justify-center gap-2 group relative overflow-hidden hover:brightness-110 transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              <span className="relative z-10">Download Sentinel</span>
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-text/20 to-transparent transition-all duration-700 group-hover:left-full" />
            </a>
            <a
              href="https://github.com/AddToKart/sentinel-v2"
              target="_blank"
              className="w-full sm:w-auto font-mono text-sm text-text border border-border-dim px-9 py-4 inline-flex items-center justify-center gap-2 hover:bg-bg3 hover:border-border-dim2 transition-all duration-200"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ FOOTER ═══ */}
      
    </main>
  );
}
