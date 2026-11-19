// Entry for make.fun's gta6-meme-x-01: "Post a GTA 6 meme on X".
//
// The meme itself lives on X: Juragan posts the picture from @Parlapo94,
// and this repository hands the house exactly one thing — the post's
// address, stored in POST.json at the repository root. The house reads
// the post back from X (its first picture and its text), builds the
// dossier the judge sees, and writes that dossier to /output after this
// program runs.
//
// So this program's whole job is deliberately small and deterministic:
//   1. read POST.json from the repository root,
//   2. check that its "url" really looks like an X post address, and
//   3. copy the file byte for byte into the output directory.
// No network, no clock, no randomness: both grading runs must produce
// the identical POST.json in the output.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourcePath = join(BOT_DIR, 'POST.json');
const targetPath = join(OUTPUT_DIR, 'POST.json');

// Fail loudly on a malformed hand-in file: a placeholder or a typo'd
// address can never become a valid entry, and a clear error here beats
// a silent invalid grade later.
let post: { url?: unknown };
try {
  post = JSON.parse(readFileSync(sourcePath, 'utf8'));
} catch (err) {
  console.error(`POST.json is not readable JSON: ${(err as Error).message}`);
  process.exit(1);
}

const X_POST_URL = /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+\/?$/;
if (typeof post.url !== 'string' || !X_POST_URL.test(post.url)) {
  console.error(`POST.json "url" is not an X post address: ${String(post.url)}`);
  process.exit(1);
}

// The gate accepts a POST.json of at most 16384 bytes; refuse early
// rather than hand in a file the scorer would mark invalid.
const sourceSize = statSync(sourcePath).size;
if (sourceSize > 16384) {
  console.error(`POST.json is ${sourceSize} bytes, over the 16384-byte gate limit`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(sourcePath, targetPath);

// Verify the copy landed whole: a truncated write would silently hand
// the house a different file than the one this repository holds.
const writtenSize = statSync(targetPath).size;
if (writtenSize !== sourceSize) {
  console.error(`POST.json copy is incomplete: wrote ${writtenSize} of ${sourceSize} bytes`);
  process.exit(1);
}
