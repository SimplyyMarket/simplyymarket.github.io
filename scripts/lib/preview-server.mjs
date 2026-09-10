// Serveur `astro preview` pour les scripts locaux (PDF du CV, captures du site).
// Nécessite un build préalable (dist/).
//
// Astro 7 n'autorise qu'un serveur de preview par projet et le lance dans un
// processus distinct : tuer le processus lanceur ne suffit pas à l'arrêter.
// On passe donc par `astro preview stop` avant et après, et on lit l'adresse
// réellement annoncée par Astro au lieu de supposer un port.

import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const SERVER_TIMEOUT_MS = 20_000;
const COMMAND_TIMEOUT_MS = 15_000;
const RETRY_DELAY_MS = 300;
const URL_PATTERN = /https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\]):\d+/;
// eslint-disable-next-line no-control-regex
const ANSI_PATTERN = /\[[0-9;]*m/g;

// Point d'entrée de la CLI lu depuis le package.json d'Astro (il change selon les versions).
async function resolveAstroCli(root) {
	const astroDir = path.join(root, 'node_modules', 'astro');
	const { bin } = JSON.parse(await readFile(path.join(astroDir, 'package.json'), 'utf8'));
	const entry = typeof bin === 'string' ? bin : bin?.astro;
	if (!entry) throw new Error('CLI Astro introuvable dans node_modules/astro/package.json');
	return path.join(astroDir, entry);
}

// Lance une commande Astro courte et attend sa fin (le code de sortie est ignoré :
// `preview stop` échoue normalement quand aucun serveur ne tourne).
function runAstroCommand(astroCli, root, args) {
	return new Promise((resolve) => {
		const child = spawn(process.execPath, [astroCli, ...args], { cwd: root, stdio: 'ignore' });
		const timer = setTimeout(() => {
			child.kill();
			resolve();
		}, COMMAND_TIMEOUT_MS);
		child.on('exit', () => {
			clearTimeout(timer);
			resolve();
		});
	});
}

// Attend que la sortie d'`astro preview` annonce une adresse.
function readAnnouncedUrl(child) {
	return new Promise((resolve, reject) => {
		let output = '';
		const timer = setTimeout(() => {
			reject(new Error(`astro preview n'a annoncé aucune adresse. Sortie :\n${output.trim()}`));
		}, SERVER_TIMEOUT_MS);
		const onData = (chunk) => {
			output += chunk.toString().replace(ANSI_PATTERN, '');
			const match = output.match(URL_PATTERN);
			if (match) {
				clearTimeout(timer);
				resolve(match[0]);
			}
		};
		child.stdout.on('data', onData);
		child.stderr.on('data', onData);
		child.on('exit', (code) => {
			if (!output.match(URL_PATTERN)) {
				clearTimeout(timer);
				reject(new Error(`astro preview s'est arrêté (code ${code}). Sortie :\n${output.trim()}`));
			}
		});
	});
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
		await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
	}
	throw new Error(`Serveur de preview injoignable après ${SERVER_TIMEOUT_MS} ms : ${url}`);
}

// Démarre un serveur de preview propre et attend qu'il réponde.
// Renvoie { baseUrl, stop } ; toujours appeler stop() à la fin.
export async function startPreviewServer(root, readyRoute = '/') {
	const astroCli = await resolveAstroCli(root);
	await runAstroCommand(astroCli, root, ['preview', 'stop']);

	const child = spawn(process.execPath, [astroCli, 'preview'], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });
	const stop = async () => {
		child.kill();
		await runAstroCommand(astroCli, root, ['preview', 'stop']);
	};

	try {
		const baseUrl = (await readAnnouncedUrl(child)).replace(/\/$/, '');
		await waitForServer(baseUrl + readyRoute);
		return { baseUrl, stop };
	} catch (error) {
		await stop();
		throw error;
	}
}
