import Link from "next/link";
import { nav } from "@/lib/site";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold tracking-tight text-ink">{profile.name}</p>
          <p className="mt-1 text-muted">
            {profile.title} · {profile.location}
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            Product strategy, measurable outcomes, and hands-on building with AI.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Get in touch</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={`mailto:${profile.email}`} className="break-all text-ink hover:text-accent">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent">
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={profile.cvPath} download={profile.cvFileName} className="text-ink hover:text-accent">
                Download CV (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-page py-6 text-sm text-muted">
          <p>© {profile.name}</p>
        </div>
      </div>
    </footer>
  );
}
