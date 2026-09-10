# Louis Bich — CV + Portfolio — Suivi des tâches

Repo local : `louis-bich-portfolio` → repo GitHub cible : `SimplyyMarket/simplyymarket.github.io`
URL finale du site : `https://simplyymarket.github.io`

Légende : `[Toi]` action attendue de Louis · `[Moi]` je peux l'exécuter · `[Ensemble]` session commune

---

## Phase 0 — Fondations (pas de dépendance au reste)

- [ ] `[Moi]` Scaffolder le repo Astro (template `astro-nano` ou `astro-paper` comme base, design original)
- [ ] `[Moi]` Config Astro pour `simplyymarket.github.io` (site = `https://simplyymarket.github.io`, pas de `base`)
- [ ] `[Moi]` Workflow GitHub Actions : build Astro → déploiement Pages (`withastro/action`)
- [ ] `[Toi]` Installer/confirmer `gh` CLI (absent de ta machine) pour que je crée le repo GitHub et active Pages depuis ici — **action qui touche ton compte, je redemande confirmation avant de le faire**
- [ ] `[Ensemble]` Créer le repo `simplyymarket.github.io` sur GitHub et le connecter en remote
- [ ] `[Moi]` Squelette RenderCV (YAML) à partir du contenu actuel, **sans réécriture** — juste la structure technique posée

## Phase 1 — CV (2 versions)

- [ ] `[Ensemble]` Session de refonte du contenu CV (le PDF fourni sert de base)
  - [ ] Décision : garder/enlever C++, reformuler l'accroche, condenser esport/LAN
  - [ ] Reformuler l'expérience "indé 2023-2025" : projet distinct de Navimancie (avant Navimancie), quitté après scission avec le collègue, le projet a depuis beaucoup changé — cadrer comme contribution passée, pas comme le travail actuel
  - [ ] Corriger la coquille de date (2013-3015 → 2013-2015)
- [ ] `[Moi]` Version "papier" (PDF nominatif, coordonnées complètes) via RenderCV
- [ ] `[Moi]` Version "numérique" (PDF public, coordonnées prudentes) via RenderCV
- [ ] `[Moi]` Action GitHub qui régénère les 2 PDF à chaque modification du YAML

## Phase 2 — Site minimal (liens centralisés)

- [ ] `[Toi]` Fournir/refaire le lien LinkedIn (et tout autre profil à lister)
- [ ] `[Moi]` Page d'accueil : accroche, CV PDF, lien itch.io (dès dispo), LinkedIn, GitHub, contact
- [ ] `[Moi]` Page "à propos" bilingue FR/EN (esport, LAN, enseignement en Chine, langues — le détail que le CV ne peut pas porter)
- [ ] `[Moi]` Lighthouse/SEO/accessibilité de base via Chrome DevTools MCP

## Phase 3 — Démo Navimancie (dépend du build)

- [ ] `[Toi]` Rendre le prototype de combat vraiment jouable (les 2-3 ajustements mentionnés)
- [ ] `[Toi]` Build WebGL + upload itch.io
- [ ] `[Toi]` Vidéo de démo combat (2-3 min)
- [ ] `[Ensemble]` Étude de cas Navimancie sur le site :
  - pitch, rôle de solo dev, décisions d'architecture
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
- Jeu jouable → itch.io. GitHub Pages ne sert qu'à centraliser les liens.
- Un seul repo (`simplyymarket.github.io`) pour le CV et le site — pas deux.
- Référence structurelle du site : nrjnicks.github.io (structure seulement, design original).
- CV : 2 versions (papier nominatif / numérique public) depuis une seule source RenderCV.
- Asobo n'est pas une deadline — le PDF part dès qu'il est prêt, indépendamment du site.

## Questions ouvertes (résolues)
- ~~GDO = Game Design Document/Overview de l'école ?~~ → Game Design Overview, projet de fin d'année e-artsup, jeu non abouti → on fournit le GDO seul.
- ~~Le projet "roguelite incubé Plaine Images" du CV = Navimancie ?~~ → Non, projet indé antérieur à Navimancie, quitté après scission avec un collègue ; le projet a bifurqué depuis. Expérience distincte à cadrer comme telle sur le CV.
