// Draws the default sharing image (1200 x 630): the inverse logo on the brand navy.
// Run once with `node scripts/generate-og-image.mjs`; the PNG is committed to public/og/.
// Swap public/og/default.png for a designed image when the owner supplies one (docs/seo.md, open question 2).
import { mkdirSync, readFileSync } from "node:fs";
import sharp from "sharp";

const W = 1200;
const H = 630;
const logoSvg = readFileSync(new URL("../public/assets/dripfunnel-logo-inverse.svg", import.meta.url));
const logo = await sharp(logoSvg, { density: 300 }).resize({ width: 720 }).png().toBuffer();

mkdirSync(new URL("../public/og/", import.meta.url), { recursive: true });
await sharp({ create: { width: W, height: H, channels: 4, background: "#0A2A4A" } })
	.composite([{ input: logo, gravity: "center" }])
	.png()
	.toFile(new URL("../public/og/default.png", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
console.log("wrote public/og/default.png");
