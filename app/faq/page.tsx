import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions | QtyRight",
  description: "Answers about QtyRight's free material calculators: accuracy, waste allowances, bags vs bulk, privacy, and suggesting new tools.",
  alternates: { canonical: `${siteUrl}/faq` },
};

const faqs = [
  { q: "Is QtyRight free?", a: "Yes. Every calculator and guide is free, with no sign-up, no email form and no usage limits. The site is supported by advertising kept separate from the tools." },
  { q: "Do I need an account?", a: "No. There are no accounts at all. Open a calculator, type your measurements, get your answer." },
  { q: "What happens to my measurements?", a: "Nothing — calculations run in your browser on your device. Your inputs are never transmitted or stored. See the Privacy Policy for the full picture, including analytics and advertising cookies." },
  { q: "How accurate are the results?", a: "Each calculator uses the standard formula for that material and published constants (for example, an 80 lb concrete bag yields ~0.60 cu ft; a gallon of paint covers ~350 sq ft per coat). The formula is printed on every page so you can verify it. Treat results as strong planning estimates and confirm final quantities with your supplier — brands and site conditions vary." },
  { q: "Why do results include extra material (waste)?", a: "Cuts, spills, uneven ground, breakage and pattern matching consume real material. Ordering exactly the theoretical amount almost guarantees running short, and a second order can mean extra delivery fees or a different production batch (a visible problem with tile and flooring). Waste defaults are shown on each tool and you can change them." },
  { q: "Bags or bulk — which should I choose?", a: "For mulch, topsoil and gravel, the calculators compare both with your local prices including the delivery fee, and tell you which is cheaper for your job size. As a rough pattern: bags win under ~2–3 cubic yards, bulk wins above — but your delivery fee moves the crossover, which is why we compute it." },
  { q: "Are prices in the calculators current?", a: "Prices are editable defaults chosen as plausible US examples — they are not live prices. Replace them with your store's current prices for a realistic estimate. Material prices move with region and season." },
  { q: "Can contractors use QtyRight?", a: "Yes — many do, for quick client ballparks. But results are estimates, not bids: measure the actual job, apply your own allowances, and follow local code for structural work." },
  { q: "Do you have metric units?", a: "The launch version is US customary units only (feet, inches, cubic yards), because that's how materials are sold in the US, our primary audience. A metric toggle is on the roadmap for Canadian, UK and Australian visitors." },
  { q: "Can I suggest a new calculator?", a: "Please do — via the Contact page. The build order is driven by requests. Planned next: paver, sod, sand, roofing shingle, wallpaper and insulation calculators." },
  { q: "I found a wrong result. What should I do?", a: "Tell us through the Contact page with the calculator name, your inputs and what you expected. If a manufacturer data sheet or standard table disagrees with ours, we fix it and note the correction." },
];

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="page-head">
        <h1>Frequently asked questions</h1>
        <p className="lede">How QtyRight works, how much to trust an estimate, and how to get a calculator built.</p>
      </div>
      {faqs.map((f) => (
        <div key={f.q} className="faq-item">
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}
      <p style={{ marginTop: 22 }}>
        Still stuck? <Link href="/contact">Contact us</Link>.
      </p>
    </div>
  );
}
