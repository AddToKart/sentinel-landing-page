"use client";

import { motion } from "framer-motion";

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
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="roadmap-col bg-bg p-[2.25rem] transition-all duration-500 hover:bg-bg2 relative group"
        >
          {/* Top glow on hover */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent/0 group-hover:bg-accent/30 transition-all duration-500" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top,rgba(74,222,128,0.03)_0%,transparent_70%)]" />

          <div className="roadmap-quarter text-[11px] tracking-[0.12em] uppercase text-accent mb-4 relative">
            {q.period}
          </div>
          <h3 className="font-head font-700 text-[1.1rem] mb-[1.25rem] group-hover:text-accent transition-colors duration-300 relative">
            {q.title}
          </h3>
          <ul className="roadmap-items list-none relative">
            {q.items.map((item, j) => (
              <motion.li
                key={j}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 + j * 0.05 }}
                className="text-[12px] text-muted-text py-[7px] border-b border-white/5 flex items-center gap-2 transition-all duration-300 hover:text-text hover:pl-1 group/item"
              >
                <span className="text-white/10 group-hover/item:text-accent transition-colors duration-300 text-[14px]">
                  ›
                </span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};
