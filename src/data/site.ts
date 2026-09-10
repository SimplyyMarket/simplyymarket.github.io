// Contenu propre à la page d'accueil (portfolio). Le parcours, les compétences,
// la formation et l'identité viennent de cv.ts, pour ne rien dupliquer.
import { cvEn, cvFr, type CvContent, type Lang } from './cv';

export const FEATURED_PROJECT = 'Navimancie';

export interface HomeContent {
	lang: Lang;
	cv: CvContent;
	homeHref: string;
	cvHref: string;
	otherLang: { lang: Lang; href: string; label: string };
	meta: { title: string; description: string };
	nav: { about: string; project: string; experience: string; skills: string; contact: string };
	hero: { eyebrow: string; primaryCta: string; secondaryCta: string };
	about: { title: string; paragraphs: string[]; facts: string[] };
	project: {
		eyebrow: string;
		name: string;
		genre: string;
		status: string;
		pitch: string;
		highlightsTitle: string;
		tags: string[];
		mediaTitle: string;
		mediaText: string;
	};
	experience: { title: string; featuredNote: string };
	skills: { title: string; languagesTitle: string };
	contact: { title: string; text: string; emailCta: string; linkedinCta: string; resumeCta: string };
	footer: string;
}

export const homeEn: HomeContent = {
	lang: 'en',
	cv: cvEn,
	homeHref: '/',
	cvHref: '/cv/',
	otherLang: { lang: 'fr', href: '/fr/', label: 'Français' },
	meta: {
		title: 'Louis Bich — Unity developer & game designer',
		description: 'Portfolio of Louis Bich, independent Unity developer and game designer based in Lyon, France.',
	},
	nav: { about: 'About', project: 'Navimancie', experience: 'Experience', skills: 'Skills', contact: 'Contact' },
	hero: { eyebrow: 'Unity developer · Game designer', primaryCta: 'See Navimancie', secondaryCta: 'View resume' },
	about: {
		title: 'About',
		paragraphs: [
			'I’m an independent game developer and designer based in Lyon, France. Since 2023, I’ve been building games in Unity, from the first design document to the systems that make them work.',
			'Today I’m the game designer and lead developer of Navimancie, a real-time strategy roguelite planned for release on Steam. Switching between design and code is what I enjoy most: it helps me build systems that are both fun to play and solid under the hood.',
			'My workflow relies on automated tests and on AI tooling I build myself, such as custom Claude Code skills. They make me faster and more rigorous, while every design and architecture decision stays mine.',
		],
		facts: ['Independent since Sep 2023', 'Lyon, France', 'French · English · German'],
	},
	project: {
		eyebrow: 'Featured project',
		name: 'Navimancie',
		genre: 'Real-time strategy roguelite · Unity (C#)',
		status: 'In development · Steam release planned',
		pitch: 'Play cards on a grid to deploy units into the arena, manage your draw and mana, and combine effects to hold off waves of enemies.',
		highlightsTitle: 'What I built',
		tags: ['Unity', 'C#', 'TDD', 'EventBus', 'A* pathfinding', 'Editor tooling'],
		mediaTitle: 'Gameplay video coming soon',
		mediaText: 'A combat demo and a playable build on itch.io are on the way.',
	},
	experience: { title: 'Experience', featuredNote: 'Details in the featured project above' },
	skills: { title: 'Skills', languagesTitle: 'Languages' },
	contact: {
		title: 'Let’s talk',
		text: 'I’m looking for Unity developer and game design roles. The quickest way to reach me is by email or on LinkedIn.',
		emailCta: 'Email me',
		linkedinCta: 'LinkedIn',
		resumeCta: 'Printable resume',
	},
	footer: 'Built with Astro, hosted on GitHub Pages.',
};

export const homeFr: HomeContent = {
	lang: 'fr',
	cv: cvFr,
	homeHref: '/fr/',
	cvHref: '/fr/cv/',
	otherLang: { lang: 'en', href: '/', label: 'English' },
	meta: {
		title: 'Louis Bich — Développeur Unity & game designer',
		description: 'Portfolio de Louis Bich, développeur Unity et game designer indépendant basé à Lyon.',
	},
	nav: { about: 'À propos', project: 'Navimancie', experience: 'Parcours', skills: 'Compétences', contact: 'Contact' },
	hero: { eyebrow: 'Développeur Unity · Game designer', primaryCta: 'Découvrir Navimancie', secondaryCta: 'Voir le CV' },
	about: {
		title: 'À propos',
		paragraphs: [
			'Je suis développeur et game designer indépendant, basé à Lyon. Depuis 2023, je crée des jeux sous Unity, du premier document de conception jusqu’aux systèmes qui les font tourner.',
			'Aujourd’hui, je suis game designer et développeur principal de Navimancie, un jeu de stratégie en temps réel roguelite dont la sortie est prévue sur Steam. Passer du design au code, c’est ce qui me plaît le plus : ça m’aide à construire des systèmes à la fois amusants à jouer et solides sous le capot.',
			'Mon workflow repose sur des tests automatisés et sur des outils IA que je conçois moi-même, comme des skills Claude Code sur mesure. Ils me rendent plus rapide et plus rigoureux, et chaque décision de design et d’architecture reste la mienne.',
		],
		facts: ['Indépendant depuis sept. 2023', 'Lyon, France', 'Français · Anglais · Allemand'],
	},
	project: {
		eyebrow: 'Projet phare',
		name: 'Navimancie',
		genre: 'Stratégie en temps réel roguelite · Unity (C#)',
		status: 'En développement · sortie prévue sur Steam',
		pitch: 'Jouez des cartes sur une grille pour déployer vos unités dans l’arène, gérez votre pioche et votre mana, et combinez les effets pour repousser les vagues d’ennemis.',
		highlightsTitle: 'Ce que j’ai réalisé',
		tags: ['Unity', 'C#', 'TDD', 'EventBus', 'Pathfinding A*', 'Outils éditeur'],
		mediaTitle: 'Vidéo de gameplay à venir',
		mediaText: 'Une démo du combat et une version jouable sur itch.io arrivent bientôt.',
	},
	experience: { title: 'Parcours', featuredNote: 'Détails dans le projet phare ci-dessus' },
	skills: { title: 'Compétences', languagesTitle: 'Langues' },
	contact: {
		title: 'Contact',
		text: 'Je recherche un poste de développeur Unity ou de game designer. Le plus simple pour me joindre : par email ou sur LinkedIn.',
		emailCta: 'M’écrire',
		linkedinCta: 'LinkedIn',
		resumeCta: 'CV imprimable',
	},
	footer: 'Réalisé avec Astro, hébergé sur GitHub Pages.',
};
