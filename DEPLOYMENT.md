# Deployment Guide — QtyRight

The site is a **static export**: `npm run build` produces an `out/` folder of
plain HTML/CSS/JS. No server, database or paid service is required.

## Option A — Vercel (recommended)

1. Push this repo to GitHub (already done if you cloned it from there).
2. Go to vercel.com → **Add New… → Project** → import the `qtyright` repo.
3. Framework preset: **Next.js**. Leave build/output settings on defaults
   (Next detects `output: "export"`).
4. Add environment variables (below) in Project → Settings → Environment Variables.
5. Deploy. Every push to `main` redeploys automatically.

## Option B — Cloudflare Pages

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
2. Build command: `npm run build` · Build output directory: `out`.
3. Add the same environment variables under Settings → Environment variables.

## Option C — GitHub Pages

Serve the `out/` folder from a Pages workflow (e.g. `actions/deploy-pages`
with the static export as the artifact). Note: set `NEXT_PUBLIC_SITE_URL` to
the Pages URL (a project site lives under `username.github.io/qtyright`, and
links assume a root domain — a custom domain is recommended).

## Environment variables

Set these in the host dashboard (never commit real values to git — only
`.env.example` is committed):

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | Your real domain, e.g. `https://qtyright.com` (no trailing slash) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | A mailbox you control on that domain |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional, `G-…` from Google Analytics |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Only **after** AdSense approval: `ca-pub-…` |
| `NEXT_PUBLIC_AD_SLOT_HOME` / `_TOOL` / `_GUIDE` | Ad unit IDs you create in AdSense |

Changing env vars requires a redeploy to take effect (they are baked into the
static build).

## Custom domain

1. Buy the domain at any registrar (this project does not buy domains).
   First-choice ideas (check availability): `qtyright.com`, `qtyrightcalc.com`,
   `getqtyright.com`, `qtyrighttools.com`.
2. Vercel: Project → Settings → Domains → add the domain, then set the DNS
   records Vercel shows (usually an A record for the apex and CNAME for `www`).
   Cloudflare Pages: Custom domains tab in the Pages project — DNS is automatic
   if the domain is on Cloudflare.
3. Set `NEXT_PUBLIC_SITE_URL` to the final `https://` domain and redeploy so
   canonicals, sitemap and OG URLs point at the real domain.
4. Wait for HTTPS to provision (automatic on both hosts), then check the live
   site: title on the home page, one calculator, and `/sitemap.xml`.

## Google Search Console

1. Go to search.google.com/search-console → Add property → **Domain** property
   for your domain.
2. Verify via the DNS TXT record Google gives you (add it at your registrar /
   DNS host; propagation can take a few hours).
3. Sitemaps → submit `sitemap.xml` (the full URL, e.g.
   `https://qtyright.com/sitemap.xml`).
4. Use URL Inspection on the home page and 2–3 calculators → Request indexing.
5. Re-check weekly: Pages report (indexed count should reach all 23 URLs),
   and the Performance report for first impressions/queries.

## Google Analytics (optional)

Create a GA4 property → Data Streams → Web → copy the `G-…` Measurement ID →
set `NEXT_PUBLIC_GA_MEASUREMENT_ID` → redeploy → verify in GA4 Realtime.

## AdSense application checklist

Apply only when the live site is complete on its real domain:

- [ ] Site live on the custom domain with HTTPS, all 23 sitemap URLs loading
- [ ] About, Contact, Privacy Policy, Terms and Disclaimer pages published
      (they are — check the contact email works)
- [ ] At least a few weeks of genuine content/traffic history helps; submit
      the domain (not a temporary vercel.app URL) in AdSense
- [ ] After approval: set `NEXT_PUBLIC_ADSENSE_CLIENT_ID` and create three
      display ad units (Home, Tool, Guide) → set the `NEXT_PUBLIC_AD_SLOT_*`
      variables → redeploy
- [ ] Add an `ads.txt` file to `public/` with the line Google provides
      (`google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0` — use the
      exact line from your AdSense account) and redeploy
- [ ] Never click your own ads, never ask others to, never place ads next to
      buttons — the built-in placements already follow this

Approval is Google's decision — nothing in this project guarantees it.
