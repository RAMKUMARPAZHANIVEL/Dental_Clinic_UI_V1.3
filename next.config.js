/** @type {import('next').NextConfig} */

// Security headers for every page (audit S3). netlify.toml sets the same headers, but Netlify only
// applies those to static files; pages served by the Next.js runtime need them set here.
// Content-Security-Policy is intentionally not set yet (see netlify.toml).
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

const nextConfig = {
  // Match the live site, which serves page URLs with a trailing slash (e.g. /about/).
  trailingSlash: true,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Long-term browser cache for photos (audit P-series). Mirrors netlify.toml.
      // No `immutable` — image files may be replaced at the same URL during optimisation (task 2).
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000" }],
      },
    ];
  },
  images: {
    // Cache Next.js-optimised images (/_next/image) in the browser for one year.
    minimumCacheTTL: 31536000,
  },
};

module.exports = nextConfig;
