import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
import path from "node:path";

const caseDir = path.join(process.cwd(), "content/case-studies");
const caseFiles = fs.readdirSync(caseDir).filter((f) => f.endsWith(".mdx"));
const isPublished = (f: string) => /^status: published$/m.test(fs.readFileSync(path.join(caseDir, f), "utf8"));
const caseStudies = caseFiles.filter(isPublished).map((f) => f.replace(/\.mdx$/, ""));
const hiddenCaseStudies = caseFiles.filter((f) => !isPublished(f)).map((f) => f.replace(/\.mdx$/, ""));

const staticPages = ["/", "/case-studies", "/about", "/contact"];
const allPages = [...staticPages, ...caseStudies.map((s) => `/case-studies/${s}`)];

test("only the four designed case studies are published", () => {
  expect(caseStudies.sort()).toEqual(["aqarmap-pro", "lead-quality-improvement", "listing-cloning", "sub-accounts"]);
});

test("hidden case studies are not reachable or listed", async ({ page, request }) => {
  await page.goto("/case-studies");
  for (const s of hiddenCaseStudies) {
    const html = await (await request.get(`/case-studies/${s}`)).text();
    expect(html, s).toContain("This page doesn");
    await expect(page.locator(`a[href="/case-studies/${s}"]`)).toHaveCount(0);
  }
  await expect(page.locator("main article")).toHaveCount(4);
});

for (const url of allPages) {
  test(`page renders: ${url}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(url);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    expect((await page.locator("h1").textContent())?.trim()).toBeTruthy();
    // SEO basics
    const title = await page.title();
    expect(title).toContain("Khaled Ramadan");
    expect(await page.locator('meta[name="description"]').getAttribute("content")).toBeTruthy();
    expect(await page.locator('meta[property="og:image"]').count()).toBeGreaterThan(0);
    // No dev-only draft panel in production
    await expect(page.getByText("Draft: needs verified input")).toHaveCount(0);
    // No horizontal overflow
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    // Images only come from case-study artwork (no personal photos anywhere)
    const imgs = await page.locator("img").evaluateAll((els) => els.map((e) => (e as HTMLImageElement).src));
    for (const src of imgs) expect(decodeURIComponent(src)).toContain("/case-studies/");
    expect(errors).toEqual([]);
  });
}

test("page titles are unique", async ({ page }) => {
  const titles = new Set<string>();
  for (const url of allPages) {
    await page.goto(url);
    titles.add(await page.title());
  }
  expect(titles.size).toBe(allPages.length);
});

test("removed sections are gone", async ({ page, request }) => {
  for (const url of ["/building", "/writing", "/building/torta-lab"]) {
    expect((await request.get(url)).status(), url).toBe(404);
  }
  await page.goto("/");
  await expect(page.locator('a[href^="/building"], a[href^="/writing"]')).toHaveCount(0);
});

test("CV download serves the PDF", async ({ request, page }) => {
  const res = await request.get("/Khaled-Ramadan-CV.pdf");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("pdf");
  await page.goto("/");
  const link = page.locator("main").getByRole("link", { name: "Download CV" }).first();
  await expect(link).toHaveAttribute("download", /\.pdf$/);
});

test("contact links are correct", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator('a[href="mailto:Khaledram96@gmail.com"]').first()).toBeVisible();
  const li = page.locator('a[href="https://linkedin.com/in/khalid-ramadan-4a0a87221"]').first();
  await expect(li).toHaveAttribute("target", "_blank");
  await expect(li).toHaveAttribute("rel", /noopener/);
});

test("all internal links resolve", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const url of staticPages) {
    await page.goto(url);
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute("href")!));
    hrefs.forEach((h) => seen.add(h.split("#")[0] || "/"));
  }
  for (const href of seen) {
    const res = await request.get(href);
    expect(res.status(), href).toBe(200);
  }
});

test("sitemap lists every case study", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const s of caseStudies) expect(xml).toContain(`/case-studies/${s}`);
  expect(xml).not.toContain("/building");
  expect(xml).not.toContain("/writing");
});

test("designed case study shows sections and a downloadable PDF", async ({ page, request }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Listing Cloning" }).first().click();
  await expect(page).toHaveURL(/\/case-studies\/listing-cloning$/);
  const sections = page.locator("#case-study figure img");
  await expect(sections).toHaveCount(9);
  for (const img of await sections.all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  const pdfLink = page.locator('main a[download][href*="listing-cloning"]').first();
  const href = await pdfLink.getAttribute("href");
  const res = await request.get(href!);
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("pdf");
  const [download] = await Promise.all([page.waitForEvent("download"), pdfLink.click()]);
  expect(download.suggestedFilename()).toMatch(/Listing-Cloning.*\.pdf$/);
});

test("case studies open straight into the content (no intro hero)", async ({ page }) => {
  await page.goto("/case-studies/listing-cloning");
  const docTop = await page.locator("#case-study").evaluate((el) => el.getBoundingClientRect().top);
  expect(docTop).toBeLessThan(120);
  await expect(page.locator("#case-study figure").first()).toBeInViewport();
  await expect(page.getByText("Main achievement")).toHaveCount(0);
});

test("other case studies slider shows one at a time with dots", async ({ page }) => {
  await page.goto("/case-studies/lead-quality-improvement");
  const slider = page.locator('section[aria-labelledby="other-case-studies"]');
  await expect(slider.getByRole("heading", { name: "Other case studies" })).toBeVisible();
  await expect(slider.locator("li")).toHaveCount(caseStudies.length - 1);
  await expect(slider.locator('a[href="/case-studies/lead-quality-improvement"]')).toHaveCount(0);
  const dots = slider.getByRole("group", { name: "Choose a case study" }).getByRole("button");
  await expect(dots).toHaveCount(caseStudies.length - 1);
  await expect(dots.nth(0)).toHaveAttribute("aria-current", "true");
  await slider.scrollIntoViewIfNeeded();
  await dots.nth(1).click();
  await expect(dots.nth(1)).toHaveAttribute("aria-current", "true");
  const current = slider.locator('li[aria-hidden="false"]');
  await expect(current).toHaveCount(1);
  await current.getByRole("link", { name: "View case study" }).click();
  await expect(page).toHaveURL(/\/case-studies\/sub-accounts$/);
});

test("back-to-top button appears after scrolling and returns to top", async ({ page }) => {
  await page.goto("/case-studies/aqarmap-pro");
  const btn = page.getByRole("button", { name: "Back to top" });
  await expect(btn).toHaveCount(0);
  await page.evaluate(() => window.scrollTo(0, 3000));
  await expect(btn).toBeVisible();
  await btn.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
});

test("mobile menu navigates", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.locator("#mobile-menu").getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
});

for (const url of [...staticPages, "/case-studies/aqarmap-pro"]) {
  test(`accessibility (axe): ${url}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(url);
    await page.waitForTimeout(400);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`)).toEqual([]);
  });
}
