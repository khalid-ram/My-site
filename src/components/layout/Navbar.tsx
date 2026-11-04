"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import { nav } from "@/lib/site";
import { profile } from "@/data/profile";
import { cn } from "@/components/ui/primitives";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled || open ? "border-b border-line/80 bg-white/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Link href="/" className="group flex items-center gap-2.5 font-semibold tracking-tight text-ink" aria-label={`${profile.name} — home`}>
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-[0.65rem] bg-gradient-to-br from-blue-300 to-accent text-[0.8rem] font-bold text-white shadow-[0_6px_16px_-6px_rgba(29,111,174,0.7)] transition-transform group-hover:rotate-[-6deg]"
          >
            KR
          </span>
          <span className="text-[0.98rem]">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive(item.href) ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-blue-100"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.cvPath}
            download={profile.cvFileName}
            className="hidden min-h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-white transition-colors hover:bg-accent-strong sm:inline-flex"
          >
            <Download aria-hidden className="size-4" />
            Download CV
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line bg-white text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>

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
            <ul className="container-page flex flex-col py-6">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * i }}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between border-b border-line py-4 text-2xl font-semibold tracking-tight",
                      isActive(item.href) ? "text-accent" : "text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="container-page flex flex-col gap-3 pb-10">
              <a
                href={profile.cvPath}
                download={profile.cvFileName}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 font-medium text-white"
              >
                <Download aria-hidden className="size-4" /> Download CV
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-5 font-medium text-ink"
              >
                {profile.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
