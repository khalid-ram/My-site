import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";

const textLink = "text-ink underline decoration-line underline-offset-[6px] hover:decoration-accent";

/** Homepage hero: brief and static — name, title, one line, actions. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-line">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <h1 id="hero-title" className="text-4xl font-semibold tracking-[-0.04em] text-ink sm:text-6xl">
          {profile.fullName}
        </h1>
        <p className="mt-3 text-xl font-medium text-accent sm:text-2xl">{profile.title}</p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          I lead product strategy and delivery at Aqarmap, and I build with AI to help automate everyday product work.
        </p>
        <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
          <Link
            href="/case-studies"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 text-[0.98rem] font-medium text-white"
          >
            Explore my work <ArrowRight aria-hidden className="size-4" />
          </Link>
          <p className="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem]">
            <a href={profile.cvPath} download={profile.cvFileName} className={textLink}>
              Download CV
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={textLink}>
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link href="/contact" className={textLink}>
              Get in touch
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
