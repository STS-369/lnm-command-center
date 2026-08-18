import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server mode (not static export) to enable API routes + SQLite
  images: { unoptimized: true },
};

export default nextConfig;
