"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { GitHubFeed } from "@/components/GitHubFeed";
import { Github, Download, Star, Activity, Terminal, Code2, Zap, Shield, Cpu, Network } from "lucide-react";
import Link from "next/link";

/* ─── Glowing Card Wrapper ────────────────────────────── */
function GlowingCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group border border-border-dim bg-bg/50 backdrop-blur-sm ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--accent-rgb), 0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

/* ─── Floating Orb ────────────────────────────────────── */
function FloatingOrb({ size, color, delay, duration, top, left, right, bottom }: any) {
  return (
    <motion.div
      className="absolute rounded-full blur-[100px] pointer-events-none mix-blend-screen z-0"
      style={{
        width: size,
        height: size,
        background: color,
        top, left, right, bottom,
        willChange: "transform, opacity",
        transform: "translateZ(0)",
      }}
      animate={{
        y: [0, -50, 0],
        x: [0, 30, 0],
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── Text Reveal ─────────────────────────────────────── */
const containerReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const charReveal: any = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 12, stiffness: 100 },
  },
};

function RevealText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.span
      variants={containerReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`inline-block ${className}`}
    >
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={charReveal} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ─── Main Page ───────────────────────────────────────── */
export default function Home() {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, { damping: 15, stiffness: 100 });
  const heroOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.1], [1, 0.9]);
  const heroY = useTransform(smoothProgress, [0, 0.1], [0, 100]);
  
  const parallaxY1 = useTransform(smoothProgress, [0, 1], [0, -400]);
  const parallaxY2 = useTransform(smoothProgress, [0, 1], [0, 200]);

  return (
    <main className="min-h-screen relative overflow-x-hidden selection:bg-accent selection:text-bg bg-bg">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />
      </div>
      <GridCanvas />
      
      {/* ═══ AMBIENT ORBS ═══ */}
      <FloatingOrb size={600} color="rgba(124, 58, 237, 0.15)" delay={0} duration={10} top="-10%" left="-10%" />
      <FloatingOrb size={500} color="rgba(56, 189, 248, 0.1)" delay={2} duration={12} top="40%" right="-5%" />
      <FloatingOrb size={700} color="rgba(16, 185, 129, 0.08)" delay={1} duration={15} bottom="-10%" left="20%" />

      {/* ═══ HERO ═══ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="hero min-h-screen flex flex-col items-center justify-center px-6 py-32 relative text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 text-[11px] text-accent tracking-[0.3em] uppercase border border-accent/20 px-5 py-2 mb-10 bg-accent/[0.05] backdrop-blur-md relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-accent/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
          <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.8)] animate-pulse" />
          Initializing The Construct
        </motion.div>

        <h1 className="font-head font-900 text-[clamp(3rem,12vw,9rem)] leading-[0.85] tracking-tighter mb-8 uppercase relative">
          <RevealText text="Awaken" />
          <br />
          <span className="text-accent relative inline-block">
            <RevealText text="Sentinel." />
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 bottom-1 md:bottom-4 h-[4px] md:h-[8px] bg-accent/30 -z-10 shadow-[0_0_20px_rgba(var(--accent-rgb),0.5)]"
            />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[640px] text-muted-text text-lg md:text-2xl leading-relaxed mb-12 font-mono"
        >
          Enter the <span className="text-text font-bold">Nexus</span>. Orchestrate 10 mythological ecosystems simultaneously. The ultimate multi-agent sandbox protected by <span className="text-accent font-bold">Aegis</span> protocol.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 items-center mb-20 z-20 relative"
        >
          <MagneticWrapper>
            <a
              href="https://github.com/AddToKart/sentinel-v2#installation"
              target="_blank"
              className="w-full sm:w-auto bg-accent text-bg font-mono text-[14px] font-bold px-10 py-4 inline-flex items-center justify-center gap-3 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.4)] transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              <span className="relative z-10 tracking-widest uppercase">Jack In</span>
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-bg/30 to-transparent transition-all duration-500 group-hover:left-full" />
            </a>
          </MagneticWrapper>
          <MagneticWrapper>
            <a
              href="https://github.com/AddToKart/sentinel-v2"
              target="_blank"
              className="w-full sm:w-auto font-mono text-[14px] text-text border border-accent/20 px-10 py-4 inline-flex items-center justify-center gap-3 hover:bg-accent/10 hover:border-accent/50 transition-all duration-300 backdrop-blur-sm"
            >
              <Star className="w-5 h-5 text-accent" />
              <span className="tracking-widest uppercase">Star Network</span>
            </a>
          </MagneticWrapper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 45 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
          style={{ perspective: 1000 }}
          className="w-full max-w-[1000px] mx-auto z-10"
        >
          <div className="rounded-xl overflow-hidden border border-accent/20 shadow-[0_0_50px_rgba(var(--accent-rgb),0.1)]">
             <TypewriterTerminal />
          </div>
        </motion.div>
      </motion.section>

      <div className="relative z-20 border-y border-border-dim bg-bg/80 backdrop-blur-md">
        <Ticker />
      </div>

      <div className="relative z-20 bg-bg/50 backdrop-blur-xl">
        <StatsBar />
      </div>

      {/* ═══ THE CONSTRUCT (FEATURES) ═══ */}
      <section id="features" className="py-32 px-6 relative z-10 overflow-hidden">
        <motion.div style={{ y: parallaxY1, willChange: "transform", transform: "translateZ(0)" }} className="absolute right-0 top-0 text-[20vw] font-900 text-bg2 leading-none pointer-events-none opacity-50 select-none">
          CONSTRUCT
        </motion.div>
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-[12px] tracking-[0.3em] uppercase text-accent mb-4 font-mono font-bold flex items-center gap-2">
              <Shield className="w-4 h-4" /> Aegis Architecture
            </div>
            <h2 className="font-head font-900 text-5xl md:text-7xl tracking-tighter leading-none mb-6 uppercase">
              Forged in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">The Void.</span>
            </h2>
            <p className="text-muted-text max-w-[600px] text-xl leading-relaxed mb-16 font-mono">
              Sentinel transcends traditional bounds. Leveraging Tauri v2 and native Rust to command the 10 mythological ecosystems with zero latency.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <GlowingCard className="p-1 rounded-2xl">
              <FeatureGrid />
            </GlowingCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ NEXUS (WORKFLOW) ═══ */}
      <section className="py-32 px-6 relative z-10 bg-bg2/50 border-y border-border-dim backdrop-blur-sm overflow-hidden">
        <motion.div style={{ y: parallaxY2, willChange: "transform", transform: "translateZ(0)" }} className="absolute left-[-5%] top-[20%] text-[20vw] font-900 text-bg leading-none pointer-events-none opacity-50 select-none">
          NEXUS
        </motion.div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-20 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(var(--accent-rgb),0.2)]">
                <Network className="w-8 h-8 text-accent" />
              </div>
              <div className="text-[12px] tracking-[0.3em] uppercase text-accent mb-4 font-mono font-bold">
                Neural Pathways
              </div>
              <h2 className="font-head font-900 text-5xl md:text-7xl tracking-tighter leading-none uppercase">
                Synchronized <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Chaos</span>.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <WorkflowGrid />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ ARCHITECTURE ═══ */}
      <section id="architecture" className="py-32 px-6 relative z-10 overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20 items-center">
          <ScrollReveal variant="fade-left">
            <div className="text-[12px] tracking-[0.3em] uppercase text-accent mb-4 font-mono font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Core Systems
            </div>
            <h2 className="font-head font-900 text-5xl md:text-6xl tracking-tighter leading-none mb-8 uppercase">
              Bare Metal <br />
              <span className="text-accent/80">Supremacy.</span>
            </h2>
            <p className="text-muted-text text-xl leading-relaxed mb-10 font-mono">
              Bypass the bloat. 90% smaller payloads. 3x memory efficiency. Sentinel is optimized for the bleeding edge.
            </p>
            
            <GlowingCard className="p-6 rounded-xl space-y-6">
              <div className="flex justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-muted-text/80">
                <span>System Matrix</span>
                <span className="text-accent animate-pulse">V2.0.4 Online</span>
              </div>
              <div className="h-4 flex rounded-full overflow-hidden bg-bg border border-border-dim shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "50.6%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-amber-500/90 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                />
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "47.3%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-blue-500/90 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                />
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "2.1%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-accent/50"
                />
              </div>
              <div className="flex gap-6 text-[12px] font-mono text-muted-text/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
                  <span>50.6% Rust</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]" />
                  <span>47.3% TypeScript</span>
                </div>
              </div>
            </GlowingCard>
          </ScrollReveal>
          
          <ScrollReveal variant="fade-right" delay={100} className="relative">
            <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full" />
            <ArchitectureStack />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ ECOSYSTEMS (INTEGRATIONS) ═══ */}
      <section className="py-32 px-6 relative z-10 bg-bg2/40 border-y border-border-dim backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <div className="text-[12px] tracking-[0.3em] uppercase text-accent mb-4 font-mono font-bold">
                The 10 Realms
              </div>
              <h2 className="font-head font-900 text-5xl md:text-6xl tracking-tighter leading-none mb-6 uppercase">
                Mythological Entities.
              </h2>
              <p className="text-muted-text max-w-[600px] mx-auto text-lg leading-relaxed font-mono">
                Command Claude, Codex, Gemini, Qwen, and the vanguard models inside completely isolated sandbox constructs.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <IntegrationsGrid />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ INTERACTIVE TERMINAL ═══ */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="text-[12px] tracking-[0.3em] uppercase text-accent mb-4 font-mono font-bold">
                Simulation Chamber
              </div>
              <h2 className="font-head font-900 text-5xl md:text-6xl tracking-tighter leading-none mb-6 uppercase">
                Run The Grid.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <GlowingCard className="p-2 rounded-xl">
              <InteractiveTerminal />
            </GlowingCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ MOBILE TEASER ═══ */}
      <section id="mobile" className="py-32 px-6 relative z-10 overflow-hidden bg-bg/50">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-20 items-center">
          <ScrollReveal variant="scale-in" className="order-2 lg:order-1 relative">
             <div className="absolute inset-0 bg-purple-500/10 blur-[100px] rounded-full" />
             <MobileTeaser />
          </ScrollReveal>
          <ScrollReveal variant="fade-right" className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase border border-purple-500/30 px-4 py-2 mb-8 bg-purple-500/10 text-purple-400 font-bold font-mono">
              <Activity className="w-4 h-4" />
              Uplink Established
            </div>
            <h2 className="font-head font-900 text-5xl md:text-6xl tracking-tighter leading-none mb-8 uppercase">
              Command <br />
              <span className="text-purple-400">Anywhere.</span>
            </h2>
            <p className="text-muted-text text-xl leading-relaxed mb-10 font-mono">
              Monitor sub-routines, review diffs, and deploy kill-switches globally via encrypted remote telemetry.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                { icon: Zap, text: "Live session monitoring & kill-switch" },
                { icon: Terminal, text: "Remote terminal access (SSH-secured)" },
                { icon: Activity, text: "Real-time CPU/RAM telemetry alerts" },
                { icon: Code2, text: "Review & approve code on the go" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-muted-text group">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[15px] font-mono group-hover:text-text transition-colors duration-300">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="operator@nexus.com"
                className="flex-1 font-mono text-sm bg-bg2/50 backdrop-blur-sm border border-border-dim text-text px-5 py-4 focus:border-purple-400/50 outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
              />
              <button className="bg-purple-600 text-white font-mono text-[13px] tracking-widest uppercase font-bold px-8 py-4 hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 whitespace-nowrap">
                Init Beta
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ TESTIMONIALS & ROADMAP ═══ */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto space-y-32">
          <div>
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="text-[12px] tracking-[0.3em] uppercase text-accent mb-4 font-mono font-bold">Encrypted Logs</div>
                <h2 className="font-head font-900 text-4xl md:text-5xl tracking-tighter leading-none uppercase">Architect Data.</h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <TestimonialsGrid />
            </ScrollReveal>
          </div>

          <div>
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="text-[12px] tracking-[0.3em] uppercase text-accent mb-4 font-mono font-bold">Future Vectors</div>
                <h2 className="font-head font-900 text-4xl md:text-5xl tracking-tighter leading-none uppercase">Evolution Path.</h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <RoadmapGrid />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ GITHUB & FAQ & CTA ═══ */}
      <section className="py-32 px-6 relative z-10 bg-bg2/30 border-t border-border-dim backdrop-blur-xl">
        <div className="max-w-[1200px] mx-auto space-y-32">
          
          <div>
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="text-[12px] tracking-[0.3em] uppercase text-accent mb-4 font-mono font-bold">Live Uplink</div>
                <h2 className="font-head font-900 text-4xl md:text-5xl tracking-tighter leading-none uppercase">Network Activity.</h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <GitHubFeed />
            </ScrollReveal>
          </div>

          <div>
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="text-[12px] tracking-[0.3em] uppercase text-accent mb-4 font-mono font-bold">Knowledge Base</div>
                <h2 className="font-head font-900 text-4xl md:text-5xl tracking-tighter leading-none uppercase">Query The Void.</h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <FAQ />
            </ScrollReveal>
          </div>

          <Newsletter />

          <div className="text-center relative py-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
            <ScrollReveal>
              <div className="text-[12px] tracking-[0.3em] uppercase text-accent mb-6 font-mono font-bold">End of Transmission</div>
              <h2 className="font-head font-900 text-6xl md:text-8xl tracking-tighter leading-none mb-10 uppercase">
                Claim <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">The Future.</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center z-20 relative">
                <a
                  href="https://github.com/AddToKart/sentinel-v2#installation"
                  target="_blank"
                  className="w-full sm:w-auto bg-accent text-bg font-mono text-[14px] font-bold px-12 py-5 inline-flex items-center justify-center gap-3 relative overflow-hidden group hover:shadow-[0_0_40px_rgba(var(--accent-rgb),0.5)] transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  <span className="relative z-10 tracking-widest uppercase">Download Sentinel</span>
                  <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-bg/30 to-transparent transition-all duration-500 group-hover:left-full" />
                </a>
                <a
                  href="https://github.com/AddToKart/sentinel-v2"
                  target="_blank"
                  className="w-full sm:w-auto font-mono text-[14px] text-text border border-accent/20 px-12 py-5 inline-flex items-center justify-center gap-3 hover:bg-accent/10 hover:border-accent/50 transition-all duration-300 backdrop-blur-sm"
                >
                  <Github className="w-5 h-5" />
                  <span className="tracking-widest uppercase">Source Code</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
