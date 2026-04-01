"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GridCanvas } from "@/components/GridCanvas";
import {
  Github,
  ArrowLeft,
  Heart,
  Zap,
  Shield,
  Users,
  Code2,
  Star,
  Download,
  Globe,
  Terminal,
  Lock,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor: string;
}

const values: ValueItem[] = [
  {
    icon: BookOpen,
    title: "Open Source",
    description:
      "Every line of code is open. Sentinel is MIT-licensed because we believe the best developer tools are built in the open, auditable by anyone, and owned by the community.",
    accentColor: "#4ade80",
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "We chose Rust and Tauri over Electron for a reason. Sentinel launches in under 2 seconds, uses 90% less RAM, and produces binaries a fraction of the size. No compromises.",
    accentColor: "#f59e0b",
  },
  {
    icon: Shield,
    title: "Privacy",
    description:
      "Your code never leaves your machine unless you explicitly opt in. No telemetry by default, no phone-home, no tracking. Sandboxed agents run in isolated containers on your hardware.",
    accentColor: "#60a5fa",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Sentinel is shaped by its users. Feature requests, bug reports, and pull requests from the community directly influence our roadmap. Every contributor matters.",
    accentColor: "#a78bfa",
  },
];

interface StatItem {
  value: string;
  label: string;
  icon: LucideIcon;
}

const stats: StatItem[] = [
  { value: "2.4k+", label: "GitHub Stars", icon: Star },
  { value: "18k+", label: "Downloads", icon: Download },
  { value: "350+", label: "Community Members", icon: Users },
  { value: "42", label: "Contributors", icon: Code2 },
];

/* ═══════════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════════ */



/* ═══════════════════════════════════════════════════════════
   VALUE CARD
   ═══════════════════════════════════════════════════════════ */

function ValueCard({
  icon: Icon,
  title,
  description,
  accentColor,
  index,
}: ValueItem & { index: number }) {
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
   STAT CELL
   ═══════════════════════════════════════════════════════════ */

function StatCell({
  value,
  label,
  icon: Icon,
  index,
}: StatItem & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="p-8 border-r border-border-dim last:border-r-0 flex flex-col items-center gap-3 group hover:bg-bg2 transition-all duration-300 relative overflow-hidden"
    >
      <Icon className="w-4 h-4 text-accent/50 group-hover:text-accent transition-colors duration-300" />
      <div className="font-head text-3xl md:text-4xl font-800 text-text leading-none tracking-tighter">
        {value}
      </div>
      <div className="text-[10px] uppercase font-bold text-muted-text tracking-[0.2em] group-hover:text-text transition-colors duration-300">
        {label}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/0 group-hover:bg-accent/25 transition-colors duration-500" />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ABOUT PAGE
   ═══════════════════════════════════════════════════════════ */

export default function AboutPage() {
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
        className="hero pt-32 pb-20 px-6 relative z-[1] text-center overflow-hidden"
      >
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 text-[11px] text-accent/80 tracking-[0.2em] uppercase border border-accent/15 px-4 py-1.5 mb-8 bg-accent/[0.03]"
        >
          <Heart className="w-3.5 h-3.5" />
          Our Story
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-head font-800 text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.92] tracking-tighter mb-6"
        >
          About
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
          Building the open-source workspace where AI agents work in parallel,
          so developers can ship faster without sacrificing control.
        </motion.p>
      </motion.section>

      {/* ═══ MISSION ═══ */}
      <section className="py-28 px-6 relative z-[1]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
          <ScrollReveal variant="fade-left">
            <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
              Our Mission
            </div>
            <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-7">
              Why we built
              <br />
              <span className="text-accent/70">Sentinel.</span>
            </h2>
            <p className="text-muted-text text-lg leading-relaxed mb-6">
              AI coding agents are transforming how software gets built. But
              running multiple agents simultaneously was painful — context
              switches, overlapping file edits, and no isolation between
              sessions. Developers were fighting their tools instead of
              shipping.
            </p>
            <p className="text-muted-text text-[15px] leading-relaxed">
              Sentinel solves this with isolated sandboxes, parallel session
              orchestration, and real-time telemetry. One workspace, infinite
              agents, zero conflicts. We built the tool we wished existed — then
              open-sourced it.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-right" delay={100}>
            <div className="bg-bg2 border border-border-dim p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-accent/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Terminal className="w-4 h-4 text-accent/80" />
                </div>
                <div>
                  <h4 className="font-head font-800 text-[15px] tracking-tight text-text mb-1.5">
                    The Problem
                  </h4>
                  <p className="text-muted-text text-[13px] leading-relaxed">
                    Running multiple AI agents created file conflicts, wasted
                    compute, and made it impossible to track which agent changed
                    what. Existing tools were built for single-agent workflows.
                  </p>
                </div>
              </div>
              <div className="h-px bg-border-dim" />
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-accent/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Lock className="w-4 h-4 text-accent/80" />
                </div>
                <div>
                  <h4 className="font-head font-800 text-[15px] tracking-tight text-text mb-1.5">
                    The Solution
                  </h4>
                  <p className="text-muted-text text-[13px] leading-relaxed">
                    Sentinel provides Git worktree isolation, Docker sandboxing,
                    and a unified dashboard to manage everything. Each agent
                    runs in its own bubble — safe, trackable, and killable.
                  </p>
                </div>
              </div>
              <div className="h-px bg-border-dim" />
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-accent/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-accent/80" />
                </div>
                <div>
                  <h4 className="font-head font-800 text-[15px] tracking-tight text-text mb-1.5">
                    The Result
                  </h4>
                  <p className="text-muted-text text-[13px] leading-relaxed">
                    Developers run 5, 10, even 20 agents in parallel with full
                    confidence. Code reviews happen in real-time. Shipping
                    velocity goes up, context switching goes to zero.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ STORY ═══ */}
      <section className="py-28 px-6 relative z-[1] bg-bg2 border-y border-border-dim">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
                How It Started
              </div>
              <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
                From frustration
                <br />
                <span className="text-accent/70">to open source.</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-[700px] mx-auto space-y-12">
            <ScrollReveal>
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-bg border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent/80 font-mono text-[11px] font-bold">01</span>
                </div>
                <div>
                  <h3 className="font-head font-800 text-xl tracking-tight text-text mb-2">
                    The itch
                  </h3>
                  <p className="text-muted-text text-[14px] leading-relaxed">
                    Sentinel started as a side project in late 2024. I was
                    juggling multiple AI coding assistants — Cursor, Copilot,
                    Aider — and constantly losing track of which agent touched
                    which file. There had to be a better way to run them in
                    parallel without stepping on each other.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-bg border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent/80 font-mono text-[11px] font-bold">02</span>
                </div>
                <div>
                  <h3 className="font-head font-800 text-xl tracking-tight text-text mb-2">
                    First prototype
                  </h3>
                  <p className="text-muted-text text-[14px] leading-relaxed">
                    The first version was a scrappy CLI that spun up Git
                    worktrees and Docker containers. It was rough, but it
                    worked. I shared it on Reddit and the response was
                    overwhelming — turns out a lot of developers had the same
                    problem.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-bg border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent/80 font-mono text-[11px] font-bold">03</span>
                </div>
                <div>
                  <h3 className="font-head font-800 text-xl tracking-tight text-text mb-2">
                    V2 and beyond
                  </h3>
                  <p className="text-muted-text text-[14px] leading-relaxed">
                    Sentinel V2 was a ground-up rewrite using Tauri and React.
                    The vision grew from &quot;parallel agent runner&quot; to a
                    full workspace — with real-time telemetry, mobile
                    monitoring, and a plugin architecture. Today, Sentinel is
                    used by thousands of developers shipping with AI agents
                    every day.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="py-28 px-6 relative z-[1]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
              Core Values
            </div>
            <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
              What we stand for.
            </h2>
            <p className="text-muted-text max-w-[520px] text-lg leading-relaxed mb-14">
              These principles guide every decision we make — from architecture
              choices to how we engage with the community.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((value, i) => (
              <ValueCard key={value.title} {...value} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className="py-28 px-6 relative z-[1] bg-bg2 border-y border-border-dim">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
                The Builder
              </div>
              <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
                One developer.
                <br />
                <span className="text-accent/70">One vision.</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="max-w-[500px] mx-auto">
              <div className="bg-bg border border-border-dim p-8 text-center group hover:border-border-dim2 transition-all duration-300 relative overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-20 h-20 rounded-full bg-accent/[0.08] border border-accent/15 flex items-center justify-center mx-auto mb-6">
                  <Code2 className="w-8 h-8 text-accent/70" />
                </div>

                <h3 className="font-head font-800 text-2xl tracking-tight text-text mb-1">
                  AddToKart
                </h3>
                <p className="text-muted-text text-[13px] mb-5">
                  Creator &amp; Maintainer
                </p>
                <p className="text-muted-text text-[13px] leading-relaxed mb-6 max-w-[360px] mx-auto">
                  Full-stack engineer obsessed with developer experience and
                  performance. Building Sentinel full-time as an open-source
                  project, funded by the community.
                </p>

                <a
                  href="https://github.com/AddToKart"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-accent font-mono text-[12px] border border-accent/20 px-5 py-2.5 hover:bg-accent/[0.06] hover:border-accent/30 transition-all duration-200"
                >
                  <Github className="w-4 h-4" />
                  @AddToKart
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-28 px-6 relative z-[1]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
                By The Numbers
              </div>
              <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight">
                Growing with the community.
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="max-w-[800px] mx-auto grid grid-cols-2 md:grid-cols-4 border border-border-dim bg-bg2">
              {stats.map((stat, i) => (
                <StatCell key={stat.label} {...stat} index={i} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-36 px-6 relative z-[1] text-center overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <ScrollReveal>
          <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-6 font-bold">
            Join The Journey
          </div>
          <h2 className="font-head font-800 text-5xl md:text-7xl tracking-tighter leading-none mb-8">
            Build with us.
            <br />
            <span className="text-accent italic">Star the repo.</span>
          </h2>
          <p className="text-muted-text max-w-[480px] mx-auto text-lg leading-relaxed mb-10">
            Sentinel is built in the open. Whether you want to contribute code,
            file issues, or just follow along — your support means everything.
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
