"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";

/** Floating button that appears after scrolling down and returns to the top. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-5 right-5 z-50 grid size-12 place-items-center rounded-full bg-accent text-white shadow-[0_12px_30px_-10px_rgba(29,111,174,0.7)] ring-1 ring-white/30 transition-colors hover:bg-accent-strong sm:bottom-8 sm:right-8"
        >
          <ArrowUp aria-hidden className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
