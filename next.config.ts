import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "search1.kakaocdn.net",
      },
      {
        protocol: "https",
        hostname: "search2.kakaocdn.net",
      },
      {
        protocol: "https",
        hostname: "t1.daumcdn.net",
      },
      {
        protocol: "http",
        hostname: "t1.daumcdn.net",
      },
    ],
  },
};

export default nextConfig;
