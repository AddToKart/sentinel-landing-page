const testimonials = [
  {
    quote: "Sentinel completely changed how we handle automated refactoring. Having 4 agents working in parallel across different microservices is a game changer.",
    author: "Sarah Chen",
    role: "Staff Engineer @ FinTech Inc",
    avatar: "S",
  },
  {
    quote: "The reduction in RAM usage compared to our old Electron-based tools is insane. I can finally run my local LLMs alongside my IDE without my machine begging for mercy.",
    author: "Marcus Jenkins",
    role: "Independent Researcher",
    avatar: "M",
  },
  {
    quote: "Mobile telemetry alone makes this worth it. I can approve PRs and kill runaway agent loops while grabbing a coffee.",
    author: "Elena Rodriguez",
    role: "DevOps Lead",
    avatar: "E",
  },
  {
    quote: "We use Sentinel to automate routine dependency updates and minor bug fixes. It feels like having three extra junior devs on the team.",
    author: "David Kim",
    role: "CTO @ StartupX",
    avatar: "D",
  },
];

export const TestimonialsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {testimonials.map((t, i) => (
        <div
          key={i}
          className="relative group p-8 border border-border-dim bg-bg2 hover:bg-bg2 hover:border-border-dim2 transition-all duration-300"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-accent/[0.03] to-transparent pointer-events-none transition-opacity duration-500" />
          
          <div className="text-accent/40 mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21L16.41 14.909C16.291 14.939 16.155 14.954 16.002 14.954C14.346 14.954 13 13.608 13 11.952C13 10.296 14.346 8.95 16.002 8.95C17.658 8.95 19.004 10.296 19.004 11.952C19.004 12.871 18.583 13.684 17.923 14.21L15.394 21H14.017ZM6.003 21L8.396 14.909C8.277 14.939 8.141 14.954 7.988 14.954C6.332 14.954 4.986 13.608 4.986 11.952C4.986 10.296 6.332 8.95 7.988 8.95C9.644 8.95 10.99 10.296 10.99 11.952C10.99 12.871 10.569 13.684 9.909 14.21L7.38 21H6.003Z" />
            </svg>
          </div>
          <p className="text-muted-text leading-relaxed text-[15px] mb-8 relative z-10 group-hover:text-text/90 transition-colors duration-300">
            &quot;{t.quote}&quot;
          </p>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-border-dim border border-border-dim2 flex items-center justify-center font-mono text-accent text-sm">
              {t.avatar}
            </div>
            <div>
              <div className="font-mono text-[13px] text-text">{t.author}</div>
              <div className="text-[11px] text-muted-text/60">{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};