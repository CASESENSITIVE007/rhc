import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF is ~20–30% smaller than WebP; browsers without it get WebP.
    formats: ["image/avif", "image/webp"],
    // Keep optimised images cached for 30 days instead of re-encoding them.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
