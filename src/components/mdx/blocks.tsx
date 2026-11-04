import Image from "next/image";
import type { ReactNode } from "react";
import { Info, Lightbulb, Quote as QuoteIcon, TriangleAlert } from "lucide-react";
import { cn } from "@/components/ui/primitives";

/* ---------- Callout ---------- */
const calloutStyles = {
  note: { icon: Info, cls: "border-blue-200 bg-blue-50", iconCls: "text-accent" },
  insight: { icon: Lightbulb, cls: "border-blue-300 bg-blue-100/70", iconCls: "text-accent-strong" },
  warning: { icon: TriangleAlert, cls: "border-amber-200 bg-amber-50", iconCls: "text-amber-700" },
};

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: keyof typeof calloutStyles;
  title?: string;
  children: ReactNode;
}) {
  const s = calloutStyles[type];
  const Icon = s.icon;
  return (
    <aside className={cn("not-prose my-8 flex gap-4 rounded-2xl border p-5", s.cls)}>
      <Icon aria-hidden className={cn("mt-0.5 size-5 shrink-0", s.iconCls)} />
      <div className="text-[0.98rem] leading-relaxed text-ink [&>p+p]:mt-2">
        {title && <p className="mb-1 font-semibold">{title}</p>}
        {children}
      </div>
    </aside>
  );
}

/* ---------- Quote ---------- */
export function Quote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <figure className="not-prose my-10 border-l-0">
      <QuoteIcon aria-hidden className="size-7 text-blue-300" />
      <blockquote className="mt-3 text-2xl font-medium leading-snug tracking-[-0.02em] text-ink text-balance">{children}</blockquote>
      {cite && <figcaption className="mt-3 text-sm text-muted">— {cite}</figcaption>}
    </figure>
  );
}

/* ---------- Figure (full-width capable) ---------- */
export function Figure({
  src,
  alt,
  caption,
  width = 1600,
  height = 1000,
  full = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  full?: boolean;
}) {
  return (
    <figure className={cn("not-prose my-10", full && "lg:-mx-24")}>
      <div className="overflow-hidden rounded-2xl border border-line bg-blue-50">
        <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1024px) 900px, 100vw" className="h-auto w-full" />
      </div>
      {caption && <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}

/* ---------- Gallery ---------- */
export function Gallery({ images }: { images: { src: string; alt: string; caption?: string }[] }) {
  return (
    <div className="not-prose my-10 grid gap-4 sm:grid-cols-2">
      {images.map((img) => (
        <figure key={img.src}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-blue-50">
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
          </div>
          {img.caption && <figcaption className="mt-2 text-sm text-muted">{img.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

/* ---------- Before / After (images) ---------- */
export function BeforeAfterImages({
  before,
  after,
  caption,
}: {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  caption?: string;
}) {
  return (
    <figure className="not-prose my-10">
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { label: "Before", img: before },
          { label: "After", img: after },
        ].map(({ label, img }) => (
          <div key={label}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-blue-50">
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        ))}
      </div>
      {caption && <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}

/* ---------- Before / After (metric bars) ---------- */
export function BeforeAfter({
  label,
  before,
  after,
  unit = "",
  beforeLabel,
  afterLabel,
  lowerIsBetter = false,
}: {
  label: string;
  before: number;
  after: number;
  unit?: string;
  beforeLabel?: string;
  afterLabel?: string;
  lowerIsBetter?: boolean;
}) {
  const max = Math.max(before, after);
  const rows = [
    { name: "Before", value: before, display: beforeLabel ?? `${before}${unit}`, strong: false },
    { name: "After", value: after, display: afterLabel ?? `${after}${unit}`, strong: true },
  ];
  return (
    <figure className="not-prose rounded-2xl border border-line bg-white p-5 sm:p-6">
      <figcaption className="text-sm font-medium text-ink">{label}</figcaption>
      <dl className="mt-5 space-y-4">
        {rows.map((r) => (
          <div key={r.name} className="grid grid-cols-[4rem_1fr] items-center gap-3 sm:grid-cols-[4.5rem_1fr]">
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{r.name}</dt>
            <dd className="flex items-center gap-3">
              <span
                className={cn("h-3 rounded-full", r.strong ? "bg-gradient-to-r from-blue-400 to-accent" : "bg-blue-200")}
                style={{ width: `${Math.max(6, (r.value / max) * 100) * 0.78}%` }}
              />
              <span className={cn("whitespace-nowrap text-sm tabular-nums", r.strong ? "font-semibold text-ink" : "text-muted")}>
                {r.display}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      {lowerIsBetter && <p className="mt-4 text-xs text-muted">Lower is better.</p>}
    </figure>
  );
}

/* ---------- Simple bar chart ---------- */
export function ImpactChart({
  title,
  data,
  unit = "",
  caption,
}: {
  title: string;
  data: { label: string; value: number }[];
  unit?: string;
  caption?: string;
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <figure className="not-prose my-10 rounded-2xl border border-line bg-white p-6">
      <p className="text-sm font-medium text-ink">{title}</p>
      <div className="mt-6 flex h-48 items-end gap-3 sm:gap-5" role="img" aria-label={`${title}: ${data.map((d) => `${d.label} ${d.value}${unit}`).join(", ")}`}>
        {data.map((d, i) => (
          <div key={d.label} className="flex flex-1 flex-col items-center justify-end gap-2">
            <span className="text-sm font-semibold tabular-nums text-ink">
              {d.value}
              {unit}
            </span>
            <span
              className={cn("w-full max-w-16 rounded-t-xl", i === data.length - 1 ? "bg-gradient-to-t from-accent to-blue-400" : "bg-blue-200")}
              style={{ height: `${(d.value / max) * 100}%` }}
            />
            <span className="text-xs text-muted">{d.label}</span>
          </div>
        ))}
      </div>
      {caption && <figcaption className="mt-4 text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}

/* ---------- Media embeds ---------- */
export function Video({ src, caption, poster }: { src: string; caption?: string; poster?: string }) {
  return (
    <figure className="not-prose my-10">
      <video src={src} poster={poster} controls playsInline preload="metadata" className="w-full rounded-2xl border border-line bg-blue-50" />
      {caption && <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}

export function Embed({ src, title, caption, ratio = "16/10" }: { src: string; title: string; caption?: string; ratio?: string }) {
  const url = src.includes("figma.com") && !src.includes("/embed")
    ? `https://www.figma.com/embed?embed_host=portfolio&url=${encodeURIComponent(src)}`
    : src;
  return (
    <figure className="not-prose my-10">
      <div className="overflow-hidden rounded-2xl border border-line bg-blue-50" style={{ aspectRatio: ratio }}>
        <iframe src={url} title={title} loading="lazy" allowFullScreen className="h-full w-full" />
      </div>
      {caption && <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}
