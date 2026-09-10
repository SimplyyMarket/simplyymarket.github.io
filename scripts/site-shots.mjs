// Captures d'écran du site pour relire le design en local (pages × largeurs d'écran).
//
// Usage : npm run site:shots
//   → private/preview/site-<page>-<largeur>.png

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { startPreviewServer } from './lib/preview-server.mjs';

const ROOT = process.cwd();
const PREVIEW_DIR = path.join(ROOT, 'private', 'preview');

const PAGES = [
	{ name: 'home-en', route: '/' },
	{ name: 'home-fr', route: '/fr/' },
];

const VIEWPORTS = [
	{ name: 'desktop', width: 1440, height: 900 },
	{ name: 'mobile', width: 390, height: 844 },
];

async function capture(browser, baseUrl, target, viewport) {
	const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
	try {
		await page.goto(baseUrl + target.route, { waitUntil: 'networkidle' });
		await page.evaluate(() => document.fonts.ready);
		const file = path.join(PREVIEW_DIR, `site-${target.name}-${viewport.name}.png`);
		await page.screenshot({ path: file, fullPage: true });
		console.info(`✓ ${path.relative(ROOT, file)}`);
	} finally {
		await page.close();
	}
}

async function main() {
	await mkdir(PREVIEW_DIR, { recursive: true });
	const { baseUrl, stop } = await startPreviewServer(ROOT, PAGES[0].route);
	let browser;
	try {
		browser = await chromium.launch({ channel: 'msedge' });
		for (const target of PAGES) {
			for (const viewport of VIEWPORTS) {
				await capture(browser, baseUrl, target, viewport);
			}
		}
	} finally {
		await browser?.close();
		await stop();
	}
}

main().catch((error) => {
	console.error(`✗ ${error.message}`);
	process.exitCode = 1;
});
