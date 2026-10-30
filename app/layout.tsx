import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";
import { siteName, siteTagline, siteUrl, adsenseClientId, gaMeasurementId } from "../lib/site";
import { tools } from "../lib/tools";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Free Home Material Calculators: Concrete, Paint, Mulch & More`,
    template: `%s`,
  },
  description:
    "Free US home material calculators that tell you exactly what to buy: cubic yards, bags, gallons, sheets and boxes — with costs and a printable shopping list. No sign-up, runs in your browser.",
  openGraph: {
    type: "website",
    siteName,
    title: `${siteName} — ${siteTagline}`,
    description:
      "Material calculators for US homeowners: how much concrete, paint, mulch, gravel, tile and more you actually need to buy — with costs.",
    url: siteUrl,
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "QtyRight — home material calculators" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <body>
        {adsenseClientId ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
        {gaMeasurementId ? (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaMeasurementId}');`}
            </Script>
          </>
        ) : null}

        <header id="site-header">
          <div className="wrap header-inner">
            <Link href="/" className="brand" aria-label="QtyRight home">
              <span className="brand-mark" aria-hidden="true">Q✓</span>
              <span>
                Qty<em>Right</em>
                <small>{siteTagline}</small>
              </span>
            </Link>
            <nav aria-label="Main">
              <Link href="/#calculators">Calculators</Link>
              <Link href="/guides">Guides</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer id="site-footer">
          <div className="wrap footer-grid">
            <div>
              <p className="footer-brand">QtyRight</p>
              <p>
                Free material calculators for US homeowners and DIYers. Every tool shows its
                formula, counts whole units you can actually buy, and estimates the cost —
                no sign-up, no lead forms, nothing leaves your browser.
              </p>
            </div>
            <nav aria-label="Calculators">
              <p className="footer-heading">Calculators</p>
              {tools.slice(0, 6).map((t) => (
                <Link key={t.slug} href={`/${t.slug}`}>{t.name}</Link>
              ))}
            </nav>
            <nav aria-label="More calculators">
              <p className="footer-heading">More</p>
              {tools.slice(6).map((t) => (
                <Link key={t.slug} href={`/${t.slug}`}>{t.name}</Link>
              ))}
            </nav>
            <nav aria-label="Site">
              <p className="footer-heading">Site</p>
              <Link href="/guides">Guides</Link>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact Us</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms">Terms &amp; Conditions</Link>
              <Link href="/disclaimer">Disclaimer</Link>
            </nav>
          </div>
          <div className="wrap footer-legal">
            <p>
              © {new Date().getFullYear()} QtyRight. Estimates for planning only — not a
              contractor quote or engineering advice. Always confirm quantities with your
              supplier and follow local building codes.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
