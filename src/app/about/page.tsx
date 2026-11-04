import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ArrowUpRight, GraduationCap, Languages } from "lucide-react";
import { PageHero, ContactCTA, ExperienceTimeline, TagList } from "@/components/sections/shared";
import { ButtonLink, Section, SectionHeader, cn } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion";
import { builds, competencies, education, languages, profile, tools } from "@/data/profile";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "About Khaled Ahmed Ramadan, Senior Product Manager at Aqarmap: experience, AI agents and vibe-coding projects, skills and education.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Me"
        title={
          <>
            Product manager by craft. <span className="text-gradient">Builder by curiosity.</span>
          </>
        }
        description={
          <p>
            Senior Product Manager working in product since 2019 across B2B and B2C products. At Aqarmap I lead discovery,
            strategy and delivery for monetization, lead quality and listing experiences. As a freelancer I took an EdTech
            platform from concept to a live product. I think strategically and enjoy building: I prototype with AI tools and
            create AI agents that help automate everyday product work.
          </p>
        }
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={profile.cvPath} download={profile.cvFileName} icon="download">
            Download CV
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary" icon="arrow">
            Get in touch
          </ButtonLink>
        </div>
      </PageHero>

      {/* Experience */}
      <Section tone="tint" id="experience" labelledBy="experience-title">
        <SectionHeader eyebrow="Experience" title={<span id="experience-title">Professional experience.</span>} />
        <div className="mt-10">
          <ExperienceTimeline detailed />
        </div>
      </Section>

      {/* AI agents & vibe coding */}
      <Section labelledBy="builds">
        <SectionHeader eyebrow="AI Agents & Vibe Coding" title={<span id="builds">What I build beyond my role.</span>} />
        <ul className="mt-12 grid gap-5">
          {builds.map((b, i) => (
            <Reveal as="li" key={b.name} delay={i * 0.05} className="rounded-[1.5rem] border border-line border-l-4 border-l-accent bg-white p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">{b.name}</h3>
                {b.status && (
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      b.status === "Live" ? "bg-mint-soft text-mint-ink" : "bg-blue-100 text-accent-strong",
                    )}
                  >
                    {b.status}
                  </span>
                )}
              </div>
              <p className="mt-2 leading-relaxed text-muted">{b.summary}</p>

              {b.steps.length > 0 && (
                <ol className={cn("mt-5 grid gap-3 sm:grid-cols-2", b.steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4")}>
                  {b.steps.map((st, n) => (
                    <li key={st.title} className="flex gap-3 rounded-2xl bg-blue-50 p-4">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-white">{n + 1}</span>
                      <span>
                        <span className="block text-sm font-semibold text-ink">{st.title}</span>
                        <span className="mt-0.5 block text-sm text-muted">{st.note}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              )}

              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Built with">
                {b.stack.map((t) => (
                  <li key={t} className="rounded-md border border-line bg-blue-50/60 px-2.5 py-1 text-xs text-ink">
                    {t}
                  </li>
                ))}
              </ul>

              {b.links.length > 0 && (
                <p className="mt-5 flex flex-wrap gap-5">
                  {b.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 font-medium text-accent hover:text-accent-strong"
                    >
                      {l.label}
                      <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:rotate-45" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                </p>
              )}
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Skills */}
      <Section tone="tint" labelledBy="skills">
        <SectionHeader eyebrow="Skills" title={<span id="skills">Skills & tools.</span>} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {competencies.map((c, i) => (
            <Reveal as="li" key={c.title} delay={(i % 4) * 0.05} className="rounded-[1.5rem] border border-line bg-white p-6">
              <h3 className="font-semibold text-ink">{c.title}</h3>
              <ul className="mt-3 space-y-1.5">
                {c.items.map((it) => (
                  <li key={it} className="text-muted">
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
        <div className="mt-10">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Tools</h3>
          <div className="mt-4">
            <TagList items={tools} label="Tools" />
          </div>
        </div>
      </Section>

      {/* Education & languages */}
      <Section labelledBy="education">
        <SectionHeader eyebrow="Education & Languages" title={<span id="education">Background.</span>} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-line bg-white p-6">
            <GraduationCap aria-hidden className="size-6 text-accent" />
            <p className="mt-4 font-semibold text-ink">{education.degree}</p>
            <p className="text-muted">
              {education.school} · {education.period}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-line bg-white p-6">
            <Languages aria-hidden className="size-6 text-accent" />
            <ul className="mt-4 space-y-1">
              {languages.map((l) => (
                <li key={l.name} className="text-ink">
                  <span className="font-semibold">{l.name}</span> <span className="text-muted">· {l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <ContactCTA />
    </>
  );
}
