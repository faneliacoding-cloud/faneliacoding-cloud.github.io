import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/immigration-eval-app",
  assetPrefix: "/immigration-eval-app",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
