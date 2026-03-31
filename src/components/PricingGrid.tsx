export const PricingGrid = () => {
  return (
    <div className="pricing-grid max-w-[720px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/5 border border-white/5">
      <div className="price-card bg-bg p-[2.5rem_2.25rem] transition-colors hover:bg-bg2">
        <div className="price-label text-[11px] tracking-[0.12em] uppercase text-muted-text mb-3">For individuals</div>
        <div className="price-name font-head font-800 text-[1.5rem] mb-6">Free</div>
        <div className="price-amount mb-1">
          <span className="price-num font-head text-[3.2rem] font-800 text-text leading-none">$0</span>
        </div>
        <div className="price-free-note text-[11px] text-accent tracking-[0.06em] mt-1.5 mb-6">Open-source · MIT License · Forever free</div>
        <ul className="price-features list-none mb-8">
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
              className={`text-[13px] py-2 border-b border-white/5 flex items-center gap-2.5 ${
                typeof feat === "object" && feat.dim ? "opacity-40" : "text-muted-text"
              }`}
            >
              <span className={typeof feat === "object" && feat.dim ? "text-white/10" : "text-accent font-600"}>
                {typeof feat === "object" && feat.dim ? "—" : "✓"}
              </span>
              {typeof feat === "string" ? feat : feat.text}
            </li>
          ))}
        </ul>
        <a
          href="https://github.com/AddToKart/sentinel-v2#installation"
          target="_blank"
          className="price-btn-free block text-center p-3 font-mono text-[13px] border border-white/10 text-text hover:border-white/30 hover:bg-white/5 transition-all"
        >
          ↓ Download for Free
        </a>
      </div>

      <div className="price-card bg-bg2 p-[2.5rem_2.25rem] border-t-2 border-accent relative">
        <div className="pro-badge inline-block text-[10px] tracking-[0.1em] uppercase p-[3px_10px] bg-accent/10 text-accent border border-accent/35 mb-3">
          Coming Soon
        </div>
        <div className="price-label text-[11px] tracking-[0.12em] uppercase text-muted-text mb-3">For teams</div>
        <div className="price-name font-head font-800 text-[1.5rem] mb-6">Pro</div>
        <div className="price-amount mb-1">
          <span className="price-num font-head text-[3.2rem] font-800 text-text leading-none">$19</span>
          <span className="price-period text-muted-text text-[13px]"> / seat / mo</span>
        </div>
        <div className="price-free-note text-[11px] text-muted-text tracking-[0.06em] mt-1.5 mb-6">Billed annually · Cancel anytime</div>
        <ul className="price-features list-none mb-8">
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
            <li
              key={i}
              className="text-[13px] text-muted-text py-2 border-b border-white/5 flex items-center gap-2.5"
            >
              <span className="text-accent font-600">✓</span>
              {feat}
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="price-btn-pro block text-center p-3 font-mono text-[13px] font-600 bg-accent text-bg relative overflow-hidden group"
        >
          <span className="relative z-1">Join Waitlist →</span>
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-all duration-500 group-hover:left-full" />
        </a>
      </div>
    </div>
  );
};
