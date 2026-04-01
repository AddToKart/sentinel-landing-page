"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RefreshCw, Terminal, CheckCircle, Circle, Loader } from "lucide-react";

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

type LineType = "cmd" | "output" | "success" | "info" | "warn" | "spacer";

interface TerminalLine {
  type: LineType;
  text: string;
}

interface Scenario {
  id: string;
  label: string;
  icon: typeof Play;
  lines: TerminalLine[];
}

/* ──────────────────────────────────────────────
   Scenario definitions
   ────────────────────────────────────────────── */

const scenarios: Scenario[] = [
  {
    id: "start",
    label: "Start Agent",
    icon: Play,
    lines: [
      { type: "cmd", text: "sentinel agent start --name feature/auth" },
      { type: "spacer", text: "" },
      { type: "output", text: "Initializing agent workspace..." },
      { type: "output", text: "Strategy: git-worktree" },
      { type: "output", text: "Creating isolated branch: sentinel/feature-auth" },
      { type: "info", text: "Workspace → .sentinel/worktrees/feature-auth" },
      { type: "spacer", text: "" },
      { type: "success", text: "✓ Agent session started [pid: 28491]" },
      { type: "info", text: "● feature/auth — Claude Sonnet │ CPU: 0.2% │ RAM: 84MB" },
      { type: "spacer", text: "" },
      { type: "output", text: "Listening for tasks..." },
    ],
  },
  {
    id: "task",
    label: "Run Task",
    icon: RefreshCw,
    lines: [
      { type: "cmd", text: 'sentinel task --agent feature/auth --prompt "Add OAuth2 login flow"' },
      { type: "spacer", text: "" },
      { type: "output", text: "Dispatching task to agent feature/auth..." },
      { type: "info", text: "● feature/auth — Claude Sonnet │ CPU: 12.4% │ RAM: 210MB" },
      { type: "spacer", text: "" },
      { type: "output", text: "Reading project structure..." },
      { type: "output", text: "Analyzing existing auth middleware..." },
      { type: "output", text: "Writing src/auth/oauth2.ts..." },
      { type: "output", text: "Writing src/auth/callback.ts..." },
      { type: "output", text: "Updating src/routes/auth.ts..." },
      { type: "output", text: "Writing tests/auth.test.ts..." },
      { type: "spacer", text: "" },
      { type: "success", text: "✓ Task complete — 4 files modified, 1 file created" },
      { type: "info", text: "● feature/auth — idle │ CPU: 0.3% │ RAM: 96MB" },
      { type: "spacer", text: "" },
      { type: "output", text: 'Run `sentinel review` to inspect changes.' },
    ],
  },
  {
    id: "session",
    label: "View Session",
    icon: Terminal,
    lines: [
      { type: "cmd", text: "sentinel status" },
      { type: "spacer", text: "" },
      { type: "info", text: "SESSION MODEL STATUS CPU RAM FILES" },
      { type: "output", text: "─────────────────────────────────────────────────────────────────" },
      { type: "success", text: "● feature/auth Claude Sonnet completed 0.3% 96MB 5" },
      { type: "info", text: "● refactor/db Claude Opus running 8.1% 184MB 3" },
      { type: "warn", text: "○ api/endpoints Claude Haiku queued — — 0" },
      { type: "spacer", text: "" },
      { type: "cmd", text: "sentinel session info refactor/db" },
      { type: "spacer", text: "" },
      { type: "output", text: "Session: refactor/db" },
      { type: "output", text: "Model: Claude Opus" },
      { type: "output", text: "Strategy: sandbox" },
      { type: "output", text: "Workspace: .sentinel/sandboxes/refactor-db" },
      { type: "output", text: "Branch: sentinel/refactor-db" },
      { type: "output", text: "Started: 2m 34s ago" },
      { type: "info", text: "Files: src/db/schema.ts, src/db/migrate.ts, src/db/client.ts" },
      { type: "spacer", text: "" },
      { type: "success", text: "✓ Session healthy — 0 errors, 0 warnings" },
    ],
  },
];

/* ──────────────────────────────────────────────
   Line renderer
   ────────────────────────────────────────────── */

const lineColor: Record<LineType, string> = {
  cmd: "text-text",
  output: "text-muted-text",
  success: "text-accent",
  info: "text-blue-400",
  warn: "text-amber-400",
  spacer: "",
};

function TerminalLineRow({ line }: { line: TerminalLine }) {
  if (line.type === "spacer") return <div className="h-5" />;

  const isCmd = line.type === "cmd";

  return (
    <div className={`flex gap-2.5 text-[13px] leading-[1.9] ${isCmd ? "" : "pl-5"}`}>
      {isCmd && <span className="text-accent select-none shrink-0">›</span>}
      <span className={lineColor[line.type]}>{line.text}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Status badge shown while a scenario streams
   ────────────────────────────────────────────── */

function StatusBadge({ status }: { status: "idle" | "streaming" | "done" }) {
  if (status === "idle") return null;

  const config = {
    streaming: {
      icon: Loader,
      label: "Running",
      className: "text-accent bg-accent/10 border-accent/20",
      spin: true,
    },
    done: {
      icon: CheckCircle,
      label: "Complete",
      className: "text-accent bg-accent/10 border-accent/20",
      spin: false,
    },
  } as const;

  const { icon: Icon, label, className, spin } = config[status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono rounded border ${className}`}
    >
      <Icon className={`w-3 h-3 ${spin ? "animate-spin" : ""}`} />
      {label}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Main component
   ────────────────────────────────────────────── */

const CHAR_DELAY = 12;
const LINE_PAUSE = 120;

export const InteractiveTerminal = () => {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [streamIdx, setStreamIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [status, setStatus] = useState<"idle" | "streaming" | "done">("idle");

  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentLineRef = useRef<HTMLSpanElement>(null);

  // Auto-scroll on new content
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines, charIdx]);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const currentScenario = scenarios.find((s) => s.id === activeScenario);

  // Streaming engine — types one character at a time
  useEffect(() => {
    if (!currentScenario || status !== "streaming") return;
    if (streamIdx >= currentScenario.lines.length) {
      setStatus("done");
      return;
    }

    const line = currentScenario.lines[streamIdx];
    const text = line.text;

    // Spacer lines resolve instantly
    if (line.type === "spacer") {
      timerRef.current = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        setStreamIdx((prev) => prev + 1);
      }, LINE_PAUSE);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    // Type next character
    if (charIdx < text.length) {
      timerRef.current = setTimeout(() => {
        if (currentLineRef.current) {
          currentLineRef.current.textContent = text.slice(0, charIdx + 1);
        }
        setCharIdx((prev) => prev + 1);
      }, line.type === "cmd" ? CHAR_DELAY : CHAR_DELAY * 0.6);
    } else {
      // Line complete — commit to visible lines
      timerRef.current = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        if (currentLineRef.current) {
          currentLineRef.current.textContent = "";
        }
        setStreamIdx((prev) => prev + 1);
        setCharIdx(0);
      }, LINE_PAUSE);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentScenario, status, streamIdx, charIdx]);

  const handleScenario = useCallback(
    (id: string) => {
      // If same scenario and done → restart. If streaming → ignore.
      if (id === activeScenario && status === "streaming") return;

      if (timerRef.current) clearTimeout(timerRef.current);
      setVisibleLines([]);
      setStreamIdx(0);
      setCharIdx(0);
      setActiveScenario(id);
      setStatus("streaming");
    },
    [activeScenario, status]
  );

  const handleReset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisibleLines([]);
    setStreamIdx(0);
    setCharIdx(0);
    setActiveScenario(null);
    setStatus("idle");
    if (currentLineRef.current) currentLineRef.current.textContent = "";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[760px] mx-auto"
    >
      {/* ── Terminal window ─────────────────────── */}
      <div className="group relative overflow-hidden bg-bg2 border border-border-dim shadow-xl dark:shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 py-[10px] bg-bg3/70 border-b border-border-dim2 relative z-10">
          {/* macOS dots */}
          <div className="flex items-center gap-[7px]">
            <div className="w-[10px] h-[10px] rounded-full bg-red-400/80" />
            <div className="w-[10px] h-[10px] rounded-full bg-amber-400/80" />
            <div className="w-[10px] h-[10px] rounded-full bg-green-400/80" />
          </div>

          {/* Title */}
          <span className="text-[11px] font-mono text-muted-text/60 ml-1 select-none">
            sentinel — interactive demo
          </span>

          {/* Status badge (right-aligned) */}
          <div className="ml-auto">
            <AnimatePresence mode="wait">
              <StatusBadge key={status} status={status} />
            </AnimatePresence>
          </div>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="relative z-10 p-5 min-h-[260px] max-h-[420px] overflow-y-auto font-mono scroll-smooth
            scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black/10 "
        >
          {/* Idle prompt when nothing is running */}
          {!activeScenario && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-2.5 text-[13px] leading-[1.9]"
            >
              <span className="text-accent select-none">›</span>
              <span className="text-text">
                <span className="inline-block w-2 h-3.5 bg-accent ml-0.5 align-middle animate-blink" />
              </span>
            </motion.div>
          )}

          {/* Committed lines */}
          {visibleLines.map((line, i) => (
            <TerminalLineRow key={`${activeScenario}-${i}`} line={line} />
          ))}

          {/* Currently streaming line */}
          {status === "streaming" && currentScenario && streamIdx < currentScenario.lines.length && (
            <div
              className={`flex gap-2.5 text-[13px] leading-[1.9] ${
                currentScenario.lines[streamIdx].type === "cmd" ? "" : "pl-5"
              }`}
            >
              {currentScenario.lines[streamIdx].type === "cmd" && (
                <span className="text-accent select-none shrink-0">›</span>
              )}
              <span ref={currentLineRef} className={lineColor[currentScenario.lines[streamIdx].type]} />
              <span className="inline-block w-2 h-3.5 bg-accent ml-0.5 align-middle animate-blink" />
            </div>
          )}

          {/* Final cursor when done */}
          {status === "done" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-2.5 text-[13px] leading-[1.9] mt-1"
            >
              <span className="text-accent select-none">›</span>
              <span className="text-text">
                <span className="inline-block w-2 h-3.5 bg-accent ml-0.5 align-middle animate-blink" />
              </span>
            </motion.div>
          )}
        </div>

        {/* Scanlines overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.012)_2px,rgba(0,0,0,0.012)_4px)] z-20" />
      </div>

      {/* ── Scenario buttons ───────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center gap-2 mt-4"
      >
        {scenarios.map((scenario) => {
          const isActive = activeScenario === scenario.id && status === "streaming";
          const isComplete = activeScenario === scenario.id && status === "done";
          const Icon = scenario.icon;

          return (
            <button
              key={scenario.id}
              onClick={() => handleScenario(scenario.id)}
              disabled={isActive}
              className={`
                group/btn relative inline-flex items-center gap-2 px-4 py-2 text-[12px] font-mono
                border transition-all duration-300 cursor-pointer select-none
                ${
                  isComplete
                    ? "border-accent/30 text-accent bg-accent/[0.06] hover:bg-accent/[0.12]"
                    : isActive
                      ? "border-accent/20 text-accent bg-accent/[0.04] cursor-wait"
                      : "border-border-dim text-muted-text hover:text-text hover:border-border-dim2 hover:bg-border-dim2 dark:hover:bg-bg3"
                }
              `}
            >
              {isActive ? (
                <Loader className="w-3.5 h-3.5 animate-spin" />
              ) : isComplete ? (
                <CheckCircle className="w-3.5 h-3.5" />
              ) : (
                <Icon className="w-3.5 h-3.5" />
              )}
              {scenario.label}
              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
              )}
            </button>
          );
        })}

        {/* Reset button */}
        {activeScenario && (
          <motion.button
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-[12px] font-mono
              text-muted-text/50 hover:text-muted-text border border-border-dim
              hover:border-border-dim2 transition-all duration-300 cursor-pointer select-none ml-auto"
          >
            <Circle className="w-3 h-3" />
            Clear
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};
