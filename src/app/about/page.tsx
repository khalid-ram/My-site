import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Award, GraduationCap, Languages } from "lucide-react";
import { PageHero, ContactCTA, ExperienceTimeline, TagList } from "@/components/sections/shared";
import { ButtonLink, Section, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion";
import { certifications, competencies, education, languages, profile, tools } from "@/data/profile";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "About Khaled Ramadan, Senior Product Manager at Aqarmap: career journey, product philosophy, experience, skills, tools, and certifications.",
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
            I&apos;m {profile.firstName}, a {profile.title} based in {profile.location}. I&apos;ve worked in product since 2019, first as a Product Owner at Bites, and since 2022 as Senior Product Manager at Aqarmap, a real estate technology platform serving buyers, sellers, brokers, and real estate businesses.
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

      {/* Philosophy */}
      <Section tone="tint" labelledBy="philosophy">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Product Philosophy</p>
            <h2 id="philosophy" className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
              How I think about the job.
            </h2>
          </div>
          <Reveal>
            <blockquote className="text-2xl font-medium leading-snug tracking-[-0.02em] text-ink text-balance sm:text-3xl">
              &ldquo;{profile.philosophy}&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </Section>

      {/* Career journey */}
      <Section labelledBy="journey">
        <SectionHeader eyebrow="Career Journey" title={<span id="journey">From product owner to product leader.</span>} />
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              year: "2019",
              title: "Product Owner at Bites",
              text: "Defined product features around customer needs, led development end to end, and acted as the main point of contact between teams and stakeholders.",
            },
            {
              year: "2022",
              title: "Senior Product Manager at Aqarmap",
              text: "Owning research, roadmap, and delivery across B2B and B2C, with outcomes in conversion, monetization, lead quality, growth, and delivery efficiency.",
            },
            {
              year: "2025",
              title: "Freelance: EduSmart",
              text: "Led an EdTech marketplace from concept to a delivery-ready MVP, from competitive analysis and Figma prototypes through to client handover.",
            },
          ].map((s, i) => (
            <Reveal as="li" key={s.year} delay={i * 0.06} className="rounded-[1.75rem] border border-line bg-white p-7">
              <p className="font-mono text-sm text-accent">{s.year}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-ink">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Experience */}
      <Section tone="tint" id="experience" labelledBy="experience-title">
        <SectionHeader eyebrow="Experience" title={<span id="experience-title">Professional experience.</span>} />
        <div className="mt-10">
          <ExperienceTimeline detailed />
        </div>
      </Section>

      {/* Competencies & tools */}
      <Section labelledBy="skills">
        <SectionHeader eyebrow="Skills" title={<span id="skills">Core competencies.</span>} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {competencies.map((c, i) => (
            <Reveal as="li" key={c.title} delay={(i % 3) * 0.05} className="rounded-[1.5rem] border border-line bg-white p-6">
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
        <div className="mt-14">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Tools & technologies</h3>
          <div className="mt-4">
            <TagList items={tools} label="Tools and technologies" />
          </div>
        </div>
      </Section>

      {/* Credentials */}
      <Section tone="tint" labelledBy="credentials">
        <SectionHeader eyebrow="Credentials" title={<span id="credentials">Education & certifications.</span>} />
        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-5">
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
          <div className="rounded-[1.5rem] border border-line bg-white p-6">
            <Award aria-hidden className="size-6 text-accent" />
            <ul className="mt-4 divide-y divide-line">
              {certifications.map((c) => (
                <li key={c.name} className="flex flex-col justify-between gap-1 py-3 sm:flex-row sm:items-center">
                  <span className="text-ink">{c.name}</span>
                  <span className="text-sm text-muted">{c.issuer}</span>
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
