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

## Phase 1 — CV (EN + FR, web + papier) — v2 en relecture

Historique : la v1 RenderCV a été rejetée (mise en page peu soignée, titres anglais sur contenu français, formation illisible, 2 pages, versions papier/numérique quasi identiques). Le téléphone était aussi public (YAML dans le repo + PDF papier servi sur le site) : retiré du site et du repo, puis effacé de l'historique git (réécriture + force push le 11/09/2026). Sauvegarde de l'ancien historique : `private/backup-avant-reecriture.bundle` (local uniquement).

Fonctionnement actuel :
- Contenu : `src/data/cv.ts` (anglais + français, sans téléphone ni âge)
- Version numérique = page web : `/cv/` (anglais, par défaut) et `/fr/cv/` (français)
- Version papier = PDF A4 d'une page, **local uniquement** : `npm run cv:pdf` → `private/louis-bich-cv-en.pdf` et `private/louis-bich-cv-fr.pdf` (téléphone injecté depuis `private/contact.json`, ignoré par git)
- Garde-fous du script : exactement 1 page (taille du texte ajustée automatiquement entre 8,8 et 10,5 pt) et aucun numéro de téléphone dans le build publié

- [x] `[Ensemble]` Contenu validé : accroche, C++ retiré, 6 réalisations Navimancie, parcours condensé, coquille corrigée
- [x] `[Ensemble]` Expérience indé corrigée : Plaine Images = 6 mois, séparée des 2 prototypes perso (non aboutis mais formateurs) et des game jams
- [x] `[Ensemble]` Claude Code rangé dans « Outils » (création de skills pour le workflow) au lieu de « développement assisté par IA »
- [x] `[Ensemble]` Âge retiré de toutes les versions (web et papier)
- [x] `[Moi]` Anglais par défaut : `/cv/` = anglais, `/fr/cv/` = français
- [x] `[Moi]` PDF papier EN + FR sur une page
- [x] `[Moi]` Téléphone effacé de l'historique git
- [ ] `[Toi]` Demander au support GitHub de purger les commits orphelins en cache : l'ancien commit `47ae685` reste lisible par son identifiant complet (https://support.github.com/contact → « Remove sensitive data »)
- [ ] `[Toi]` Supprimer les anciens runs Actions n°2 à 6 (onglet Actions → ouvrir le run → menu « … » → « Delete workflow run ») : ils pointent vers les anciens commits
- [ ] `[Toi]` Relire la page web et les 2 PDF papier (design, formulations, traduction anglaise)
- [ ] `[Toi]` Username LinkedIn (à ajouter aux liens une fois le profil refait)

## Phase 2 — Page d'accueil portfolio (type nrjnicks.github.io) — après validation du CV

- [ ] `[Toi]` Fournir/refaire le lien LinkedIn (et tout autre profil à lister)
- [ ] `[Moi]` Page d'accueil en anglais (version française à un clic) : accroche, présentation courte, projets (Navimancie en tête, emplacement démo à venir), lien vers le CV web, itch.io (dès dispo), LinkedIn, GitHub, contact
- [ ] `[Moi]` Page "About" EN/FR (esport, LAN, enseignement en Chine, langues — le détail que le CV ne peut pas porter)
- [ ] `[Moi]` Lighthouse/SEO/accessibilité de base via Chrome DevTools MCP

## Phase 3 — Démo Navimancie (dépend du build)

- [ ] `[Toi]` Rendre le prototype de combat vraiment jouable (les 2-3 ajustements mentionnés)
- [ ] `[Toi]` Build WebGL + upload itch.io
- [ ] `[Toi]` Vidéo de démo combat (2-3 min)
- [ ] `[Ensemble]` Étude de cas Navimancie sur le site :
  - pitch, rôle de développeur principal dans une équipe de 3, décisions d'architecture
  - 2-3 systèmes en problème → solution → résultat
  - section "mon usage de l'IA" (création de skills pour le workflow `navimancie-plan/execute/verify`)

## Phase 4 — Code public

- [ ] `[Toi]` Donner le lien du repo Navimancie
- [ ] `[Ensemble]` Revue complète : commentaires sensibles (refs jeux commerciaux type Clash Royale → reformuler en termes génériques)
- [ ] `[Ensemble]` Vérifier les assets (VFX inclus) : licences Asset Store, ce qui doit être exclu du repo public
- [ ] `[Moi]` Nettoyage via `ecc:opensource-sanitizer` avant publication

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
- L'IA apparaît comme un outil (Claude Code + création de skills), jamais comme « assistance ».
- Les 2 prototypes perso (échecs, versus local) restent sur le CV mais pas dans le portfolio.
- Asobo n'est pas une deadline — le CV part dès qu'il est prêt, indépendamment du site.

## Questions résolues
- GDO → Game Design Overview, projet de fin d'année e-artsup, jeu non abouti → on fournit le GDO seul.
- Le projet "roguelite incubé Plaine Images" → projet indé antérieur à Navimancie, 6 mois, quitté après scission ; les prototypes perso et les game jams sont hors de ce projet.
