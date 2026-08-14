import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/lnm-command-center',
  images: { unoptimized: true },
};

export default nextConfig;
