# Homepage hero & navbar — design directions

Scope: navbar (site-wide) and homepage hero, plus the transition into the first section.
Brief: distinctive, premium, personal; white-dominant with baby blue; position Khaled as a
strategist who also builds and explores AI. No personal imagery.

## Research notes

Read on 2026-11-04 (Behance returned HTTP 403 to automated access and was **not** reviewed):

- **brittanychiang.com** — text wordmark, no CTA button in the nav, a small role label above one
  sharp first-person headline ("I build accessible, pixel-perfect experiences for the web."),
  numbered lists, text links ("View Full Résumé") instead of buttons.
- **linear.app** — "A new species of product tool."; spec-style figure labels ("Fig 0.1"); a real
  product artefact (issue UI) as the hero visual rather than decoration.
- **apple.com** — paired text links ("Learn more" / "Buy") per module; restraint in CTA styling.
- **awwwards.com** — content-first opening (a featured card) rather than a generic hero.

Patterns borrowed in spirit: one plain-language positioning line, figure/spec labels, a real
artefact as the visual, text-link CTAs, a minimal wordmark navbar.

---

## Direction 1 — Premium Editorial

- **Navbar:** full-width hairline bar. Wordmark "Khaled Ramadan" left; numbered index links
  right — `(01) Achievements  (02) About  (03) Contact` — in mono; CV as an underlined text link.
- **Hero:** magazine spread. A giant two-line statement ("Strategy, / then the build.") spanning
  the full width with deliberate line breaks, a narrow column of supporting copy offset to the
  right, and a three-item "index" (Strategist / Builder / Explorer) set like a table of contents.
- **Typography:** very large display size, tight tracking, mono for indices and captions.
- **CTAs:** text links only — "Explore my work →", "CV", "LinkedIn".
- **Strength / risk:** the most editorial and calm; risks feeling static and saying less about
  the "builder" side at a glance.

## Direction 2 — Creative Minimalist

- **Navbar:** a small centred floating pill with three links; wordmark as initials only at the
  far left; nothing else.
- **Hero:** one centred sentence revealed word by word on a near-empty white canvas, with a
  single soft baby-blue light that follows the cursor (disabled for reduced motion and touch).
  One circular "Explore" button and a scroll cue.
- **Typography:** medium-large, generous line height, lots of air.
- **CTAs:** a single primary action; CV and LinkedIn only in the navbar/footer.
- **Strength / risk:** memorable and quiet; risks hiding who Khaled is and what he does inside
  five seconds, and recruiters must hunt for the CV.

## Direction 3 — Modern Product Builder ✅ recommended (implemented)

- **Navbar:** wordmark "Khaled Ramadan." (accent full stop) left, minimal links with an underline
  that draws in on hover, and a refined outline "CV ↓" pill. At the top of the page it sits flat on
  the white canvas; on scroll it condenses into a floating, frosted pill.
- **Hero:** asymmetric split.
  - Left: a mono status line ("Senior Product Manager — Aqarmap · Cairo"), then a three-line
    headline that is also the interaction:
    **Strategist by craft. / Builder by habit. / Explorer by nature.**
    The active line is ink with a blue→violet keyword; the others are muted. Lines cycle gently
    on their own and respond to hover/focus/tap.
  - Right: a "spec card" with a Linear-style figure label (`Fig. 01 — The Strategist`) that swaps a
    real artefact for each identity: selected case studies (Strategist), a requirement → prototype →
    live product pipeline from CSA Academy (Builder), and an agent workflow that turns specs into
    test cases and Jira tickets (Explorer, labelled "Exploring").
- **CTAs:** one primary pill "Explore my work", then quiet text links "Download CV · LinkedIn ·
  Get in touch".
- **Transition:** a hairline rule labelled `Fig. 02 — Selected achievements` with a scroll cue that
  leads straight into the case-study grid.
- **Why recommended:** it answers the five-second test (who, what, what's different, why explore)
  in one composition; the three lines express strategy + building + AI exploration without three
  literal cards; the spec card shows real work (good for recruiters and product leaders), and the
  CV/LinkedIn stay one click away for international hiring.

### Motion (all directions)
Short entrance fades, crossfades in the spec card, navbar condensing on scroll, a slow scroll-cue
line. Auto-cycling and all transitions are disabled when `prefers-reduced-motion` is set.
