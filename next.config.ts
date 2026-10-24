import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  devIndicators: {
    position: "bottom-left",
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.output = config.output || {};
      config.output.chunkLoadTimeout = 300000; // 300s timeout to prevent Webpack ChunkLoadError during dev compilation
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/leaderboard",
        destination: "/community/leaderboard",
        permanent: true,
      },
      {
        source: "/dictation",
        destination: "/study/dictation",
        permanent: true,
      },
      {
        source: "/shadowing",
        destination: "/study/shadowing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
