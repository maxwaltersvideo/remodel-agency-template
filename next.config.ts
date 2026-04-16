import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Cache Components (PPR) ────────────────────────────────────────────────
  cacheComponents: true,

  // ── Image Optimization ────────────────────────────────────────────────────
  images: {
    unoptimized: true,
    qualities: [75],
  },

  // ── Output file tracing exclusions ────────────────────────────────────────
  // Reduces what Turbopack traces/watches during dev on the external T7 SSD
  outputFileTracingExcludes: {
    "*": [
      "./node_modules/@swc/**",
      "./node_modules/webpack/**",
      "./node_modules/typescript/**",
    ],
  },
};

export default nextConfig;
