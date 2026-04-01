# sentinel-landing-page

A modern, high-performance landing page for the **Sentinel** multi-agent AI workspace. This project serves as the visual and technical flagship for the Sentinel ecosystem, utilizing a "hard-coded" technical aesthetic and cutting-edge frontend orchestration.

## 🚀 Core Technologies

- **Framework**: [Next.js 16.2+](https://nextjs.org) (App Router) & React 19
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (CSS-first engine)
- **Performance**: Custom **Sentinel Performance Engine (SPE)**
- **Animations**: [Framer Motion 12](https://framer.com/motion) & Performance-optimized CSS Keyframes
- **Components**: [shadcn/ui](https://ui.shadcn.com) + Radix UI Primitives
- **Typography**: Syne (Headings) & IBM Plex Mono (Technical Details)

## 🛠️ Performance Architecture (SPE)

The site is powered by the **Sentinel Performance Engine (SPE)**, a custom-built orchestration layer that manages the browser's resources to ensure a constant 60fps experience even during complex animations.

- **Priority Scheduling**: Tasks are bucketed into `CRITICAL`, `ANIMATION`, `VISIBLE`, and `BACKGROUND` priorities.
- **Spatial Indexing**: The interactive `GridCanvas` uses O(1) grid-lookup for mouse proximity calculations.
- **GPU Lifecycle Management**: Dynamic `will-change` allocation and disposal to minimize memory pressure.
- **Direct DOM Reconciliation**: High-frequency text updates (like the Terminal and Aegis Chat) bypass React's virtual DOM for zero-latency typing.

## 🌐 Ecosystems

### 1. Sentinel
The core desktop application for orchestrating AI coding agents in isolated sandboxes and Git worktrees.

### 2. Aegis (Academic Suite)
A specialized intelligence layer for academic integrity and natural language optimization, featuring **Aegis-Logos**, **Aegis-Lexis**, and **Aegis-Ethos**.

### 3. Nexus
Modular AI infrastructure providing task decomposition, persistent context (MCP), and unified authentication.

### 4. Forge
Next-generation DevOps automation built specifically for AI-native deployment pipelines.

## 📦 Getting Started

This project uses `bun` for package management and execution.

```bash
# Install dependencies
bun install

# Run the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `src/app/`: App router, global styles, and layout.
- `src/lib/SPE/`: The Sentinel Performance Engine core and React provider.
- `src/components/`: Modular UI components (Hero, FeatureGrid, WorkflowGrid, etc.).
- `src/components/SPE/`: Performance-monitoring tools and Telemetry Overlay.

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.
