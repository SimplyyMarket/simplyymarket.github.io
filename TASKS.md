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

## Phase 1 — CV (FR + EN, web + papier) — v2 en relecture

Historique : la v1 RenderCV a été rejetée (mise en page peu soignée, titres anglais sur contenu français, formation illisible, 2 pages, versions papier/numérique quasi identiques). En plus, le téléphone était public (YAML dans le repo + PDF papier servi sur le site) : retiré par le commit `fix: retire le téléphone du repo public et du site`, **mais il reste dans l'historique git** (voir ci-dessous).

Fonctionnement actuel :
- Contenu : `src/data/cv.ts` (FR + EN, sans téléphone ni âge)
- Version numérique = page web : `/cv/` (FR) et `/en/cv/` (EN)
- Version papier = PDF A4 d'une page, **local uniquement** : `npm run cv:pdf` → `private/louis-bich-cv-fr.pdf` et `private/louis-bich-cv-en.pdf` (téléphone + âge injectés depuis `private/contact.json`, ignoré par git)
- Garde-fous du script : exactement 1 page (taille du texte ajustée automatiquement entre 8,8 et 10,5 pt) et aucun numéro de téléphone dans le build publié

- [x] `[Ensemble]` Contenu validé : accroche, C++ retiré, 6 réalisations Navimancie, expérience indé recadrée, parcours condensé, coquille corrigée
- [x] `[Moi]` Page web FR + EN
- [x] `[Moi]` PDF papier FR + EN sur une page
- [ ] `[Toi]` Relire la page web et les 2 PDF papier (design, formulations, traduction anglaise)
- [ ] `[Toi]` Âge sur le CV papier anglais : le garder ? (peu courant sur un CV anglophone)
- [ ] `[Toi]` Effacer le téléphone de l'historique git ? (réécriture + force push, irréversible — à confirmer explicitement)
- [ ] `[Toi]` Username LinkedIn (à ajouter aux liens une fois le profil refait)

## Phase 2 — Site minimal (liens centralisés)

- [ ] `[Toi]` Fournir/refaire le lien LinkedIn (et tout autre profil à lister)
- [ ] `[Moi]` Page d'accueil : accroche, lien vers le CV web, lien itch.io (dès dispo), LinkedIn, GitHub, contact
- [ ] `[Moi]` Page "à propos" bilingue FR/EN (esport, LAN, enseignement en Chine, langues — le détail que le CV ne peut pas porter)
- [ ] `[Moi]` Lighthouse/SEO/accessibilité de base via Chrome DevTools MCP

## Phase 3 — Démo Navimancie (dépend du build)

- [ ] `[Toi]` Rendre le prototype de combat vraiment jouable (les 2-3 ajustements mentionnés)
- [ ] `[Toi]` Build WebGL + upload itch.io
- [ ] `[Toi]` Vidéo de démo combat (2-3 min)
- [ ] `[Ensemble]` Étude de cas Navimancie sur le site :
  - pitch, rôle de développeur principal dans une équipe de 3, décisions d'architecture
  - 2-3 systèmes en problème → solution → résultat
  - section "mon usage de l'IA" (workflow `navimancie-plan/execute/verify`)

## Phase 4 — Code public

- [ ] `[Toi]` Donner le lien du repo Navimancie
- [ ] `[Ensemble]` Revue complète : commentaires sensibles (refs jeux commerciaux type Clash Royale → reformuler en termes génériques)
- [ ] `[Ensemble]` Vérifier les assets (VFX inclus) : licences Asset Store, ce qui doit être exclu du repo public
- [ ] `[Moi]` Nettoyage via `ecc:opensource-sanitizer` avant publication

## Phase 5 — Contenu additionnel

- [ ] `[Toi]` Fournir le GDO (Game Design Overview, projet de fin d'année à e-artsup, jeu non abouti — on montre le GDO seul, pas le jeu)
- [ ] `[Toi]` Lister les game jams pertinentes (nom, durée, rôle, lien itch.io si buildé)
- [ ] `[Moi]` Section "Jams & prototypes" compacte (1 GIF par entrée, pas de sur-vente)
- [ ] `[Moi]` Résumé exploitable du GDO (extrait, pas le doc brut)

## Phase 6 — Polish (en dernier, pas de sur-ingénierie)

- [ ] `[Moi]` GoatCounter (mesure d'audience sans bannière cookie)
- [ ] `[Moi]` Repasse SEO/accessibilité finale
- [ ] Domaine personnalisé — en option, à décider plus tard

---

## Décisions déjà prises
- Jeu jouable → itch.io. GitHub Pages sert à centraliser les liens et le CV.
- Un seul repo (`simplyymarket.github.io`) pour le CV et le site.
- Référence structurelle du site : nrjnicks.github.io (structure seulement, design original).
- CV : version numérique = page web FR/EN ; version papier = PDF A4 d'une page généré en local (téléphone + âge), jamais publié. RenderCV abandonné.
- Asobo n'est pas une deadline — le CV part dès qu'il est prêt, indépendamment du site.

## Questions résolues
- GDO → Game Design Overview, projet de fin d'année e-artsup, jeu non abouti → on fournit le GDO seul.
- Le projet "roguelite incubé Plaine Images" → projet indé antérieur à Navimancie, quitté après scission ; expérience distincte.
