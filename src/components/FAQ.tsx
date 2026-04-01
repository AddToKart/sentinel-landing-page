"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What makes Sentinel different from other AI coding tools?",
    a: "Sentinel is a multi-agent workspace — not just a single chat. You can run multiple AI coding sessions simultaneously in isolated sandboxes, each with its own terminal, file system, and process tree. Built on Tauri v2 with Rust, it uses 90% less memory than Electron alternatives.",
  },
  {
    q: "How does agent isolation work?",
    a: "Sentinel offers two isolation modes: Sandbox Copy (duplicates your project into a safe directory for experimentation) and Git Worktree (creates an isolated Git branch environment). Both modes ensure agents never interfere with your main codebase until you explicitly apply changes.",
  },
  {
    q: "Is Sentinel free to use?",
    a: "Yes. Sentinel is open-source under the MIT license. The core product — including unlimited agent sessions, terminal emulation, IDE mode, telemetry, and the diff/apply workflow — is free forever. A Pro plan for teams will add collaboration features.",
  },
  {
    q: "Which AI models are supported?",
    a: "Sentinel works with any AI provider that supports the CLI or API. This includes Claude (Anthropic), GPT-4 (OpenAI), Gemini (Google), and local models via Ollama or LM Studio. You can configure each agent session with a different model.",
  },
  {
    q: "Can I use Sentinel on mobile?",
    a: "A companion mobile app is in development (Q4 2026). It will let you monitor active sessions, review diffs, receive CPU/RAM alerts, and approve changes directly from your phone with encrypted remote sync.",
  },
  {
    q: "What platforms does Sentinel support?",
    a: "Sentinel runs on macOS, Windows, and Linux. Thanks to Tauri v2, the native binaries are tiny (under 15MB) and use minimal system resources. The mobile app will support iOS and Android.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-[720px] mx-auto">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="faq-item border-b border-white/[0.04] group"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between py-6 text-left cursor-pointer"
            >
              <span className={`font-head font-600 text-[15px] pr-4 transition-colors duration-200 ${isOpen ? "text-accent" : "text-text group-hover:text-accent/80"}`}>
                {faq.q}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-muted-text flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`}
              />
            </button>
            <div
              className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ maxHeight: isOpen ? "300px" : "0", opacity: isOpen ? 1 : 0 }}
            >
              <p className="text-muted-text text-[14px] leading-[1.7] pb-6 pr-8">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
