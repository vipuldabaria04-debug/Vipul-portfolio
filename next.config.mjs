import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  webpack(config) {
    // @splinetool/react-spline only declares an "import" export condition, which
    // Next's server-side module resolution can't satisfy. Pointing the bare
    // specifier at the package's ESM build fixes that for both server and client.
    config.resolve.alias = {
      ...config.resolve.alias,
      "@splinetool/react-spline$": path.join(
        rootDir,
        "node_modules/@splinetool/react-spline/dist/react-spline.js"
      ),
    };
    return config;
  },
};

export default nextConfig;
