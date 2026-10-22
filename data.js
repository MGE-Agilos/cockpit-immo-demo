/* Données de démonstration — client, biens, montants et contacts entièrement fictifs.
   Tout est codé en dur : modifier ce fichier suffit pour adapter la démo (marque, client, biens). */
window.DEMO = {
  today: "2026-10-22",

  // Marque blanche : nom du produit et de la société de gestion de patrimoine
  marque: { produit: "Cockpit Immo", societe: "Pareto", baseline: "Votre patrimoine immobilier, en un coup d’œil" },

  client: { prenom: "Natacha", nom: "Pareto", naissance: "1974-03-08", retraite: 2039, conjoint: "Anne Mertens", ville: "Uccle", ref: "Dossier PAT-20417" },

  conseiller: { nom: "Maxime Gerard", role: "Gestionnaire de patrimoine senior", tel: "+32 2 000 00 00", email: "maxime.gerard@exemple.be", prochain_rdv: "2026-11-18" },

  biens: [
    /* ------------------------------------------------------------------ */
    {
      id: "uccle", nom: "Villa Uccle", type: "maison", couleur: "--c1",
      // Photo d’illustration (Wikimedia Commons) — crédit obligatoire selon la licence
      photo: {src: "photos/uccle.jpg",pos: "center 62%",auteur: "charles lecompte",licence: "CC BY-SA 3.0",source: "https://commons.wikimedia.org/wiki/File:Uccle_avenue_Dupuich_Villas_contemporaines_-_panoramio.jpg"},
      usage: "Résidence principale", region: "Bruxelles",
      adresse: "Avenue des Hêtres Pourpres 14", cp: "1180 Uccle",
      desc: "Maison 4 façades · 210 m² · 4 chambres · jardin de 8 ares",
      surface: 210, chambres: 4, terrain: "8 a 20 ca", construction: 1968,
      peb: { classe: "C", valeur: 168, date: "2021-03-02", validite: "2031-03-02" },
      rc: 3240, quote: 0.5, coproprietaire: "Anne Mertens (50 %)",
      loyer_estime: 3400,
      achat: {
        date: "2012-06-15", prix: 640000, vendeur: "Succession Vermeulen", notaire: "Étude Delvaux & Rombaut, Uccle", agence: "Immo Prince d’Orange",
        frais: [
          { poste: "Droits d’enregistrement (12,5 % après abattement)", montant: 72500 },
          { poste: "Honoraires du notaire (achat)", montant: 6900 },
          { poste: "Frais divers, TVA et recherches", montant: 2600 },
          { poste: "Acte de crédit hypothécaire", montant: 7800 }
        ]
      },
      credits: [
        { id: "u1", banque: "Belfius", libelle: "Crédit hypothécaire", montant: 480000, taux: 3.45, type: "Fixe", duree_mois: 300, debut: "2012-07",
          revisions: [{ debut: "2015-04", taux: 2.05, note: "Refinancement interne (taux fixe 2,05 %)" }],
          remboursements: [{ mois: "2020-01", montant: 50000, note: "Remboursement anticipé partiel" }],
          srd: { assureur: "Belfius Assurances", prime: 620 } }
      ],
      valeurs: [["2012-06-15", 640000], ["2014-07-01", 668000], ["2016-07-01", 705000], ["2018-07-01", 765000], ["2020-07-01", 845000], ["2021-07-01", 905000], ["2022-07-01", 948000], ["2023-07-01", 962000], ["2024-07-01", 988000], ["2025-07-01", 1022000], ["2026-07-01", 1050000]],
      unites: [],
      charges: [
        { poste: "Précompte immobilier", cat: "Fiscalité", annuel: 3150 },
        { poste: "Assurance habitation (incendie)", cat: "Assurances", annuel: 1150 },
        { poste: "Assurance solde restant dû", cat: "Assurances", annuel: 620 },
        { poste: "Énergie (gaz + électricité)", cat: "Énergie", annuel: 3720 },
        { poste: "Eau (Vivaqua)", cat: "Énergie", annuel: 660 },
        { poste: "Entretien chaudière, jardin, provisions", cat: "Entretien", annuel: 1800 }
      ],
      certificats: [
        { type: "Certificat PEB", date: "2021-03-02", echeance: "2031-03-02", detail: "Classe C — 168 kWh/m².an" },
        { type: "Contrôle installation électrique", date: "2012-05-20", echeance: "2037-05-20", detail: "Conforme (RGIE) — valable 25 ans" },
        { type: "Entretien chaudière gaz", date: "2025-10-14", echeance: "2027-10-14", detail: "Vaillant ecoTEC — tous les 2 ans (Bruxelles)" },
        { type: "Ramonage cheminée", date: "2025-11-03", echeance: "2026-11-03", detail: "Feu ouvert salon — annuel" }
      ],
      travaux: [
        { date: "2013-04", objet: "Rénovation cuisine et salle de bain", montant: 42000, entreprise: "Cuisines Dewit", statut: "fait" },
        { date: "2016-09", objet: "Remplacement châssis (double vitrage)", montant: 28500, entreprise: "Belisol Uccle", statut: "fait" },
        { date: "2021-02", objet: "Isolation toiture + nouvelle chaudière", montant: 31000, entreprise: "Toitures Leroy", statut: "fait" },
        { date: "2027-05", objet: "Panneaux photovoltaïques (8 kWc) + batterie", montant: 16500, entreprise: "Devis SolarBru", statut: "devis" }
      ],
      evenements: [
        { date: "2012-03-28", cat: "achat", titre: "Offre acceptée", detail: "Offre à 640.000 € (prix demandé 675.000 €)." },
        { date: "2012-06-15", cat: "achat", titre: "Signature de l’acte", detail: "Acte chez Delvaux & Rombaut — achat à 50/50 avec Anne Mertens.", montant: 640000 },
        { date: "2012-07-01", cat: "credit", titre: "Crédit Belfius 480.000 € — 3,45 % fixe 25 ans", montant: 480000 },
        { date: "2013-04-20", cat: "travaux", titre: "Nouvelle cuisine et salle de bain", montant: 42000 },
        { date: "2015-04-01", cat: "credit", titre: "Refinancement à 2,05 %", detail: "Révision interne du taux : économie d’environ 300 € par mois." },
        { date: "2016-09-12", cat: "travaux", titre: "Remplacement de tous les châssis", montant: 28500 },
        { date: "2020-01-15", cat: "credit", titre: "Remboursement anticipé de 50.000 €", detail: "Indemnité de remploi de 3 mois d’intérêts. Mensualité réduite.", montant: 50000 },
        { date: "2021-02-26", cat: "travaux", titre: "Isolation toiture et chaudière à condensation", montant: 31000 },
        { date: "2021-03-02", cat: "certificat", titre: "Nouveau certificat PEB : classe C", detail: "Passage de E à C après travaux." },
        { date: "2025-10-14", cat: "entretien", titre: "Entretien de la chaudière" },
        { date: "2026-11-03", cat: "entretien", titre: "Ramonage annuel de la cheminée" },
        { date: "2027-05-15", cat: "travaux", titre: "Installation photovoltaïque prévue", montant: 16500 }
      ],
      alertes: [
        { niveau: "moyen", titre: "Ramonage à planifier avant le 03/11/2026", texte: "Obligation annuelle pour les feux ouverts ; l’attestation est demandée par l’assureur en cas de sinistre." },
        { niveau: "info", titre: "Photovoltaïque : devis reçu", texte: "16.500 € pour 8 kWc + batterie ; retour estimé 7 à 8 ans. À discuter avec votre gestionnaire (financement cash ou crédit vert)." }
      ],
      docs: [
        { d: "2012-06-15", cat: "Acte & achat", n: "Acte authentique de vente", sz: "4,2 Mo" },
        { d: "2012-06-15", cat: "Crédit", n: "Acte de crédit Belfius", sz: "2,8 Mo" },
        { d: "2015-04-01", cat: "Crédit", n: "Avenant refinancement taux 2,05 %", sz: "640 Ko" },
        { d: "2020-01-15", cat: "Crédit", n: "Décompte remboursement anticipé", sz: "210 Ko" },
        { d: "2021-03-02", cat: "Certificats", n: "Certificat PEB classe C", sz: "1,1 Mo" },
        { d: "2012-05-20", cat: "Certificats", n: "Contrôle électrique — PV de conformité", sz: "820 Ko" },
        { d: "2026-01-12", cat: "Assurances", n: "Police incendie AXA — conditions 2026", sz: "1,6 Mo" },
        { d: "2026-06-05", cat: "Fiscalité", n: "Avertissement-extrait de rôle précompte 2026", sz: "180 Ko" },
        { d: "2021-02-26", cat: "Travaux", n: "Facture isolation toiture — Toitures Leroy", sz: "350 Ko" },
        { d: "2026-09-30", cat: "Travaux", n: "Devis photovoltaïque SolarBru", sz: "920 Ko" }
      ],
      contacts: [
        { role: "Notaire", nom: "Étude Delvaux & Rombaut", contact: "02 000 11 22 · uccle@notaire-exemple.be" },
        { role: "Banque (crédit)", nom: "Belfius — agence Uccle Centre", contact: "02 000 33 44" },
        { role: "Assurance habitation", nom: "AXA via Bureau Martin", contact: "02 000 55 66" },
        { role: "Chauffagiste", nom: "Thermo Service SRL", contact: "0470 00 00 01" }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "gand", nom: "Appartement Gand", type: "appart", couleur: "--c3",
      // Photo d’illustration (Wikimedia Commons) — crédit obligatoire selon la licence
      photo: {src: "photos/gand.jpg",pos: "center 55%",auteur: "Marc Ryckaert (MJJR)",licence: "CC BY 3.0",source: "https://commons.wikimedia.org/wiki/File:Gent_Portus_Ganda_R01.jpg"},
      usage: "Locatif", region: "Flandre",
      adresse: "Lindenlei 47, bus 3", cp: "9000 Gent",
      desc: "Appartement 2 chambres · 88 m² · 3e étage · terrasse",
      surface: 88, chambres: 2, terrain: null, construction: 2008,
      peb: { classe: "B", valeur: 142, date: "2018-07-10", validite: "2028-07-10" },
      rc: 1190, quote: 1, coproprietaire: null,
      achat: {
        date: "2018-09-20", prix: 315000, vendeur: "M. et Mme De Smet", notaire: "Notariaat Van Acker, Gent", agence: "Vastgoed Leiestreek",
        frais: [
          { poste: "Registratierechten (10 %, investissement)", montant: 31500 },
          { poste: "Honoraires du notaire", montant: 3950 },
          { poste: "Frais divers et TVA", montant: 1450 },
          { poste: "Acte de crédit hypothécaire", montant: 4100 }
        ]
      },
      credits: [
        { id: "g1", banque: "ING", libelle: "Crédit investissement locatif", montant: 280000, taux: 1.65, type: "Fixe", duree_mois: 240, debut: "2018-10",
          srd: { assureur: "NN Insurance", prime: 290 } }
      ],
      valeurs: [["2018-09-20", 315000], ["2019-07-01", 322000], ["2020-07-01", 334000], ["2021-07-01", 352000], ["2022-07-01", 367000], ["2023-07-01", 371000], ["2024-07-01", 380000], ["2025-07-01", 388000], ["2026-07-01", 396000]],
      unites: [
        { id: "g-app", nom: "Appartement 3e", type: "Résidentiel", surface: 88, locataire: "Lotte Claes & Pieter Janssens",
          bail: { type: "Bail de résidence principale 9 ans", debut: "2019-01-01", fin: "2027-12-31", preavis: "6 mois avant l’échéance" },
          garantie: "2.300 € (compte bloqué KBC)", indice_base: 107.20, indice_actuel: 138.90,
          loyers: [{ du: "2019-01", loyer: 1150 }, { du: "2020-01", loyer: 1168 }, { du: "2021-01", loyer: 1175 }, { du: "2022-01", loyer: 1222 }, { du: "2023-01", loyer: 1335 }, { du: "2024-01", loyer: 1372 }, { du: "2025-01", loyer: 1398 }, { du: "2026-01", loyer: 1425 }] }
      ],
      charges: [
        { poste: "Charges de copropriété non récupérables", cat: "Copropriété", annuel: 660 },
        { poste: "Onroerende voorheffing (précompte)", cat: "Fiscalité", annuel: 1380 },
        { poste: "Impôt sur le revenu locatif (estimation)", cat: "Fiscalité", annuel: 1150 },
        { poste: "Assurance propriétaire non occupant", cat: "Assurances", annuel: 210 },
        { poste: "Assurance solde restant dû", cat: "Assurances", annuel: 290 },
        { poste: "Entretien, petites réparations", cat: "Entretien", annuel: 400 }
      ],
      certificats: [
        { type: "Certificat EPC (PEB)", date: "2018-07-10", echeance: "2028-07-10", detail: "Label B — 142 kWh/m².an" },
        { type: "Contrôle installation électrique", date: "2008-11-04", echeance: "2033-11-04", detail: "Conforme — construction neuve" },
        { type: "Entretien chaudière individuelle", date: "2025-02-18", echeance: "2027-02-18", detail: "À charge du locataire, attestation reçue" },
        { type: "Détecteurs de fumée", date: "2024-01-09", echeance: "2034-01-09", detail: "3 détecteurs 10 ans placés" }
      ],
      travaux: [
        { date: "2018-12", objet: "Rafraîchissement peintures et sols avant location", montant: 7800, entreprise: "Schilderwerken Peeters", statut: "fait" },
        { date: "2023-06", objet: "Remplacement lave-vaisselle et hotte", montant: 1250, entreprise: "Vanden Borre", statut: "fait" },
        { date: "2027-03", objet: "Copropriété : rénovation de la toiture plate", montant: 4300, entreprise: "Quote-part estimée (AG 2026)", statut: "prévu" }
      ],
      evenements: [
        { date: "2018-07-02", cat: "achat", titre: "Compromis signé", detail: "Achat comme investissement locatif." },
        { date: "2018-09-20", cat: "achat", titre: "Signature de l’acte", montant: 315000 },
        { date: "2018-10-01", cat: "credit", titre: "Crédit ING 280.000 € — 1,65 % fixe 20 ans", montant: 280000 },
        { date: "2018-12-15", cat: "travaux", titre: "Rafraîchissement avant location", montant: 7800 },
        { date: "2019-01-01", cat: "location", titre: "Entrée des locataires (bail 9 ans)", detail: "Loyer de départ 1.150 €, garantie de 2 mois.", montant: 1150 },
        { date: "2023-01-01", cat: "location", titre: "Indexation : 1.335 €", detail: "Forte hausse de l’indice santé en 2022 (label B, indexation complète autorisée)." },
        { date: "2026-01-01", cat: "location", titre: "Indexation : 1.425 €" },
        { date: "2026-05-12", cat: "copro", titre: "AG de copropriété", detail: "Vote de la rénovation de la toiture plate (appel de fonds 2027)." },
        { date: "2027-01-01", cat: "location", titre: "Prochaine indexation du loyer" },
        { date: "2027-06-30", cat: "location", titre: "Dernier jour pour notifier un congé (échéance 31/12/2027)" }
      ],
      alertes: [
        { niveau: "moyen", titre: "Bail à échéance le 31/12/2027", texte: "Décider avant le 30/06/2027 : prolonger avec les locataires actuels (fiables, aucun retard) ou reprendre le bien. Sans congé, le bail est prolongé aux mêmes conditions." },
        { niveau: "info", titre: "Appel de fonds toiture en 2027", texte: "Quote-part estimée à 4.300 € ; le fonds de réserve en couvre environ la moitié." }
      ],
      docs: [
        { d: "2018-09-20", cat: "Acte & achat", n: "Notariële akte van verkoop", sz: "3,9 Mo" },
        { d: "2018-10-01", cat: "Crédit", n: "Contrat de crédit ING + tableau d’amortissement", sz: "1,4 Mo" },
        { d: "2018-12-20", cat: "Location", n: "Bail de résidence principale — Claes/Janssens", sz: "780 Ko" },
        { d: "2019-01-02", cat: "Location", n: "État des lieux d’entrée (photos)", sz: "12,6 Mo" },
        { d: "2019-01-05", cat: "Location", n: "Attestation garantie locative KBC", sz: "160 Ko" },
        { d: "2025-12-02", cat: "Location", n: "Courrier d’indexation 2026", sz: "95 Ko" },
        { d: "2018-07-10", cat: "Certificats", n: "EPC — label B", sz: "1,0 Mo" },
        { d: "2026-05-12", cat: "Copropriété", n: "PV assemblée générale 2026", sz: "2,2 Mo" },
        { d: "2026-04-01", cat: "Copropriété", n: "Décompte annuel des charges 2025", sz: "540 Ko" },
        { d: "2026-06-18", cat: "Fiscalité", n: "Aanslagbiljet onroerende voorheffing 2026", sz: "150 Ko" }
      ],
      contacts: [
        { role: "Locataires", nom: "Lotte Claes & Pieter Janssens", contact: "0470 00 10 20 · lotte.claes@exemple.be" },
        { role: "Syndic", nom: "Syndicus Gentse Kaai BV", contact: "09 000 12 34" },
        { role: "Banque (crédit)", nom: "ING — Private Banking Gent", contact: "09 000 56 78" },
        { role: "Notaire", nom: "Notariaat Van Acker", contact: "09 000 90 12" }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "namur", nom: "Immeuble Namur", type: "immeuble", couleur: "--c2",
      // Photo d’illustration (Wikimedia Commons) — crédit obligatoire selon la licence
      photo: {src: "photos/namur.jpg",pos: "center 30%",auteur: "Min's",licence: "CC BY-SA 3.0",source: "https://commons.wikimedia.org/wiki/File:Namur_-_92094-CLT-0015-01_-_Maison_Rue_du_Coll%C3%A8ge_41.JPG"},
      usage: "Locatif", region: "Wallonie",
      adresse: "Rue de la Prévoyance 23", cp: "5000 Namur",
      desc: "Immeuble de rapport · commerce + 2 logements · 245 m²",
      surface: 245, chambres: 3, terrain: "1 a 10 ca", construction: 1925,
      peb: { classe: "D", valeur: 265, date: "2021-10-05", validite: "2031-10-05" },
      rc: 2870, quote: 1, coproprietaire: null,
      achat: {
        date: "2021-04-12", prix: 465000, vendeur: "SRL Mosane Invest", notaire: "Étude Collard, Namur", agence: "Trevi Namur",
        travaux_initiaux: 85000,
        frais: [
          { poste: "Droits d’enregistrement (12,5 %)", montant: 58125 },
          { poste: "Honoraires du notaire", montant: 4950 },
          { poste: "Frais divers et TVA", montant: 1700 },
          { poste: "Acte de crédit hypothécaire", montant: 5300 }
        ]
      },
      credits: [
        { id: "n1", banque: "BNP Paribas Fortis", libelle: "Crédit achat + rénovation", montant: 420000, taux: 1.48, type: "Fixe", duree_mois: 240, debut: "2021-06",
          srd: { assureur: "AG Insurance", prime: 540 } }
      ],
      valeurs: [["2021-04-12", 550000], ["2022-07-01", 574000], ["2023-07-01", 588000], ["2024-07-01", 604000], ["2025-07-01", 623000], ["2026-07-01", 640000]],
      unites: [
        { id: "n-rez", nom: "Rez commercial", type: "Commerce", surface: 85, locataire: "SRL Bloom (fleuriste « Fleurs & Co »)",
          bail: { type: "Bail commercial 9 ans", debut: "2021-07-01", fin: "2030-06-30", preavis: "Révision triennale possible au 01/07/2027" },
          garantie: "3 mois — garantie bancaire ING", indice_base: 111.20, indice_actuel: 138.90,
          loyers: [{ du: "2021-07", loyer: 1250 }, { du: "2022-07", loyer: 1340 }, { du: "2023-07", loyer: 1420 }, { du: "2024-07", loyer: 1455 }, { du: "2025-07", loyer: 1480 }, { du: "2026-07", loyer: 1510 }] },
        { id: "n-1", nom: "1er étage — appartement 1 ch.", type: "Résidentiel", surface: 62, locataire: "Inès Laurent",
          bail: { type: "Bail de résidence principale 3 ans, prolongé", debut: "2021-09-01", fin: "2030-08-31", preavis: "Prolongé en bail de 9 ans" },
          garantie: "1.440 € (compte bloqué Belfius)", indice_base: 112.60, indice_actuel: 138.90,
          loyers: [{ du: "2021-09", loyer: 720 }, { du: "2022-09", loyer: 768 }, { du: "2023-09", loyer: 801 }, { du: "2024-09", loyer: 818 }, { du: "2025-09", loyer: 832 }],
          indexation_due: { mois: "2026-09", loyer: 846 } },
        { id: "n-2", nom: "2e–3e étage — duplex 2 ch.", type: "Résidentiel", surface: 98, locataire: "Vacant (anciennement famille Renard)",
          bail: { type: "Bail de résidence principale 9 ans", debut: "2021-11-01", fin: "2026-08-31", preavis: "Résilié par les locataires (préavis de 3 mois)" },
          garantie: "Restituée le 15/09/2026", indice_base: 113.40, indice_actuel: 138.90,
          loyers: [{ du: "2021-11", loyer: 890 }, { du: "2022-11", loyer: 948 }, { du: "2023-11", loyer: 982 }, { du: "2024-11", loyer: 995 }, { du: "2025-11", loyer: 1010 }],
          vacant_depuis: "2026-09", loyer_cible: 1050 }
      ],
      charges: [
        { poste: "Précompte immobilier", cat: "Fiscalité", annuel: 2450 },
        { poste: "Impôt sur les revenus locatifs (estimation)", cat: "Fiscalité", annuel: 4900 },
        { poste: "Assurance immeuble (propriétaire)", cat: "Assurances", annuel: 1380 },
        { poste: "Assurance solde restant dû", cat: "Assurances", annuel: 540 },
        { poste: "Entretien des communs et chaudières", cat: "Entretien", annuel: 1140 },
        { poste: "Électricité des communs", cat: "Énergie", annuel: 360 }
      ],
      certificats: [
        { type: "Certificats PEB (3 unités)", date: "2021-10-05", echeance: "2031-10-05", detail: "Rez D · 1er C · duplex C" },
        { type: "Contrôle électrique des communs", date: "2001-12-14", echeance: "2026-12-14", detail: "À renouveler (validité 25 ans)" },
        { type: "Entretien chaudières (3)", date: "2025-11-20", echeance: "2026-11-20", detail: "Wallonie : entretien annuel des chaudières mazout, tous les 2 ans au gaz" },
        { type: "Détecteurs de fumée", date: "2021-09-01", echeance: "2031-09-01", detail: "Conformes au Code wallon du logement" }
      ],
      travaux: [
        { date: "2021-08", objet: "Rénovation complète du duplex", montant: 52000, entreprise: "Bati-Meuse SRL", statut: "fait" },
        { date: "2021-09", objet: "Isolation toiture + velux", montant: 33000, entreprise: "Toitures Mosanes", statut: "fait" },
        { date: "2026-10", objet: "Rafraîchissement du duplex avant relocation", montant: 3800, entreprise: "Peintures Dethier", statut: "en cours" },
        { date: "2026-12", objet: "Nouveau contrôle électrique des communs", montant: 280, entreprise: "Vinçotte", statut: "prévu" }
      ],
      evenements: [
        { date: "2021-02-10", cat: "achat", titre: "Offre acceptée", detail: "Immeuble de rapport : commerce au rez + deux logements." },
        { date: "2021-04-12", cat: "achat", titre: "Signature de l’acte", montant: 465000 },
        { date: "2021-06-01", cat: "credit", titre: "Crédit BNP Paribas Fortis 420.000 € — 1,48 % fixe 20 ans", montant: 420000 },
        { date: "2021-07-01", cat: "location", titre: "Bail commercial signé avec SRL Bloom", montant: 1250 },
        { date: "2021-09-01", cat: "location", titre: "Location du 1er étage à Inès Laurent", montant: 720 },
        { date: "2021-09-30", cat: "travaux", titre: "Fin des travaux duplex et toiture", montant: 85000 },
        { date: "2021-11-01", cat: "location", titre: "Location du duplex à la famille Renard", montant: 890 },
        { date: "2026-05-28", cat: "location", titre: "Préavis reçu pour le duplex", detail: "Départ des locataires au 31/08/2026 (achat d’une maison)." },
        { date: "2026-08-31", cat: "location", titre: "Sortie des locataires du duplex", detail: "État des lieux de sortie : usure normale, garantie restituée." },
        { date: "2026-10-05", cat: "location", titre: "Duplex remis en location via Trevi", detail: "Annonce publiée à 1.050 € ; 6 visites programmées." },
        { date: "2026-11-20", cat: "entretien", titre: "Entretien annuel des chaudières" },
        { date: "2026-12-14", cat: "certificat", titre: "Échéance du contrôle électrique des communs" },
        { date: "2027-07-01", cat: "location", titre: "Fenêtre de révision triennale du bail commercial" }
      ],
      alertes: [
        { niveau: "haut", titre: "Duplex vacant depuis le 01/09/2026", texte: "Manque à gagner de 1.010 € par mois. Annonce en ligne à 1.050 €, 6 visites prévues ; rafraîchissement en cours." },
        { niveau: "haut", titre: "Indexation de septembre non appliquée (1er étage)", texte: "Le loyer peut passer de 832 € à 846 €. Envoyer le courrier d’indexation : l’effet rétroactif est limité aux 3 mois précédant la demande." },
        { niveau: "moyen", titre: "Contrôle électrique des communs expire le 14/12/2026", texte: "Rendez-vous Vinçotte à confirmer (≈ 280 €)." }
      ],
      docs: [
        { d: "2021-04-12", cat: "Acte & achat", n: "Acte authentique de vente", sz: "5,1 Mo" },
        { d: "2021-06-01", cat: "Crédit", n: "Offre de crédit BNP Paribas Fortis", sz: "1,9 Mo" },
        { d: "2021-06-28", cat: "Location", n: "Bail commercial SRL Bloom", sz: "1,2 Mo" },
        { d: "2021-08-25", cat: "Location", n: "Bail 1er étage — I. Laurent", sz: "690 Ko" },
        { d: "2026-08-31", cat: "Location", n: "État des lieux de sortie — duplex", sz: "9,8 Mo" },
        { d: "2026-10-05", cat: "Location", n: "Mandat de location Trevi — duplex", sz: "310 Ko" },
        { d: "2021-10-05", cat: "Certificats", n: "Certificats PEB (3 unités)", sz: "2,7 Mo" },
        { d: "2021-09-30", cat: "Travaux", n: "Factures rénovation Bati-Meuse", sz: "1,3 Mo" },
        { d: "2026-01-15", cat: "Assurances", n: "Police immeuble — Ethias", sz: "1,5 Mo" },
        { d: "2026-06-22", cat: "Fiscalité", n: "Avertissement-extrait de rôle précompte 2026", sz: "170 Ko" }
      ],
      contacts: [
        { role: "Locataire commerce", nom: "SRL Bloom — Sarah Dubois", contact: "081 00 12 34" },
        { role: "Locataire 1er", nom: "Inès Laurent", contact: "0490 00 22 33" },
        { role: "Agence (relocation duplex)", nom: "Trevi Namur", contact: "081 00 45 67" },
        { role: "Banque (crédit)", nom: "BNP Paribas Fortis — Namur", contact: "081 00 89 01" },
        { role: "Entrepreneur", nom: "Bati-Meuse SRL", contact: "0475 00 33 44" }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "knokke", nom: "Appartement Knokke", type: "cote", couleur: "--c4",
      // Photo d’illustration (Wikimedia Commons) — crédit obligatoire selon la licence
      photo: {src: "photos/knokke.jpg",pos: "center 35%",auteur: "VWAmFot",licence: "CC BY-SA 3.0",source: "https://commons.wikimedia.org/wiki/File:Duinresidentie_-_Restaurant_%22Beaufort%22._Zeedijk_431,_Duinbergen_(8300_Knokke-Heist).jpg"},
      usage: "Seconde résidence", region: "Flandre",
      adresse: "Zeedijk 318, bus 61", cp: "8300 Knokke-Heist",
      desc: "Appartement vue mer · 105 m² · 6e étage · garage",
      surface: 105, chambres: 3, terrain: null, construction: 1979,
      peb: { classe: "D", valeur: 290, date: "2019-04-11", validite: "2029-04-11" },
      rc: 1980, quote: 0.5, coproprietaire: "Anne Mertens (50 %)",
      achat: {
        date: "2008-05-30", prix: 395000, vendeur: "Mme Vanhoutte", notaire: "Notariaat Lippens, Knokke", agence: "Zoute Immo",
        frais: [
          { poste: "Registratierechten (10 %)", montant: 39500 },
          { poste: "Honoraires du notaire", montant: 3800 },
          { poste: "Frais divers et TVA", montant: 1300 },
          { poste: "Acte de crédit hypothécaire", montant: 4300 }
        ]
      },
      credits: [
        { id: "k1", banque: "KBC", libelle: "Crédit seconde résidence", montant: 250000, taux: 4.65, type: "Fixe", duree_mois: 180, debut: "2008-07",
          srd: { assureur: "KBC Verzekeringen", prime: 0 } }
      ],
      valeurs: [["2008-05-30", 395000], ["2010-07-01", 412000], ["2012-07-01", 452000], ["2014-07-01", 470000], ["2016-07-01", 521000], ["2018-07-01", 562000], ["2020-07-01", 611000], ["2022-07-01", 682000], ["2024-07-01", 702000], ["2025-07-01", 713000], ["2026-07-01", 725000]],
      unites: [],
      saisonnier: {
        agence: "Zoute Rentals (mandat de location saisonnière)", commission: 0.22, enregistrement: "Toerisme Vlaanderen — n° 000-DEMO",
        annees: [{ annee: 2019, brut: 13200 }, { annee: 2020, brut: 9800 }, { annee: 2021, brut: 14900 }, { annee: 2022, brut: 16100 }, { annee: 2023, brut: 16400 }, { annee: 2024, brut: 17300 }, { annee: 2025, brut: 17900 }, { annee: 2026, brut: 18600 }],
        // Nuits louées / occupées par la famille en 2026
        mois: [{ m: "Jan", loue: 4, perso: 0 }, { m: "Fév", loue: 9, perso: 0 }, { m: "Mar", loue: 6, perso: 4 }, { m: "Avr", loue: 12, perso: 5 }, { m: "Mai", loue: 14, perso: 4 }, { m: "Juin", loue: 18, perso: 0 }, { m: "Juil", loue: 31, perso: 0 }, { m: "Août", loue: 17, perso: 14 }, { m: "Sep", loue: 11, perso: 6 }, { m: "Oct", loue: 8, perso: 4 }, { m: "Nov", loue: 0, perso: 0 }, { m: "Déc", loue: 0, perso: 10 }]
      },
      charges: [
        { poste: "Charges de copropriété (front de mer)", cat: "Copropriété", annuel: 3600 },
        { poste: "Onroerende voorheffing (précompte)", cat: "Fiscalité", annuel: 1780 },
        { poste: "Taxe communale de seconde résidence", cat: "Fiscalité", annuel: 1540 },
        { poste: "Impôt sur la location meublée (estimation)", cat: "Fiscalité", annuel: 2300 },
        { poste: "Assurance contenu + RC location", cat: "Assurances", annuel: 420 },
        { poste: "Énergie, Internet, nettoyage hors saison", cat: "Énergie", annuel: 1900 }
      ],
      certificats: [
        { type: "Certificat EPC (PEB)", date: "2019-04-11", echeance: "2029-04-11", detail: "Label D — 290 kWh/m².an" },
        { type: "Contrôle électrique", date: "2008-05-14", echeance: "2033-05-14", detail: "Conforme" },
        { type: "Attestation sécurité incendie (logement touristique)", date: "2024-03-20", echeance: "2027-03-20", detail: "Requise par Toerisme Vlaanderen" },
        { type: "Obligation de rénovation (Flandre)", date: "2008-05-30", echeance: "2028-01-01", detail: "Copropriété : objectif label E minimum d’ici 2028 — label D, déjà conforme" }
      ],
      travaux: [
        { date: "2009-03", objet: "Cuisine équipée et salle de douche", montant: 26000, entreprise: "Keukens Decock", statut: "fait" },
        { date: "2019-04", objet: "Rénovation intérieure et mobilier pour location", montant: 21500, entreprise: "Interieur Zoute", statut: "fait" },
        { date: "2028-04", objet: "Copropriété : rénovation de la façade côté digue", montant: 18400, entreprise: "Quote-part estimée (vote en AG 2026)", statut: "devis" }
      ],
      evenements: [
        { date: "2008-05-30", cat: "achat", titre: "Signature de l’acte", detail: "Achat à 50/50 avec Anne Mertens.", montant: 395000 },
        { date: "2008-07-01", cat: "credit", titre: "Crédit KBC 250.000 € — 4,65 % fixe 15 ans", montant: 250000 },
        { date: "2009-03-15", cat: "travaux", titre: "Nouvelle cuisine et salle de douche", montant: 26000 },
        { date: "2019-04-20", cat: "travaux", titre: "Rénovation intérieure pour la location saisonnière", montant: 21500 },
        { date: "2019-05-01", cat: "location", titre: "Début de la location saisonnière via Zoute Rentals" },
        { date: "2023-06-01", cat: "credit", titre: "Dernière mensualité : crédit KBC remboursé", detail: "Le bien est désormais libre de toute dette." },
        { date: "2024-03-20", cat: "certificat", titre: "Attestation sécurité incendie renouvelée" },
        { date: "2026-08-31", cat: "location", titre: "Saison d’été record", detail: "Juillet complet ; août partagé entre la location et la famille." },
        { date: "2026-11-21", cat: "copro", titre: "AG de copropriété : vote de la rénovation de façade", detail: "Quote-part estimée à 18.400 €." },
        { date: "2027-03-20", cat: "certificat", titre: "Renouvellement de l’attestation incendie" }
      ],
      alertes: [
        { niveau: "moyen", titre: "AG du 21/11/2026 : façade côté digue", texte: "Quote-part estimée à 18.400 € (travaux en 2028). À anticiper dans la trésorerie : votre gestionnaire peut proposer un placement à échéance." },
        { niveau: "info", titre: "Bien libre de dettes depuis juin 2023", texte: "Il peut servir de garantie pour un futur investissement (crédit avec hypothèque sur ce bien)." }
      ],
      docs: [
        { d: "2008-05-30", cat: "Acte & achat", n: "Notariële akte van verkoop", sz: "3,4 Mo" },
        { d: "2023-06-15", cat: "Crédit", n: "Attestation de fin de crédit KBC", sz: "120 Ko" },
        { d: "2019-04-30", cat: "Location", n: "Mandat Zoute Rentals", sz: "450 Ko" },
        { d: "2026-09-30", cat: "Location", n: "Relevé de saison 2026 — Zoute Rentals", sz: "380 Ko" },
        { d: "2024-03-20", cat: "Certificats", n: "Attestation sécurité incendie", sz: "520 Ko" },
        { d: "2019-04-11", cat: "Certificats", n: "EPC — label D", sz: "1,0 Mo" },
        { d: "2026-10-30", cat: "Copropriété", n: "Convocation AG du 21/11/2026", sz: "1,8 Mo" },
        { d: "2026-03-01", cat: "Fiscalité", n: "Taxe de seconde résidence 2026", sz: "140 Ko" }
      ],
      contacts: [
        { role: "Agence location saisonnière", nom: "Zoute Rentals", contact: "050 00 11 22 · info@zoute-exemple.be" },
        { role: "Syndic", nom: "Syndic Kust & Co", contact: "050 00 33 44" },
        { role: "Notaire", nom: "Notariaat Lippens", contact: "050 00 55 66" }
      ]
    }
  ]
};
