"use client";

import { motion } from "framer-motion";
import { GridCanvas } from "@/components/GridCanvas";
import { TypewriterTerminal } from "@/components/TypewriterTerminal";
import { Ticker } from "@/components/Ticker";
import { StatsBar } from "@/components/StatsBar";
import { FeatureGrid } from "@/components/FeatureGrid";
import { WorkflowGrid } from "@/components/WorkflowGrid";
import { ArchitectureStack } from "@/components/ArchitectureStack";
import { MobileTeaser } from "@/components/MobileTeaser";
import { PricingGrid } from "@/components/PricingGrid";
import { RoadmapGrid } from "@/components/RoadmapGrid";
import { Github, Download, Star, ChevronRight, Layout, Terminal, Code2, Activity, Globe, Zap } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-accent selection:text-bg">
      <GridCanvas />

      {/* NAV */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 md:px-10 h-[64px] bg-bg/70 backdrop-blur-[24px] border-b border-white/5"
      >
        <a href="#" className="nav-logo font-head font-800 text-[18px] tracking-tight text-text flex items-center gap-2 group">
          <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_rgba(74,222,128,0.5)] group-hover:scale-125 transition-transform" />
          SENTINEL
        </a>
        <ul className="hidden lg:flex gap-10 list-none">
          {["Features", "Stack", "Mobile", "Pricing", "Roadmap"].map((item) => (
            <li key={item}>
              <a 
                href={`#${item.toLowerCase()}`} 
                className="text-muted-text text-[12px] font-medium tracking-wider hover:text-accent transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-3 items-center">
          <a
            href="https://github.com/AddToKart/sentinel-v2"
            target="_blank"
            className="hidden sm:flex items-center gap-2 text-muted-text font-mono text-[12px] border border-white/10 px-4 py-2 hover:text-text hover:border-white/25 transition-all bg-white/5"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
          <a
            href="https://github.com/AddToKart/sentinel-v2#installation"
            target="_blank"
            className="flex items-center gap-2 bg-accent text-bg font-mono text-[12px] font-bold px-5 py-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(74,222,128,0.2)]"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </a>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="hero min-h-screen flex flex-col items-center justify-center px-6 py-32 relative text-center z-[1] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(74,222,128,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="hero-badge inline-flex items-center gap-2 text-[11px] text-accent tracking-[0.2em] uppercase border border-accent/20 p-[6px_16px] mb-8 bg-accent/5 backdrop-blur-sm"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Production-Ready V2
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-head font-800 text-[clamp(2.8rem,10vw,7rem)] leading-[0.9] tracking-tighter mb-8"
        >
          Run AI agents
          <br />
          <span className="text-accent relative italic px-2">
            in parallel.
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.8, ease: "circOut" }}
              className="absolute left-0 bottom-2 h-[4px] md:h-[8px] bg-accent/20 -z-10"
            />
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[580px] text-muted-text text-lg md:text-xl leading-relaxed mb-12"
        >
          Sentinel is a high-performance multi-agent workspace. Orchestrate multiple AI coding sessions 
          simultaneously in isolated sandboxes.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 items-center mb-24"
        >
          <a
            href="https://github.com/AddToKart/sentinel-v2#installation"
            target="_blank"
            className="w-full sm:w-auto bg-accent text-bg font-mono text-[14px] font-bold px-8 py-4 inline-flex items-center justify-center gap-2 group hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] transition-all"
          >
            <Download className="w-4 h-4" />
            Get Started Free
          </a>
          <a
            href="https://github.com/AddToKart/sentinel-v2"
            target="_blank"
            className="w-full sm:w-auto font-mono text-[14px] text-text border border-white/10 px-8 py-4 inline-flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
          >
            <Star className="w-4 h-4 text-accent" />
            Star on GitHub
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1000px] mx-auto perspective-[1000px]"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <TypewriterTerminal />
          </motion.div>
        </motion.div>
      </section>

      <Ticker />
      
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <StatsBar />
      </motion.div>

      {/* FEATURES */}
      <section id="features" className="py-32 px-6 relative z-[1]">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[11px] tracking-[0.2em] uppercase text-accent mb-4 font-bold">
              Engineering Excellence
            </div>
            <h2 className="font-head font-800 text-4xl md:text-6xl tracking-tighter leading-tight mb-6">
              Built for agents.<br />Optimized for you.
            </h2>
            <p className="text-muted-text max-w-[540px] text-lg leading-relaxed mb-16">
              Leveraging Tauri v2 and React 19 for a lightning-fast desktop experience 
              with native Rust performance.
            </p>
          </motion.div>
          <FeatureGrid />
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="py-32 px-6 relative z-[1] bg-bg2 border-y border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="text-[11px] tracking-[0.2em] uppercase text-accent mb-4 font-bold">
              Operational Flow
            </div>
            <h2 className="font-head font-800 text-4xl md:text-6xl tracking-tighter leading-tight mb-4">
              Streamlined Orchestration.
            </h2>
          </motion.div>
          <WorkflowGrid />
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section id="architecture" className="py-32 px-6 relative z-[1]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[11px] tracking-[0.2em] uppercase text-accent mb-4 font-bold">
              Core Architecture
            </div>
            <h2 className="font-head font-800 text-4xl md:text-6xl tracking-tighter leading-tight mb-8">
              Native speed.<br />Modern stack.
            </h2>
            <div className="space-y-6 text-muted-text text-lg leading-relaxed mb-10">
              <p>
                Sentinel bypasses the bloat of Electron by using Tauri's Rust-based 
                runtime, resulting in 90% smaller binaries and 3x less RAM usage.
              </p>
            </div>
            <div className="bg-white/5 p-6 border border-white/10 space-y-4">
              <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-muted-text">
                <span>Codebase Composition</span>
                <span className="text-accent">V2.0.4</span>
              </div>
              <div className="h-4 flex rounded-full overflow-hidden bg-bg">
                <div className="h-full bg-amber-400 w-[50.6%]" title="Rust" />
                <div className="h-full bg-blue-400 w-[47.3%]" title="TypeScript" />
                <div className="h-full bg-white/20 w-[2.1%]" title="Other" />
              </div>
              <div className="flex gap-6 text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>50.6% Rust</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>47.3% TypeScript</span>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ArchitectureStack />
          </motion.div>
        </div>
      </section>

      {/* MOBILE */}
      <section id="mobile" className="py-32 px-6 relative z-[1] bg-bg2 border-y border-white/5 overflow-hidden">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <MobileTeaser />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase border border-purple-500/30 p-[4px_12px] mb-8 bg-purple-500/10 text-purple-400 font-bold">
              <Activity className="w-3 h-3" />
              Mobile Telemetry
            </div>
            <h2 className="font-head font-800 text-4xl md:text-6xl tracking-tighter leading-tight mb-8">
              Your agents,<br />
              <span className="text-purple-400 italic">everywhere.</span>
            </h2>
            <p className="text-muted-text text-lg leading-relaxed mb-10">
              Monitor active sessions, review diffs, and approve changes directly 
              from your mobile device with encrypted remote sync.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                { icon: Zap, text: "Live session monitoring & kill-switch" },
                { icon: Terminal, text: "Remote terminal access (SSH-secured)" },
                { icon: Activity, text: "Real-time CPU/RAM push alerts" },
                { icon: Code2, text: "Review & approve code on the go" },
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-muted-text group"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-bg transition-colors">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[15px]">{item.text}</span>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 font-mono text-sm bg-bg3 border border-white/10 text-text p-4 focus:border-purple-400 outline-none transition-all"
              />
              <button className="bg-purple-500 text-bg font-mono text-xs font-bold px-8 py-4 hover:bg-purple-400 transition-colors whitespace-nowrap">
                Join Mobile Beta
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32 px-6 relative z-[1]">
        <div className="max-w-[1100px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-[11px] tracking-[0.2em] uppercase text-accent mb-4 font-bold">
              Pricing Models
            </div>
            <h2 className="font-head font-800 text-4xl md:text-6xl tracking-tighter leading-tight mb-8">
              Open source core.<br />Enterprise ready.
            </h2>
            <p className="text-muted-text max-w-[600px] mx-auto text-lg leading-relaxed mb-20">
              Sentinel is free for individuals and open-source contributors. 
              Pro plans unlock advanced collaboration for engineering teams.
            </p>
          </motion.div>
          <PricingGrid />
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="py-32 px-6 relative z-[1] bg-bg2 border-y border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-[11px] tracking-[0.2em] uppercase text-accent mb-4 font-bold">
              Future trajectory
            </div>
            <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-8">
              The path forward.
            </h2>
          </motion.div>
          <RoadmapGrid />
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-6 relative z-[1] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(74,222,128,0.1)_0%,transparent_70%)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-[11px] tracking-[0.2em] uppercase text-accent mb-6 font-bold">
            Community Driven
          </div>
          <h2 className="font-head font-800 text-5xl md:text-8xl tracking-tighter leading-none mb-10">
            Built in public.<br />
            <span className="text-accent italic">Free forever.</span>
          </h2>
          <p className="text-muted-text max-w-[500px] mx-auto text-lg leading-relaxed mb-12">
            Download Sentinel today or contribute to the next generation of AI development tooling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://github.com/AddToKart/sentinel-v2#installation"
              target="_blank"
              className="w-full sm:w-auto bg-accent text-bg font-mono text-sm font-bold px-10 py-5 inline-flex items-center justify-center gap-2 hover:shadow-[0_0_40px_rgba(74,222,128,0.4)] transition-all"
            >
              <Download className="w-4 h-4" />
              Download Sentinel
            </a>
            <a
              href="https://github.com/AddToKart/sentinel-v2"
              target="_blank"
              className="w-full sm:w-auto font-mono text-sm text-text border border-white/10 px-10 py-5 inline-flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 p-12 bg-bg relative z-[1]">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4">
            <div className="font-head font-800 tracking-tighter text-text text-2xl">
              SENTINEL.
            </div>
            <p className="text-muted-text text-sm max-w-[300px]">
              The parallel workspace for the next generation of AI-driven engineering.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="text-[10px] uppercase tracking-widest text-accent font-bold">Product</div>
              <ul className="space-y-2 text-sm text-muted-text">
                <li><a href="#features" className="hover:text-text transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-text transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-text transition-colors">Desktop App</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="text-[10px] uppercase tracking-widest text-accent font-bold">Resources</div>
              <ul className="space-y-2 text-sm text-muted-text">
                <li><a href="https://github.com/AddToKart/sentinel-v2" className="hover:text-text transition-colors">GitHub</a></li>
                <li><a href="https://github.com/AddToKart/sentinel-v2/blob/main/README.md" className="hover:text-text transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-text transition-colors">Community</a></li>
              </ul>
            </div>
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase tracking-widest text-accent font-bold">Legal</div>
              <ul className="space-y-2 text-sm text-muted-text">
                <li><a href="https://github.com/AddToKart/sentinel-v2/blob/main/LICENSE" className="hover:text-text transition-colors">MIT License</a></li>
                <li><a href="#" className="hover:text-text transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-[1100px] mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4 text-[10px] uppercase tracking-widest text-muted-text/50">
          <span>© 2026 Sentinel Open Source Project.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors flex items-center gap-1.5"><Globe className="w-3 h-3" /> System Status</a>
            <span>Built with Tauri & React</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
