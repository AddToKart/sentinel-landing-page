"use client";

export const PricingGrid = () => {
  return (
    <div className="pricing-grid max-w-[720px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04] border border-white/[0.04]">
      {/* Free */}
      <div className="price-card bg-bg p-10 transition-all duration-500 hover:bg-bg2/50 relative group">
        <div className="price-label text-[11px] tracking-[0.12em] uppercase text-muted-text mb-3">For individuals</div>
        <div className="price-name font-head font-800 text-[1.5rem] mb-6">Free</div>
        <div className="price-amount mb-1">
          <span className="price-num font-head text-[3.2rem] font-800 text-text leading-none">$0</span>
        </div>
        <div className="text-[11px] text-accent/80 tracking-[0.04em] mt-1.5 mb-6">Open-source · MIT · Forever free</div>
        <ul className="list-none mb-8">
          {[
            "Unlimited agent sessions",
            "Sandbox & Git worktree isolation",
            "Real-time process telemetry",
            "Monaco IDE mode",
            "Full terminal emulation",
            "File diff & apply workflow",
            { text: "Team session sharing", dim: true },
            { text: "Session recording & playback", dim: true },
            { text: "Mobile remote control", dim: true },
          ].map((feat, i) => (
            <li
              key={i}
              className={`text-[13px] py-2 border-b border-white/[0.04] flex items-center gap-2.5 ${
                typeof feat === "object" && feat.dim ? "opacity-35" : "text-muted-text"
              }`}
            >
              <span className={`text-[11px] ${typeof feat === "object" && feat.dim ? "text-white/10" : "text-accent"}`}>
                {typeof feat === "object" && feat.dim ? "—" : "✓"}
              </span>
              {typeof feat === "string" ? feat : feat.text}
            </li>
          ))}
        </ul>
        <a
          href="https://github.com/AddToKart/sentinel-v2#installation"
          target="_blank"
          className="block text-center p-3 font-mono text-[13px] border border-white/[0.08] text-text hover:border-white/20 hover:bg-white/[0.02] transition-all duration-300"
        >
          ↓ Download for Free
        </a>
      </div>

      {/* Pro */}
      <div className="price-card bg-bg2 p-10 relative group overflow-hidden">
        {/* Animated top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 bg-[length:200%_100%] animate-shimmer" />

        <div className="inline-block text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 bg-accent/[0.06] text-accent border border-accent/20 mb-3 font-bold">
          Coming Soon
        </div>
        <div className="price-label text-[11px] tracking-[0.12em] uppercase text-muted-text mb-3">For teams</div>
        <div className="price-name font-head font-800 text-[1.5rem] mb-6">Pro</div>
        <div className="price-amount mb-1">
          <span className="price-num font-head text-[3.2rem] font-800 text-text leading-none">$19</span>
          <span className="text-muted-text text-[13px]"> / seat / mo</span>
        </div>
        <div className="text-[11px] text-muted-text tracking-[0.04em] mt-1.5 mb-6">Billed annually · Cancel anytime</div>
        <ul className="list-none mb-8">
          {[
            "Everything in Free",
            "Team session sharing",
            "Session recording & playback",
            "Remote environment support",
            "Agent collaboration",
            "Workspace snapshots",
            "Mobile app remote control",
            "Plugin system access",
            "Priority support",
          ].map((feat, i) => (
            <li key={i} className="text-[13px] text-muted-text py-2 border-b border-white/[0.04] flex items-center gap-2.5">
              <span className="text-accent text-[11px]">✓</span>
              {feat}
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="block text-center p-3 font-mono text-[13px] font-600 bg-accent text-bg relative overflow-hidden group/btn hover:shadow-[0_0_20px_rgba(74,222,128,0.15)] transition-shadow duration-300"
        >
          <span className="relative z-10">Join Waitlist →</span>
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-all duration-500 group-hover/btn:left-full" />
        </a>
      </div>
    </div>
  );
};
