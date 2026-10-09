/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site (SSG): every page is built ahead of time into plain files.
  output: 'export',
  // /in/pricing/ (matches the owner's addresses such as https://www.dripfunnel.com/ae/)
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  // Lets two builds run side by side in different folders (NEXT_DIST_DIR=.next-b npm run build).
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // A 404 page for the whole site although there are several root layouts (English, Arabic, bare address).
  experimental: { globalNotFound: true },
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
