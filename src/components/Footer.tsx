import Link from "next/link";
import { Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border-dim px-6 py-12 bg-bg relative z-[1]">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-3">
          <div className="font-head font-800 tracking-tighter text-text text-xl">SENTINEL.</div>
          <p className="text-muted-text text-[13px] max-w-[280px]">
            The parallel workspace for the next generation of AI-driven engineering.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
          <div className="space-y-3">
            <div className="text-[9px] uppercase tracking-[0.15em] text-accent/70 font-bold">Product</div>
            <ul className="space-y-1.5 text-[13px] text-muted-text">
              <li><Link href="/#features" className="hover:text-text transition-colors duration-150">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-text transition-colors duration-150">Pricing</Link></li>
              <li><Link href="/ecosystem" className="hover:text-text transition-colors duration-150">Ecosystem</Link></li>
              <li><Link href="/#architecture" className="hover:text-text transition-colors duration-150">Architecture</Link></li>
              <li><Link href="/products" className="hover:text-text transition-colors duration-150">Showcase</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="text-[9px] uppercase tracking-[0.15em] text-accent/70 font-bold">Resources</div>
            <ul className="space-y-1.5 text-[13px] text-muted-text">
              <li><a href="https://github.com/AddToKart/sentinel-v2" className="hover:text-text transition-colors duration-150">GitHub</a></li>
              <li><Link href="/docs" className="hover:text-text transition-colors duration-150">Documentation</Link></li>
              <li><a href="#" className="hover:text-text transition-colors duration-150">Community</a></li>
            </ul>
          </div>
          <div className="space-y-3 col-span-2 sm:col-span-1">
            <div className="text-[9px] uppercase tracking-[0.15em] text-accent/70 font-bold">Legal</div>
            <ul className="space-y-1.5 text-[13px] text-muted-text">
              <li><a href="https://github.com/AddToKart/sentinel-v2/blob/main/LICENSE" className="hover:text-text transition-colors duration-150">MIT License</a></li>
              <li><a href="#" className="hover:text-text transition-colors duration-150">Privacy</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-[1100px] mx-auto mt-10 pt-6 border-t border-border-dim flex flex-col sm:flex-row justify-between gap-4 text-[9px] uppercase tracking-[0.15em] text-muted-text/40">
        <span>&copy; {new Date().getFullYear()} Sentinel Open Source Project.</span>
        <div className="flex gap-5">
          <a href="#" className="hover:text-accent/60 transition-colors duration-150 flex items-center gap-1.5">
            <Globe className="w-2.5 h-2.5" /> System Status
          </a>
          <span>Built with Tauri &amp; React</span>
        </div>
      </div>
    </footer>
  );
}
