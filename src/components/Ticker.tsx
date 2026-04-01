export const Ticker = () => {
  const items = [
    { label: "Tauri v2", detail: "Rust Backend" },
    { label: "React 19", detail: "TypeScript" },
    { label: "xterm.js", detail: "Terminal Emulation" },
    { label: "Monaco Editor", detail: "VS Code Core" },
    { label: "portable-pty", detail: "Rust PTY" },
    { label: "sysinfo", detail: "Live Telemetry" },
    { label: "Git Worktrees", detail: "Isolation" },
    { label: "Sandbox Copy", detail: "Safe Experiments" },
    { label: "MIT License", detail: "Open Source" },
    { label: "Bun", detail: "Fast Package Manager" },
  ];

  const displayItems = [...items, ...items];

  return (
    <div className="overflow-hidden border-t border-b border-white/[0.04] bg-bg2 relative z-1">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg2 to-transparent z-[2] pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg2 to-transparent z-[2] pointer-events-none" />

      <div className="flex gap-0 whitespace-nowrap animate-ticker-scroll hover:[animation-play-state:paused] w-fit">
        {displayItems.map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2.5 px-7 py-[11px] text-[11px] text-muted-text tracking-[0.06em] uppercase border-r border-white/[0.04] whitespace-nowrap hover:text-text transition-colors duration-200 cursor-default"
          >
            <span className="w-1 h-1 rounded-full bg-accent/20" />
            {item.label} <span className="text-accent/80 font-medium">{item.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
