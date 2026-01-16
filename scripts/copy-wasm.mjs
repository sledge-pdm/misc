import { mkdir, cp } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src', 'wasm', 'pkg');
const outDir = path.join(rootDir, 'dist', 'src', 'wasm', 'pkg');

await mkdir(outDir, { recursive: true });
await cp(srcDir, outDir, { recursive: true });
