import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // Use static export
  trailingSlash: true, // Helps with routing
};

export default nextConfig;
