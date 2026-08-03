import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Grab the existing rule that handles SVGs
    const fileLoaderRule = config.module.rules.find(
      (rule: any): rule is { test?: { test?: (value: string) => boolean }; exclude?: RegExp } =>
        typeof rule === "object" &&
        rule !== null &&
        "test" in rule &&
        typeof (rule as { test?: { test?: (value: string) => boolean } }).test?.test === "function" &&
        (rule as { test?: { test?: (value: string) => boolean } }).test?.test?.(".svg") === true
    );

    // Prevent Next from treating SVGs as static assets
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // Add SVGR loader
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;