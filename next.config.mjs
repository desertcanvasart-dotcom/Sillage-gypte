/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Faithful, crawlable HTML: pages are statically rendered by default.
  poweredByHeader: false,
  // www is a Railway custom domain on this same service; send it to the
  // canonical apex so only one host is ever indexed.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.sillage-egypte.com" }],
        destination: "https://sillage-egypte.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
