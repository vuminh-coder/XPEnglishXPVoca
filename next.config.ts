import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
