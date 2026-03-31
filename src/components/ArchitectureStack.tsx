export const ArchitectureStack = () => {
  const stack = [
    { layer: "Desktop", tech: "Tauri v2", detail: "— Rust backend", badge: "Rust", badgeClass: "bg-amber-400/10 text-amber-400 border-amber-400/25" },
    { layer: "Terminal", tech: "xterm.js", detail: "+ portable-pty", badge: "Both", badgeClass: "bg-accent/10 text-accent border-accent/25" },
    { layer: "Editor", tech: "Monaco Editor", detail: "— VS Code core", badge: "TypeScript", badgeClass: "bg-blue-400/10 text-blue-400 border-blue-400/25" },
    { layer: "Frontend", tech: "React 19", detail: "+ TypeScript + Vite", badge: "TypeScript", badgeClass: "bg-blue-400/10 text-blue-400 border-blue-400/25" },
    { layer: "Styling", tech: "Tailwind CSS 3", detail: "— utility-first", badge: "TypeScript", badgeClass: "bg-blue-400/10 text-blue-400 border-blue-400/25" },
    { layer: "Metrics", tech: "sysinfo crate", detail: "— process tree", badge: "Rust", badgeClass: "bg-amber-400/10 text-amber-400 border-amber-400/25" },
    { layer: "Packages", tech: "Bun", detail: "— fast package manager", badge: "TypeScript", badgeClass: "bg-blue-400/10 text-blue-400 border-blue-400/25" },
  ];

  return (
    <div className="arch-stack flex flex-col gap-[2px]">
      {stack.map((row, i) => (
        <div
          key={i}
          className="arch-row flex items-center border border-white/5 transition-all hover:border-white/10 hover:bg-bg2"
        >
          <div className="arch-layer p-[11px_16px] text-[11px] font-mono min-w-[100px] text-muted-text bg-bg2 border-r border-white/5 text-right tracking-[0.06em]">
            {row.layer}
          </div>
          <div className="arch-tech p-[11px_16px] text-[13px] text-text flex-1">
            {row.tech} <span className="text-muted-text">{row.detail}</span>
          </div>
          <div className={`arch-badge ml-auto mr-3 text-[10px] tracking-[0.08em] uppercase px-2 py-[2px] whitespace-nowrap border ${row.badgeClass}`}>
            {row.badge}
          </div>
        </div>
      ))}
    </div>
  );
};
