import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // swisseph-v2 loads a native .node binary via `require(__dirname + …)`, which
  // the bundler cannot trace. Excluding it entirely lets Node require it
  // directly at runtime. Same setting arc uses.
  serverExternalPackages: ["swisseph-v2"],
};

export default nextConfig;
