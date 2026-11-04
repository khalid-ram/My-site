import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import { PageHero } from "@/components/sections/shared";
import { LinkedInIcon } from "@/components/ui/icons";
import { profile } from "@/data/profile";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Contact Khaled Ramadan, Senior Product Manager, about product roles, collaborations, and conversations about building better products.",
  path: "/contact",
});

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    hint: "The best way to reach me.",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: profile.linkedin,
    hint: profile.linkedinLabel,
    external: true,
  },
  {
    icon: Download,
    label: "CV",
    value: "Download my CV",
    href: profile.cvPath,
    hint: "PDF · 2 pages",
    download: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something <span className="text-gradient">meaningful.</span>
          </>
        }
        description="I'm always interested in meaningful product challenges, opportunities to collaborate, and conversations about building better products."
      >
        <p className="mt-6 inline-flex items-center gap-1.5 text-muted">
          <MapPin aria-hidden className="size-4" /> {profile.location} · Open to international opportunities and remote collaboration
        </p>
      </PageHero>

      <section aria-label="Contact options" className="pb-24 md:pb-32">
        <div className="container-page">
          <ul className="grid gap-5 md:grid-cols-3">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  {...(c.download ? { download: profile.cvFileName } : {})}
                  className="group flex h-full flex-col rounded-[1.75rem] border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_24px_60px_-28px_rgba(29,111,174,0.35)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-blue-100 text-accent">
                      <c.icon aria-hidden className="size-5" />
                    </span>
                    <ArrowUpRight aria-hidden className="size-5 text-muted transition-transform group-hover:rotate-45 group-hover:text-ink" />
                  </div>
                  <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-muted">{c.label}</p>
                  <p className="mt-2 break-all text-xl font-semibold tracking-[-0.02em] text-ink">{c.value}</p>
                  <p className="mt-2 break-all text-sm text-muted">
                    {c.hint}
                    {c.external && <span className="sr-only"> (opens in a new tab)</span>}
                  </p>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-[1.75rem] border border-line bg-blue-50 p-7 sm:p-9">
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">What I&apos;d love to talk about</h2>
            <ul className="mt-5 grid gap-3 text-muted sm:grid-cols-2">
              {[
                "Senior Product Manager and Product Lead roles",
                "Growth and monetization challenges",
                "AI-assisted product development and agents",
                "Collaborations on zero-to-one products",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-blue-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
