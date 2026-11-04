import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Heading } from "@/lib/content";
import type { CoverVariant } from "@/lib/content/schemas";
import { isDev } from "@/lib/site";
import { Cover } from "@/components/visuals/Cover";
import { ReadingProgress, TableOfContents } from "@/components/motion";
import { Eyebrow } from "@/components/ui/primitives";

export type MetaItem = { label: string; value: ReactNode };

/**
 * Shared long-form layout: Notion-style structure (sticky TOC, readable column)
 * with Behance-style presentation (large cover, bold hero, full-bleed visuals).
 */
export function DetailLayout({
  back,
  eyebrow,
  badges,
  title,
  lead,
  highlight,
  meta,
  cover,
  headings,
  missing,
  children,
  aside,
  next,
  actions,
  wide,
  bare = false,
}: {
  back: { href: string; label: string };
  eyebrow: string;
  badges?: ReactNode;
  title: string;
  lead?: string;
  highlight?: ReactNode;
  meta: MetaItem[];
  /** Omit to skip the large cover (e.g. when a designed document is shown instead). */
  cover?: { variant: CoverVariant; image?: string; alt?: string };
  headings: Heading[];
  missing?: string[];
  children: ReactNode;
  aside?: ReactNode;
  next?: { href: string; label: string; title: string; summary?: string };
  actions?: ReactNode;
  /** Full-width content rendered below the hero (outside the reading column). */
  wide?: ReactNode;
  /**
   * Open straight into the content: no intro hero, meta grid or cover.
   * A designed document (`wide`) starts at the top; text content starts with a plain title.
   */
  bare?: boolean;
}) {
  const hasColumn = children !== null && children !== undefined && children !== false;
  return (
    <>
      <ReadingProgress />
      <article>
        {bare && wide && <h1 className="sr-only">{title}</h1>}
        {!bare && (
        <header className="relative isolate -mt-16 overflow-hidden pt-16 md:-mt-[4.5rem] md:pt-[4.5rem]">
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-white" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
          <div className="container-page pt-10 md:pt-14">
            <Link href={back.href} className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink">
              <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5" />
              {back.label}
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Eyebrow>{eyebrow}</Eyebrow>
              {badges}
            </div>
            <h1 className="animate-fade-up mt-5 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-ink text-balance sm:text-5xl md:text-6xl">
              {title}
            </h1>
            {highlight && (
              <div className="animate-fade-up mt-6 max-w-3xl [animation-delay:80ms]">{highlight}</div>
            )}
            {lead && <p className="animate-fade-up mt-5 max-w-2xl text-lg leading-relaxed text-muted [animation-delay:120ms]">{lead}</p>}
            {actions && <div className="animate-fade-up mt-8 flex flex-col gap-3 [animation-delay:160ms] sm:flex-row">{actions}</div>}

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
              {meta.map((m) => (
                <div key={m.label} className="bg-white px-5 py-4">
                  <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{m.label}</dt>
                  <dd className="mt-1 text-[0.95rem] font-medium text-ink">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>
        )}

        {!bare && cover && (
        <div className="container-page mt-10">
          <Cover
            variant={cover.variant}
            image={cover.image}
            alt={cover.alt}
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="aspect-[16/9] w-full rounded-[2rem] border border-line md:aspect-[21/9]"
          />
        </div>
        )}

        {wide && <div className={bare ? undefined : "mt-12"}>{wide}</div>}

        {hasColumn && (
        <div className={`container-page grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[15rem_minmax(0,46rem)_1fr] ${bare ? "pb-16 pt-8 md:pb-20 md:pt-12" : "py-16 md:py-20"}`}>
          <aside className="hidden lg:block">
            <TableOfContents headings={headings} className="sticky top-28" />
          </aside>
          <div className="min-w-0">
            {bare && !wide && (
              <div className="mb-12">
                <Link href={back.href} className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink">
                  <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5" />
                  {back.label}
                </Link>
                <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-ink text-balance sm:text-5xl">{title}</h1>
              </div>
            )}
            {isDev && missing && missing.length > 0 && <DraftPanel missing={missing} />}
            {children}
            {aside}
          </div>
        </div>
        )}
      </article>

      {next && (
        <nav aria-label="Next" className="border-t border-line bg-blue-50">
          <Link href={next.href} className="group block">
            <div className="container-page flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-20">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{next.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">{next.title}</p>
                {next.summary && <p className="mt-3 max-w-2xl text-muted">{next.summary}</p>}
              </div>
              <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="size-5" />
              </span>
            </div>
          </Link>
        </nav>
      )}
    </>
  );
}

/** Development-only: lists sections that are hidden until verified content is added. */
function DraftPanel({ missing }: { missing: string[] }) {
  return (
    <div className="mb-10 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
      <p className="font-semibold">Draft: needs verified input (only visible in development)</p>
      <p className="mt-1">These sections stay hidden until you add real content:</p>
      <ul className="mt-2 list-disc pl-5">
        {missing.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    </div>
  );
}

export function TalkCTA({ topic }: { topic: string }) {
  return (
    <div className="mt-16 rounded-2xl border border-line bg-blue-50 p-6 sm:p-8">
      <p className="text-lg font-semibold tracking-[-0.01em] text-ink">Want the full story?</p>
      <p className="mt-2 leading-relaxed text-muted">
        I&apos;m happy to walk through the context, decisions, and trade-offs behind {topic} in a conversation.
      </p>
      <Link href="/contact" className="group mt-4 inline-flex items-center gap-1.5 font-medium text-accent hover:text-accent-strong">
        Get in touch <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
