# Louis Bich — CV + Portfolio — Suivi des tâches

Repo local : `louis-bich-portfolio` → repo GitHub : `SimplyyMarket/simplyymarket.github.io`
Site : `https://simplyymarket.github.io`

Légende : `[Toi]` action attendue de Louis · `[Moi]` je peux l'exécuter · `[Ensemble]` session commune

---

## Phase 0 — Fondations — TERMINÉE

- [x] `[Moi]` Scaffolder le repo Astro (template minimal, design original)
- [x] `[Moi]` Config Astro pour `simplyymarket.github.io` (pas de `base`)
- [x] `[Moi]` Workflow GitHub Actions : build Astro → déploiement Pages (`withastro/action`)
- [x] `[Toi]` Repo `simplyymarket.github.io` créé à la main, Pages en source "GitHub Actions" (pas besoin de `gh` CLI)

## Phase 1 — CV (EN + FR, web + papier) — CONTENU VALIDÉ

Historique : la v1 RenderCV a été rejetée (mise en page peu soignée, titres anglais sur contenu français, formation illisible, 2 pages, versions papier/numérique quasi identiques). Le téléphone était aussi public (YAML dans le repo + PDF papier servi sur le site) : retiré du site et du repo, puis effacé de l'historique git (réécriture + force push le 11/09/2026). Sauvegarde de l'ancien historique : `private/backup-avant-reecriture.bundle` (local uniquement).

Fonctionnement actuel :
- Contenu : `src/data/cv.ts` (anglais + français, sans téléphone ni âge)
- Version numérique = page web : `/cv/` (anglais, par défaut) et `/fr/cv/` (français)
- Version papier = PDF A4 d'une page, **local uniquement** : `npm run cv:pdf` → `private/louis-bich-cv-en.pdf` et `private/louis-bich-cv-fr.pdf` (téléphone injecté depuis `private/contact.json`, ignoré par git)
- Comparer des mises en page : `npm run cv:pdf -- --layouts=classic,sidebar`
- Garde-fous du script : exactement 1 page (taille du texte ajustée automatiquement entre 8,8 et 10,5 pt) et aucun numéro de téléphone dans le build publié

- [x] `[Ensemble]` Contenu validé : accroche, C++ retiré, 6 réalisations Navimancie, parcours condensé, coquille corrigée
- [x] `[Ensemble]` Claude Code rangé dans « Outils » (création de skills pour le workflow)
- [x] `[Ensemble]` Âge retiré de toutes les versions (web et papier)
- [x] `[Ensemble]` Expérience regroupée : « Développeur et game designer indépendant, 2023 – aujourd'hui », avec 3 projets (Navimancie — sortie Steam prévue, Plaine Images Projet EON, juin – déc. 2025, prototypes et game jams)
- [x] `[Ensemble]` Liens : site portfolio conservé, profil GitHub retiré (presque vide pour l'instant)
- [x] `[Moi]` Anglais par défaut : `/cv/` = anglais, `/fr/cv/` = français
- [x] `[Moi]` Téléphone effacé de l'historique git
- [x] `[Toi]` LinkedIn ajouté : https://www.linkedin.com/in/bichlouis/
- [x] `[Ensemble]` Rôles corrigés : Navimancie = game designer et développeur principal ; roguelite Plaine Images = game designer et développeur (+ conception des mécaniques de jeu)
- [x] `[Ensemble]` Compétences regroupées par métier (Développement, Game design, Outils, Qualités) au lieu de Langage/Moteurs/Méthodes
- [ ] `[Toi]` Demander au support GitHub de purger les commits orphelins en cache : l'ancien commit `47ae685` reste lisible par son identifiant complet (https://support.github.com/contact → « Remove sensitive data »)
- [ ] `[Toi]` Supprimer les anciens runs Actions n°2 à 6 (onglet Actions → ouvrir le run → menu « … » → « Delete workflow run ») : ils pointent vers les anciens commits

## Phase 2 — Identité visuelle + page d'accueil portfolio (type nrjnicks.github.io) — EN COURS

- [x] `[Ensemble]` Mise en page papier choisie : colonne latérale (photo, contact, compétences, langues à gauche)
- [x] `[Ensemble]` Palette : bleu-gris ardoise repris de l'ancien CV (`#57737a`), teinte pâle pour la colonne latérale
- [x] `[Moi]` Icônes devant les coordonnées (Tabler, contour)
- [x] `[Moi]` Photo récupérée depuis l'ancien CV (image intégrée d'origine 900×949, version web 600 px) → `public/images/louis-bich.jpg`, renseignée dans `identity.photo`
- [x] `[Ensemble]` CV papier validé
- [x] `[Moi]` Page d'accueil v1 qui défile (`/` en anglais, `/fr/`) : hero, À propos, projet phare Navimancie (emplacement vidéo), parcours, formation, parcours compétitif, compétences, contact — contenu tiré de `cv.ts` + `site.ts`
- [x] `[Moi]` Captures du site pour relecture : `npm run site:shots` → `private/preview/site-*.png`
- [x] `[Moi]` Section « Portfolio » (onglet + titre), Navimancie en projet phare dedans
- [x] `[Moi]` Allemand retiré des étiquettes « À propos » du site
- [ ] `[Ensemble]` (prochaine session) Retravailler À propos, parcours et compétences du site : trop proches du CV → contenu complémentaire plutôt que doublon (démarche, choix, visuels, workflow)
- [ ] `[Toi]` Relire la page d'accueil, en particulier les textes nouveaux : paragraphes « À propos », pitch de Navimancie, phrase de contact
- [ ] `[Moi]` Publication groupée : CV à jour + page d'accueil (après validation)
- [ ] `[Moi]` Lighthouse/SEO/accessibilité de base via Chrome DevTools MCP

## Phase 3 — Démo Navimancie (dépend du build)

- [ ] `[Toi]` Rendre le prototype de combat vraiment jouable (les 2-3 ajustements mentionnés)
- [ ] `[Toi]` Build WebGL + upload itch.io
- [ ] `[Toi]` Vidéo de démo combat (2-3 min)
- [ ] `[Ensemble]` Étude de cas Navimancie sur le site :
  - pitch, rôle de game designer et développeur principal, décisions d'architecture
  - 2-3 systèmes en problème → solution → résultat
  - section "mon usage de l'IA" (création de skills pour le workflow `navimancie-plan/execute/verify`)

## Phase 4 — Code public

- [ ] `[Toi]` Donner le lien du repo Navimancie
- [ ] `[Ensemble]` Revue complète : commentaires sensibles (refs jeux commerciaux type Clash Royale → reformuler en termes génériques)
- [ ] `[Ensemble]` Vérifier les assets (VFX inclus) : licences Asset Store, ce qui doit être exclu du repo public
- [ ] `[Moi]` Nettoyage via `ecc:opensource-sanitizer` avant publication
- [ ] `[Moi]` Une fois public : lien vers le repo Navimancie dans le CV (bloc Navimancie) et sur le site

## Phase 5 — Contenu additionnel

- [ ] `[Toi]` Fournir le GDO (Game Design Overview, projet de fin d'année à e-artsup, jeu non abouti — on montre le GDO seul, pas le jeu)
- [ ] `[Toi]` Lister les game jams pertinentes (nom, durée, rôle, lien itch.io si buildé)
- [ ] `[Moi]` Section "Jams" compacte (1 GIF par entrée, pas de sur-vente) — les 2 prototypes perso ne vont pas dans le portfolio
- [ ] `[Moi]` Résumé exploitable du GDO (extrait, pas le doc brut)

## Phase 6 — Polish (en dernier, pas de sur-ingénierie)

- [ ] `[Moi]` GoatCounter (mesure d'audience sans bannière cookie)
- [ ] `[Moi]` Repasse SEO/accessibilité finale
- [ ] Domaine personnalisé — en option, à décider plus tard

---

## Décisions déjà prises
- Jeu jouable → itch.io. GitHub Pages sert à centraliser les liens, le portfolio et le CV.
- Un seul repo (`simplyymarket.github.io`) pour le CV et le site.
- Site en anglais par défaut (international, montre le bilinguisme), version française disponible à un clic.
- Référence structurelle du site : nrjnicks.github.io (structure seulement, design original).
- CV : version numérique = page web EN/FR ; version papier = PDF A4 d'une page généré en local (avec téléphone), jamais publié. Pas d'âge nulle part. RenderCV abandonné.
- CV papier : colonne latérale, palette bleu-gris ardoise, icônes devant les coordonnées.
- Toute l'expérience est présentée comme indépendante (2023 – aujourd'hui), projets détaillés dessous.
- Liens du CV : site portfolio + LinkedIn ; pas de profil GitHub tant qu'il est vide, lien vers le repo Navimancie une fois public.
- L'IA apparaît comme un outil (Claude Code + création de skills), jamais comme « assistance ».
- Les 2 prototypes perso (échecs, versus local) restent sur le CV mais pas dans le portfolio.
- Asobo n'est pas une deadline — le CV part dès qu'il est prêt, indépendamment du site.

## Questions résolues
- GDO → Game Design Overview, projet de fin d'année e-artsup, jeu non abouti → on fournit le GDO seul.
- Le projet "roguelite incubé Plaine Images" → projet indé antérieur à Navimancie, Projet EON, juin – déc. 2025, quitté après scission ; les prototypes perso et les game jams sont hors de ce projet.
