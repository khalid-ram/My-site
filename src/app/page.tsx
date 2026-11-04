import { Hero } from "@/components/sections/Hero";
import { ContactCTA } from "@/components/sections/shared";
import { AchievementCard } from "@/components/cards";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion";
import { getCaseStudies } from "@/lib/content";

// Shown on the homepage, in display order.
const HOME_CASES = ["lead-quality-improvement", "listing-cloning", "sub-accounts", "aqarmap-pro"];

export default function Home() {
  const cases = getCaseStudies();
  const featured = HOME_CASES.map((slug) => cases.find((c) => c.meta.slug === slug)).filter((c) => c !== undefined);

  return (
    <>
      <Hero />

      {/* Selected case studies */}
      <Section labelledBy="featured-work" spacing="compact">
        <SectionHeader title={<span id="featured-work">Achievements</span>} action={{ href: "/case-studies", label: "View all" }} />
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 [&>li]:min-w-0">
          {featured.map((entry, i) => (
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
