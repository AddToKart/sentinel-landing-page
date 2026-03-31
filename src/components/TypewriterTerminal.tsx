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
  { type: "info", text: "● feature/auth   — Claude Sonnet  │ CPU: 2.1%  │ RAM: 148MB  │ 14 files" },
  { type: "info", text: "● refactor/db     — Claude Opus    │ CPU: 0.8%  │ RAM: 112MB  │  6 files" },
  { type: "spacer" },
  { type: "prompt_only" },
];

export const TypewriterTerminal = () => {
  const [visibleLines, setVisibleLines] = useState<Line[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  const CHAR_DELAY = 22;
  const LINE_DELAY = 180;
  const PAUSE = 500;

  useEffect(() => {
    if (lineIdx >= lines.length) return;

    const line = lines[lineIdx];

    if (line.type === "spacer" || line.type === "prompt_only") {
      setVisibleLines((prev) => [...prev, line]);
      setLineIdx((prev) => prev + 1);
      setCharIdx(0);
      setCurrentText("");
      return;
    }

    const timer = setTimeout(
      () => {
        if (line.text && charIdx < line.text.length) {
          setCurrentText(line.text.slice(0, charIdx + 1));
          setCharIdx((prev) => prev + 1);
        } else {
          setVisibleLines((prev) => [...prev, { ...line, text: line.text }]);
          setLineIdx((prev) => prev + 1);
          setCharIdx(0);
          setCurrentText("");
        }
      },
      line.type === "cmd" ? CHAR_DELAY : charIdx === 0 ? PAUSE : CHAR_DELAY / 2
    );

    return () => clearTimeout(timer);
  }, [lineIdx, charIdx]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines, currentText]);

  return (
    <div className="terminal-wrap reveal visible group relative overflow-hidden bg-bg2 border border-white/10 shadow-[0_0_80px_rgba(74,222,128,0.05),0_32px_64px_rgba(0,0,0,0.5)] hover:border-accent/15 hover:shadow-[0_0_80px_rgba(74,222,128,0.08),0_32px_64px_rgba(0,0,0,0.5)] transition-all duration-700">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-accent/5 to-transparent z-0" />
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent z-[3]" />
      {/* Corner glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/[0.04] rounded-full blur-[40px] pointer-events-none" />
      <div className="terminal-bar flex items-center gap-[7px] px-4 py-[10px] bg-bg3 border-b border-white/5 relative z-1">
        <div className="w-[10px] h-[10px] rounded-full bg-[#f87171]" />
        <div className="w-[10px] h-[10px] rounded-full bg-[#fbbf24]" />
        <div className="w-[10px] h-[10px] rounded-full bg-[#4ade80]" />
        <div className="terminal-tabs flex gap-0 flex-1 ml-4 overflow-hidden">
          <div className="px-[14px] py-[3px] text-[11px] font-mono text-accent bg-accent/10 border-r border-white/5 whitespace-nowrap cursor-pointer">
            Agents Dashboard
          </div>
          <div className="px-[14px] py-[3px] text-[11px] font-mono text-muted-text border-r border-white/5 whitespace-nowrap cursor-pointer hover:text-text hover:bg-white/5 transition-all">
            terminal-1
          </div>
          <div className="px-[14px] py-[3px] text-[11px] font-mono text-muted-text border-r border-white/5 whitespace-nowrap cursor-pointer hover:text-text hover:bg-white/5 transition-all">
            terminal-2
          </div>
          <div className="px-[14px] py-[3px] text-[11px] font-mono text-muted-text border-r border-white/5 whitespace-nowrap cursor-pointer hover:text-text hover:bg-white/5 transition-all">
            IDE
          </div>
          <div className="px-[14px] py-[3px] text-[11px] font-mono text-muted-text border-r border-white/5 whitespace-nowrap cursor-pointer hover:text-text hover:bg-white/5 transition-all">
            + New
          </div>
        </div>
      </div>
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
            {line.type === "info" && <div className="text-blue-400 pl-5">{line.text}</div>}
          </div>
        ))}
        {lineIdx < lines.length && (
          <div>
            {lines[lineIdx].type === "cmd" && (
              <div className="flex gap-[10px]">
                <span className="text-accent select-none">›</span>
                <span className="text-text">
                  {currentText}
                  <span className="inline-block w-2 h-3.5 bg-accent ml-0.5 align-middle animate-blink" />
                </span>
              </div>
            )}
            {(lines[lineIdx].type === "output" ||
              lines[lineIdx].type === "success" ||
              lines[lineIdx].type === "info") && (
              <div
                className={`${
                  lines[lineIdx].type === "output"
                    ? "text-muted-text"
                    : lines[lineIdx].type === "success"
                    ? "text-accent"
                    : "text-blue-400"
                } pl-5`}
              >
                {currentText}
                <span className="inline-block w-2 h-3.5 bg-accent ml-0.5 align-middle animate-blink" />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)] z-[2]" />
    </div>
  );
};
