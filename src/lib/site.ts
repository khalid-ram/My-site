export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const nav = [
  { href: "/case-studies", label: "Key Achievements" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const isDev = process.env.NODE_ENV === "development";
