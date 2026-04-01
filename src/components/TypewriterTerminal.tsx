"use client";

import { useEffect, useState, useRef } from "react";

type Line = {
  type: "cmd" | "output" | "success" | "info" | "warn" | "spacer" | "prompt_only";
  text?: string;
};

const lines: Line[] = [
  { type: "cmd", text: 'sentinel new-agent --strategy git-worktree --name "feature/auth"' },
  { type: "output", text: "Creating isolated Git worktree at .sentinel/worktrees/feature-auth..." },
  { type: "success", text: "✓ Workspace ready. Spawning agent session [pid: 28491]" },
  { type: "spacer" },
  { type: "cmd", text: 'sentinel new-agent --strategy sandbox --name "refactor/db"' },
  { type: "output", text: "Copying project to .sentinel/sandboxes/refactor-db..." },
  { type: "success", text: "✓ Sandbox ready. Spawning agent session [pid: 28553]" },
  { type: "spacer" },
  { type: "cmd", text: "sentinel status" },
  { type: "info", text: "● feature/auth — Claude Sonnet │ CPU: 2.1% │ RAM: 148MB │ 14 files" },
  { type: "info", text: "● refactor/db — Claude Opus │ CPU: 0.8% │ RAM: 112MB │ 6 files" },
  { type: "spacer" },
  { type: "prompt_only" },
];

export const TypewriterTerminal = () => {
  const [visibleLines, setVisibleLines] = useState<Line[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const currentLineRef = useRef<HTMLSpanElement>(null);

  const CHAR_DELAY = 22;
  const PAUSE = 400;

  useEffect(() => {
    if (lineIdx >= lines.length) return;

    const line = lines[lineIdx];

    if (line.type === "spacer" || line.type === "prompt_only") {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        setLineIdx((prev) => prev + 1);
        if (currentLineRef.current) currentLineRef.current.textContent = "";
      }, 10);
      return () => clearTimeout(timer);
    }

    let charIdx = 0;
    const text = line.text || "";
    
    const typeChar = () => {
      if (charIdx < text.length) {
        if (currentLineRef.current) {
          currentLineRef.current.textContent = text.slice(0, charIdx + 1);
        }
        charIdx++;
        setTimeout(typeChar, line.type === "cmd" ? CHAR_DELAY : CHAR_DELAY / 2);
      } else {
        // Line complete, move to React state
        setVisibleLines((prev) => [...prev, { ...line, text }]);
        if (currentLineRef.current) currentLineRef.current.textContent = "";
        setLineIdx((prev) => prev + 1);
      }
    };

    const startTimer = setTimeout(typeChar, charIdx === 0 ? PAUSE : 0);
    return () => clearTimeout(startTimer);
  }, [lineIdx]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines, lineIdx]);

  return (
    <div
      className="terminal-wrap group relative overflow-hidden bg-bg2 border border-border-dim2"
      style={{ boxShadow: "var(--shadow-elevated)" }}
    >
      {/* Subtle top gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-accent/[0.02] to-transparent z-0" />

      {/* Tab bar */}
      <div className="terminal-bar flex items-center gap-[7px] px-4 py-[10px] bg-bg3/80 border-b border-border-dim relative z-1">
        <div className="w-[10px] h-[10px] rounded-full bg-red-400/80" />
        <div className="w-[10px] h-[10px] rounded-full bg-amber-400/80" />
        <div className="w-[10px] h-[10px] rounded-full bg-green-400/80" />
        <div className="terminal-tabs flex gap-0 flex-1 ml-4 overflow-hidden">
          <div className="px-[14px] py-[3px] text-[11px] font-mono text-accent bg-accent/[0.06] border-r border-border-dim whitespace-nowrap cursor-pointer">
            Agents Dashboard
          </div>
          {["terminal-1", "terminal-2", "IDE", "+ New"].map((tab) => (
            <div key={tab} className="px-[14px] py-[3px] text-[11px] font-mono text-muted-text/60 border-r border-border-dim whitespace-nowrap cursor-pointer hover:text-text hover:bg-bg3 transition-all">
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Terminal body */}
      <div
        ref={terminalRef}
        className="terminal-body p-[1.5rem_1.75rem] min-h-[300px] text-[13px] leading-[2] relative z-1 font-mono"
      >
        {visibleLines.map((line, i) => (
          <div key={i}>
            {line.type === "spacer" && <br />}
            {line.type === "prompt_only" && (
              <div className="flex gap-[10px]">
                <span className="text-accent select-none">›</span>
                <span className="text-text">
                  <span className="inline-block w-2 h-3.5 bg-accent ml-0.5 align-middle animate-blink" />
                </span>
              </div>
            )}
            {line.type === "cmd" && (
              <div className="flex gap-[10px]">
                <span className="text-accent select-none">›</span>
                <span className="text-text">{line.text}</span>
              </div>
            )}
            {line.type === "output" && <div className="text-muted-text pl-5">{line.text}</div>}
            {line.type === "success" && <div className="text-accent pl-5">{line.text}</div>}
            {line.type === "info" && <div className="text-blue-700 dark:text-blue-400/90 pl-5">{line.text}</div>}
          </div>
        ))}
        {lineIdx < lines.length && (
          <div className={lines[lineIdx].type === "cmd" ? "flex gap-[10px]" : "pl-5"}>
            {lines[lineIdx].type === "cmd" && <span className="text-accent select-none">›</span>}
            <span 
              ref={currentLineRef}
              className={
                lines[lineIdx].type === "output" ? "text-muted-text" :
                lines[lineIdx].type === "success" ? "text-accent" :
                lines[lineIdx].type === "info" ? "text-blue-700 dark:text-blue-400/90" : "text-text"
              }
            />
            <span className="inline-block w-2 h-3.5 bg-accent ml-0.5 align-middle animate-blink" />
          </div>
        )}
      </div>

      {/* Scanlines (subtle) */}
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.015)_2px,rgba(0,0,0,0.015)_4px)] z-[2]" />
    </div>
  );
};
