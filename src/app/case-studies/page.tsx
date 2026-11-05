import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { getCaseStudies } from "@/lib/content";
import { AchievementCard } from "@/components/cards";
import { PageHero, ContactCTA } from "@/components/sections/shared";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = pageMeta({
  title: "Key Achievements",
  description:
    "Product achievements by Khaled Ramadan at Aqarmap: Lead Quality, Listing Cloning, Sub Accounts, and Aqarmap Pro.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const cases = getCaseStudies();
  return (
    <>
      <PageHero title="Key Achievements" className="[&>div:last-child]:pb-8 md:[&>div:last-child]:pb-10" />
      <section aria-label="All achievements" className="pb-8">
        <div className="container-page">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 [&>li]:min-w-0">
            {cases.map((c, i) => (
              <Reveal as="li" key={c.meta.slug} delay={Math.min(i, 6) * 0.03}>
                <AchievementCard meta={c.meta} priority={i < 2} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
