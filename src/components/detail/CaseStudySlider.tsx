"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/components/ui/primitives";

/** One-at-a-time slider: swipeable, with dot navigation underneath. */
export function CaseStudySlider({ title, labels, children }: { title: string; labels: string[]; children: ReactNode }) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  // Update the active slide only once scrolling settles, so it never flickers
  // back to the previous slide while a smooth scroll is still in progress.
  const settle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const onScroll = useCallback(() => {
    clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      const el = track.current;
      if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
    }, 120);
  }, []);

  useEffect(() => {
    const el = track.current;
    el?.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el?.removeEventListener("scroll", onScroll);
      clearTimeout(settle.current);
    };
  }, [onScroll]);

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: i * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
    setActive(i);
  };

  return (
    <section aria-labelledby="other-case-studies" aria-roledescription="carousel" className="border-t border-line bg-blue-50 py-14 md:py-20">
      <div className="container-page">
        <h2 id="other-case-studies" className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
          {title}
        </h2>
        <ul
          ref={track}
          className="mt-8 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {Children.map(children, (child, i) => (
            <li
              className="w-full shrink-0 snap-start"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== active}
              inert={i !== active}
            >
              {child}
            </li>
          ))}
        </ul>
        {count > 1 && (
          <div className="mt-8 flex justify-center gap-2.5" role="group" aria-label="Choose a case study">
            {labels.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show ${label}`}
                aria-current={i === active ? "true" : undefined}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  i === active ? "w-8 bg-accent" : "w-2.5 bg-blue-300 hover:bg-blue-400",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
