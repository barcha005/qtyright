# Testing Report — QtyRight (2026-10-31)

## 1. Calculator unit tests — `npm run test:calcs`
19 assertions against independently known worked examples — **all passed**:

- Concrete 10×10 ft @ 4 in, 10% waste → 1.36 yd³, 62 × 80 lb bags (matches published
  bag tables); 60 lb bags → 82.
- Paint 12×12 room, 2 coats → exactly 1.9 gal, buy 2 gal.
- Mulch 20×4 @ 3 in → 10 bags, bags cheaper; large 40×20 bed → bulk wins
  (break-even logic verified in both directions).
- Gravel 20×10 @ 4 in → 3.46 tons at 1.4 tons/yd³.
- Tile 10×8, 12×12, 10% waste → 9 boxes. Flooring 14×12 → 9 boxes.
- Drywall 12×10 + ceiling → 17 × 4×8 sheets.
- Fence 100 ft @ 8 ft spacing → 14 posts, 200 pickets.
- Deck 16×12 → 29 boards with waste.
- Brick modular → 6.86/sq ft (matches published brick tables), 604 bricks for 80 sq ft + 10%.
- Topsoil 8×4 @ 12 in → 22 × 1.5 cu ft bags. Board foot: 10 boards 1×6×8 ft + 20% → 48 bd ft.

## 2. Production build
- `npm run build` — **passed**: Next.js 15.5.28 (patched line; the pinned 15.5.4
  carried CVE-2025-66478 and was upgraded before shipping), TypeScript strict
  check clean, 29 routes generated, static export written to `out/`.
- First Load JS: home 119 KB, tool pages 112 KB (shared chunk 103 KB) — reasonable
  for a React app; HTML is fully server-rendered, so content and default results
  are visible before/without JavaScript.

## 3. Automated QA over the exported site (`scripts/qa.mjs`) — all passed
- Sitemap contains exactly **23 URLs** (8 static + 12 tools + 3 guides);
  robots.txt allows all crawlers and references the sitemap.
- Every one of the 23 pages: unique `<title>`, unique meta description (>40 chars),
  exactly one `<h1>`, and a canonical URL.
- Tool pages carry FAQPage, WebApplication and BreadcrumbList schema; Open Graph
  tags present.
- All internal links on the homepage resolve to exported files; a full link walk
  found no broken internal targets.
- **No ad code renders** when no AdSense publisher ID is configured (by design —
  no fake ads).
- HTTP smoke test of the export (local static server): `/`, a tool page,
  `/guides/`, `/faq/`, `/sitemap.xml`, `/robots.txt` all returned 200.
- Server-rendered default calculator results are present in the raw HTML
  (verified: "You need 1.36 cubic yards of concrete…" on the concrete page),
  so the tools are usable and indexable even before hydration.

## 4. Manual / code-inspection checks
- **Input validation:** numeric inputs clamp through `Number()` parsing with
  non-finite → 0; negative values suppress results and prompt for measurements;
  result region uses `aria-live="polite"`.
- **Accessibility:** every input is wrapped in a `<label>`; landmarks
  (header/nav/main/footer) and breadcrumb `aria-label`s present; focus states
  are visibly styled (amber outline); colour contrast uses dark spruce text on
  light backgrounds.
- **Responsive:** layout breakpoints at 820 px (calculator stacks, footer
  2-col) and 480 px (single-column fields); tool grid is auto-fill minmax.
  Verified by CSS inspection and the exported markup, not on physical devices.
- **Security:** no server, no database, no user data collection; no secrets in
  the repo (`.env*` gitignored except `.env.example`); the only external
  scripts (AdSense/GA) load only when the owner configures their own IDs.
- **Dead code/dependencies:** dependencies are only `next`, `react`,
  `react-dom` (+ types). No placeholder buttons — Copy/Print actions are wired;
  the contact form composes a real `mailto:` email and says so on the page.

## 5. Known limitations (stated honestly)
- Interactive clicking through every calculator was verified via unit tests of
  the underlying maths plus the server-rendered default state, not via a live
  browser session on the deployed site (there is no deployed site yet).
- Core Web Vitals are not field-measured pre-launch; the static, image-free,
  font-local design is built to score well, and PageSpeed should be re-run
  after deployment on the real domain.
- Prices in calculators are editable example defaults, labelled as such on-page.
