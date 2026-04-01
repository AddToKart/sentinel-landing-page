"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Download } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 md:px-10 h-[60px] backdrop-blur-xl border-b transition-all duration-500 ${
        scrolled
          ? "bg-bg/80 border-border-dim shadow-[0_2px_20px_rgba(0,0,0,0.2)]"
          : "bg-bg/40 border-transparent"
      }`}
    >
      <Link href="/" className="font-head font-800 text-[17px] tracking-tight text-text flex items-center gap-2.5 group">
        <div className="w-[7px] h-[7px] rounded-full bg-accent group-hover:scale-125 transition-transform duration-200" />
        SENTINEL
      </Link>
      <ul className="hidden lg:flex gap-9 list-none">
        {[
          { name: "Docs", href: "/docs" },
          { name: "Pricing", href: "/pricing" },
          { name: "Ecosystem", href: "/ecosystem" },
          { name: "Roadmap", href: "/roadmap" },
          { name: "About", href: "/about" },
          { name: "Showcase", href: "/products" }
        ].map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`text-[11px] font-medium tracking-[0.06em] uppercase transition-colors duration-200 relative group
                  ${isActive ? "text-accent" : "text-muted-text hover:text-accent"}
                `}
              >
                {item.name}
                <span 
                  className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                  `} 
                />
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="flex gap-2.5 items-center">
        <a
          href="https://github.com/AddToKart/sentinel-v2"
          target="_blank"
          className="hidden sm:flex items-center gap-2 text-muted-text font-mono text-[11px] border border-border-dim px-3.5 py-1.5 hover:text-text hover:border-border-dim2 transition-all duration-200 bg-bg2"
        >
          <Github className="w-3.5 h-3.5" />
          GitHub
        </a>
        <a
          href="https://github.com/AddToKart/sentinel-v2#installation"
          target="_blank"
          className="flex items-center gap-2 bg-accent text-bg font-mono text-[11px] font-bold px-4 py-1.5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
        >
          <Download className="w-3 h-3" />
          Download
        </a>
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}
