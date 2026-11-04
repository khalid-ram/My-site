import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { z } from "zod";
import { isDev } from "@/lib/site";
import { caseStudySchema, type CaseStudyMeta } from "./schemas";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type Entry<T> = {
  meta: T;
  body: string;
  headings: Heading[];
  readingMinutes: number;
};

export type Heading = { id: string; text: string };

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractHeadings(body: string): Heading[] {
  const lines = body.replace(/```[\s\S]*?```/g, "").split("\n");
  return lines
    .filter((l) => /^##\s+/.test(l))
    .map((l) => l.replace(/^##\s+/, "").trim())
    .map((text) => ({ id: slugify(text), text }));
}

function readingMinutes(body: string) {
  const words = body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/**
 * Loads and validates a collection synchronously (sync fs reads are prerender-safe
 * with Cache Components). Invalid frontmatter fails the build with a clear message.
 */
type BaseMeta = { id: string; slug: string; order: number; status: "published" | "draft" };

function loadCollection<T extends BaseMeta>(dir: string, schema: z.ZodType<T>): Entry<T>[] {
  const abs = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  const files = fs.readdirSync(abs).filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));

  const entries = files.map((file) => {
    const raw = fs.readFileSync(path.join(abs, file), "utf8");
    const { data, content } = matter(raw);
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
      throw new Error(`Invalid frontmatter in content/${dir}/${file}:\n${issues}`);
    }
    const meta = parsed.data;
    const expected = file.replace(/\.mdx$/, "");
    if (meta.slug !== expected) {
      throw new Error(`content/${dir}/${file}: slug "${meta.slug}" must match file name "${expected}"`);
    }
    const body = content.trim();
    return { meta, body, headings: extractHeadings(body), readingMinutes: readingMinutes(body) };
  });

  const ids = new Set<string>();
  for (const e of entries) {
    const id = e.meta.id;
    if (ids.has(id)) throw new Error(`Duplicate id "${id}" in content/${dir}`);
    ids.add(id);
  }

  return entries.sort((a, b) => a.meta.order - b.meta.order);
}

const visible = <T extends { status: string }>(e: Entry<T>) => isDev || e.meta.status === "published";

// Collection is cached per server process.
let caseStudies: Entry<CaseStudyMeta>[] | undefined;

export function getCaseStudies() {
  caseStudies ??= loadCollection("case-studies", caseStudySchema);
  return caseStudies.filter(visible);
}

export function getCaseStudy(slug: string) {
  return getCaseStudies().find((e) => e.meta.slug === slug);
}
