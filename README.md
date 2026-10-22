# Cockpit Immo — démo

Proof of concept d’un portail patrimoine immobilier en marque blanche, proposé par une société de gestion de patrimoine à ses clients.
Inspiré de l’application MonImmo. **Toutes les données sont fictives et codées en dur.**

Ouvrir `index.html` (double-clic). Une connexion Internet est nécessaire pour les graphiques (Chart.js) et la police.

## Fichiers
- `data.js` : marque, client fictif (Olivier Dewaele), conseillère, et 4 biens (Uccle, Gand, Namur, Knokke). C’est le seul fichier à modifier pour adapter la démo (nom de la société, couleurs des biens, montants).
- `app.js` : calculs (amortissement, valorisation, loyers, bilans), navigation, vues, graphiques, illustrations SVG des biens.
- `index.html` : mise en page et styles (thème clair/sombre, mobile, impression).

## Guide d’utilisation
Menu « Guide d’utilisation » (ou « Aide » sur smartphone) : guide destiné aux clients finaux, organisé par écran et par situation réelle, avec captures et FAQ. Le texte est dans `guide.js`, les captures dans `guide/`.
Après une modification de l’app, régénérer les captures : `node outils/captures-guide.mjs "<dossier de l’app>" "<dossier de l’app>/guide" "<dossier temporaire>"` (nécessite Chrome et Node 22+).

## Photos
Photos d’illustration issues de Wikimedia Commons (dossier `photos/`), sans lien avec les biens fictifs. Le crédit est affiché sur chaque photo, comme l’exigent les licences :
- `uccle.jpg` — charles lecompte, CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:Uccle_avenue_Dupuich_Villas_contemporaines_-_panoramio.jpg
- `gand.jpg` — Marc Ryckaert (MJJR), CC BY 3.0 — https://commons.wikimedia.org/wiki/File:Gent_Portus_Ganda_R01.jpg
- `namur.jpg` — Min's, CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:Namur_-_92094-CLT-0015-01_-_Maison_Rue_du_Coll%C3%A8ge_41.JPG
- `knokke.jpg` — VWAmFot, CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:Duinresidentie_-_Restaurant_%22Beaufort%22._Zeedijk_431,_Duinbergen_(8300_Knokke-Heist).jpg

Pour changer une photo : remplacer le fichier et mettre à jour le champ `photo` du bien dans `data.js` (supprimer ce champ réaffiche l’illustration dessinée).

## Parcours de démo suggéré
1. **Vue d’ensemble** : patrimoine net, alertes urgentes, répartition, performance par bien, agenda, bascule *Foyer / Ma part*.
2. **Immeuble Namur → Location** : vacance du duplex, indexation oubliée, calculateur d’indexation.
3. **Villa Uccle → Achat & crédit** : refinancement et remboursement anticipé dans le tableau d’amortissement.
4. **Appartement Knokke → Location saisonnière** : occupation mensuelle et revenus.
5. **Simulateur** : hypothèses de marché, patrimoine à la retraite, revente, nouvel investissement.
6. **Documents** : coffre-fort classé par bien et par catégorie.
7. Bouton **Contacter** : demande de rendez-vous à la conseillère.
