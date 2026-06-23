import { copyFileSync, existsSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const packageRoot = process.cwd();
const manifestPath = join(packageRoot, 'package.json');
const backupPath = join(packageRoot, 'package.json.dev-backup');

const command = process.argv[2];

if (command === 'prepare') {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

  if (!existsSync(backupPath)) {
    copyFileSync(manifestPath, backupPath);
  }

  delete manifest.devDependencies;
  if (manifest.scripts && typeof manifest.scripts === 'object') {
    delete manifest.scripts.prepack;
    delete manifest.scripts.postpack;
  }

  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
} else if (command === 'restore') {
  if (existsSync(backupPath)) {
    renameSync(backupPath, manifestPath);
  }
} else {
  throw new Error(`Unknown manifest sanitize command: ${command ?? '(none)'}`);
}
