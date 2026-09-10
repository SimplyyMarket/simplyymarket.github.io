// Génère le CV (A4, une page) en anglais et en français à partir des pages /cv/ et
// /fr/cv/ du site, en deux versions :
//   - publique, sans téléphone : public/cv/louis-bich-cv-<lang>.pdf, publiée avec le site
//     (liée depuis la page d'accueil) ;
//   - privée, avec téléphone : private/louis-bich-cv-<lang>.pdf, jamais publiée.
// Le téléphone vient de private/contact.json (ignoré par git).
//
// Usage : npm run cv:pdf   (aperçus PNG dans private/preview/)
// Comparer des mises en page : npm run cv:pdf -- --layouts=classic,sidebar
//   → PDF privés et aperçus uniquement, suffixés par la mise en page

import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { PDFDocument } from 'pdf-lib';
import { startPreviewServer } from './lib/preview-server.mjs';

const ROOT = process.cwd();
const PRIVATE_DIR = path.join(ROOT, 'private');
const PREVIEW_DIR = path.join(PRIVATE_DIR, 'preview');
const PUBLIC_CV_DIR = path.join(ROOT, 'public', 'cv');
const DIST_DIR = path.join(ROOT, 'dist');
const DESKTOP_VIEWPORT = { width: 1280, height: 900 };
const EXPECTED_PAGES = 1;

// La règle @page de src/styles/cv.css n'a pas de marge : les marges sont dans .cv.
const MM_TO_PX = 96 / 25.4;
const A4_VIEWPORT = { width: Math.round(210 * MM_TO_PX), height: Math.floor(297 * MM_TO_PX) };
const FONT_SIZE_PT = { max: 10.5, min: 8.8, step: 0.1 };
const FILL_SAFETY = 0.985;

const VERSIONS = [
	{ lang: 'en', route: '/cv/' },
	{ lang: 'fr', route: '/fr/cv/' },
];

const layoutsArg = process.argv.find((arg) => arg.startsWith('--layouts='));
const LAYOUTS = layoutsArg ? layoutsArg.slice('--layouts='.length).split(',').filter(Boolean) : [];
const IS_COMPARISON = LAYOUTS.length > 0;

async function loadContact() {
	const raw = await readFile(path.join(PRIVATE_DIR, 'contact.json'), 'utf8');
	const contact = JSON.parse(raw);
	if (typeof contact.phone !== 'string' || contact.phone.trim() === '') {
		throw new Error('private/contact.json doit contenir { "phone": "..." }');
	}
	return contact;
}

const compact = (text) => text.replace(/[\s.\-()+]/g, '');
const phoneNeedle = (phone) => compact(phone).slice(-9);

// Garde-fou : le build publié ne doit jamais contenir le numéro.
async function assertNoPhoneInBuild(phone) {
	const needle = phoneNeedle(phone);
	const files = await readdir(DIST_DIR, { recursive: true });
	for (const file of files.filter((name) => name.endsWith('.html'))) {
		const html = await readFile(path.join(DIST_DIR, file), 'utf8');
		if (compact(html).includes(needle)) {
			throw new Error(`Le téléphone apparaît dans le build public : dist/${file}`);
		}
	}
}

// Garde-fou : le PDF public est imprimé depuis la page, qui ne doit pas afficher le numéro.
async function assertPhoneAbsentFromPage(page, phone) {
	const isVisible = await page.evaluate(
		(needle) => document.body.innerText.replace(/[\s.\-()+]/g, '').includes(needle),
		phoneNeedle(phone),
	);
	if (isVisible) throw new Error('Le téléphone est visible dans la page : PDF public annulé');
}

async function fillPhone(page, phone) {
	await page.evaluate((value) => {
		const slot = document.querySelector('[data-slot="phone"]');
		const target = slot?.querySelector('[data-slot-value]');
		if (!slot || !target) throw new Error('Emplacement du téléphone introuvable dans la page');
		target.textContent = value;
		slot.hidden = false;
	}, phone);
}

async function applyLayout(page, layout) {
	await page.evaluate((value) => {
		document.querySelector('.cv').dataset.layout = value;
	}, layout);
}

// Plus grande taille de texte qui tient sur une page : le CV reste lisible et
// remplit la feuille, y compris quand le contenu évolue. La hauteur minimale
// d'une page (min-height) est neutralisée pendant la mesure.
async function fitToOnePage(page) {
	await page.setViewportSize(A4_VIEWPORT);
	const fit = await page.evaluate(
		({ pageHeight, sizes, safety }) => {
			const sheet = document.querySelector('.cv');
			const limit = pageHeight * safety;
			sheet.style.minHeight = '0px';
			try {
				for (let size = sizes.max; size >= sizes.min - 1e-9; size -= sizes.step) {
					document.documentElement.style.fontSize = `${size.toFixed(1)}pt`;
					const height = sheet.getBoundingClientRect().height;
					if (height <= limit) return { size: Number(size.toFixed(1)), fill: height / pageHeight };
				}
				return null;
			} finally {
				sheet.style.minHeight = '';
			}
		},
		{ pageHeight: A4_VIEWPORT.height, sizes: FONT_SIZE_PT, safety: FILL_SAFETY },
	);
	if (!fit) {
		throw new Error(`Trop de contenu : le CV ne tient pas sur une page, même à ${FONT_SIZE_PT.min} pt`);
	}
	return fit;
}

async function printOnePage(page, label) {
	const { size, fill } = await fitToOnePage(page);
	const pdf = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });
	const pageCount = (await PDFDocument.load(pdf)).getPageCount();
	if (pageCount !== EXPECTED_PAGES) {
		throw new Error(`CV (${label}) : ${pageCount} pages au lieu de ${EXPECTED_PAGES}`);
	}
	return { pdf, size, fill };
}

async function savePdf(output, { pdf, size, fill }) {
	await mkdir(path.dirname(output), { recursive: true });
	await writeFile(output, pdf);
	console.info(`✓ ${path.relative(ROOT, output)} — 1 page, texte ${size} pt, page remplie à ${Math.round(fill * 100)} %`);
}

async function renderPublic(page, lang, phone) {
	await assertPhoneAbsentFromPage(page, phone);
	const result = await printOnePage(page, `${lang}, public`);
	await savePdf(path.join(PUBLIC_CV_DIR, `louis-bich-cv-${lang}.pdf`), result);
}

async function renderPrivate(page, label) {
	const result = await printOnePage(page, label);
	await page.screenshot({ path: path.join(PREVIEW_DIR, `cv-papier-${label}.png`), fullPage: true });
	await savePdf(path.join(PRIVATE_DIR, `louis-bich-cv-${label}.pdf`), result);
}

async function renderVersion(browser, baseUrl, { lang, route }, contact) {
	const page = await browser.newPage({ viewport: DESKTOP_VIEWPORT });
	try {
		await page.goto(baseUrl + route, { waitUntil: 'networkidle' });
		await page.evaluate(() => document.fonts.ready);
		await page.screenshot({ path: path.join(PREVIEW_DIR, `cv-web-${lang}.png`), fullPage: true });
		await page.emulateMedia({ media: 'print' });

		if (IS_COMPARISON) {
			await fillPhone(page, contact.phone);
			for (const layout of LAYOUTS) {
				await applyLayout(page, layout);
				await renderPrivate(page, `${lang}-${layout}`);
			}
			return;
		}

		await renderPublic(page, lang, contact.phone);
		await fillPhone(page, contact.phone);
		await renderPrivate(page, lang);
	} finally {
		await page.close();
	}
}

async function main() {
	const contact = await loadContact();
	await assertNoPhoneInBuild(contact.phone);
	await mkdir(PREVIEW_DIR, { recursive: true });

	const { baseUrl, stop } = await startPreviewServer(ROOT, VERSIONS[0].route);
	let browser;
	try {
		browser = await chromium.launch({ channel: 'msedge' });
		for (const version of VERSIONS) {
			await renderVersion(browser, baseUrl, version, contact);
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
