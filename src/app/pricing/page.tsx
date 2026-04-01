"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GridCanvas } from "@/components/GridCanvas";
import {
  Check,
  X,
  ArrowLeft,
  Github,
  Zap,
  Shield,
  Crown,
  Users,
  Code2,
  Boxes,
  Terminal,
  Cloud,
  Eye,
  Search,
  Repeat,
  CheckCircle,
  HeartPulse,
  Globe,
  Rocket,
  Server,
  MessageSquare,
  Layers,
  ListChecks,
  Monitor,
  Activity,
  Network,
} from "lucide-react";
import Link from "next/link";

/* ─── Types ─────────────────────────────────────── */
interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  description: string;
  accentColor: string;
  icon: React.ElementType;
  popular?: boolean;
  features: string[];
  ecosystems: string[];
  cta: string;
}

/* ─── Plan Data ─────────────────────────────────── */
const plans: Plan[] = [
  {
    id: "scout",
    name: "Scout",
    tagline: "The Explorer",
    price: 5,
    description: "Just enough to get started. Run agents, explore the platform.",
    accentColor: "#4ade80",
    icon: Zap,
    features: [
      "2 parallel agents",
      "Copy-only sandboxes",
      "1 team seat",
      "Community support",
      "Core Sentinel access",
    ],
    ecosystems: ["sentinel"],
    cta: "Start Exploring",
  },
  {
    id: "sentry",
    name: "Sentry",
    tagline: "The Watcher",
    price: 15,
    description: "Your reliable daily driver. Academic tools unlocked.",
    accentColor: "#f59e0b",
    icon: Shield,
    features: [
      "5 parallel agents",
      "Copy + Worktree sandboxes",
      "1 team seat",
      "Community support",
      "Sentinel + Aegis access",
    ],
    ecosystems: ["sentinel", "aegis"],
    cta: "Stand Guard",
  },
  {
    id: "warden",
    name: "Warden",
    tagline: "The Keeper",
    price: 45,
    description: "Full control for serious developers. Infra + DevOps included.",
    accentColor: "#8b5cf6",
    icon: Network,
    features: [
      "15 parallel agents",
      "All sandbox modes",
      "3 team seats",
      "Mobile monitoring",
      "Cloud sync",
      "API access",
      "Priority email support",
    ],
    ecosystems: ["sentinel", "aegis", "nexus", "forge"],
    cta: "Take Control",
  },
  {
    id: "archon",
    name: "Archon",
    tagline: "The Ruler",
    price: 120,
    description: "Team-scale power. Review, intelligence, and refactoring agents.",
    accentColor: "#06b6d4",
    icon: Crown,
    popular: true,
    features: [
      "50 parallel agents",
      "All sandbox modes",
      "25 team seats",
      "Mobile monitoring",
      "Cloud sync",
      "API access",
      "Priority support",
      "SSO / SAML",
      "Audit logs",
    ],
    ecosystems: [
      "sentinel",
      "aegis",
      "nexus",
      "forge",
      "argus",
      "oracle",
      "proteus",
    ],
    cta: "Rule Your Stack",
  },
  {
    id: "sovereign",
    name: "Sovereign",
    tagline: "The Crown",
    price: 300,
    description: "Everything. No gates. No limits. The full platform.",
    accentColor: "#f472b6",
    icon: Crown,
    features: [
      "Unlimited parallel agents",
      "All sandbox modes + Custom",
      "Unlimited team seats",
      "Mobile monitoring",
      "Cloud sync",
      "API access",
      "Dedicated account manager",
      "SSO / SAML",
      "Audit logs",
      "Custom plugins",
      "99.99% SLA",
    ],
    ecosystems: [
      "sentinel",
      "aegis",
      "nexus",
      "forge",
      "argus",
      "oracle",
      "proteus",
      "aletheia",
      "iatros",
      "janus",
    ],
    cta: "Claim the Throne",
  },
];

/* ─── Ecosystem Access Data ─────────────────────── */
const ecosystemAccess = [
  { id: "sentinel", name: "Sentinel", tagline: "Agent Workspace", icon: Terminal, color: "#4ade80" },
  { id: "aegis", name: "Aegis", tagline: "Academic Intelligence", icon: MessageSquare, color: "#f59e0b" },
  { id: "nexus", name: "Nexus", tagline: "AI Infrastructure", icon: Server, color: "#8b5cf6" },
  { id: "forge", name: "Forge", tagline: "DevOps Automation", icon: Rocket, color: "#f97316" },
  { id: "argus", name: "Argus", tagline: "Code Review", icon: Eye, color: "#06b6d4" },
  { id: "oracle", name: "Oracle", tagline: "Codebase Intelligence", icon: Search, color: "#a78bfa" },
  { id: "proteus", name: "Proteus", tagline: "Refactoring", icon: Repeat, color: "#34d399" },
  { id: "aletheia", name: "Aletheia", tagline: "Testing & QA", icon: CheckCircle, color: "#f472b6" },
  { id: "iatros", name: "Iatros", tagline: "Debugging", icon: HeartPulse, color: "#fb923c" },
  { id: "janus", name: "Janus", tagline: "API & Integration", icon: Globe, color: "#60a5fa" },
];

/* ─── Feature Comparison Data ───────────────────── */
const featureRows = [
  { feature: "Parallel Agents", icon: Zap, values: ["2", "5", "15", "50", "Unlimited"] },
  { feature: "Sandbox Modes", icon: Layers, values: ["Copy", "Copy + Worktree", "All", "All", "All + Custom"] },
  { feature: "Team Seats", icon: Users, values: [1, 1, 3, 25, "Unlimited"] },
  { feature: "Mobile Monitoring", icon: Monitor, values: [false, false, true, true, true] },
  { feature: "Cloud Sync", icon: Cloud, values: [false, false, true, true, true] },
  { feature: "API Access", icon: Code2, values: [false, false, true, true, true] },
  { feature: "Priority Support", icon: MessageSquare, values: [false, false, false, true, true] },
  { feature: "SSO / SAML", icon: Shield, values: [false, false, false, true, true] },
  { feature: "Audit Logs", icon: ListChecks, values: [false, false, false, true, true] },
  { feature: "Custom Plugins", icon: Boxes, values: [false, false, false, false, true] },
  { feature: "SLA", icon: Activity, values: [false, false, false, "99.5%", "99.99%"] },
];

/* ─── Spotlight Card Component ──────────────────── */
function SpotlightCard({ 
  children, 
  className = "", 
  accentColor, 
  popular 
}: { 
  children: React.ReactNode; 
  className?: string; 
  accentColor: string;
  popular?: boolean;
}) {
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

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border transition-all duration-500 bg-bg2 ${
        popular ? "border-transparent scale-[1.02] shadow-2xl z-10" : "border-white/[0.06] hover:border-white/[0.15]"
      } ${className}`}
      style={{
        boxShadow: popular ? `0 0 50px -15px ${accentColor}50` : undefined,
      }}
    >
      {/* Animated gradient border for popular plan */}
      {popular && (
        <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%]"
            style={{
              background: `conic-gradient(from 0deg, transparent 0 340deg, ${accentColor} 360deg)`,
            }}
          />
          <div className="absolute inset-[2px] rounded-[22px] bg-bg2 z-10" />
        </div>
      )}

      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${accentColor}15, transparent 40%)`,
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-20 h-full flex flex-col p-8">
        {children}
      </div>
    </div>
  );
}



/* ─── Main Page ─────────────────────────────────── */
export default function PricingPage() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen relative selection:bg-accent selection:text-bg">
      <GridCanvas />
      {/* ═══ HERO ═══ */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="pt-40 pb-20 px-6 relative z-[1] text-center overflow-hidden"
      >
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/[0.04] rounded-full blur-[150px] pointer-events-none" />

        <ScrollReveal>
          <div className="inline-flex items-center gap-2 text-[11px] text-accent/80 tracking-[0.2em] uppercase border border-accent/15 px-4 py-1.5 mb-8 bg-accent/[0.03] rounded-full">
            <Crown className="w-3 h-3" />
            Pricing Plans
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h1 className="font-head font-800 text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-tighter mb-6">
            Scale without{" "}
            <span className="text-accent italic relative">
              friction.
              <span className="absolute left-0 bottom-1.5 h-[3px] md:h-[6px] w-full bg-accent/20 -z-10" />
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <p className="max-w-[620px] mx-auto text-muted-text text-lg md:text-xl leading-relaxed mb-12">
            From solo explorers to global enterprises. Predictable pricing for the ultimate AI orchestration platform.
          </p>
        </ScrollReveal>
      </motion.section>

      {/* ═══ PRICING CARDS ═══ */}
      <section className="py-10 px-6 relative z-[10]">
        <div className="max-w-[1400px] mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 xl:gap-4 items-center">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <div 
                  key={plan.id}
                  onMouseEnter={() => setHoveredPlan(plan.id)}
                  onMouseLeave={() => setHoveredPlan(null)}
                  className={`transition-all duration-300 ${hoveredPlan && hoveredPlan !== plan.id ? 'opacity-40 scale-95' : 'opacity-100 scale-100'}`}
                >
                  <ScrollReveal delay={i * 100} className="h-full">
                    <SpotlightCard 
                      accentColor={plan.accentColor} 
                      popular={plan.popular}
                      className="h-full min-h-[520px]"
                    >
                      {plan.popular && (
                        <div 
                          className="absolute top-4 right-4 text-[9px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-bold"
                          style={{ color: plan.accentColor, backgroundColor: `${plan.accentColor}15`, border: `1px solid ${plan.accentColor}30` }}
                        >
                          Most Popular
                        </div>
                      )}
                      
                      <div className="mb-6 flex-1">
                        <div 
                          className="w-12 h-12 flex items-center justify-center rounded-2xl mb-5"
                          style={{ backgroundColor: `${plan.accentColor}10`, border: `1px solid ${plan.accentColor}20` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: plan.accentColor }} />
                        </div>
                        <h3 className="font-head font-800 text-3xl tracking-tight text-text mb-1">
                          {plan.name}
                        </h3>
                        <p className="text-[11px] font-mono uppercase tracking-[0.15em]" style={{ color: plan.accentColor }}>
                          {plan.tagline}
                        </p>

                        <div className="mt-8 mb-6">
                          <div className="flex items-baseline gap-1">
                            <span className="font-head font-800 text-5xl tracking-tighter text-text">
                              ${plan.price}
                            </span>
                            <span className="text-muted-text/50 font-mono text-sm">/mo</span>
                          </div>
                          <p className="text-muted-text text-[14px] leading-relaxed mt-3">
                            {plan.description}
                          </p>
                        </div>

                        <div className="space-y-3.5 mt-8">
                          {plan.features.map((f, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-[13px] text-text/80">
                              <div className="mt-0.5 shrink-0 rounded-full p-0.5" style={{ backgroundColor: `${plan.accentColor}15` }}>
                                <Check className="w-3 h-3" style={{ color: plan.accentColor }} />
                              </div>
                              <span className="leading-snug">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button 
                        className={`w-full mt-8 py-4 px-6 rounded-xl font-mono text-[13px] font-bold uppercase tracking-[0.1em] transition-all duration-300 relative overflow-hidden group`}
                        style={{
                          backgroundColor: plan.popular ? plan.accentColor : `${plan.accentColor}08`,
                          color: plan.popular ? "#000" : plan.accentColor,
                          border: plan.popular ? "none" : `1px solid ${plan.accentColor}30`,
                        }}
                      >
                        <span className="relative z-10">{plan.cta}</span>
                        {plan.popular && (
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        )}
                        {!plan.popular && (
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                            style={{ backgroundColor: plan.accentColor }} 
                          />
                        )}
                      </button>
                    </SpotlightCard>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ INTERACTIVE ECOSYSTEM MAP ═══ */}
      <section className="py-32 px-6 relative z-[1] bg-bg2/50 border-y border-white/[0.04] mt-20">
        <div className="max-w-[1200px] mx-auto text-center mb-16">
          <ScrollReveal>
            <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
              Ecosystem Unlocks
            </h2>
            <p className="text-muted-text text-lg max-w-[600px] mx-auto">
              Hover over a plan above to see which ecosystems it unlocks, or explore the full platform capabilities below.
            </p>
          </ScrollReveal>
        </div>

        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ecosystemAccess.map((eco, i) => {
              const Icon = eco.icon;
              const isActive = hoveredPlan 
                ? plans.find(p => p.id === hoveredPlan)?.ecosystems.includes(eco.id)
                : true;

              return (
                <ScrollReveal key={eco.id} delay={i * 50} className="h-full">
                  <div 
                    className={`p-6 rounded-2xl border transition-all duration-500 h-full flex flex-col items-center text-center ${
                      isActive 
                        ? "bg-bg shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)] border-white/[0.08]" 
                        : "bg-bg/40 border-white/[0.02] opacity-30 grayscale"
                    }`}
                    style={{
                      boxShadow: isActive && hoveredPlan ? `0 0 30px -10px ${eco.color}40` : undefined,
                      borderColor: isActive && hoveredPlan ? `${eco.color}40` : undefined,
                    }}
                  >
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-500"
                      style={{
                        backgroundColor: isActive ? `${eco.color}15` : "rgba(255,255,255,0.05)",
                      }}
                    >
                      <Icon className="w-6 h-6 transition-all duration-500" style={{ color: isActive ? eco.color : "#666" }} />
                    </div>
                    <h4 className={`font-head font-800 text-lg transition-colors duration-500 ${isActive ? "text-text" : "text-muted-text"}`}>
                      {eco.name}
                    </h4>
                    <p className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-text mt-2">
                      {eco.tagline}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ DETAILED COMPARISON MATRIX ═══ */}
      <section className="py-32 px-6 relative z-[1]">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <h2 className="font-head font-800 text-4xl tracking-tighter mb-4">
                Deep Dive Comparison
              </h2>
              <p className="text-muted-text text-lg">Every feature compared side-by-side.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="rounded-3xl border border-white/[0.06] bg-bg2 overflow-x-auto shadow-2xl">
              <div className="min-w-[900px]">
                {/* Header Row */}
                <div className="grid grid-cols-[2.5fr_1fr_1fr_1fr_1fr_1fr] border-b border-white/[0.08] bg-bg/50 backdrop-blur-md sticky top-0 z-20">
                  <div className="p-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-text/50 flex items-center">
                    Feature
                  </div>
                  {plans.map(plan => (
                    <div key={plan.id} className="p-6 text-center border-l border-white/[0.04]">
                      <div className="font-head font-800 text-xl" style={{ color: plan.accentColor }}>{plan.name}</div>
                      <div className="text-text font-mono font-bold mt-2">${plan.price}</div>
                    </div>
                  ))}
                </div>

                {/* Feature Rows */}
                <div className="divide-y divide-white/[0.04]">
                  {featureRows.map((row, idx) => {
                    const Icon = row.icon;
                    return (
                      <div key={idx} className="grid grid-cols-[2.5fr_1fr_1fr_1fr_1fr_1fr] hover:bg-white/[0.02] transition-colors duration-200">
                        <div className="p-5 px-6 flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-muted-text" />
                          </div>
                          <span className="text-[14px] text-text/90 font-medium">{row.feature}</span>
                        </div>
                        
                        {row.values.map((val, i) => (
                          <div key={i} className="p-5 border-l border-white/[0.04] flex items-center justify-center">
                            {typeof val === "boolean" ? (
                              val ? (
                                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                                  <Check className="w-3.5 h-3.5 text-accent" />
                                </div>
                              ) : (
                                <X className="w-4 h-4 text-muted-text/20" />
                              )
                            ) : (
                              <span className="font-mono text-[13px] text-muted-text">
                                {val}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-32 px-6 relative z-[1] text-center overflow-hidden border-t border-white/[0.04]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <ScrollReveal>
          <h2 className="font-head font-800 text-5xl md:text-7xl tracking-tighter leading-none mb-8">
            Ready to <span className="text-accent italic">deploy?</span>
          </h2>
          <p className="text-muted-text max-w-[480px] mx-auto text-lg leading-relaxed mb-10">
            Start for free. No credit card required. Upgrade when your team is ready to scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://github.com/AddToKart/sentinel-v2#installation"
              target="_blank"
              className="w-full sm:w-auto bg-accent text-bg font-mono text-[14px] font-bold px-10 py-4 rounded-xl hover:brightness-110 hover:scale-105 transition-all duration-300"
            >
              Deploy Sentinel Core
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ FOOTER ═══ */}
      
    </main>
  );
}
