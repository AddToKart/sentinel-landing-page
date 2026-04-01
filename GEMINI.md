# sentinel-landing-page (Next.js Edition)

## Project Overview
This is a modern, high-performance landing page for **sentinel**, a multi-agent AI workspace. It utilizes a technical, "hard-coded" dark aesthetic (`#08080a`) matching the core sentinel application, optimized for visual impact and performance.

### Key Features
- **Next.js 16 (App Router)**: Leveraging the latest framework features for speed and developer experience.
- **Tailwind CSS v4**: Utilizing the new CSS-first engine for core styling and performance utilities.
- **Interactive Background**: A performant `GridCanvas` with mouse-tracking glow and reactive dot grid.
- **Animated Terminal**: `TypewriterTerminal` simulating real-time agent orchestration and CLI usage.
- **Scroll-Aware Interactions**: Integrated `framer-motion` for smooth navigation and hero-to-content transitions.
- **Performant Reveal System**: A custom, CSS-first scroll-reveal system using Intersection Observer for low-overhead animations.
- **Mobile Telemetry**: Specialized section for remote session monitoring and mobile-optimized views.

### Technologies & Stack
- **Framework**: Next.js 16.2+ & React 19
- **Animation**: Framer Motion 12+ (for complex motion) & Custom CSS Keyframes (for high-frequency animations)
- **Styling**: Tailwind CSS v4, PostCSS
- **Components**: shadcn/ui + Radix UI primitives
- **Fonts**: Syne (High-impact Headings), IBM Plex Mono (Technical Details & Mono)
- **Icons**: Lucide React

## Development Conventions
- **Client Components**: Used judiciously for interactive elements (`GridCanvas`, `TypewriterTerminal`, `ScrollReveal`).
- **CSS-First Performance**: Prioritizing native CSS transitions and `will-change` properties for smooth 60fps animations.
- **Hard-Coded Aesthetic**: Strict adherence to the sentinel brand palette (`bg: #08080a`, `accent: #4ade80`).
- **Surgical Updates**: Using targeted `replace` and `write_file` operations for efficient development.

## Project Structure
- `src/app/`: App router, global styles (`globals.css`), and layout configuration.
- `src/components/`: Modular UI sections (Hero, FeatureGrid, WorkflowGrid, etc.).
- `src/components/ui/`: shadcn/ui primitive components.
- `src/lib/`: Utility functions (e.g., `cn` for Tailwind class merging).

## Building and Running
```bash
bun install
bun run dev
```

