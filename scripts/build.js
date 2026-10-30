// Builds the site into _site/ and stamps each page with the commit: npm run build
import { execSync } from 'node:child_process';
import { cp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const out = join(root, '_site');

function commit() {
  const fromCi = process.env.WORKERS_CI_COMMIT_SHA ?? process.env.GITHUB_SHA;
  if (fromCi) return fromCi.slice(0, 7);
  try {
    return execSync('git rev-parse --short=7 HEAD', { cwd: root }).toString().trim();
  } catch {
    return 'local';
  }
}

async function stamp(dir, build) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await stamp(path, build);
    else if (['.html', '.js'].includes(extname(entry.name))) {
      const text = await readFile(path, 'utf8');
      await writeFile(path, text.replaceAll('__BUILD__', build));
    }
  }
}

await rm(out, { recursive: true, force: true });
for (const item of ['index.html', 'styles.css', 'cart', 'src']) {
  await cp(join(root, item), join(out, item), { recursive: true });
}
const build = commit();
await stamp(out, build);
console.log(`Built _site for ${build}`);
