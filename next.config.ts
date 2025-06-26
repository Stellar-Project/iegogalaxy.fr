import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: false,
  images: {
    domains: ["cdn.jsdelivr.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
