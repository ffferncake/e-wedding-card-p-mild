import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/cover/**"
      },
      {
        pathname: "/gallery/**"
      },
      {
        pathname: "/kbank_logo.jpg"
      }
    ]
  }
};

export default nextConfig;
