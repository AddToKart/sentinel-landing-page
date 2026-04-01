"use client";

import { ExternalLink, Star } from "lucide-react";

export interface Project {
  name: string;
  description: string;
  tech: string[];
  url: string;
  stars?: number;
  language?: string;
  accentColor?: string;
  category: "nexus" | "personal";
}

const accentMap: Record<string, string> = {
  TypeScript: "#3178c6",
  Python: "#3776ab",
  Rust: "#dea584",
  JavaScript: "#f7df1e",
  "Next.js": "#ffffff",
  Django: "#092e20",
  MongoDB: "#47a248",
  React: "#61dafb",
  "Tailwind CSS": "#06b6d4",
  "Framer Motion": "#bb4b96",
  "Spotify API": "#1db954",
  "Google Gemini": "#4285f4",
  FastAPI: "#009688",
  Vite: "#646cff",
  "TipTap Editor": "#4b5563",
  "AES Encryption": "#ef4444",
  "Discord API": "#5865f2",
  "Tauri v2": "#ffc131",
  "React 19": "#61dafb",
};

function TechBadge({ tech }: { tech: string }) {
  const color = accentMap[tech] || "#4ade80";
  return (
    <span
      className="inline-flex items-center text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 border transition-colors duration-200 hover:border-opacity-60"
      style={{
        color: `${color}cc`,
        borderColor: `${color}25`,
        backgroundColor: `${color}08`,
      }}
    >
      {tech}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col bg-bg2 border border-border-dim hover:border-border-dim2 transition-all duration-300 overflow-hidden"
    >
      {/* Hover accent top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-all duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accentColor || "#4ade80"}60, transparent)`,
        }}
      />

      {/* Hover gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${project.accentColor || "#4ade80"}06, transparent 70%)`,
        }}
      />

      <div className="p-6 md:p-7 flex-1 flex flex-col relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="font-head font-800 text-lg md:text-xl tracking-tight text-text group-hover:text-accent transition-colors duration-300">
            {project.name}
          </h3>
          <ExternalLink className="w-4 h-4 text-muted-text/40 group-hover:text-accent transition-colors duration-200 mt-1 flex-shrink-0" />
        </div>

        {/* Description */}
        <p className="text-muted-text text-[13px] leading-[1.75] mb-5 flex-1 group-hover:text-muted-text/90 transition-colors duration-300">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <TechBadge key={t} tech={t} />
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border-dim">
          <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.15em] text-muted-text/50">
            {project.language && (
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: accentMap[project.language] || "#4ade80" }}
                />
                {project.language}
              </span>
            )}
            {project.stars !== undefined && (
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                {project.stars}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-accent/50 group-hover:text-accent transition-colors duration-200">
            View Source &rarr;
          </span>
        </div>
      </div>
    </a>
  );
}

export function ShowcaseGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-bg3 border border-border-dim">
      {projects.map((p) => (
        <ProjectCard key={p.name} project={p} />
      ))}
    </div>
  );
}
