import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import { experience, profile } from "@/data/profile";
import { getCaseStudies } from "@/lib/content";
import { ButtonLink, Chip, Eyebrow, cn } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion";

export function ExperienceTimeline({ detailed = false }: { detailed?: boolean }) {
  const aqarmapCount = getCaseStudies().filter((c) => c.meta.company === "Aqarmap").length;
  return (
    <ol className="relative">
      {experience.map((job, i) => (
        <Reveal as="li" key={job.company} delay={i * 0.05} className="relative grid gap-3 border-t border-line py-8 md:grid-cols-[13rem_1fr] md:gap-10">
          <div>
            <p className="text-sm font-medium text-ink">{job.period}</p>
            <p className="mt-1 text-sm text-muted">
              {job.type} · {job.location}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">
              {job.role} <span className="text-muted">at</span> {job.company}
            </h3>
            <p className="mt-1.5 text-muted">{job.companyBlurb}</p>
            {detailed && (
              <ul className="mt-5 space-y-2.5">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-3 leading-relaxed text-ink/90">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-blue-400" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
            {job.caseStudySlugs?.map((slug) => (
              <Link key={slug} href={`/case-studies/${slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-strong">
                Read the case study <ArrowUpRight aria-hidden className="size-4" />
              </Link>
            ))}
            {job.company === "Aqarmap" && (
              <Link href="/case-studies" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-strong">
                {aqarmapCount} case studies from this role <ArrowUpRight aria-hidden className="size-4" />
              </Link>
            )}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function ContactCTA({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  return (
    <section aria-labelledby="contact-cta" className="py-10 md:py-14">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-blue-200 bg-gradient-to-br from-blue-100 via-violet-soft to-peach-soft px-6 py-12 sm:px-12 md:py-16">
          <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-96 animate-drift rounded-full bg-white/60 blur-3xl" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
          <Eyebrow>Contact</Eyebrow>
          <H id="contact-cta" className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.035em] text-ink text-balance sm:text-5xl md:text-6xl">
            Let&apos;s build something meaningful.
          </H>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            I&apos;m always interested in meaningful product challenges, opportunities to collaborate, and conversations about building better products.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={`mailto:${profile.email}`}>
              <Mail aria-hidden className="size-4" /> {profile.email}
            </ButtonLink>
            <ButtonLink href={profile.linkedin} variant="secondary" icon="external">
              <LinkedInIcon className="size-4" /> LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
            <ButtonLink href={profile.cvPath} download={profile.cvFileName} variant="secondary" icon="download">
              Download CV
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative isolate -mt-16 overflow-hidden pt-16 md:-mt-[4.5rem] md:pt-[4.5rem]", className)}>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-white" />
      <div aria-hidden className="absolute -right-40 -top-40 -z-10 size-[36rem] animate-drift rounded-full bg-[radial-gradient(circle,rgba(165,216,255,0.45),transparent_62%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="container-page pb-14 pt-16 md:pb-20 md:pt-24">
        {eyebrow && <Eyebrow className="animate-fade-up mb-4">{eyebrow}</Eyebrow>}
        <h1 className="animate-fade-up max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-ink text-balance [animation-delay:60ms] sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && (
          <div className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty [animation-delay:120ms]">{description}</div>
        )}
        {children && <div className="animate-fade-up [animation-delay:180ms]">{children}</div>}
      </div>
    </section>
  );
}

export function TagList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {items.map((t) => (
        <li key={t}>
          <Chip className="px-3 py-1.5 text-sm">{t}</Chip>
        </li>
      ))}
    </ul>
  );
}
