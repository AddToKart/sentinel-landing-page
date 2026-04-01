"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GitCommit,
  Star,
  GitPullRequest,
  CircleDot,
  ExternalLink,
  Clock,
} from "lucide-react";

type ActivityType = "commit" | "star" | "pr" | "issue";

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  repo: string;
  timestamp: string;
  href: string;
}

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "1",
    type: "commit",
    title: "feat: add session templates support",
    description: "sentinel-v2/sentinel · 3 files changed",
    repo: "sentinel-v2/sentinel",
    timestamp: "2 hours ago",
    href: "https://github.com/sentinel-v2/sentinel/commit/abc1234",
  },
  {
    id: "2",
    type: "star",
    title: "user4827 starred sentinel-v2/sentinel",
    description: "Repository reached 1.2k stars",
    repo: "sentinel-v2/sentinel",
    timestamp: "4 hours ago",
    href: "https://github.com/sentinel-v2/sentinel/stargazers",
  },
  {
    id: "3",
    type: "pr",
    title: "merged: add multi-project workspace",
    description: "PR #142 · 24 additions, 8 deletions",
    repo: "sentinel-v2/sentinel",
    timestamp: "6 hours ago",
    href: "https://github.com/sentinel-v2/sentinel/pull/142",
  },
  {
    id: "4",
    type: "issue",
    title: "opened: Bug: Agent disconnects on large files",
    description: "Issue #89 · needs investigation",
    repo: "sentinel-v2/sentinel",
    timestamp: "8 hours ago",
    href: "https://github.com/sentinel-v2/sentinel/issues/89",
  },
];

const ACTIVITY_CONFIG: Record<
  ActivityType,
  { icon: typeof GitCommit; color: string; label: string }
> = {
  commit: {
    icon: GitCommit,
    color: "text-accent",
    label: "Commit",
  },
  star: {
    icon: Star,
    color: "text-amber-400",
    label: "Star",
  },
  pr: {
    icon: GitPullRequest,
    color: "text-purple-400",
    label: "Pull Request",
  },
  issue: {
    icon: CircleDot,
    color: "text-orange-500",
    label: "Issue",
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0, 1] as [number, number, number, number] } },
};

const ActivityCard = ({ activity }: { activity: Activity }) => {
  const config = ACTIVITY_CONFIG[activity.type];
  const Icon = config.icon;

  return (
    <motion.a
      href={activity.href}
      target="_blank"
      rel="noopener noreferrer"
      variants={item}
      className="group relative flex flex-col gap-3 bg-bg border border-border-dim p-6 transition-all duration-300 hover:border-accent/20 hover:bg-bg2/50 cursor-pointer contain-layout-style"
    >
      {/* Top accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-transparent group-hover:bg-accent/40 transition-colors duration-500" />

      {/* Header row: icon + type label + timestamp */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-md bg-border-dim dark:bg-bg3 border border-border-dim flex items-center justify-center transition-all duration-300 group-hover:border-accent/25 group-hover:bg-accent/[0.04] ${config.color}`}
          >
            <Icon className="w-[15px] h-[15px]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-muted-text group-hover:text-text transition-colors duration-300">
            {config.label}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-muted-text">
          <Clock className="w-3 h-3" />
          <span>{activity.timestamp}</span>
        </div>
      </div>

      {/* Activity title */}
      <p className="text-[13px] font-medium text-text leading-snug group-hover:text-accent transition-colors duration-300 line-clamp-1">
        {activity.title}
      </p>

      {/* Activity description */}
      <p className="text-[12px] text-muted-text leading-relaxed">
        {activity.description}
      </p>

      {/* Bottom corner accent */}
      <div className="absolute bottom-0 right-0 w-5 h-5 border-r border-b border-border-dim group-hover:border-accent/15 transition-colors duration-500" />
    </motion.a>
  );
};

export const GitHubFeed = () => {
  const [activities] = useState<Activity[]>(MOCK_ACTIVITIES);

  return (
    <div className="max-w-[1100px] mx-auto">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6 px-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <h2 className="font-head font-700 text-lg text-text">
            Recent Activity
          </h2>
        </div>
        <span className="text-[11px] text-muted-text tracking-wide">
          sentinel-v2/sentinel
        </span>
      </div>

      {/* Activity grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border-dim border border-border-dim"
      >
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </motion.div>

      {/* CTA footer */}
      <motion.a
        href="https://github.com/sentinel-v2/sentinel"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="group mt-0 flex items-center justify-center gap-2.5 bg-bg border border-border-dim border-t-0 p-5 text-[13px] text-muted-text hover:text-accent hover:bg-bg2/50 transition-all duration-300 contain-layout-style"
      >
        <ExternalLink className="w-[14px] h-[14px] transition-transform duration-300 group-hover:translate-y-[-1px]" />
        <span className="font-medium tracking-wide">View on GitHub</span>
      </motion.a>
    </div>
  );
};
