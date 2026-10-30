import type { Metadata } from "next";
import ContactForm from "../../components/ContactForm";
import { siteUrl, contactEmail } from "../../lib/site";

export const metadata: Metadata = {
  title: "Contact Us | QtyRight",
  description: "Contact QtyRight: suggest a calculator, report a wrong result, or ask a question about a material estimate.",
  alternates: { canonical: `${siteUrl}/contact` },
};

export default function ContactPage() {
  return (
    <div className="wrap">
      <div className="page-head">
        <h1>Contact us</h1>
        <p className="lede">
          Found a result that looks wrong? Want a calculator we don't have yet? We read every
          message. Email us at {contactEmail} or use the form below.
        </p>
      </div>
      <ContactForm />
      <div className="prose" style={{ marginTop: 28 }}>
        <h2>Reporting a calculation problem</h2>
        <p>
          The most helpful reports include the calculator you used, the exact inputs, and the
          result you expected (and why). Every formula is printed on its calculator page, so if
          our maths disagrees with a manufacturer data sheet or a contractor's table, send the
          source — we fix verified errors quickly.
        </p>
      </div>
    </div>
  );
}
