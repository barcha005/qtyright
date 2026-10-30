import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Calculator from "../../components/Calculator";
import AdSlot from "../../components/AdSlot";
import { tools, getTool } from "../../lib/tools";
import { guides } from "../../lib/guides";
import { siteUrl } from "../../lib/site";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  const url = `${siteUrl}/${tool.slug}`;
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: url },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url,
      type: "website",
      images: [{ url: "/og.svg", width: 1200, height: 630, alt: tool.name }],
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const related = tool.related.map(getTool).filter(Boolean);
  const linkedGuides = guides.filter((g) => g.toolSlug === tool.slug);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    url: `${siteUrl}/${tool.slug}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web browser)",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: tool.description,
  };
  const crumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: tool.name, item: `${siteUrl}/${tool.slug}` },
    ],
  };

  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbSchema) }} />

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/#calculators">Calculators</Link> <span aria-hidden="true">›</span> {tool.name}
      </nav>

      <div className="page-head">
        <h1>{tool.name}: How Much Do You Need?</h1>
        <p className="lede">{tool.short} Free, no sign-up — and you get a cost estimate and shopping list, not just a number.</p>
      </div>

      <div className="prose">
        {tool.intro.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </div>

      <Calculator tool={tool} />

      <AdSlot name="tool" />

      <section className="prose">
        <h2>How to use this {tool.name.toLowerCase()}</h2>
        <ol>
          {tool.howTo.map((step) => (
            <li key={step.slice(0, 32)}>{step}</li>
          ))}
        </ol>
        <h2>The formula</h2>
      </section>
      <div className="formula-box">{tool.formula}</div>

      <section className="example-box" style={{ marginTop: 22 }}>
        <h2>Worked example</h2>
        <p style={{ margin: 0 }}>{tool.example}</p>
      </section>

      <section>
        <h2 style={{ fontSize: "1.45rem" }}>{tool.name} FAQs</h2>
        {tool.faqs.map((f) => (
          <div key={f.q} className="faq-item">
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </section>

      {linkedGuides.length > 0 ? (
        <section className="block">
          <h2>Go deeper</h2>
          <div className="related-grid">
            {linkedGuides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="guide-card">
                <h3>{g.title}</h3>
                <p>{g.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="block">
        <h2>Related calculators</h2>
        <div className="related-grid">
          {related.map((r) =>
            r ? (
              <Link key={r.slug} href={`/${r.slug}`} className="guide-card">
                <h3>{r.name}</h3>
                <p>{r.short}</p>
              </Link>
            ) : null,
          )}
        </div>
      </section>

      <p className="prose" style={{ fontSize: ".9rem", color: "var(--muted)" }}>
        Estimates for planning only. Material yields, coverage and prices vary by product and
        region — always confirm quantities with your supplier before ordering, and follow local
        building codes for structural work. See our <Link href="/disclaimer">disclaimer</Link>.
      </p>
    </div>
  );
}
