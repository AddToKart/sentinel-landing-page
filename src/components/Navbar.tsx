"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Download, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { name: "Docs", href: "/docs" },
  { name: "Pricing", href: "/pricing" },
  { name: "Ecosystem", href: "/ecosystem" },
  { name: "Roadmap", href: "/roadmap" },
  { name: "About", href: "/about" },
  { name: "Showcase", href: "/products" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  return (
    <>
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
        <Link 
          href="/" 
          className="font-head font-800 text-[17px] tracking-tight text-text flex items-center gap-2.5 group relative z-50"
        >
          <div className="w-[7px] h-[7px] rounded-full bg-accent group-hover:scale-125 transition-transform duration-200" />
          <span className="relative">
            SENTINEL
            <span 
              className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 
                ${pathname === "/" ? "w-full" : "w-0 group-hover:w-full"}
              `} 
            />
          </span>
        </Link>
        <ul className="hidden lg:flex gap-9 list-none">
          {navLinks.map((item) => {
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
        <div className="flex gap-2.5 items-center z-50">
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
            className="hidden sm:flex items-center gap-2 bg-accent text-bg font-mono text-[11px] font-bold px-4 py-1.5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
          >
            <Download className="w-3 h-3" />
            Download
          </a>
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-1.5 text-text hover:text-accent transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[150] bg-bg/95 backdrop-blur-2xl lg:hidden flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-6 h-full">
              <nav className="flex flex-col gap-4 flex-1">
                {navLinks.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={`block text-3xl font-head font-bold tracking-tight py-2 border-b border-border-dim/50 transition-colors
                          ${isActive ? "text-accent" : "text-muted-text hover:text-text"}
                        `}
                      >
                        <span className="flex items-center gap-4">
                          <span className={`w-2 h-2 rounded-full transition-colors ${isActive ? "bg-accent" : "bg-transparent"}`} />
                          {item.name}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex flex-col gap-4 mt-8"
              >
                <a
                  href="https://github.com/AddToKart/sentinel-v2"
                  target="_blank"
                  className="flex items-center justify-center gap-3 w-full py-4 text-sm font-mono text-text border border-border-dim bg-bg2 hover:bg-bg3 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub Repository
                </a>
                <a
                  href="https://github.com/AddToKart/sentinel-v2#installation"
                  target="_blank"
                  className="flex items-center justify-center gap-3 w-full py-4 text-sm font-mono font-bold text-bg bg-accent hover:bg-accent/90 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Sentinel
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
