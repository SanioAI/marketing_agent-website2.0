import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  /**
   * `standalone` is for Docker/VM deploys. Vercel uses its own output layout;
   * forcing standalone there can break or confuse the build.
   */
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
  async redirects() {
    return [
      { source: "/agents/ecommerce", destination: "/catalog-agents", permanent: true },
      { source: "/platform/catalog-readiness", destination: "/catalog-readiness", permanent: true },
      { source: "/platform/product-intelligence", destination: "/product-intelligence", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
