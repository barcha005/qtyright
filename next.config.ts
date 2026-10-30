import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export: deploys to Vercel, Cloudflare Pages, Netlify or
  // GitHub Pages with no server. All calculators run client-side.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
