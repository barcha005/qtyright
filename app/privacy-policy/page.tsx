import type { Metadata } from "next";
import { siteUrl, contactEmail } from "../../lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | QtyRight",
  description: "How QtyRight handles your data: calculations run in your browser, what cookies and advertising mean here, and your choices.",
  alternates: { canonical: `${siteUrl}/privacy-policy` },
};

export default function PrivacyPage() {
  return (
    <div className="wrap">
      <div className="page-head">
        <h1>Privacy Policy</h1>
        <p className="lede">Last updated: October 31, 2026</p>
      </div>
      <div className="prose">
        <h2>The short version</h2>
        <p>
          QtyRight's calculators run entirely in your web browser. The measurements and values
          you type are never sent to us, stored, or shared. We do not offer accounts, and we
          never ask for your name, email or phone number to use a tool.
        </p>
        <h2>Information we collect</h2>
        <p>
          <strong>Calculator inputs:</strong> none — processing happens on your device.
        </p>
        <p>
          <strong>Analytics (if enabled):</strong> we may use Google Analytics to understand
          which pages and tools are useful, in aggregate. This can include pages visited,
          approximate location (country/region), device and browser type. We do not use it to
          identify individual visitors.
        </p>
        <p>
          <strong>Email:</strong> if you contact us, we receive the email address and content
          you send. We use it only to reply, and we do not sell it or add it to marketing lists.
        </p>
        <h2>Advertising and cookies</h2>
        <p>
          This site may display advertising served by Google AdSense. Google and its partners
          may use cookies to serve ads based on your prior visits to this and other websites.
          You can opt out of personalised advertising via Google's Ads Settings
          (adssettings.google.com) and learn more at policies.google.com/technologies/ads.
          Advertising cookies are set by the ad provider, not by our calculators.
        </p>
        <p>
          Our hosting provider may keep standard server logs (IP address, user agent, pages
          requested) for security and reliability, as is normal for any website.
        </p>
        <h2>Children</h2>
        <p>This site is a general-audience tool site and is not directed at children under 13.</p>
        <h2>Your choices</h2>
        <p>
          You can block or delete cookies in your browser settings — the calculators will keep
          working. If you have questions about this policy, contact us at {contactEmail}.
        </p>
        <h2>Changes</h2>
        <p>
          If this policy changes materially, we will update this page and the date above.
        </p>
      </div>
    </div>
  );
}
