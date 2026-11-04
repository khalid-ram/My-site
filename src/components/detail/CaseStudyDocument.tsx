import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, Maximize2 } from "lucide-react";
import type { CaseStudyMeta } from "@/lib/content/schemas";

type Doc = NonNullable<CaseStudyMeta["document"]>;

export function DownloadPdfButton({ doc, variant = "primary", className = "" }: { doc: Doc; variant?: "primary" | "secondary"; className?: string }) {
  const fileName = doc.pdf.split("/").pop();
  return (
    <a
      href={doc.pdf}
      download={fileName}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[0.95rem] font-medium transition-colors ${
        variant === "primary"
          ? "bg-ink text-white hover:bg-accent-strong"
          : "border border-line bg-white text-ink hover:border-blue-300 hover:bg-blue-50"
      } ${className}`}
    >
      <Download aria-hidden className="size-4" />
      Download PDF
      {doc.pdfSize && <span className={variant === "primary" ? "text-white/60" : "text-muted"}>· {doc.pdfSize}</span>}
    </a>
  );
}

/**
 * Renders a designed case study (exported from Figma) as full-width stacked
 * sections — the same pages as the downloadable PDF, but responsive and fast.
 */
export function CaseStudyDocument({ doc, title }: { doc: Doc; title: string }) {
  return (
    <section id="case-study" aria-label={`${title} — full case study`} className="pb-16 md:pb-24">
      {/* Sticky toolbar */}
      <div className="sticky top-16 z-30 border-y border-line bg-white/85 backdrop-blur-xl md:top-[4.5rem]">
        <div className="container-page flex items-center justify-between gap-4 py-3">
          <Link
            href="/case-studies"
            className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full pr-1 text-sm font-medium text-ink hover:text-accent"
          >
            <ArrowLeft aria-hidden className="size-4" />
            All case studies
          </Link>
          <a
            href={doc.pdf}
            download={doc.pdf.split("/").pop()}
            className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-white hover:bg-accent-strong"
          >
            <Download aria-hidden className="size-4" />
            Download PDF
          </a>
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-[1440px] sm:px-4 md:mt-6">
        <div className="overflow-hidden border-y border-line bg-white sm:rounded-[1.75rem] sm:border md:shadow-[0_30px_80px_-40px_rgba(23,44,66,0.25)]">
          {doc.pages.map((p, i) => (
            <figure key={p.id} id={p.id} className="group relative scroll-mt-32 md:scroll-mt-36">
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                quality={90}
                priority={i === 0}
                sizes="(min-width: 1440px) 1440px, 100vw"
                className="block h-auto w-full"
              />
              <a
                href={p.src}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-white/90 px-3 py-1.5 text-xs font-medium text-ink opacity-100 shadow-sm backdrop-blur transition-opacity focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
              >
                <Maximize2 aria-hidden className="size-3.5" />
                View full size<span className="sr-only">: {p.title} (opens in a new tab)</span>
              </a>
            </figure>
          ))}
        </div>
      </div>

      <div className="container-page mt-12">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[1.75rem] border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-7 sm:flex-row sm:items-center sm:p-9">
          <div>
            <p className="text-xl font-semibold tracking-[-0.02em] text-ink">Take this case study with you</p>
            <p className="mt-1 text-muted">Download the full {title} case study as a PDF to read offline or share with your team.</p>
          </div>
          <DownloadPdfButton doc={doc} />
        </div>
      </div>
    </section>
  );
}
