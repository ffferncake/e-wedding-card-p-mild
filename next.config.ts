import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/cover/**"
      },
      {
        pathname: "/gallery/**"
      }
    ]
  }
};

export default nextConfig;
