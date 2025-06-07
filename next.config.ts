import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-a419ff2525834eb4bdd889e2a1e64999.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
