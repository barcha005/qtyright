import type { MetadataRoute } from "next";
import { tools } from "../lib/tools";
import { guides } from "../lib/guides";
import { siteUrl } from "../lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-31");
  const staticPages = ["", "/guides", "/about", "/contact", "/privacy-policy", "/terms", "/disclaimer", "/faq"];
  return [
    ...staticPages.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "" ? 1 : 0.6,
    })),
    ...tools.map((t) => ({
      url: `${siteUrl}/${t.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...guides.map((g) => ({
      url: `${siteUrl}/guides/${g.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
