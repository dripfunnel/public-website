// After "next build": makes the built folder match the file names the browser asks for.
//
// The browser prefetches pages with flat file names such as  /in/__next.!KGVuKQ.$d$region.$oc$slug.__PAGE__.txt
// but when the site is built on Windows, Next.js writes them into nested folders  /in/__next.!KGVuKQ/$d$region/$oc$slug/__PAGE__.txt
// which makes every prefetch a 404 (pages still open, only slower). This script turns the folders into the flat names.
// On Linux (the Cloudflare build) the files are already flat, so nothing changes.
//
// Folder used: $NEXT_DIST_DIR if set, otherwise "out".
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.env.NEXT_DIST_DIR || 'out');
if (!fs.existsSync(root)) {
  console.log(`fix-export-paths: ${root} not found, nothing to do.`);
  process.exit(0);
}

function files(dir, prefix = []) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? files(path.join(dir, e.name), [...prefix, e.name]) : [{ parts: [...prefix, e.name], full: path.join(dir, e.name) }]));
}

let moved = 0;
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const full = path.join(dir, e.name);
    if (e.name.startsWith('__next.')) {
      for (const f of files(full)) {
        const flat = path.join(dir, [e.name, ...f.parts].join('.'));
        fs.renameSync(f.full, flat);
        moved++;
      }
      fs.rmSync(full, { recursive: true, force: true });
    } else if (e.name !== '_next') {
      walk(full);
    }
  }
}
walk(root);
console.log(`fix-export-paths: renamed ${moved} prefetch files in ${root}.`);
