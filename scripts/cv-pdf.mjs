// Génère le CV papier (A4, une page) en français et en anglais à partir des pages
// /cv/ et /en/cv/ du site. Local uniquement : le téléphone et l'âge viennent de
// private/contact.json (ignoré par git) et ne sont jamais écrits dans dist/.
//
// Usage : npm run cv:pdf
//   → private/louis-bich-cv-fr.pdf, private/louis-bich-cv-en.pdf
//   → aperçus PNG (web + feuille A4) dans private/preview/

import { spawn } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { PDFDocument } from 'pdf-lib';

const ROOT = process.cwd();
const PRIVATE_DIR = path.join(ROOT, 'private');
const PREVIEW_DIR = path.join(PRIVATE_DIR, 'preview');
const DIST_DIR = path.join(ROOT, 'dist');
const PORT = 4329;
const BASE_URL = `http://localhost:${PORT}`;
const SERVER_TIMEOUT_MS = 20_000;
const DESKTOP_VIEWPORT = { width: 1280, height: 900 };
const EXPECTED_PAGES = 1;

const MM_TO_PX = 96 / 25.4;
// Doit rester aligné avec la règle @page de src/styles/cv.css.
const PAGE = { widthMm: 210, heightMm: 297, marginYMm: 11, marginXMm: 13 };
const A4_VIEWPORT = {
	width: Math.round(PAGE.widthMm * MM_TO_PX),
	height: Math.round(PAGE.heightMm * MM_TO_PX),
};
const CONTENT_BOX = {
	width: Math.floor((PAGE.widthMm - 2 * PAGE.marginXMm) * MM_TO_PX),
	height: Math.floor((PAGE.heightMm - 2 * PAGE.marginYMm) * MM_TO_PX),
};
const FONT_SIZE_PT = { max: 10.5, min: 8.8, step: 0.1 };
const FILL_SAFETY = 0.985;

const VERSIONS = [
	{ lang: 'fr', route: '/cv/' },
	{ lang: 'en', route: '/en/cv/' },
];

async function loadContact() {
	const raw = await readFile(path.join(PRIVATE_DIR, 'contact.json'), 'utf8');
	const contact = JSON.parse(raw);
	if (typeof contact.phone !== 'string' || !Number.isInteger(contact.age)) {
		throw new Error('private/contact.json doit contenir { "phone": "...", "age": 31 }');
	}
	return contact;
}

const compact = (text) => text.replace(/[\s.\-()+]/g, '');

// Garde-fou : le build publié ne doit jamais contenir le numéro.
async function assertNoPhoneInBuild(phone) {
	const needle = compact(phone).slice(-9);
	const files = await readdir(DIST_DIR, { recursive: true });
	for (const file of files.filter((name) => name.endsWith('.html'))) {
		const html = await readFile(path.join(DIST_DIR, file), 'utf8');
		if (compact(html).includes(needle)) {
			throw new Error(`Le téléphone apparaît dans le build public : dist/${file}`);
		}
	}
}

// Point d'entrée de la CLI lu depuis le package.json d'Astro (il change selon les versions).
async function resolveAstroCli() {
	const astroDir = path.join(ROOT, 'node_modules', 'astro');
	const { bin } = JSON.parse(await readFile(path.join(astroDir, 'package.json'), 'utf8'));
	const entry = typeof bin === 'string' ? bin : bin?.astro;
	if (!entry) throw new Error('CLI Astro introuvable dans node_modules/astro/package.json');
	return path.join(astroDir, entry);
}

async function startPreviewServer() {
	const astroCli = await resolveAstroCli();
	const server = spawn(process.execPath, [astroCli, 'preview', '--port', String(PORT)], {
		stdio: ['ignore', 'ignore', 'inherit'],
	});
	server.on('exit', (code) => {
		if (code) console.error(`✗ astro preview s'est arrêté (code ${code})`);
	});
	return server;
}

async function waitForServer(url) {
	const deadline = Date.now() + SERVER_TIMEOUT_MS;
	while (Date.now() < deadline) {
		try {
			const response = await fetch(url);
			if (response.ok) return;
		} catch {
			// serveur pas encore prêt, on réessaie
		}
		await new Promise((resolve) => setTimeout(resolve, 300));
	}
	throw new Error(`Serveur de preview injoignable après ${SERVER_TIMEOUT_MS} ms : ${url}`);
}

async function fillPrivateSlots(page, contact) {
	await page.evaluate(({ phone, age }) => {
		const reveal = (slot, text) => {
			const element = document.querySelector(`[data-slot="${slot}"]`);
			if (!element) throw new Error(`Emplacement "${slot}" introuvable dans la page`);
			element.textContent = text;
			element.hidden = false;
		};
		const ageTemplate = document.querySelector('[data-slot="age"]')?.dataset.template ?? '{n}';
		reveal('age', ageTemplate.replace('{n}', String(age)));
		reveal('phone', phone);
	}, contact);
}

// Plus grande taille de texte qui tient sur une page : le CV reste lisible et
// remplit la feuille, y compris quand le contenu évolue.
async function fitToOnePage(page) {
	await page.setViewportSize(CONTENT_BOX);
	const fit = await page.evaluate(
		({ box, sizes, safety }) => {
			const sheet = document.querySelector('.cv');
			const limit = box.height * safety;
			for (let size = sizes.max; size >= sizes.min - 1e-9; size -= sizes.step) {
				document.documentElement.style.fontSize = `${size.toFixed(1)}pt`;
				const height = sheet.getBoundingClientRect().height;
				if (height <= limit) return { size: Number(size.toFixed(1)), fill: height / box.height };
			}
			return null;
		},
		{ box: CONTENT_BOX, sizes: FONT_SIZE_PT, safety: FILL_SAFETY },
	);
	if (!fit) {
		throw new Error(`Trop de contenu : le CV ne tient pas sur une page, même à ${FONT_SIZE_PT.min} pt`);
	}
	return fit;
}

// Aperçu fidèle : une feuille A4 avec les marges d'impression.
async function screenshotSheet(page, file) {
	await page.setViewportSize(A4_VIEWPORT);
	const frame = await page.addStyleTag({
		content: `body { box-sizing: border-box; min-height: 100vh; padding: ${PAGE.marginYMm}mm ${PAGE.marginXMm}mm; }`,
	});
	await page.screenshot({ path: file, fullPage: true });
	await frame.evaluate((node) => node.remove());
}

async function renderVersion(browser, { lang, route }, contact) {
	const page = await browser.newPage({ viewport: DESKTOP_VIEWPORT });
	try {
		await page.goto(BASE_URL + route, { waitUntil: 'networkidle' });
		await page.evaluate(() => document.fonts.ready);
		await page.screenshot({ path: path.join(PREVIEW_DIR, `cv-web-${lang}.png`), fullPage: true });

		await fillPrivateSlots(page, contact);
		await page.emulateMedia({ media: 'print' });
		const { size, fill } = await fitToOnePage(page);
		await screenshotSheet(page, path.join(PREVIEW_DIR, `cv-papier-${lang}.png`));

		const pdf = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });
		const pageCount = (await PDFDocument.load(pdf)).getPageCount();
		if (pageCount !== EXPECTED_PAGES) {
			throw new Error(`CV papier (${lang}) : ${pageCount} pages au lieu de ${EXPECTED_PAGES}`);
		}
		const output = path.join(PRIVATE_DIR, `louis-bich-cv-${lang}.pdf`);
		await writeFile(output, pdf);
		console.info(`✓ ${path.relative(ROOT, output)} — ${pageCount} page, texte ${size} pt, page remplie à ${Math.round(fill * 100)} %`);
	} finally {
		await page.close();
	}
}

async function main() {
	const contact = await loadContact();
	await assertNoPhoneInBuild(contact.phone);
	await mkdir(PREVIEW_DIR, { recursive: true });

	const server = await startPreviewServer();
	let browser;
	try {
		await waitForServer(BASE_URL + VERSIONS[0].route);
		browser = await chromium.launch({ channel: 'msedge' });
		for (const version of VERSIONS) {
			await renderVersion(browser, version, contact);
		}
	} finally {
		await browser?.close();
		server.kill();
	}
}

main().catch((error) => {
	console.error(`✗ ${error.message}`);
	process.exitCode = 1;
});
