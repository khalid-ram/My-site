import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudyMeta } from "@/lib/content/schemas";
import { Cover } from "@/components/visuals/Cover";
import { cn } from "@/components/ui/primitives";

const cardBase =
  "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_24px_60px_-28px_rgba(29,111,174,0.35)] focus-within:border-blue-300";

/** Stretched link: whole card is clickable, one accessible link per card. */
function CardLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="after:absolute after:inset-0 after:z-10 after:rounded-[1.75rem] focus-visible:outline-none">
      {children}
    </Link>
  );
}

function Arrow() {
  return (
    <span
      aria-hidden
      className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-white text-ink transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white"
    >
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
    </span>
  );
}

/** Vertical achievement card: full designed cover on top, title and result below. */
export function AchievementCard({ meta, priority }: { meta: CaseStudyMeta; priority?: boolean }) {
  return (
    <article className={cn(cardBase, "rounded-[1.5rem]")}>
      <div className="border-b border-line">
        <Cover
          variant={meta.cover.variant}
          image={meta.cover.image}
          alt=""
          priority={priority}
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
          className="aspect-[16/10] w-full transition-transform duration-500 [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 items-center justify-between gap-4 p-5 sm:p-6">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink sm:text-xl">
            <CardLink href={`/case-studies/${meta.slug}`}>{meta.title}</CardLink>
          </h3>
          <p className="mt-1 text-sm font-medium text-accent sm:text-base">{meta.headlineMetric}</p>
        </div>
        <Arrow />
      </div>
    </article>
  );
}

/** Slide for the "Other case studies" slider: cover beside title, result and summary. */
export function CaseStudySlide({ meta }: { meta: CaseStudyMeta }) {
  return (
    <article className="grid overflow-hidden rounded-[1.5rem] border border-line bg-white md:grid-cols-[1.35fr_1fr]">
      <Link href={`/case-studies/${meta.slug}`} tabIndex={-1} aria-hidden className="group block">
        <Cover
          variant={meta.cover.variant}
          image={meta.cover.image}
          alt=""
          sizes="(min-width: 1024px) 640px, 100vw"
          className="aspect-[16/10] h-full w-full [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">{meta.title}</h3>
        <p className="mt-2 text-lg font-medium text-accent">{meta.headlineMetric}</p>
        <p className="mt-4 leading-relaxed text-muted">{meta.summary}</p>
        <Link
          href={`/case-studies/${meta.slug}`}
          className="group mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-ink px-5 text-[0.95rem] font-medium text-white transition-colors hover:bg-accent-strong"
        >
          View case study
          <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:rotate-45" />
        </Link>
      </div>
    </article>
  );
}
