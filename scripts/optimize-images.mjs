// Optimizes images the writer uploads through the CMS: caps their width and
// recompresses JPEG/PNG so a large, un-optimized photo doesn't bloat what's
// served to visitors. Runs in CI before the build, alongside translation —
// same "prepare content, commit back, then build" shape.
//
// Skips SVG (vector, nothing to gain) and GIF (resizing/recompressing would
// break animation). A manifest (manifest.json, committed alongside the
// images) records the hash of each file's last-processed state, so already-
// optimized images are skipped outright rather than re-encoded on every CI
// run — repeated lossy re-compression rarely produces byte-identical output,
// so without this a file would shrink by a few bytes and get re-committed
// forever.
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const UPLOADS_DIR = path.resolve(import.meta.dirname, '../public/images/uploads');
const MANIFEST_PATH = path.join(UPLOADS_DIR, 'manifest.json');
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 80;
const OPTIMIZABLE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

function hash(buffer) {
	return createHash('sha256').update(buffer).digest('hex').slice(0, 16);
}

async function loadManifest() {
	try {
		return JSON.parse(await readFile(MANIFEST_PATH, 'utf-8'));
	} catch {
		return {};
	}
}

async function* walk(dir) {
	let entries;
	try {
		entries = await readdir(dir, { withFileTypes: true });
	} catch (err) {
		if (err.code === 'ENOENT') return; // no uploads yet
		throw err;
	}
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(full);
		else yield full;
	}
}

async function optimize(filePath, manifest) {
	const ext = path.extname(filePath).toLowerCase();
	if (!OPTIMIZABLE_EXTENSIONS.has(ext)) return null;

	const rel = path.relative(UPLOADS_DIR, filePath).split(path.sep).join('/');
	const input = await readFile(filePath);
	const inputHash = hash(input);

	if (manifest[rel] === inputHash) return null; // already processed, nothing changed since

	const image = sharp(input);
	const metadata = await image.metadata();

	let pipeline = image;
	if (metadata.width && metadata.width > MAX_WIDTH) {
		pipeline = pipeline.resize({ width: MAX_WIDTH });
	}

	const output =
		ext === '.png'
			? await pipeline.png({ compressionLevel: 9 }).toBuffer()
			: await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();

	if (output.length < input.length) {
		await writeFile(filePath, output);
		manifest[rel] = hash(output);
		return { rel, before: input.length, after: output.length };
	}

	// Already about as small as it'll get — leave the file alone, but still
	// record its hash so future runs skip it without re-encoding.
	manifest[rel] = inputHash;
	return null;
}

async function main() {
	if (!existsSync(UPLOADS_DIR)) {
		// Nothing uploaded yet — nothing to do, and nowhere to write a manifest.
		console.log('No uploads folder yet — nothing to optimize.');
		return;
	}

	const manifest = await loadManifest();
	let optimizedCount = 0;
	let savedBytes = 0;

	for await (const filePath of walk(UPLOADS_DIR)) {
		if (path.resolve(filePath) === MANIFEST_PATH) continue;
		const result = await optimize(filePath, manifest);
		if (result) {
			optimizedCount += 1;
			savedBytes += result.before - result.after;
			console.log(`optimized: ${result.rel} (${(result.before / 1024).toFixed(0)}KB -> ${(result.after / 1024).toFixed(0)}KB)`);
		}
	}

	await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
	console.log(`Done. ${optimizedCount} image(s) optimized, ${(savedBytes / 1024).toFixed(0)}KB saved.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
