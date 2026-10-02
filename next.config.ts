import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Quote artwork (CDR/PDF) is larger than the 10MB proxy default.
    // A truncated body makes the quote form stay on "Sending…".
    proxyClientMaxBodySize: "45mb",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "printersclub.in",
        pathname: "/images/template-images/**",
      },
    ],
  },
};

export default nextConfig;
