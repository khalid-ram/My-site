"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import { nav } from "@/lib/site";
import { profile } from "@/data/profile";
import { cn } from "@/components/ui/primitives";

/** Typographic wordmark: name set in two weights with an accent full stop. */
function Wordmark() {
  return (
    <span className="text-[1.02rem] tracking-[-0.02em] text-ink">
      <span className="font-semibold">Khaled</span> <span className="font-normal text-ink/70">Ramadan</span>
      <span className="text-accent">.</span>
    </span>
  );
}

/**
 * Site navbar. Flat on the canvas at the top of the page; on scroll it condenses
 * into a floating frosted pill. The header height never changes, so page layouts
 * that account for it stay intact.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const floating = scrolled && !open;

  return (
    <header className="sticky top-0 z-50 h-16 w-full md:h-[4.5rem]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <div className={cn("flex h-full items-center transition-[padding] duration-500", floating ? "px-3 sm:px-4" : "px-0")}>
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex w-full items-center justify-between gap-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            floating
              ? "h-12 max-w-[56rem] rounded-full border border-line/90 bg-white/80 pl-5 pr-2 shadow-[0_10px_40px_-18px_rgba(23,44,66,0.35)] backdrop-blur-xl md:h-[3.25rem]"
              : cn("h-full max-w-[72rem] px-4 sm:px-6 lg:px-8", open ? "bg-white" : "bg-transparent"),
          )}
        >
          <Link href="/" className="rounded-md" aria-label={`${profile.name} — home`}>
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative py-1.5 text-sm font-medium transition-colors",
                      active ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ease-out",
                        active ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.cvPath}
              download={profile.cvFileName}
              className="group hidden min-h-9 items-center gap-1.5 rounded-full border border-line bg-white/70 px-3.5 text-sm font-medium text-ink transition-colors hover:border-ink sm:inline-flex"
            >
              CV
              <ArrowDown aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
              <span className="sr-only">(download PDF)</span>
            </a>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-line bg-white text-ink lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-white lg:hidden"
          >
            <ul className="container-page flex flex-col pt-6">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-baseline gap-4 border-b border-line py-5 text-3xl font-semibold tracking-[-0.03em]",
                      isActive(item.href) ? "text-accent" : "text-ink",
                    )}
                  >
                    <span className="font-mono text-xs font-normal tracking-normal text-muted">0{i + 1}</span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="container-page flex flex-col gap-4 py-8 text-ink">
              <a href={profile.cvPath} download={profile.cvFileName} className="inline-flex items-center gap-2 font-medium">
                Download CV <ArrowDown aria-hidden className="size-4" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium">
                LinkedIn <ArrowUpRight aria-hidden className="size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a href={`mailto:${profile.email}`} className="break-all text-muted">
                {profile.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
