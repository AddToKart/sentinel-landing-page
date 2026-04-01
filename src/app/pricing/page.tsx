"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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
  Bug,
  FileCode,
  Network,
  Copy,
  Split,
  Trash2,
  Gauge,
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
  accentDim: string;
  icon: React.ElementType;
  popular?: boolean;
  features: string[];
  ecosystems: string[];
  cta: string;
}

interface FeatureRow {
  feature: string;
  icon: React.ElementType;
  values: (boolean | string | number)[];
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
    accentDim: "rgba(74,222,128,0.08)",
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
    accentDim: "rgba(245,158,11,0.08)",
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
    accentDim: "rgba(139,92,246,0.08)",
    icon: Shield,
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
    accentDim: "rgba(6,182,212,0.08)",
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
    accentDim: "rgba(244,114,182,0.08)",
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
const ecosystemAccess: {
  id: string;
  name: string;
  tagline: string;
  icon: React.ElementType;
  color: string;
}[] = [
  {
    id: "sentinel",
    name: "Sentinel",
    tagline: "Agent Workspace",
    icon: Terminal,
    color: "#4ade80",
  },
  {
    id: "aegis",
    name: "Aegis",
    tagline: "Academic Intelligence",
    icon: MessageSquare,
    color: "#f59e0b",
  },
  {
    id: "nexus",
    name: "Nexus",
    tagline: "AI Infrastructure",
    icon: Server,
    color: "#8b5cf6",
  },
  {
    id: "forge",
    name: "Forge",
    tagline: "DevOps Automation",
    icon: Rocket,
    color: "#f97316",
  },
  {
    id: "argus",
    name: "Argus",
    tagline: "Code Review",
    icon: Eye,
    color: "#06b6d4",
  },
  {
    id: "oracle",
    name: "Oracle",
    tagline: "Codebase Intelligence",
    icon: Search,
    color: "#a78bfa",
  },
  {
    id: "proteus",
    name: "Proteus",
    tagline: "Refactoring",
    icon: Repeat,
    color: "#34d399",
  },
  {
    id: "aletheia",
    name: "Aletheia",
    tagline: "Testing & QA",
    icon: CheckCircle,
    color: "#f472b6",
  },
  {
    id: "iatros",
    name: "Iatros",
    tagline: "Debugging",
    icon: HeartPulse,
    color: "#fb923c",
  },
  {
    id: "janus",
    name: "Janus",
    tagline: "API & Integration",
    icon: Globe,
    color: "#60a5fa",
  },
];

/* ─── Feature Comparison Data ───────────────────── */
const featureRows: FeatureRow[] = [
  {
    feature: "Parallel Agents",
    icon: Zap,
    values: ["2", "5", "15", "50", "Unlimited"],
  },
  {
    feature: "Sandbox Modes",
    icon: Layers,
    values: ["Copy", "Copy + Worktree", "All", "All", "All + Custom"],
  },
  {
    feature: "Team Seats",
    icon: Users,
    values: [1, 1, 3, 25, "Unlimited"],
  },
  {
    feature: "Mobile Monitoring",
    icon: Monitor,
    values: [false, false, true, true, true],
  },
  {
    feature: "Cloud Sync",
    icon: Cloud,
    values: [false, false, true, true, true],
  },
  {
    feature: "API Access",
    icon: Code2,
    values: [false, false, true, true, true],
  },
  {
    feature: "Priority Support",
    icon: MessageSquare,
    values: [false, false, false, true, true],
  },
  {
    feature: "SSO / SAML",
    icon: Shield,
    values: [false, false, false, true, true],
  },
  {
    feature: "Audit Logs",
    icon: ListChecks,
    values: [false, false, false, true, true],
  },
  {
    feature: "Custom Plugins",
    icon: Boxes,
    values: [false, false, false, false, true],
  },
  {
    feature: "SLA",
    icon: Activity,
    values: [false, false, false, "99.5%", "99.99%"],
  },
];

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

/* ─── Plan Card ─────────────────────────────────── */
function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const Icon = plan.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col h-full bg-bg2 border rounded-2xl overflow-hidden transition-all duration-300 ${
        plan.popular
          ? "border-accent/30 shadow-[0_0_40px_-10px_rgba(74,222,128,0.15)]"
          : "border-border-dim hover:border-border-dim2"
      }`}
      style={{
        borderColor: plan.popular ? undefined : undefined,
      }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[9px] font-mono uppercase tracking-[0.15em] px-2.5 py-1 border border-accent/25 text-accent bg-accent/[0.06] rounded-full">
            Most Popular
          </span>
        </div>
      )}

      {/* Accent top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${plan.accentColor}60, transparent)`,
        }}
      />

      <div className="p-7 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div
            className="w-10 h-10 flex items-center justify-center border rounded-xl mb-4"
            style={{
              borderColor: `${plan.accentColor}20`,
              backgroundColor: `${plan.accentColor}08`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: plan.accentColor }} />
          </div>
          <h3 className="font-head font-800 text-2xl tracking-tight text-text">
            {plan.name}
          </h3>
          <p
            className="text-[11px] font-mono uppercase tracking-[0.15em] mt-1"
            style={{ color: plan.accentColor }}
          >
            {plan.tagline}
          </p>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="font-head font-800 text-4xl tracking-tight text-text">
              ${plan.price}
            </span>
            <span className="text-muted-text/60 text-sm">/mo</span>
          </div>
          <p className="text-muted-text text-[13px] leading-relaxed mt-2">
            {plan.description}
          </p>
        </div>

        {/* Features */}
        <ul className="space-y-2.5 mb-8 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[13px] text-muted-text">
              <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: plan.accentColor }} />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#"
          className={`w-full text-center font-mono text-[12px] font-bold px-6 py-3 rounded-xl transition-all duration-200 ${
            plan.popular
              ? "bg-accent text-bg hover:brightness-110"
              : "bg-bg3 border border-border-dim text-text hover:bg-bg2 hover:border-border-dim2"
          }`}
        >
          {plan.cta}
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Ecosystem Access Table ────────────────────── */
function EcosystemAccessTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-border-dim">
            <th className="text-left py-4 px-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-text/60">
              Ecosystem
            </th>
            {plans.map((p) => (
              <th
                key={p.id}
                className="text-center py-4 px-4 font-mono text-[10px] uppercase tracking-[0.15em]"
                style={{ color: p.accentColor }}
              >
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ecosystemAccess.map((eco) => {
            const Icon = eco.icon;
            return (
              <tr
                key={eco.id}
                className="border-b border-border-dim/50 hover:bg-bg2/50 transition-colors"
              >
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 flex items-center justify-center border rounded-lg"
                      style={{
                        borderColor: `${eco.color}20`,
                        backgroundColor: `${eco.color}08`,
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: eco.color }} />
                    </div>
                    <div>
                      <div className="font-mono text-[13px] font-bold text-text">
                        {eco.name}
                      </div>
                      <div className="text-[10px] text-muted-text/50">
                        {eco.tagline}
                      </div>
                    </div>
                  </div>
                </td>
                {plans.map((p) => {
                  const hasAccess = p.ecosystems.includes(eco.id);
                  return (
                    <td key={p.id} className="text-center py-3.5 px-4">
                      {hasAccess ? (
                        <Check className="w-4 h-4 mx-auto" style={{ color: eco.color }} />
                      ) : (
                        <X className="w-4 h-4 mx-auto text-muted-text/20" />
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Feature Comparison Table ──────────────────── */
function FeatureComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-border-dim">
            <th className="text-left py-4 px-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-text/60">
              Feature
            </th>
            {plans.map((p) => (
              <th
                key={p.id}
                className="text-center py-4 px-4 font-mono text-[10px] uppercase tracking-[0.15em]"
                style={{ color: p.accentColor }}
              >
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureRows.map((row) => {
            const Icon = row.icon;
            return (
              <tr
                key={row.feature}
                className="border-b border-border-dim/50 hover:bg-bg2/50 transition-colors"
              >
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-muted-text/40" />
                    <span className="text-text font-medium">{row.feature}</span>
                  </div>
                </td>
                {row.values.map((val, i) => (
                  <td key={i} className="text-center py-3.5 px-4">
                    {typeof val === "boolean" ? (
                      val ? (
                        <Check className="w-4 h-4 mx-auto text-accent" />
                      ) : (
                        <X className="w-4 h-4 mx-auto text-muted-text/20" />
                      )
                    ) : (
                      <span className="font-mono text-[12px] text-muted-text">
                        {val}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────── */
export default function PricingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
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
            <Crown className="w-3.5 h-3.5" />
            Pricing
          </div>
        </ScrollReveal>

        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <ScrollReveal delay={80}>
            <h1 className="font-head font-800 text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.92] tracking-tighter mb-6">
              Choose your{" "}
              <span className="text-accent italic relative">
                tier
                <span className="absolute left-0 bottom-1.5 h-[3px] md:h-[5px] w-full bg-accent/15 -z-10" />
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="max-w-[620px] mx-auto text-muted-text text-lg md:text-xl leading-relaxed mb-6">
              Five tiers. Ten ecosystems. One platform. Start small, scale without limits.
            </p>
          </ScrollReveal>
        </motion.div>

        <ScrollReveal delay={220}>
          <div className="flex flex-wrap justify-center gap-4 text-[11px] font-mono uppercase tracking-[0.15em] text-muted-text/60">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Free Core
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              $5 – $300/mo
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              10 Ecosystems
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              Cancel Anytime
            </span>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ PLAN CARDS ═══ */}
      <section className="py-20 px-6 relative z-[1]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ECOSYSTEM ACCESS ═══ */}
      <section className="py-28 px-6 relative z-[1] bg-bg2 border-y border-border-dim">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
                Ecosystem Access
              </div>
              <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
                What you get.
              </h2>
              <p className="text-muted-text max-w-[480px] mx-auto text-[15px] leading-relaxed">
                Each tier unlocks a broader slice of the platform. Higher tiers include everything below.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="bg-bg border border-border-dim rounded-xl overflow-hidden">
              <EcosystemAccessTable />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ FEATURE COMPARISON ═══ */}
      <section className="py-28 px-6 relative z-[1]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-4 font-bold">
                Feature Comparison
              </div>
              <h2 className="font-head font-800 text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
                Side by side.
              </h2>
              <p className="text-muted-text max-w-[480px] mx-auto text-[15px] leading-relaxed">
                Every feature, every tier. No hidden costs, no surprises.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="bg-bg2 border border-border-dim rounded-xl overflow-hidden">
              <FeatureComparisonTable />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-28 px-6 relative z-[1] text-center">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />
        <ScrollReveal>
          <h2 className="font-head font-800 text-4xl md:text-6xl tracking-tighter leading-none mb-6">
            Start building today.
          </h2>
          <p className="text-muted-text max-w-[440px] mx-auto text-lg leading-relaxed mb-10">
            Sentinel Core is free and open source. Upgrade when you&apos;re ready to unlock the full platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="https://github.com/AddToKart/sentinel-v2#installation"
              target="_blank"
              className="w-full sm:w-auto bg-accent text-bg font-mono text-sm font-bold px-9 py-4 inline-flex items-center justify-center gap-2 hover:brightness-110 transition-all duration-200"
            >
              <Github className="w-4 h-4" />
              Download Free
            </a>
            <Link
              href="/"
              className="w-full sm:w-auto font-mono text-sm text-text border border-border-dim px-9 py-4 inline-flex items-center justify-center gap-2 hover:bg-bg3 hover:border-border-dim2 transition-all duration-200"
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
              href="/ecosystem"
              className="hover:text-accent/60 transition-colors duration-150 flex items-center gap-1.5"
            >
              <Boxes className="w-3 h-3" /> Ecosystem
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
