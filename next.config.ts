import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  transpilePackages: ["next-mdx-remote"],
  cacheComponents: true,
  reactCompiler: true,
  typedRoutes: true,

  experimental: {
    turbopackFileSystemCacheForDev: true,
    typedEnv: true,
  },
};

export default nextConfig;
