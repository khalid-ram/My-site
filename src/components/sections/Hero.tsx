import { profile } from "@/data/profile";
import { ButtonLink } from "@/components/ui/primitives";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate -mt-16 overflow-hidden pt-16 md:-mt-[4.5rem] md:pt-[4.5rem]">
      {/* Background: white with soft blue, violet and peach light */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-blue-50 to-white" />
      <div aria-hidden className="absolute -right-[18%] -top-[35%] -z-10 h-[42rem] w-[42rem] animate-drift rounded-full bg-[radial-gradient(circle,rgba(165,216,255,0.55),transparent_62%)]" />
      <div aria-hidden className="absolute right-[12%] top-[30%] -z-10 h-[26rem] w-[26rem] animate-drift-slow rounded-full bg-[radial-gradient(circle,rgba(198,184,255,0.45),transparent_62%)]" />
      <div aria-hidden className="absolute -bottom-[40%] -left-[12%] -z-10 h-[34rem] w-[34rem] animate-drift-slow rounded-full bg-[radial-gradient(circle,rgba(255,218,198,0.5),transparent_60%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid [mask-image:linear-gradient(to_bottom,black,transparent_85%)] opacity-60" />

      <div className="container-page pb-12 pt-12 sm:pt-16 md:pb-16 md:pt-20">
        <div className="max-w-4xl">
          <p className="animate-fade-up text-base text-muted sm:text-lg">
            <span className="font-semibold text-ink">{profile.name}</span>
            <span aria-hidden> · </span>
            {profile.title}
          </p>

          <h1
            id="hero-title"
            className="animate-fade-up mt-4 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.045em] text-ink text-balance [animation-delay:80ms] sm:text-6xl md:text-7xl"
          >
            Building products that make <span className="text-gradient">an impact.</span>
          </h1>

          <p className="animate-fade-up mt-5 text-lg text-muted [animation-delay:160ms] sm:text-xl">{profile.subline}</p>

          <div className="animate-fade-up mt-8 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <ButtonLink href="/case-studies" icon="arrow">
              Explore My Work
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
