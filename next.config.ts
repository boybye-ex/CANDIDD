import type { NextConfig } from "next";

const repoName = "CANDIDD";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Static export has no Image Optimization server
    unoptimized: true,
  },
  // Project Pages live at https://<user>.github.io/CANDIDD/
  basePath: isGithubPages ? `/${repoName}` : undefined,
  assetPrefix: isGithubPages ? `/${repoName}/` : undefined,
};

export default nextConfig;
