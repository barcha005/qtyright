import type { Metadata } from "next";
import { siteUrl, contactEmail } from "../../lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions | QtyRight",
  description: "The terms for using QtyRight's free calculators and guides: estimates only, no professional advice, acceptable use.",
  alternates: { canonical: `${siteUrl}/terms` },
};

export default function TermsPage() {
  return (
    <div className="wrap">
      <div className="page-head">
        <h1>Terms &amp; Conditions</h1>
        <p className="lede">Last updated: October 31, 2026</p>
      </div>
      <div className="prose">
        <h2>Using this site</h2>
        <p>
          QtyRight provides free online calculators and informational guides for personal,
          non-commercial planning use. By using the site you accept these terms. The tools are
          provided "as is", without warranties of any kind.
        </p>
        <h2>Estimates, not professional advice</h2>
        <p>
          Calculator results are estimates based on standard formulas, published material
          yields and prices you enter. They are not a contractor quote, engineering design, or
          professional advice. Material properties, site conditions and local building codes
          vary. You are responsible for verifying quantities before purchase and for complying
          with local codes and permit requirements. For structural, electrical, plumbing or
          safety-critical work, consult a licensed professional.
        </p>
        <h2>Accuracy</h2>
        <p>
          We work to keep formulas and content accurate and we correct verified errors, but we
          do not guarantee that any result or article is complete, current or error-free, and we
          are not liable for purchases made or losses arising from reliance on an estimate.
        </p>
        <h2>Acceptable use</h2>
        <p>
          Do not misuse the site: no attempting to disrupt its operation, no automated scraping
          that imposes unreasonable load, and no presenting QtyRight results as your own
          professional certification.
        </p>
        <h2>Intellectual property</h2>
        <p>
          The site's text, design and original content belong to QtyRight. You may share and
          link to pages freely; brief excerpts with attribution are fine.
        </p>
        <h2>Third parties</h2>
        <p>
          The site may display advertising from third parties (such as Google AdSense) and link
          to external sites. We are not responsible for third-party content, products or
          privacy practices.
        </p>
        <h2>Changes and contact</h2>
        <p>
          We may update these terms; the current version lives on this page. Questions:{" "}
          {contactEmail}.
        </p>
      </div>
    </div>
  );
}
