import type { NextConfig } from "next";

// O GitHub Pages serve o app em /XPomodoro; em desenvolvimento ele fica na raiz.
const basePath = process.env.NODE_ENV === "production" ? "/XPomodoro" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // A Navbar do @mw/ui usa <a> simples, que não recebe o basePath sozinho como o next/link.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
