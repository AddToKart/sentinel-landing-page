"use client";

import { useEffect } from "react";
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

export default function Home() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="min-h-screen relative">
      <GridCanvas />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-10 h-[54px] bg-bg/80 backdrop-blur-[18px] border-b border-white/5">
        <a href="#" className="nav-logo font-head font-800 text-[18px] tracking-tight text-text flex items-center gap-1.5">
          <div className="w-[7px] h-[7px] rounded-full bg-accent animate-nav-pulse" />
          SENTINEL
        </a>
        <ul className="hidden md:flex gap-10 list-none">
          <li>
            <a href="#features" className="text-muted-text text-[12px] tracking-wider hover:text-text transition-colors">
              Features
            </a>
          </li>
          <li>
            <a href="#architecture" className="text-muted-text text-[12px] tracking-wider hover:text-text transition-colors">
              Stack
            </a>
          </li>
          <li>
            <a href="#mobile" className="text-muted-text text-[12px] tracking-wider hover:text-text transition-colors">
              Mobile
            </a>
          </li>
          <li>
            <a href="#pricing" className="text-muted-text text-[12px] tracking-wider hover:text-text transition-colors">
              Pricing
            </a>
          </li>
          <li>
            <a href="#roadmap" className="text-muted-text text-[12px] tracking-wider hover:text-text transition-colors">
              Roadmap
            </a>
          </li>
        </ul>
        <div className="flex gap-2.5 items-center">
          <a
            href="https://github.com/AddToKart/sentinel-v2"
            target="_blank"
            className="text-muted-text font-mono text-[12px] border border-white/10 px-4 py-[7px] hover:text-text hover:border-white/25 transition-all"
          >
            GitHub ↗
          </a>
          <a
            href="https://github.com/AddToKart/sentinel-v2#installation"
            target="_blank"
            className="bg-accent text-bg font-mono text-[12px] font-600 px-[18px] py-2 hover:opacity-90 transition-all"
          >
            Download Free
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero min-h-screen flex flex-col items-center justify-center p-[7rem_2rem_3rem] relative text-center z-[1]">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(74,222,128,0.07)_0%,transparent_65%)] pointer-events-none animate-glow-breathe" />
        <div className="hero-badge inline-flex items-center gap-2 text-[11px] text-accent tracking-[0.12em] uppercase border border-accent/30 p-[5px_16px] mb-8 bg-accent/5 animate-fade-up">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
          Now in Active Development
        </div>
        <h1 className="font-head font-800 text-[clamp(3.2rem,7.5vw,6.5rem)] leading-[0.97] tracking-tighter mb-[1.6rem] animate-fade-up [animation-delay:0.1s]">
          Run AI agents
          <br />
          <em className="not-italic text-accent relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-accent after:opacity-40">
            in parallel.
          </em>
        </h1>
        <p className="max-w-[520px] text-muted-text text-[15px] leading-[1.75] mb-10 animate-fade-up [animation-delay:0.2s]">
          Sentinel is a multi-agent workspace for managing multiple AI coding sessions
          simultaneously — each in its own isolated sandbox or Git worktree.
        </p>
        <div className="flex gap-3 items-center mb-[4rem] animate-fade-up [animation-delay:0.3s]">
          <a
            href="https://github.com/AddToKart/sentinel-v2#installation"
            target="_blank"
            className="bg-accent text-bg font-mono text-[13px] font-600 px-[30px] py-[13px] inline-flex items-center gap-2 relative overflow-hidden group hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(74,222,128,0.25)] transition-all"
          >
            ↓ Download for Free
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 group-hover:left-full" />
          </a>
          <a
            href="https://github.com/AddToKart/sentinel-v2"
            target="_blank"
            className="font-mono text-[13px] text-text border border-white/10 px-[30px] py-[13px] hover:border-white/30 hover:bg-white/5 transition-all"
          >
            ★ Star on GitHub
          </a>
        </div>

        <div className="w-full max-w-[920px] mx-auto animate-fade-up [animation-delay:0.4s]">
          <TypewriterTerminal />
        </div>
      </section>

      <Ticker />
      <StatsBar />

      {/* FEATURES */}
      <section id="features" className="p-[7rem_2rem] relative z-[1]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-[11px] tracking-[0.15em] uppercase text-accent mb-4 reveal">
            Core capabilities
          </div>
          <h2 className="font-head font-800 text-[clamp(2rem,4vw,3.4rem)] tracking-tight leading-[1.08] mb-4 reveal [animation-delay:0.1s]">
            Everything you need
            <br />
            to orchestrate agents.
          </h2>
          <p className="text-muted-text max-w-[500px] text-[15px] leading-[1.75] mb-12 reveal [animation-delay:0.2s]">
            Built on Tauri v2 for native performance. React 19 frontend with a Rust
            backend. No Electron. No bloat.
          </p>
          <FeatureGrid />
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="p-[7rem_2rem] relative z-[1] bg-bg2 border-t border-b border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-[11px] tracking-[0.15em] uppercase text-accent mb-4 text-center reveal">
            How it works
          </div>
          <h2 className="font-head font-800 text-[clamp(2rem,4vw,3.4rem)] tracking-tight leading-[1.08] mb-12 text-center reveal [animation-delay:0.1s]">
            From repo to multi-agent
            <br />
            in four steps.
          </h2>
          <WorkflowGrid />
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section id="architecture" className="p-[7rem_2rem] relative z-[1]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-20 items-center">
          <div className="reveal-left">
            <div className="text-[11px] tracking-[0.15em] uppercase text-accent mb-4">
              Tech Stack
            </div>
            <h2 className="font-head font-800 text-[clamp(2rem,4vw,3.4rem)] tracking-tight leading-[1.08] mb-4">
              Native speed.
              <br />
              Web flexibility.
            </h2>
            <p className="text-muted-text max-w-[500px] text-[15px] leading-[1.75] mb-4">
              Built with Tauri v2 — a Rust-powered desktop framework dramatically lighter
              than Electron, with zero compromise on capability.
            </p>
            <p className="text-muted-text text-[13px] mt-4 leading-[2]">
              <span className="text-amber-400">████████████</span> 50.6% Rust
              <br />
              <span className="text-blue-400">███████████</span> 47.3% TypeScript
              <br />
              <span className="text-muted-text">█</span> 2.1% Other
            </p>
          </div>
          <div className="reveal-right">
            <ArchitectureStack />
          </div>
        </div>
      </section>

      {/* MOBILE */}
      <section id="mobile" className="p-[7rem_2rem] relative z-[1] bg-bg2 border-t border-b border-white/5 overflow-hidden">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-20 items-center">
          <div className="reveal-left">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase border border-purple-500/35 p-[5px_16px] mb-6 bg-purple-500/5 text-purple-400">
              📱 Mobile App — Coming Soon
            </div>
            <h2 className="font-head font-800 text-[clamp(2rem,4vw,3.4rem)] tracking-tight leading-[1.08] mb-4">
              Your agents,
              <br />
              <em className="not-italic text-purple-400">in your pocket.</em>
            </h2>
            <p className="text-muted-text max-w-[500px] text-[15px] leading-[1.75] mb-0">
              Monitor and remote-control every Sentinel session from your phone. Check on
              your agents while you're away from your desk.
            </p>
            <ul className="list-none my-6 flex flex-col gap-3">
              {[
                "Live session monitoring",
                "Remote terminal access",
                "Push notifications",
                "Apply & approve changes",
                "Quick actions",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-muted-text">
                  <span className="text-accent flex-shrink-0 mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex gap-2.5 mb-4">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 font-mono text-[13px] bg-bg3 border border-white/10 text-text p-[11px_16px] outline-none focus:border-accent/40 transition-colors"
              />
              <button className="bg-purple-500 text-white font-mono text-[12px] font-600 px-5 py-[11px] hover:opacity-85 transition-opacity whitespace-nowrap">
                Notify Me
              </button>
            </div>
            <div className="flex gap-2 mt-3.5 flex-wrap">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-text border border-white/5 p-[6px_12px] bg-bg3">
                iOS — Coming Soon
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-text border border-white/5 p-[6px_12px] bg-bg3">
                Android — Coming Soon
              </div>
            </div>
          </div>
          <div className="reveal-right">
            <MobileTeaser />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="p-[7rem_2rem] relative z-[1]">
        <div className="max-w-[1100px] mx-auto text-center">
          <div className="text-[11px] tracking-[0.15em] uppercase text-accent mb-4 reveal">
            Pricing
          </div>
          <h2 className="font-head font-800 text-[clamp(2rem,4vw,3.4rem)] tracking-tight leading-[1.08] mb-4 reveal [animation-delay:0.1s]">
            Start free. Scale when ready.
          </h2>
          <p className="text-muted-text max-w-[500px] mx-auto text-[15px] leading-[1.75] mb-12 reveal [animation-delay:0.2s]">
            Sentinel's core is free and open-source forever. Pro unlocks advanced team and
            collaboration features.
          </p>
          <div className="reveal [animation-delay:0.2s]">
            <PricingGrid />
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="p-[7rem_2rem] relative z-[1] bg-bg2 border-t border-b border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-[11px] tracking-[0.15em] uppercase text-accent mb-4 reveal">
            Roadmap
          </div>
          <h2 className="font-head font-800 text-[clamp(2rem,4vw,3.4rem)] tracking-tight leading-[1.08] mb-4 reveal [animation-delay:0.1s]">
            What's coming next.
          </h2>
          <p className="text-muted-text max-w-[500px] text-[15px] leading-[1.75] mb-12 reveal [animation-delay:0.2s]">
            A public roadmap for Sentinel's planned features across the next three
            quarters.
          </p>
          <RoadmapGrid />
        </div>
      </section>

      {/* CTA */}
      <section className="p-[8rem_2rem] relative z-[1] text-center bg-[radial-gradient(ellipse_60%_70%_at_50%_100%,rgba(74,222,128,0.06)_0%,transparent_70%)] border-t border-white/5">
        <div className="text-[11px] tracking-[0.15em] uppercase text-accent mb-4 reveal">
          Open Source
        </div>
        <h2 className="font-head font-800 text-[clamp(2rem,4vw,3.4rem)] tracking-tight leading-[1.08] mb-4 reveal [animation-delay:0.1s]">
          Built in public.
          <br />
          <em className="not-italic text-accent">Free forever.</em>
        </h2>
        <p className="text-muted-text max-w-[420px] mx-auto text-[15px] leading-[1.75] mb-10 reveal [animation-delay:0.2s]">
          Download Sentinel, star the repo, or contribute. MIT licensed and open to the
          community.
        </p>
        <div className="flex gap-3.5 justify-center flex-wrap reveal [animation-delay:0.3s]">
          <a
            href="https://github.com/AddToKart/sentinel-v2#installation"
            target="_blank"
            className="bg-accent text-bg font-mono text-[13px] font-600 px-[30px] py-[13px] inline-flex items-center gap-2 relative overflow-hidden group hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(74,222,128,0.25)] transition-all"
          >
            ↓ Download Free
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 group-hover:left-full" />
          </a>
          <a
            href="https://github.com/AddToKart/sentinel-v2"
            target="_blank"
            className="font-mono text-[13px] text-text border border-white/10 px-[30px] py-[13px] hover:border-white/30 hover:bg-white/5 transition-all"
          >
            ★ Star on GitHub
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 p-[2rem_2.5rem] flex flex-col md:flex-row justify-between items-center gap-6 text-muted-text text-[12px] relative z-[1]">
        <div>
          <strong className="font-head font-800 tracking-tight text-text text-[14px]">
            SENTINEL.
          </strong>
          <span className="ml-3.5">Manage AI agents. Master your workflow.</span>
        </div>
        <div className="flex gap-7">
          <a
            href="https://github.com/AddToKart/sentinel-v2"
            target="_blank"
            className="hover:text-text transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://github.com/AddToKart/sentinel-v2/blob/main/README.md"
            target="_blank"
            className="hover:text-text transition-colors"
          >
            Docs
          </a>
          <a
            href="https://github.com/AddToKart/sentinel-v2/blob/main/LICENSE"
            target="_blank"
            className="hover:text-text transition-colors"
          >
            MIT License
          </a>
        </div>
      </footer>
    </main>
  );
}
