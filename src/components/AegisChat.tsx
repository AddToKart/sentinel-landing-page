"use client";

import { useChat } from 'ai/react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Send, User, Loader2, Minus, Maximize2 } from 'lucide-react';
import { Message } from 'ai';
import type { ReactNode } from 'react';

function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={`${part}-${index}`}
          className="rounded-md border border-border-dim bg-bg3 px-1.5 py-0.5 font-mono text-[11px] text-accent"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${part}-${index}`} className="font-semibold text-text">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function renderMessageContent(content: string) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const blocks: ReactNode[] = [];

  for (let i = 0; i < lines.length; ) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (trimmed.startsWith('```')) {
      const codeLines: string[] = [];
      const language = trimmed.slice(3).trim();
      i += 1;

      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i += 1;
      }

      if (i < lines.length) {
        i += 1;
      }

      blocks.push(
        <div key={`code-${blocks.length}`} className="overflow-hidden rounded-xl border border-border-dim bg-bg3">
          {language ? (
            <div className="border-b border-border-dim bg-bg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-text/70">
              {language}
            </div>
          ) : null}
          <pre className="overflow-x-auto px-3 py-3 font-mono text-[11px] leading-6 text-text">
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      );
      continue;
    }

    if (/^#{1,3}\s/.test(trimmed)) {
      const level = trimmed.match(/^#+/)?.[0].length ?? 1;
      const text = trimmed.replace(/^#{1,3}\s+/, '');
      const headingClass =
        level === 1
          ? 'text-[15px] font-semibold text-text'
          : level === 2
            ? 'text-[14px] font-semibold text-text'
            : 'text-[13px] font-semibold text-text/90';

      blocks.push(
        <div key={`heading-${blocks.length}`} className={headingClass}>
          {renderInline(text)}
        </div>
      );
      i += 1;
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];

      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i += 1;
      }

      blocks.push(
        <ul key={`list-${blocks.length}`} className="space-y-2 pl-1">
          {items.map((item, index) => (
            <li key={`${item}-${index}`} className="flex items-start gap-2 text-muted-text">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];

      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i += 1;
      }

      blocks.push(
        <ol key={`ordered-${blocks.length}`} className="space-y-2 pl-1">
          {items.map((item, index) => (
            <li key={`${item}-${index}`} className="flex items-start gap-2 text-muted-text">
              <span className="mt-0.5 w-5 shrink-0 font-mono text-[11px] text-accent">{index + 1}.</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    const paragraphLines: string[] = [];

    while (i < lines.length) {
      const current = lines[i].trim();

      if (
        !current ||
        current.startsWith('```') ||
        /^#{1,3}\s/.test(current) ||
        /^[-*]\s+/.test(current) ||
        /^\d+\.\s+/.test(current)
      ) {
        break;
      }

      paragraphLines.push(current);
      i += 1;
    }

    blocks.push(
      <p key={`paragraph-${blocks.length}`} className="leading-7 text-inherit">
        {renderInline(paragraphLines.join(' '))}
      </p>
    );
  }

  return blocks;
}

export function AegisChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'initial',
        role: 'assistant',
        content: 'System initialized. I am Aegis, Sentinel\'s autonomous co-pilot. How can I assist with your orchestration today?',
      },
    ],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isMinimized]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '600px',
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-3rem)] z-[300] bg-bg2/90 backdrop-blur-xl border border-border-dim rounded-2xl shadow-2xl flex flex-col overflow-hidden contain-layout-style`}
          >
            {/* Header */}
            <div className="h-14 px-4 flex items-center justify-between border-b border-border-dim bg-bg/50">
              <div className="flex items-center gap-2.5">
                <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 border border-accent/20">
                  <Terminal className="w-3.5 h-3.5 text-accent" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent animate-pulse" />
                </div>
                <div>
                  <h3 className="font-mono text-[13px] font-bold text-text leading-none mb-1">Aegis</h3>
                  <p className="font-mono text-[10px] text-accent/80 leading-none">Online & Ready</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-muted-text hover:text-text hover:bg-border-dim transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-muted-text hover:text-red-400 hover:bg-red-400/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Area (Hidden if minimized) */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: '100%' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border-dim">
                    {messages.map((m: Message) => (
                      <div 
                        key={m.id} 
                        className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        {/* Avatar */}
                        <div className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center border ${
                          m.role === 'user' 
                            ? 'bg-border-dim border-border-dim2 text-muted-text' 
                            : 'bg-accent/10 border-accent/20 text-accent'
                        }`}>
                          {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Terminal className="w-3.5 h-3.5" />}
                        </div>

                        {/* Message Bubble */}
                        <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-[13px] leading-relaxed ${
                          m.role === 'user' 
                            ? 'bg-bg3 border border-border-dim text-text rounded-tr-sm' 
                            : 'bg-bg border border-border-dim text-muted-text rounded-tl-sm'
                        }`}>
                          <div className="space-y-3">
                            {renderMessageContent(m.content)}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3 flex-row">
                        <div className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center border bg-accent/10 border-accent/20 text-accent">
                          <Terminal className="w-3.5 h-3.5" />
                        </div>
                        <div className="max-w-[80%] rounded-xl px-4 py-3 bg-bg border border-border-dim text-muted-text rounded-tl-sm flex items-center gap-2">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />
                          <span className="text-[12px] font-mono">Processing...</span>
                        </div>
                      </div>
                    )}
                    {error && (
                      <div className="flex gap-3 flex-row">
                        <div className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center border bg-red-500/10 border-red-500/20 text-red-400">
                          <X className="w-3.5 h-3.5" />
                        </div>
                        <div className="max-w-[80%] rounded-xl px-4 py-3 bg-bg border border-red-500/20 text-red-400/90 rounded-tl-sm">
                          <p className="text-[12px] leading-relaxed">{error.message || 'Connection error. Please try again.'}</p>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} className="h-px w-full" />
                  </div>

                  {/* Input Form */}
                  <div className="p-3 border-t border-border-dim bg-bg">
                    <form 
                      onSubmit={handleSubmit}
                      className="relative flex items-end bg-bg2 border border-border-dim focus-within:border-accent/40 focus-within:ring-1 focus-within:ring-accent/20 rounded-xl overflow-hidden transition-all duration-200"
                    >
                      <input
                        ref={inputRef}
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Command Aegis..."
                        className="flex-1 max-h-32 min-h-[44px] py-3 pl-4 pr-12 bg-transparent text-[13px] text-text placeholder:text-muted-text/50 outline-none resize-none"
                      />
                      <button 
                        type="submit" 
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 bottom-2 w-7 h-7 flex items-center justify-center rounded-lg bg-accent text-bg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                    <div className="text-center mt-2 text-[10px] font-mono text-muted-text/40">
                      Powered by NVIDIA NIM & Sentinel Core
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 25 }}
        onClick={() => {
          if (isOpen && isMinimized) {
            setIsMinimized(false);
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full z-[300] flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-300 group ${
          isOpen && !isMinimized
            ? 'bg-border-dim border border-border-dim2 text-text hover:bg-border-dim2'
            : 'bg-accent border border-accent-dim text-bg hover:brightness-110 hover:scale-105'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen && !isMinimized ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Terminal className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
