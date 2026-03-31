export const WorkflowGrid = () => {
  const steps = [
    {
      num: "01",
      icon: "📁",
      title: "Open Repository",
      desc: "Point Sentinel at any Git project. Use Ctrl+K to open the Global Action Bar instantly.",
    },
    {
      num: "02",
      icon: "🤖",
      title: "Spawn Agents",
      desc: "Launch as many agent sessions as needed. Each gets its own fully isolated workspace.",
    },
    {
      num: "03",
      icon: "📊",
      title: "Monitor Live",
      desc: "Watch real-time CPU, RAM, file diffs, and process trees across all sessions simultaneously.",
    },
    {
      num: "04",
      icon: "✅",
      title: "Apply & Commit",
      desc: "Review changes, resolve conflicts, and create Git commits directly from agent sessions.",
    },
  ];

  return (
    <div className="workflow-grid max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/5 bg-bg">
      {steps.map((step, i) => (
        <div
          key={i}
          className="wf-step p-[2.5rem_1.75rem] border border-white/5 relative bg-bg overflow-hidden group transition-colors hover:bg-bg2"
        >
          {i < steps.length - 1 && (
            <div className="hidden lg:flex wf-connector absolute right-[-1px] top-1/2 -translate-y-1/2 w-5 h-5 items-center justify-center z-[2] text-accent text-[18px]">
              ›
            </div>
          )}
          <div className="wf-num font-head text-[3rem] font-800 text-white/5 leading-none mb-3 group-hover:text-accent/10 transition-colors">
            {step.num}
          </div>
          <div className="wf-icon text-[20px] mb-4">{step.icon}</div>
          <div className="wf-title font-head text-[1rem] font-700 mb-2">{step.title}</div>
          <div className="wf-desc text-[12px] text-muted-text leading-[1.65]">
            {step.desc}
          </div>
        </div>
      ))}
    </div>
  );
};
