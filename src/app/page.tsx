import { Hero } from "@/components/sections/Hero";
import { ContactCTA } from "@/components/sections/shared";
import { AchievementCard } from "@/components/cards";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion";
import { getCaseStudies } from "@/lib/content";

export default function Home() {
  // All published case studies, in the same order as the Achievements page.
  const cases = getCaseStudies();

  return (
    <>
      <Hero />

      {/* All case studies */}
      <Section labelledBy="featured-work" spacing="compact">
        <SectionHeader title={<span id="featured-work">Achievements</span>} />
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 [&>li]:min-w-0">
          {cases.map((entry, i) => (
            <Reveal as="li" key={entry.meta.slug} delay={i * 0.05}>
              <AchievementCard meta={entry.meta} priority={i < 2} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <ContactCTA />
    </>
  );
}
