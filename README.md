# Khaled Ramadan — Portfolio

Personal portfolio for Khaled Ramadan, Senior Product Manager. Built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, Motion, MDX, and Lucide.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000 (drafts + draft notes visible)
npm run check        # lint + typecheck + production build
npm run test:e2e     # Playwright: desktop + mobile, links, SEO, a11y (axe)
```

First time running tests: `npx playwright install chromium`.

## Project structure

```
content/                 ← all editable content (MDX + frontmatter)
  case-studies/          achievements (one file = one case study page; `status: draft` hides it)
public/case-studies/<slug>/    exported Figma section images + downloadable PDF
public/Khaled-Ramadan-CV.pdf   downloadable CV
src/
  app/                   routes: /, /case-studies (Achievements), /about, /contact
                         + sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
  components/
    cards.tsx            AchievementCard
    detail/              DetailLayout + CaseStudyDocument (designed case study + PDF download)
    mdx/                 RichContent renderer + blocks (Callout, Figure, Gallery, ...)
    sections/            Hero, ExperienceTimeline, ContactCTA, PageHero
    visuals/Cover.tsx    abstract cover art (used when no real image is set)
    motion.tsx           Reveal, ReadingProgress, TableOfContents, MotionProvider
    layout/              Navbar, Footer
  data/profile.ts        verified CV data: experience, skills, certifications, metrics
  lib/content/           loader + zod schemas (validation fails the build on bad content)
  lib/seo.ts             per-page metadata helper
e2e/site.spec.ts         end-to-end tests
```

## Editing content

**Rule: only publish verified information.** Sections without verified content are simply left out. They are never filled with placeholder text.

### Add a designed case study (from Figma)
1. Export the case-study frame from Figma as PDF, and as PNG at 2×.
2. Put the PDF and the section images (WebP, one per section) in `public/case-studies/<slug>/`.
3. Create `content/case-studies/<slug>.mdx` — copy `aqarmap-pro.mdx` and update the `document` block (PDF path, size, and each page's `src`, `width`, `height`, `alt`). Use the `01-cover.webp` image as `cover.image`.
4. Set `order` to place it in the Achievements list. The page opens straight into the design, with a Download PDF button.

### Add or extend a text case study
Edit or create `content/case-studies/<slug>.mdx`. The file name must equal `slug`. Key frontmatter:

| Field | Notes |
| --- | --- |
| `achievement`, `headlineMetric` | shown on cards and the page hero |
| `metrics` | `{ label, value, before?, after?, unit? }`; `before`/`after` render a comparison bar |
| `period` | project dates (optional; otherwise company tenure is shown) |
| `featured` | wide card on the case-study grid |
| `order` | display order |
| `completeness` | `summary` / `partial` / `complete` |
| `missing` | sections still needing input; shown **only in `npm run dev`** |
| `cover.image` | optional real image in `/public` (overrides the abstract art) |

Body sections use `##` headings (they auto-populate the table of contents). Recommended order: Overview, The Problem, Discovery & Research, Product Strategy, The Solution, Execution, Results & Impact (`<Results />` renders the metrics), Key Learnings.

### MDX blocks available everywhere
`<Callout type="note|insight|warning" title="">`, `<Quote cite="">`, `<Figure src alt caption full />`, `<Gallery images={[...]} />`, `<BeforeAfter label before after unit />`, `<BeforeAfterImages before={{src,alt}} after={{src,alt}} />`, `<ImpactChart title data={[{label,value}]} />`, `<Video src />`, `<Embed src title />` (Figma URLs auto-convert to embeds), GFM tables, and code blocks.

### Profile, skills, CV
Edit `src/data/profile.ts`. To update the CV, replace `public/Khaled-Ramadan-CV.pdf` (keep the file name).

## Design system

Tokens live in `src/app/globals.css` (`@theme`): white base; baby blue `blue-50…400`; `ink` #172C42 for text; `muted` #52677A for secondary text; `accent` #1D6FAE, a darkened baby blue used for interactive elements so contrast stays ≥ 4.5:1. Typeface: Geist. Motion respects `prefers-reduced-motion`. No personal photography anywhere.

## Deploying to Vercel

1. Push the project to a GitHub repository.
2. In Vercel: **Add New → Project**, then import the repo. The framework is auto-detected, and the defaults (`npm run build`) work.
3. Environment variable (recommended): `NEXT_PUBLIC_SITE_URL=https://your-domain.com`. It is used for canonical URLs, the sitemap, and Open Graph. If it isn't set, Vercel's production URL is used.
4. Optionally add a custom domain under Project → Settings → Domains.

No backend, database, or secrets are required.
