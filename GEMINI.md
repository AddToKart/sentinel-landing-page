# sentinel-landing-page (Next.js Edition)

## Project Overview
This is a modern, high-performance landing page for **sentinel**, a multi-agent AI workspace. It has been migrated from a static HTML site to a **Next.js 15** application with **Tailwind CSS v4** and **shadcn/ui**.

### Key Features
- **Next.js 15 (App Router)**: Optimized for speed and developer experience.
- **Tailwind CSS v4**: Utilizing the new CSS-first engine for styling.
- **shadcn/ui**: Accessible and beautiful components (Button, Card).
- **Interactive Background**: Custom grid canvas with mouse-tracking glow.
- **Animated Terminal**: Typewriter-style simulation of sentinel CLI usage.
- **Responsive Design**: Fully optimized for mobile and desktop.

### Technologies
- **Framework**: Next.js 15
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui + Radix UI
- **Fonts**: Syne (Headings), IBM Plex Mono (Code/Mono)
- **State Management**: React 19 Hooks

## Building and Running

### Development
```bash
bun install
bun run dev
```

### Production Build
```bash
bun run build
bun start
```

## Project Structure
- `src/app/`: App router and global styles.
- `src/components/`: Reusable React components (Terminal, Canvas, etc.).
- `src/components/ui/`: shadcn/ui primitive components.
- `src/lib/`: Utility functions (e.g., `cn` for Tailwind class merging).

## Development Conventions
- **Client Components**: Used for interactive elements like the canvas and terminal.
- **Modern Typography**: Syne for bold headlines and IBM Plex Mono for technical details.
- **Dark Theme**: Hard-coded dark aesthetic (`#08080a`) matching the sentinel application.
