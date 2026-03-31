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

  // Double the items for seamless loop
  const displayItems = [...items, ...items];

  return (
    <div className="overflow-hidden border-t border-b border-white/5 bg-bg2 relative z-1">
      <div className="flex gap-0 white-space-nowrap animate-ticker-scroll hover:[animation-play-state:paused] w-fit">
        {displayItems.map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-3 px-8 py-[10px] text-[11px] color-muted-text tracking-[0.08em] uppercase border-r border-white/5 whitespace-nowrap"
          >
            {item.label} <span className="text-accent">{item.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
