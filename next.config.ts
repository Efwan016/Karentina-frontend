import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.8",
        port: "8000",
        pathname: "/**",
      },
    ],
    unoptimized: true,
     

  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
