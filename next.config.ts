import type { NextConfig } from "next";
import path from "path";

const root = path.resolve(process.cwd());

const nextConfig: NextConfig = {
  // Keep tracing/file watching inside this app (parent ~/package-lock.json confuses Next).
  outputFileTracingRoot: root,
  turbopack: {
    root,
    resolveAlias: {
      tailwindcss: path.join(root, "node_modules/tailwindcss"),
      "tw-animate-css": path.join(root, "node_modules/tw-animate-css"),
    },
  },
};

export default nextConfig;
