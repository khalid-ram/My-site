import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudies, getCaseStudy } from "@/lib/content";
import type { CaseStudyMeta } from "@/lib/content/schemas";
import { DetailLayout, TalkCTA } from "@/components/detail/DetailLayout";
import { RichContent } from "@/components/mdx/RichContent";
import { BeforeAfter } from "@/components/mdx/blocks";
import { CaseStudyDocument, DownloadPdfButton } from "@/components/detail/CaseStudyDocument";
import { ButtonLink } from "@/components/ui/primitives";
import { CaseStudySlider } from "@/components/detail/CaseStudySlider";
import { CaseStudySlide } from "@/components/cards";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.meta.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCaseStudy(slug);
  if (!entry) return {};
  const { meta } = entry;
  return pageMeta({ title: `${meta.title} — Case Study`, description: meta.seoDescription, path: `/case-studies/${meta.slug}`, type: "article" });
}

function Results({ meta }: { meta: CaseStudyMeta }) {
  const withBars = meta.metrics.filter((m) => m.before !== undefined && m.after !== undefined);
  const plain = meta.metrics.filter((m) => m.before === undefined || m.after === undefined);
  return (
    <div className="not-prose my-8 space-y-4">
      {plain.length > 0 && (
        <dl className="grid gap-4 sm:grid-cols-2">
          {plain.map((m) => (
            <div key={m.label} className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6">
              <dt className="text-sm text-muted">{m.label}</dt>
              <dd className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-ink">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {withBars.map((m) => (
        <div key={m.label} className="space-y-4">
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6">
            <p className="text-sm text-muted">{m.label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-ink">{m.value}</p>
          </div>
          <BeforeAfter
            label={m.label}
            before={m.before!}
            after={m.after!}
            unit={m.unit}
            afterLabel={m.value.includes("+") ? `${m.after}${m.unit ?? ""}+` : undefined}
            lowerIsBetter={m.after! < m.before!}
          />
        </div>
      ))}
    </div>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const entry = getCaseStudy(slug);
  if (!entry) notFound();
  const { meta, body, headings } = entry;

  const all = getCaseStudies();
  const idx = all.findIndex((c) => c.meta.slug === slug);
  // Every other case study, starting with the one after this.
  const others = [...all.slice(idx + 1), ...all.slice(0, idx)];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.seoDescription,
    author: { "@type": "Person", name: profile.name, url: siteUrl },
    url: `${siteUrl}/case-studies/${meta.slug}`,
    about: meta.category,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <DetailLayout
        bare
        back={{ href: "/case-studies", label: "All case studies" }}
        eyebrow={meta.category}
        title={meta.title}
        highlight={
          <div className="rounded-2xl border border-blue-200 bg-white/80 p-5 backdrop-blur sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Main achievement</p>
            <p className="mt-2 text-xl font-medium leading-snug tracking-[-0.01em] text-ink sm:text-2xl">{meta.achievement}</p>
          </div>
        }
        meta={[
          { label: "Company", value: meta.company },
          { label: "Role", value: meta.role },
          meta.period
            ? { label: "Period", value: meta.period }
            : { label: "Tenure", value: meta.company === "Aqarmap" ? "2022 – Present" : "—" },
          { label: "Focus", value: meta.category.split(" · ")[0] },
        ]}
        cover={meta.document ? undefined : meta.cover}
        actions={
          meta.document ? (
            <>
              <ButtonLink href="#case-study" icon="arrow">
                Read the case study
              </ButtonLink>
              <DownloadPdfButton doc={meta.document} variant="secondary" />
            </>
          ) : undefined
        }
        wide={meta.document ? <CaseStudyDocument doc={meta.document} title={meta.title} company={meta.company} industry={meta.industry} /> : undefined}
        headings={headings}
        missing={meta.missing}
        aside={meta.completeness !== "complete" ? <TalkCTA topic="this work" /> : undefined}
      >
        {body ? <RichContent source={body} components={{ Results: () => <Results meta={meta} /> }} /> : null}
      </DetailLayout>
      {others.length > 0 && (
        <CaseStudySlider title="Other case studies" labels={others.map((c) => c.meta.title)}>
          {others.map((c) => (
            <CaseStudySlide key={c.meta.slug} meta={c.meta} />
          ))}
        </CaseStudySlider>
      )}
    </>
  );
}
