import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "../../lib/guides";
import { siteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Project Guides — How Much Material Do You Need? | QtyRight",
  description:
    "Worked guides for US home projects: concrete slab quantities by size, bagged vs bulk mulch break-even maths, and paint gallons by room size.",
  alternates: { canonical: `${siteUrl}/guides` },
};

export default function GuidesIndex() {
  return (
    <div className="wrap">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span> Guides
      </nav>
      <div className="page-head">
        <h1>Project guides</h1>
        <p className="lede">
          The reasoning behind the calculators: worked sizes, honest break-even maths, and the
          mistakes that cost real money — each guide links to the tool that does the maths for
          your exact measurements.
        </p>
      </div>
      <div className="related-grid">
        {guides.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="guide-card">
            <h3>{g.title}</h3>
            <p>{g.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
