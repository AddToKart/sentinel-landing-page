"use client";

import { useEffect, useState } from "react";

export const MobileTeaser = () => {
  const [cpu1, setCpu1] = useState("2.1");
  const [cpu2, setCpu2] = useState("0.8");

  useEffect(() => {
    const timer = setInterval(() => {
      setCpu1((Math.random() * 7.5 + 0.5).toFixed(1));
      setCpu2((Math.random() * 2.7 + 0.3).toFixed(1));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mobile-phones relative flex justify-center items-end gap-4 h-[480px] group">
      {/* Left phone */}
      <div className="phone phone-left w-[175px] h-[360px] border border-border-dim2 rounded-[28px] bg-bg3 overflow-hidden absolute bottom-5 left-0 z-2 rotate-[-6deg] translate-x-2.5 opacity-50 shadow-[0_20px_60px_rgba(0,0,0,0.4)] group-hover:rotate-[-9deg] group-hover:opacity-60 transition-all duration-700 hidden lg:block">
        <div className="phone-screen h-full flex flex-col">
          <div className="phone-notch h-7 bg-bg flex items-center justify-center">
            <div className="w-[60px] h-[10px] rounded-[10px] bg-bg2" />
          </div>
          <div className="flex justify-between items-center px-[14px] py-1 text-[9px] text-muted-text font-mono">
            <span>9:41</span>
            <span>●●●</span>
          </div>
          <div className="flex-1 p-[10px_12px] overflow-hidden">
            <div className="font-head text-[14px] font-700 mb-3">Sessions</div>
            <div className="bg-bg border border-border-dim rounded-md p-2 mb-1.5">
              <span className="text-[9px] font-600 font-head">feature/auth</span>
            </div>
            <div className="bg-bg border border-border-dim rounded-md p-2 mb-1.5">
              <span className="text-[9px] font-600 font-head">refactor/db</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main phone */}
      <div className="phone phone-main w-[200px] h-[400px] border border-accent/20 rounded-[28px] bg-bg3 overflow-hidden absolute bottom-0 left-1/2 -translate-x-1/2 z-3 shadow-[0_24px_48px_rgba(0,0,0,0.5)] group-hover:-translate-y-2 transition-all duration-700 animate-float-y" style={{ animationDuration: "6s" }}>
        <div className="phone-screen h-full flex flex-col">
          <div className="phone-notch h-7 bg-bg flex items-center justify-center">
            <div className="w-[60px] h-[10px] rounded-[10px] bg-bg2" />
          </div>
          <div className="flex justify-between items-center px-[14px] py-1 text-[9px] text-muted-text font-mono">
            <span>9:41</span>
            <span className="text-accent/80">⬤ Live</span>
          </div>
          <div className="flex-1 p-[10px_12px] overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="font-head text-[14px] font-700">Sentinel</div>
              <div className="text-[8px] text-accent/80 border border-accent/20 px-[6px] py-[2px] tracking-[0.08em]">2 ACTIVE</div>
            </div>
            {/* Session 1 */}
            <div className="bg-bg border border-border-dim rounded-md p-[8px_10px] mb-1.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-600 font-head">feature/auth</span>
                <span className="flex items-center gap-1 text-[8px]">
                  <div className="w-[5px] h-[5px] rounded-full bg-accent animate-pulse-dot" />
                  <span className="text-accent/80">Running</span>
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-[8px] text-muted-text">CPU <span className="text-text">{cpu1}</span>%</span>
                <span className="text-[8px] text-muted-text">RAM <span className="text-text">148</span>MB</span>
              </div>
              <div className="h-[2px] bg-bg2 rounded-[2px] mt-1.5 overflow-hidden">
                <div className="h-full rounded-[2px] bg-accent/70 transition-all duration-500" style={{ width: `${Math.min(parseFloat(cpu1) * 5, 90)}%` }} />
              </div>
            </div>
            {/* Session 2 */}
            <div className="bg-bg border border-border-dim rounded-md p-[8px_10px] mb-1.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-600 font-head">refactor/db</span>
                <span className="flex items-center gap-1 text-[8px]">
                  <div className="w-[5px] h-[5px] rounded-full bg-accent animate-pulse-dot" style={{ animationDelay: "0.5s" }} />
                  <span className="text-accent/80">Running</span>
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-[8px] text-muted-text">CPU <span className="text-text">{cpu2}</span>%</span>
                <span className="text-[8px] text-muted-text">RAM <span className="text-text">112</span>MB</span>
              </div>
              <div className="h-[2px] bg-bg2 rounded-[2px] mt-1.5 overflow-hidden">
                <div className="h-full rounded-[2px] bg-blue-400/70 transition-all duration-500" style={{ width: `${Math.min(parseFloat(cpu2) * 10, 60)}%` }} />
              </div>
            </div>
            {/* Mini terminal */}
            <div className="bg-bg border border-border-dim rounded-sm p-[6px_8px] mt-2 text-[8px] leading-[1.8] font-mono">
              <div className="flex gap-[10px]">
                <span className="text-accent select-none">›</span>
                <span>sentinel status</span>
              </div>
              <div className="text-accent/80 pl-2.5">✓ 2 sessions active</div>
            </div>
          </div>
          {/* Action bar */}
          <div className="flex gap-1 p-2 border-t border-border-dim bg-bg">
            <div className="flex-1 bg-bg2 border border-border-dim rounded-sm p-[6px] text-center text-[7px] text-muted-text cursor-pointer hover:border-accent/20 hover:text-accent transition-all">Monitor</div>
            <div className="flex-1 bg-accent/[0.06] border border-accent/20 rounded-sm p-[6px] text-center text-[7px] text-accent/80 cursor-pointer">Terminal</div>
            <div className="flex-1 bg-bg2 border border-border-dim rounded-sm p-[6px] text-center text-[7px] text-muted-text cursor-pointer hover:border-accent/20 hover:text-accent transition-all">Apply</div>
          </div>
        </div>
      </div>

      {/* Right phone */}
      <div className="phone phone-right w-[175px] h-[360px] border border-border-dim2 rounded-[28px] bg-bg3 overflow-hidden absolute bottom-5 right-0 z-2 rotate-[6deg] -translate-x-2.5 opacity-50 shadow-[0_20px_60px_rgba(0,0,0,0.4)] group-hover:rotate-[9deg] group-hover:opacity-60 transition-all duration-700 hidden lg:block">
        <div className="phone-screen h-full flex flex-col">
          <div className="phone-notch h-7 bg-bg flex items-center justify-center">
            <div className="w-[60px] h-[10px] rounded-[10px] bg-bg2" />
          </div>
          <div className="flex justify-between items-center px-[14px] py-1 text-[9px] text-muted-text font-mono">
            <span>9:41</span>
            <span>●●●</span>
          </div>
          <div className="flex-1 p-[10px_12px] overflow-hidden">
            <div className="font-head text-[14px] font-700 mb-3">Terminal</div>
            <div className="bg-bg border border-border-dim rounded-sm p-1.5 mt-1 text-[7px] leading-[1.9] font-mono">
              <div className="text-accent/80">● feature/auth</div>
              <div className="text-muted-text/60 pl-1.5">writing auth.ts...</div>
              <div className="text-blue-400/70 pl-1.5">2 tests passing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
