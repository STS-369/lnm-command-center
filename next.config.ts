import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/lnm-command-center',
  images: {
    unoptimized: true,
  },
  // trailingSlash: true,  // Uncomment if needed for GitHub Pages
};

export default nextConfig;
