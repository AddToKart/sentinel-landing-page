export const RoadmapGrid = () => {
  const quarters = [
    {
      period: "Q2 2026",
      title: "Tooling & Polish",
      items: [
        "Session templates",
        "Multi-project support",
        "Custom shell selection",
        "Terminal themes",
        "Search across sessions",
      ],
    },
    {
      period: "Q3 2026",
      title: "Collaboration",
      items: [
        "Agent collaboration",
        "Session recording & playback",
        "Plugin system",
        "Built-in LLM chat",
        "Workspace snapshots",
      ],
    },
    {
      period: "Q4 2026",
      title: "Scale & Ecosystem",
      items: [
        "Remote dev environments",
        "Team session sharing",
        "Advanced Git tools",
        "📱 Mobile app (iOS + Android)",
        "Cloud sync across devices",
      ],
    },
  ];

  return (
    <div className="roadmap-grid max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/5 border border-white/5">
      {quarters.map((q, i) => (
        <div
          key={i}
          className="roadmap-col bg-bg p-[2.25rem] transition-colors hover:bg-bg2"
        >
          <div className="roadmap-quarter text-[11px] tracking-[0.12em] uppercase text-accent mb-4">
            {q.period}
          </div>
          <h3 className="font-head font-700 text-[1.1rem] mb-[1.25rem]">{q.title}</h3>
          <ul className="roadmap-items list-none">
            {q.items.map((item, j) => (
              <li
                key={j}
                className="text-[12px] text-muted-text py-[7px] border-b border-white/5 flex items-center gap-2 transition-colors hover:text-text group"
              >
                <span className="text-white/10 group-hover:text-accent transition-colors">
                  ›
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
