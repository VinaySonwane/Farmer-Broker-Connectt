// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow images from any domain (use with caution)
      },
    ],
  },
};

export default nextConfig;
