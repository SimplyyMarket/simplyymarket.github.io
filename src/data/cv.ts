// Contenu du CV : source unique pour la page web (/cv/ en anglais, /fr/cv/ en français)
// et le PDF papier. Pas de téléphone ici : il est injecté en local au moment de
// générer le PDF papier (scripts/cv-pdf.mjs + private/contact.json, ignoré par git).

export type Lang = 'fr' | 'en';

export interface Job {
	title: string;
	org: string;
	period: string;
	context?: string;
	bullets: string[];
}

export interface Row {
	title: string;
	org: string;
	period: string;
}

export interface Pair {
	label: string;
	value: string;
}

export interface CvContent {
	lang: Lang;
	pageTitle: string;
	headline: string;
	location: string;
	labels: {
		experience: string;
		education: string;
		skills: string;
		background: string;
		languages: string;
		home: string;
		switchLang: string;
	};
	experience: Job[];
	education: Row[];
	skills: Pair[];
	background: string[];
	languages: Pair[];
}

export const identity = {
	name: 'Louis Bich',
	email: 'louis.bich@gmail.com',
	website: 'https://simplyymarket.github.io',
	github: 'https://github.com/SimplyyMarket',
} as const;

export const cvFr: CvContent = {
	lang: 'fr',
	pageTitle: 'CV — Louis Bich, développeur Unity',
	headline:
		'Développeur Unity polyvalent — conception et implémentation de mes propres systèmes de jeu, du game design au code.',
	location: 'Lyon, France',
	labels: {
		experience: 'Expérience',
		education: 'Formation',
		skills: 'Compétences',
		background: 'Parcours compétitif & international',
		languages: 'Langues',
		home: 'Accueil',
		switchLang: 'English version',
	},
	experience: [
		{
			title: 'Développeur principal',
			org: 'Navimancie',
			period: 'janv. 2026 – aujourd’hui',
			context: 'Roguelite sous Unity (C#), équipe de 3 · Lead Game Designer au lancement, puis développeur principal',
			bullets: [
				'Co-conception de l’architecture technique : systèmes découplés communiquant via un EventBus',
				'Système d’effets de combat composable : une dizaine d’effets (gel, étourdissement, brûlure, zone…) combinables et déclenchés par des hooks (impact, mort, invocation…)',
				'IA des unités : pathfinding A* et système de priorités de ciblage',
				'Outils éditeur Unity : éditeur de cartes, éditeur d’arènes avec timeline des vagues d’ennemis',
				'Boucle de combat : pioche et mana, placement des cartes sur grille, déploiement des unités en 3D sur l’arène',
				'Plus de 1 000 tests unitaires automatisés, TDD intégré au workflow de développement',
			],
		},
		{
			title: 'Game Designer / Game Developer',
			org: 'Indépendant',
			period: '2023 – déc. 2025',
			bullets: [
				'Roguelite action incubé à la Plaine Images, Lille (6 mois) : référent game design, contribution au développement et à l’architecture technique',
				'Deux prototypes expérimentaux (un jeu d’échecs, un versus en local) : non aboutis, mais très formateurs',
				'Participation à de nombreuses game jams',
			],
		},
	],
	education: [
		{ title: 'Bachelor Game Design & Creative Coding', org: 'e-artsup, Lyon', period: '2020 – 2023' },
		{ title: 'Diplôme « Les métiers de l’esport »', org: 'PowerHouseGaming, Mulhouse', period: '2017 – 2019' },
		{ title: 'Préparation à la certification en technologies numériques', org: '42, Paris', period: '2015 – 2017' },
		{ title: 'Bac S spécialité mathématiques, mention Très Bien', org: 'Collège du Léman, Suisse', period: '2013' },
	],
	skills: [
		{ label: 'Langage', value: 'C#' },
		{ label: 'Moteurs', value: 'Unity, Unreal Engine' },
		{ label: 'Méthodes', value: 'TDD, architecture événementielle, outils éditeur' },
		{ label: 'Outils', value: 'Git, GitHub, Claude Code (création de skills pour mon workflow), Photoshop, 3ds Max' },
		{ label: 'Qualités', value: 'Analytique, curieux, adaptable, esprit d’équipe' },
	],
	background: [
		'Joueur compétitif : League of Legends à haut niveau (2015 – 2017), Pokémon TCG — top 2 Suisse, 2 participations aux championnats du monde (2013 – 2015)',
		'Organisation d’une LAN : les PGSeries, Mulhouse',
		'Projet humanitaire : enseignement de l’anglais en école primaire à Chengdu, Chine (2015)',
	],
	languages: [
		{ label: 'Français', value: 'langue maternelle' },
		{ label: 'Anglais', value: 'bilingue' },
		{ label: 'Allemand', value: 'B1' },
	],
};

export const cvEn: CvContent = {
	lang: 'en',
	pageTitle: 'Resume — Louis Bich, Unity developer',
	headline: 'Versatile Unity developer — I design and build my own game systems, from game design to code.',
	location: 'Lyon, France',
	labels: {
		experience: 'Experience',
		education: 'Education',
		skills: 'Skills',
		background: 'Competitive & international background',
		languages: 'Languages',
		home: 'Home',
		switchLang: 'Version française',
	},
	experience: [
		{
			title: 'Lead Developer',
			org: 'Navimancie',
			period: 'Jan 2026 – present',
			context: 'Roguelite in Unity (C#), team of 3 · Lead Game Designer at launch, then lead developer',
			bullets: [
				'Co-designed the technical architecture: decoupled systems communicating through an EventBus',
				'Composable combat effect system: about ten stackable effects (freeze, stun, burn, area of effect…) triggered by hooks (on hit, on death, on spawn…)',
				'Unit AI: A* pathfinding and target priority system',
				'Unity editor tools: card editor and arena editor with an enemy wave timeline',
				'Combat loop: draw and mana, grid-based card placement, 3D unit deployment on the arena',
				'1,000+ automated unit tests, TDD built into the development workflow',
			],
		},
		{
			title: 'Game Designer / Game Developer',
			org: 'Independent',
			period: '2023 – Dec 2025',
			bullets: [
				'Action roguelite incubated at Plaine Images, Lille (6 months): game design lead, contributed to development and technical architecture',
				'Two experimental prototypes (a chess game, a local versus game): unfinished, but a huge learning experience',
				'Took part in many game jams',
			],
		},
	],
	education: [
		{ title: 'Bachelor in Game Design & Creative Coding', org: 'e-artsup, Lyon', period: '2020 – 2023' },
		{ title: 'Esports Careers Diploma', org: 'PowerHouseGaming, Mulhouse', period: '2017 – 2019' },
		{ title: 'Digital Technologies Certification preparation', org: '42, Paris', period: '2015 – 2017' },
		{ title: 'Scientific Baccalaureate, Mathematics, highest honours', org: 'Collège du Léman, Switzerland', period: '2013' },
	],
	skills: [
		{ label: 'Language', value: 'C#' },
		{ label: 'Engines', value: 'Unity, Unreal Engine' },
		{ label: 'Practices', value: 'TDD, event-driven architecture, editor tooling' },
		{ label: 'Tools', value: 'Git, GitHub, Claude Code (building custom skills for my workflow), Photoshop, 3ds Max' },
		{ label: 'Strengths', value: 'Analytical, curious, adaptable, team player' },
	],
	background: [
		'Competitive player: League of Legends at a high level (2015 – 2017), Pokémon TCG — top 2 in Switzerland, 2 World Championship appearances (2013 – 2015)',
		'Organised a LAN event: PGSeries, Mulhouse',
		'Humanitarian project: taught English in a primary school in Chengdu, China (2015)',
	],
	languages: [
		{ label: 'French', value: 'native' },
		{ label: 'English', value: 'bilingual' },
		{ label: 'German', value: 'B1' },
	],
};
