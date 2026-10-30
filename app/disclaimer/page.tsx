import type { Metadata } from "next";
import { siteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Disclaimer | QtyRight",
  description: "QtyRight's results are planning estimates based on standard formulas — not quotes, engineering or code advice. Read the limits before you order.",
  alternates: { canonical: `${siteUrl}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <div className="wrap">
      <div className="page-head">
        <h1>Disclaimer</h1>
      </div>
      <div className="prose">
        <p>
          All calculators and guides on QtyRight provide <strong>estimates for planning
          purposes only</strong>. They are calculated from standard industry formulas and
          typical published material constants (bag yields, coverage rates, densities), plus
          prices and allowances that you can edit.
        </p>
        <p>
          Actual quantities vary with product brand, site conditions, installation method and
          workmanship. Prices shown are examples until you replace them with your local prices.
          Nothing on this site is a contractor quote, a structural or engineering design, or a
          substitute for local building codes and permit requirements, which always take
          precedence.
        </p>
        <p>
          Examples that always need a licensed professional or a code check: structural concrete
          and footings, retaining walls, deck ledgers and railings, fences near property lines
          or utilities, and any gas, electrical or plumbing work. In the US, call 811 before
          you dig.
        </p>
        <p>
          QtyRight is supported by advertising. Advertisements are served by third parties and
          are not endorsements of any product or service.
        </p>
      </div>
    </div>
  );
}
