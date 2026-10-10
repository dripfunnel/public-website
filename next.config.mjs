import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Fully static site (SSG). `next build` writes plain HTML/CSS/JS to ./out,
	// served by a Cloudflare Worker (wrangler.jsonc).
	output: "export",
	trailingSlash: true,
	images: { unoptimized: true },
	poweredByHeader: false,
	reactStrictMode: true,
	// This project lives inside a larger folder that has its own package-lock.json.
	turbopack: { root },
};

export default nextConfig;
