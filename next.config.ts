import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  devIndicators: {
    position: "bottom-left",
  },
  async redirects() {
    return [
      {
        source: "/leaderboard",
        destination: "/community/leaderboard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
