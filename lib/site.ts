// Central site configuration. Everything environment-specific is read from
// NEXT_PUBLIC_* variables so the domain and ad/analytics IDs can be set at
// deploy time without code changes. See .env.example and DEPLOYMENT.md.

export const siteName = "QtyRight";
export const siteTagline = "Get the quantity right before you buy.";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://qtyright.com").replace(/\/$/, "");
export const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";
export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@qtyright.com";
