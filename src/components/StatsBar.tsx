export const StatsBar = () => {
  const stats = [
    { num: "∞", label: "Concurrent agent sessions" },
    { num: "2", label: "Workspace isolation strategies" },
    { num: "0ms", label: "Cold start overhead" },
    { num: "1", label: "Second telemetry refresh" },
  ];

  return (
    <div className="stats-bar max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 border-t border-white/10 relative z-1">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="stat-cell p-[1.75rem_2rem] border-r border-white/5 flex flex-col gap-[6px] transition-colors hover:bg-bg2 last:border-r-0"
        >
          <div className="stat-num font-head text-[2.4rem] font-800 text-accent leading-none">
            {stat.num}
          </div>
          <div className="stat-label text-[11px] text-muted-text tracking-[0.06em]">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};
