import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion";
import { experience, profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const description =
  "Khaled Ramadan is a Senior Product Manager in Cairo, Egypt, with a track record in conversion, monetization, and growth — and a hands-on builder exploring AI-assisted development and agents.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    "Senior Product Manager",
    "Product Lead",
    "Growth Product Manager",
    "AI Product Manager",
    "Product Management Portfolio",
    "Cairo",
    "Egypt",
    profile.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: `${profile.name} — ${profile.title}`,
    description,
    url: "/",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${profile.name} — ${profile.title}`, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  url: siteUrl,
  sameAs: [profile.linkedin],
  address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
  worksFor: { "@type": "Organization", name: experience[0].company },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Cairo University" },
  knowsAbout: ["Product management", "Product strategy", "Product discovery", "Conversion optimization", "Monetization", "AI-assisted development"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <MotionProvider>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
