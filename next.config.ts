import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   eslint: {
    // Skip linting errors during `next build`
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
