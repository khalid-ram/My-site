import type { Metadata } from "next";
import { profile } from "@/data/profile";

/**
 * Per-page metadata. Always sets the OG image explicitly, because a page-level
 * `openGraph` object replaces (not merges with) the one inherited from the layout.
 */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  noindex?: boolean;
}): Metadata {
  const ogTitle = `${title} · ${profile.name}`;
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${profile.name} — ${profile.title}` }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type, title: ogTitle, description, url: path, siteName: profile.name, images, ...(publishedTime ? { publishedTime, authors: [profile.name] } : {}) },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: images.map((i) => i.url) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
