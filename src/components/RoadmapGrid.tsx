export const RoadmapGrid = () => {
  const quarters = [
    {
      period: "Q2 2026",
      title: "Tooling & Polish",
      items: ["Session templates", "Multi-project support", "Custom shell selection", "Terminal themes", "Search across sessions"],
    },
    {
      period: "Q3 2026",
      title: "Collaboration",
      items: ["Agent collaboration", "Session recording & playback", "Plugin system", "Built-in LLM chat", "Workspace snapshots"],
    },
    {
      period: "Q4 2026",
      title: "Scale & Ecosystem",
      items: ["Remote dev environments", "Team session sharing", "Advanced Git tools", "Mobile app (iOS + Android)", "Cloud sync across devices"],
    },
  ];

  return (
    <div className="roadmap-grid max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] border border-white/[0.04]">
      {quarters.map((q, i) => (
        <div
          key={i}
          className="roadmap-col bg-bg p-9 transition-all duration-500 hover:bg-bg2/50 relative group contain-layout-style"
        >
          {/* Top line on hover */}
          <div className="absolute top-0 left-0 right-0 h-px bg-accent/0 group-hover:bg-accent/25 transition-colors duration-500" />

          <div className="text-[11px] tracking-[0.12em] uppercase text-accent/80 mb-4 font-bold">{q.period}</div>
          <h3 className="font-head font-700 text-[1.1rem] mb-5 group-hover:text-accent transition-colors duration-300">{q.title}</h3>
          <ul className="list-none">
            {q.items.map((item, j) => (
              <li
                key={j}
                className="text-[12px] text-muted-text py-[7px] border-b border-white/[0.04] flex items-center gap-2 transition-all duration-200 hover:text-text hover:pl-1.5 group/item"
              >
                <span className="text-white/[0.06] group-hover/item:text-accent/60 transition-colors duration-200 text-[13px]">›</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
