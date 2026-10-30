import type { Metadata } from "next";
import Link from "next/link";
import ToolsGrid from "../components/ToolsGrid";
import AdSlot from "../components/AdSlot";
import { guides } from "../lib/guides";
import { siteUrl } from "../lib/site";

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "QtyRight",
  url: siteUrl,
  description:
    "Free home material calculators for US homeowners: concrete, paint, mulch, gravel, tile, flooring, drywall, fence, deck, brick, topsoil and lumber quantities with costs.",
};

const homeFaqs = [
  {
    q: "Are the calculators really free?",
    a: "Yes — every calculator is free, with no sign-up, no email form and no usage limit. The site is supported by advertising (clearly separated from the tools), which is why we can keep it that way.",
  },
  {
    q: "How accurate are the estimates?",
    a: "The maths uses the same formulas and material constants contractors and manufacturers publish — standard bag yields, coverage rates and densities, all shown on each page so you can check them. Real projects vary with site conditions, so treat results as a well-founded planning estimate, not a guarantee, and confirm with your supplier.",
  },
  {
    q: "Do you store my measurements or project details?",
    a: "No. Every calculation runs in your browser on your device. Nothing you type is sent to a server or stored.",
  },
  {
    q: "Why do calculators add a waste allowance?",
    a: "Because real projects have cuts, spills, uneven ground and the occasional mistake. Running short mid-job costs far more — in time, delivery fees and mismatched batches — than a small surplus you can return or keep for repairs.",
  },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
      <div className="hero">
        <div className="wrap hero-inner">
          <h1>
            How much do you <span className="hl">actually need to buy?</span>
          </h1>
          <p className="lede">
            Free material calculators for US homeowners and DIYers. Enter your measurements and
            get the exact quantity to order — cubic yards, bags, gallons, sheets and boxes —
            with an estimated cost and a printable shopping list.
          </p>
          <ul className="hero-points">
            <li>✓ No sign-up</li>
            <li>✓ Runs in your browser</li>
            <li>✓ Formula shown on every page</li>
            <li>✓ Bags-vs-bulk cost comparison</li>
          </ul>
        </div>
      </div>

      <section className="block wrap" id="calculators">
        <h2>Material calculators</h2>
        <p className="sub">
          Twelve calculators for the projects Americans actually do — pour it, paint it, spread
          it, lay it, build it. Each one counts whole units you can buy, not just a volume.
        </p>
        <ToolsGrid />
      </section>

      <div className="wrap">
        <AdSlot name="home" />
      </div>

      <section className="block wrap">
        <h2>Why “quantity right” matters</h2>
        <div className="prose">
          <p>
            The average home-improvement mistake is not bad workmanship — it's bad arithmetic.
            A concrete slab that's one bag short gets a weak cold joint. A flooring job ordered
            without waste stalls for a week waiting on a second delivery from a different dye
            lot. A mulch job guessed by eye ends with a second trip to the store in a dirty car.
          </p>
          <p>
            Most online calculators stop at a volume and leave the hard part — how many bags,
            boxes or sheets is that, and what will it cost — to you, in the aisle, on your
            phone. QtyRight finishes the job: every result is rounded up to whole purchasable
            units, priced with rates you can edit to your local store, and formatted as a
            shopping list you can copy or print. Where materials come two ways — bagged or
            bulk, bags or a ready-mix truck — we show you both costs and tell you which wins
            for your job size.
          </p>
        </div>
      </section>

      <section className="block wrap">
        <h2>Project guides</h2>
        <p className="sub">The “why” behind the numbers — worked sizes, break-even maths and the mistakes worth avoiding.</p>
        <div className="related-grid">
          {guides.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="guide-card">
              <h3>{g.title}</h3>
              <p>{g.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="block wrap">
        <h2>Common questions</h2>
        {homeFaqs.map((f) => (
          <div key={f.q} className="faq-item">
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
        <p>
          More questions? See the full <Link href="/faq">FAQ page</Link> or{" "}
          <Link href="/contact">get in touch</Link>.
        </p>
      </section>
    </>
  );
}
