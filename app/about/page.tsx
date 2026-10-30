import type { Metadata } from "next";
import { siteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "About Us | QtyRight",
  description:
    "QtyRight builds free, honest material calculators for US homeowners — showing the formula, the cost and the shopping list, with no sign-up and no lead forms.",
  alternates: { canonical: `${siteUrl}/about` },
};

export default function AboutPage() {
  return (
    <div className="wrap">
      <div className="page-head">
        <h1>About QtyRight</h1>
      </div>
      <div className="prose">
        <p>
          QtyRight exists because of a familiar Saturday-morning scene: a homeowner in a store
          aisle, phone in hand, trying to convert a patio into cubic yards while a queue forms
          behind them. The maths isn't hard — it's just scattered, and most calculators stop
          halfway: they give you a volume and leave the bags, boxes, cost and the
          bags-versus-bulk decision to you.
        </p>
        <h2>What we do differently</h2>
        <p>
          Every QtyRight calculator finishes the job. Results are rounded up to whole units you
          can actually buy, priced with editable local rates, and presented as a shopping list
          you can copy or print. The formula is printed on every page, along with the material
          constants it uses — standard bag yields, coverage rates and densities — so you can
          check our working instead of trusting it blindly.
        </p>
        <h2>How the site is run</h2>
        <p>
          QtyRight is free and supported by advertising, displayed separately from the tools.
          We don't sell leads, we don't ask for your email or phone number, and we don't store
          your measurements: every calculation runs in your own browser. If a retailer or
          contractor calculator only exists to steer you to their products, ours exists to give
          you the number first.
        </p>
        <h2>Accuracy and limits</h2>
        <p>
          Our formulas follow the same published standards contractors use, and we test them
          against known worked examples. But materials vary, sites vary, and prices vary —
          results are planning estimates, not quotes or engineering advice. For structural,
          electrical or code-governed work, a licensed local professional is the right call.
        </p>
        <h2>Suggest a calculator</h2>
        <p>
          The roadmap is driven by what people ask for. If there's a material or project we
          don't cover yet, contact us — the most-requested tools get built next.
        </p>
      </div>
    </div>
  );
}
