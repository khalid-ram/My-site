import { z } from "zod";

const dateString = z
  .union([z.string(), z.date()])
  .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v))
  .refine((v) => !Number.isNaN(Date.parse(v)), "must be a valid date (YYYY-MM-DD)");

const url = z.url();

/** Abstract cover art variants (see components/visuals/Cover.tsx). */
export const coverVariants = [
  "ascend",
  "revenue",
  "rings",
  "wave",
  "device",
  "nodes",
  "gauge",
  "stack",
  "network",
  "cake",
  "agent",
  "spark",
] as const;

const cover = z.object({
  variant: z.enum(coverVariants),
  /** Optional real image in /public (e.g. "/images/case-studies/x.png"). Overrides the abstract art. */
  image: z.string().startsWith("/").optional(),
  alt: z.string().optional(),
  /** Which part of the image to keep when a card crops it. */
  position: z.enum(["left", "center", "right"]).default("center"),
});

/** Publication status. Drafts are only visible in `next dev`. */
const status = z.enum(["published", "draft"]);

const common = {
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must be kebab-case"),
  title: z.string().min(3),
  summary: z.string().min(10),
  category: z.string().min(2),
  cover,
  tags: z.array(z.string()).default([]),
  status,
  featured: z.boolean().default(false),
  order: z.number().int().default(100),
  publishedAt: dateString.optional(),
  seoDescription: z.string().min(30).max(170),
  /**
   * Internal draft tracking: required sections that still need verified input.
   * Shown only in development, never rendered in production.
   */
  missing: z.array(z.string()).default([]),
};

const metric = z.object({
  label: z.string(),
  value: z.string(),
  before: z.number().optional(),
  after: z.number().optional(),
  unit: z.string().optional(),
  note: z.string().optional(),
});

/**
 * A designed case-study document (e.g. exported from Figma): shown on the page
 * as stacked section images, with the original PDF available to download.
 */
const caseDocument = z.object({
  pdf: z.string().startsWith("/").endsWith(".pdf"),
  pdfSize: z.string().optional(),
  pages: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z0-9-]+$/),
        title: z.string(),
        src: z.string().startsWith("/"),
        width: z.number().int().positive(),
        height: z.number().int().positive(),
        alt: z.string().min(10),
        /**
         * Clickable areas on the design (e.g. "Live at …" or "Open prototype").
         * Coordinates are in Figma design pixels (frame width 1440), relative to this section's top-left.
         */
        links: z
          .array(
            z.object({
              href: z.url(),
              label: z.string().min(3),
              x: z.number().min(0),
              y: z.number().min(0),
              w: z.number().positive(),
              h: z.number().positive(),
            }),
          )
          .default([]),
      }),
    )
    .min(1),
  /** Buttons shown next to "Download PDF" (live website, prototypes). */
  links: z.array(z.object({ label: z.string(), href: z.url(), kind: z.enum(["live", "prototype"]) })).default([]),
});

export const caseStudySchema = z.object({
  ...common,
  document: caseDocument.optional(),
  company: z.string(),
  role: z.string(),
  period: z.string().optional(),
  achievement: z.string().min(10),
  headlineMetric: z.string(),
  metrics: z.array(metric).default([]),
  completeness: z.enum(["summary", "partial", "complete"]),
});

export const devStatuses = ["Live", "Working Prototype", "In Progress", "Exploring"] as const;

export const projectSchema = z.object({
  ...common,
  kind: z.enum(["product", "automation", "experiment"]),
  devStatus: z.enum(devStatuses),
  subtitle: z.string().optional(),
  /** Only list technologies/tools that are confirmed. */
  technologies: z.array(z.string()).default([]),
  /** Explorations listed on the card (e.g. "Failure reporting"). Framed as scope, not results. */
  focus: z.array(z.string()).default([]),
  demoUrl: url.optional(),
  repoUrl: url.optional(),
  screenshots: z
    .array(z.object({ src: z.string().startsWith("/"), alt: z.string().min(3), caption: z.string().optional() }))
    .default([]),
  learnings: z.array(z.string()).default([]),
});

export const articleSchema = z.object({
  ...common,
  updatedAt: dateString.optional(),
});

export type CaseStudyMeta = z.infer<typeof caseStudySchema>;
export type ProjectMeta = z.infer<typeof projectSchema>;
export type ArticleMeta = z.infer<typeof articleSchema>;
export type DevStatus = (typeof devStatuses)[number];
export type CoverVariant = (typeof coverVariants)[number];
