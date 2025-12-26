import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        // Allow localhost for local development
        "localhost:3000",
        // Allow your specific GitHub Codespaces URL (from the error)
        "fuzzy-space-waffle-pj6jr57vgp79hgwv-3000.app.github.dev",
      ],
    },
  },
  images: {
    domains: ['res.cloudinary.com']
  }
};

export default nextConfig;