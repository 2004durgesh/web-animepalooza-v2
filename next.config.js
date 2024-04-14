/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  extendDefaultRuntimeCaching: true,
});

module.exports = withPWA({
  reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*',
        },
      ],
    },
    logging: {
      fetches: {
        fullUrl: true,
      },
      level: 'verbose'
    },
});


// module.exports = nextConfig
