// Checks the Arabic dictionaries in content/ar/:
//   1. the same English text translated differently in two files (the merged dictionary keeps only the last one),
//   2. {placeholders} that are missing or different in the Arabic text,
//   3. empty translations.
// Run: npm run i18n:check
import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('content/ar');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
const seen = new Map(); // english -> [{file, ar}]
let problems = 0;

for (const f of files) {
  // The dictionaries are ES modules inside a CommonJS package, so read them as text and evaluate.
  const code = fs.readFileSync(path.join(dir, f), 'utf8').replace(/export default (\w+);?/, 'return $1;');
  const dict = new Function(code)();
  for (const [en, ar] of Object.entries(dict)) {
    if (!seen.has(en)) seen.set(en, []);
    seen.get(en).push({ file: f, ar });
    const a = (en.match(/\{\w+\}/g) || []).sort().join();
    const b = (String(ar).match(/\{\w+\}/g) || []).sort().join();
    if (a !== b) {
      problems++;
      console.log(`PLACEHOLDERS  ${f}: ${JSON.stringify(en)} -> ${JSON.stringify(ar)}`);
    }
    if (!String(ar).trim()) {
      problems++;
      console.log(`EMPTY         ${f}: ${JSON.stringify(en)}`);
    }
  }
}
for (const [en, list] of seen) {
  const values = new Set(list.map((x) => x.ar));
  if (values.size > 1) {
    problems++;
    console.log(`CONFLICT      ${JSON.stringify(en)}`);
    for (const x of list) console.log(`                ${x.file}: ${x.ar}`);
  }
}
console.log(`${seen.size} texts in ${files.length} files. ${problems ? problems + ' problems.' : 'No problems.'}`);
process.exitCode = problems ? 1 : 0;
