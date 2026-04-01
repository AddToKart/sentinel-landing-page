"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, ArrowRight } from "lucide-react";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6">
              <h3 className="font-head text-2xl font-bold text-text mb-2">
                Stay in the loop
              </h3>
              <p className="text-muted-text text-[14px] leading-relaxed">
                Get the latest updates on Sentinel features, releases, and developer tips.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-muted-text" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full h-12 pl-11 pr-4 bg-bg2 border border-border-dim rounded-lg text-[14px] text-text placeholder:text-muted-text outline-none transition-all duration-300 focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
                />
              </div>

              <motion.button
                type="submit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full h-12 flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-bg font-semibold text-[14px] rounded-lg transition-colors duration-300"
              >
                <span>Subscribe</span>
                <motion.span
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </form>

            <p className="text-center text-muted-text/60 text-[11px] mt-4">
              No spam, unsubscribe anytime.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center py-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3, type: "spring", stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-accent/10 border border-accent/20"
            >
              <Check className="w-7 h-7 text-accent" />
            </motion.div>
            <h3 className="font-head text-2xl font-bold text-text mb-2">
              You&apos;re in!
            </h3>
            <p className="text-muted-text text-[14px] leading-relaxed">
              Thanks for subscribing. Check your inbox for a welcome message.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};