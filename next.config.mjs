const API_URL = process.env.API_URL || "";
const WSS_API_URL = process.env.WSS_API_URL || "";
const WEBSITE_URL = process.env.WEBSITE_URL || "";
const NUM_MILLISECS_TO_WARN_BEFORE_LOGOUT =
  process.env.NUM_MILLISECS_TO_WARN_BEFORE_LOGOUT || "";
const NUM_MILLISECS_TO_SHOW_TIMEOUT_ALERT =
  process.env.NUM_MILLISECS_TO_SHOW_TIMEOUT_ALERT || "";
const USER_COOKIE_NAME = process.env.USER_COOKIE_NAME || "";
const BASE_PATH = process.env.BASE_PATH || "";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const ASSET_PREFIX = process.env.ASSET_PREFIX || "";

const svgrConfig = {
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      "prefixIds",
      {
        name: "removeAttributesBySelector",
        params: {
          selector: "circle",
          attributes: ["id"],
        },
        active: false,
      },
    ],
  },
};

/**@type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  // output: "export",
  env: {
    API_URL,
    WSS_API_URL,
    WEBSITE_URL,
    NUM_MILLISECS_TO_WARN_BEFORE_LOGOUT,
    NUM_MILLISECS_TO_SHOW_TIMEOUT_ALERT,
    USER_COOKIE_NAME,
    BASE_PATH,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
  },
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  basePath: BASE_PATH,
  assetPrefix: ASSET_PREFIX,
  compiler: {
    removeConsole: isProd,
  },
  images: {
    loader: "imgix",
    path: "/",
    unoptimized: true,
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [
          {
            loader: "@svgr/webpack",
            options: svgrConfig,
          },
        ],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
