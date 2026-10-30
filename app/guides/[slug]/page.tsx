import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "../../../components/AdSlot";
import { guides, getGuide } from "../../../lib/guides";
import { getTool } from "../../../lib/tools";
import { siteUrl } from "../../../lib/site";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} | QtyRight`,
    description: guide.description,
    alternates: { canonical: `${siteUrl}/guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `${siteUrl}/guides/${guide.slug}`,
      type: "article",
      images: [{ url: "/og.svg", width: 1200, height: 630, alt: guide.title }],
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const tool = getTool(guide.toolSlug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    mainEntityOfPage: `${siteUrl}/guides/${guide.slug}`,
    publisher: { "@type": "Organization", name: "QtyRight", url: siteUrl },
  };

  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/guides">Guides</Link> <span aria-hidden="true">›</span> {guide.title}
      </nav>
      <div className="page-head">
        <h1>{guide.title}</h1>
        <p className="lede">{guide.description}</p>
      </div>

      <div className="prose">
        {guide.sections.map((section, i) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
            {section.bullets ? (
              <ul>
                {section.bullets.map((b) => (
                  <li key={b.slice(0, 32)}>{b}</li>
                ))}
              </ul>
            ) : null}
            {i === 1 ? <AdSlot name="guide" /> : null}
          </section>
        ))}
      </div>

      {tool ? (
        <section className="example-box" style={{ marginTop: 26 }}>
          <h2>Do the maths for your project</h2>
          <p>
            These worked examples use typical sizes. For your exact measurements, use the free{" "}
            <Link href={`/${tool.slug}`}>{tool.name}</Link> — you'll get quantities, costs and a
            shopping list in seconds.
          </p>
        </section>
      ) : null}
    </div>
  );
}
