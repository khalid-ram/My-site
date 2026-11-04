import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // 90 keeps text inside exported design boards (case-study documents) crisp.
  images: { qualities: [75, 90] },
  // Case studies are read from content/ at request time (partially prerendered
  // pages), so make sure the folder ships with the server functions on Vercel.
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
    "/case-studies/*": ["./content/**/*"],
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
