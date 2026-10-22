/* Guide d'utilisation affiché dans l'application (menu « Guide d'utilisation »).
   Destiné aux clients : chaque section = un écran ou un besoin, avec une capture (dossier guide/).
   « demo » : précision sur ce qui est simulé dans la version de démonstration. */
window.GUIDE = {
  intro: "Cockpit Immo rassemble en un seul endroit tout ce qui concerne vos biens immobiliers : leur valeur, vos crédits, vos locations, vos charges, vos échéances et vos documents. Votre conseillère y a accès avec vous : vous parlez des mêmes chiffres. Ce guide explique comment l’utiliser au quotidien.",

  sections: [
    {
      id: "demarrer", titre: "Premiers pas", icone: "info",
      texte: `<p>Vous accédez à Cockpit Immo depuis votre espace client, sur ordinateur, tablette ou smartphone. Aucune installation n’est nécessaire.</p>
        <ul>
          <li><b>Qui remplit les données ?</b> Lors de la mise en place, votre conseillère encode vos biens à partir de vos actes, contrats de crédit, baux et avertissements-extraits de rôle. Ensuite, chaque nouveau document que vous déposez met le dossier à jour.</li>
          <li><b>La navigation :</b> le menu de gauche (ou la barre du bas sur smartphone) donne accès à la vue d’ensemble, au simulateur, aux documents et à chacun de vos biens.</li>
          <li><b>Le bouton Foyer / Ma part</b> (en haut à droite) permet de voir les chiffres pour l’ensemble du ménage, ou uniquement votre quote-part dans les biens détenus en indivision.</li>
          <li><b>Le mode sombre</b> s’active avec l’icône de lune, en bas du menu.</li>
        </ul>`,
      images: [["mapart", "Le bouton « Ma part » recalcule tous les montants selon vos quotes-parts (ici, Uccle et Knokke à 50 %)."]],
      demo: "Dans cette démo, les données d’un client fictif sont préchargées et il n’y a pas d’identification."
    },
    {
      id: "accueil", titre: "La vue d’ensemble", icone: "grid",
      texte: `<p>C’est la page d’accueil. Elle répond en quelques secondes à la question : <i>où en est mon patrimoine immobilier ?</i></p>
        <ol>
          <li><b>Le bandeau bleu</b> affiche votre patrimoine net (valeur estimée de vos biens − capital restant dû) et son évolution sur 12 mois.</li>
          <li><b>Le cadre rouge</b> n’apparaît que s’il y a quelque chose d’urgent à traiter.</li>
          <li><b>Les quatre indicateurs</b> résument vos revenus locatifs, le cash-flow de vos biens de rapport, leur rendement et la plus-value latente.</li>
        </ol>`,
      images: [["accueil", "La vue d’ensemble : patrimoine net, alerte urgente et indicateurs clés."],
        ["evolution", "L’évolution de votre patrimoine net depuis le premier achat, avec la projection jusqu’à la retraite, et la répartition entre vos biens et vos régions."]],
      astuce: "Survolez (ou touchez) le graphique pour lire la valeur exacte à une date donnée."
    },
    {
      id: "biens", titre: "Vos biens en un coup d’œil", icone: "home",
      texte: `<p>Chaque bien a sa carte : valeur estimée, dette restante, patrimoine net, plus-value latente et ce qu’il vous rapporte (ou vous coûte) chaque mois. La barre de couleur montre la part du bien qui vous appartient déjà, c’est-à-dire celle qui n’est plus financée par la banque.</p>
        <p>Plus bas, le tableau <b>Performance par bien</b> compare vos biens entre eux : taux d’endettement, rendement brut et net, plus-value. Cliquez sur une carte ou une ligne pour ouvrir la fiche du bien.</p>`,
      images: [["biens", "Les cartes des biens ; un badge rouge signale un point urgent."], ["performance", "La comparaison de la performance de vos biens."]]
    },
    {
      id: "alertes", titre: "Points d’attention et agenda", icone: "alert",
      texte: `<p>Cockpit Immo surveille pour vous les échéances et les anomalies : bail qui arrive à terme, indexation oubliée, logement vacant, certificat expiré, appel de fonds de la copropriété…</p>
        <ul>
          <li><span class="st bad">Urgent</span> : à traiter maintenant, il y a un impact financier ou légal.</li>
          <li><span class="st warn">À suivre</span> : une échéance approche dans les prochains mois.</li>
          <li><span class="st info">Info</span> : une opportunité ou un point à discuter avec votre conseillère.</li>
        </ul>
        <p>L’<b>agenda</b> liste les prochaines échéances de tous vos biens (assemblées générales, entretiens obligatoires, dates limites de préavis…) et les derniers événements.</p>`,
      images: [["alertes", "Les points d’attention, triés par urgence, et l’agenda de vos biens."]],
      astuce: "Chaque alerte explique ce qu’il faut faire. En cas de doute, préparez-la pour votre prochain rendez-vous : elle apparaît aussi chez votre conseillère."
    },
    {
      id: "fiche", titre: "La fiche d’un bien", icone: "doc",
      texte: `<p>En ouvrant un bien, vous retrouvez sa photo, ses caractéristiques et des onglets thématiques :</p>
        <ul>
          <li><b>Synthèse</b> : chiffres clés, alertes du bien, évolution de la valeur et de la dette, budget mensuel.</li>
          <li><b>Historique</b> : toute la vie du bien, de l’offre d’achat aux prochaines échéances (en pointillé).</li>
          <li><b>Achat & crédit</b>, <b>Location</b>, <b>Charges & fiscalité</b>, <b>Travaux & certificats</b>, <b>Documents</b>, <b>Fiche & contacts</b> : détaillés ci-dessous.</li>
        </ul>`,
      images: [["bien", "La synthèse d’un bien : valeur, dette, patrimoine net et solde mensuel."], ["historique", "L’historique du bien ; les événements à venir sont encadrés en pointillé."]]
    },
    {
      id: "credit", titre: "Suivre son crédit", icone: "bank",
      texte: `<p>L’onglet <b>Achat & crédit</b> reprend le coût complet de l’acquisition (prix, droits d’enregistrement, notaire) et le détail de chaque crédit : taux, mensualité, capital restant dû, intérêts déjà payés et restant à payer.</p>
        <p>Le graphique d’amortissement montre, année par année, la part de vos mensualités qui rembourse le capital (votre épargne) et la part qui paie les intérêts. Les révisions de taux et les remboursements anticipés y sont intégrés.</p>`,
      images: [["credit", "Le coût d’acquisition, le détail du crédit et son amortissement."]],
      astuce: "Le capital restant dû affiché ici est celui à communiquer à votre notaire ou à votre banque en cas de revente ou de refinancement."
    },
    {
      id: "location", titre: "Gérer ses locations", icone: "key",
      texte: `<p>L’onglet <b>Location</b> liste vos baux : locataire, type de bail, échéance, garantie locative, loyer actuel et statut (loué, vacant, indexation à appliquer).</p>
        <p><b>Situation réelle : indexer un loyer.</b> Chaque année, à la date anniversaire du bail, vous pouvez indexer le loyer. Le <b>calculateur d’indexation</b> donne le nouveau montant à partir du loyer de base et du dernier indice santé. Envoyez ensuite le courrier d’indexation à votre locataire : la rétroactivité est limitée à 3 mois, d’où l’alerte en cas d’oubli.</p>
        <p><b>Situation réelle : un locataire donne son préavis.</b> Déposez sa lettre dans vos documents. Le logement passe en « vacant » à la date de sortie, le manque à gagner est calculé et l’échéance apparaît dans l’agenda.</p>
        <p>Pour une location saisonnière, l’onglet montre l’occupation mois par mois (nuits louées et séjours de la famille) et les revenus de chaque saison.</p>`,
      images: [["location", "Les baux en cours, les loyers perçus et le calculateur d’indexation."], ["saisonnier", "La location saisonnière : revenus, commission d’agence et occupation."]]
    },
    {
      id: "charges", titre: "Charges, fiscalité et budget", icone: "receipt",
      texte: `<p>L’onglet <b>Charges & fiscalité</b> détaille ce que coûte chaque bien : précompte immobilier, impôts sur les loyers, assurances, copropriété, énergie, entretien. Le <b>bilan annuel</b> rapproche les revenus, les charges et le crédit pour montrer le cash-flow réel et votre enrichissement (cash-flow + capital remboursé).</p>
        <p>Sur la vue d’ensemble, la section <b>Revenus et dépenses</b> donne la même lecture pour l’ensemble de vos biens, année par année et pour le mois en cours.</p>`,
      images: [["charges", "Le bilan annuel d’un bien."], ["budget", "Les flux annuels et le budget du mois, tous biens confondus."]],
      astuce: "Le revenu cadastral et le précompte affichés ici sont utiles pour préparer votre déclaration fiscale."
    },
    {
      id: "travaux", titre: "Travaux, certificats et obligations", icone: "tool",
      texte: `<p>Un bien implique des obligations : certificat PEB, contrôle de l’installation électrique, entretien des chaudières, ramonage, détecteurs de fumée, attestations pour la location touristique… L’onglet <b>Travaux & certificats</b> indique pour chacun la dernière date et l’échéance :</p>
        <ul><li><span class="st ok">Valide</span> rien à faire ; <span class="st warn">Bientôt</span> à planifier dans les six mois ; <span class="st bad">À renouveler</span> dans les deux mois ou déjà expiré.</li></ul>
        <p>Les travaux réalisés, en cours, prévus ou au stade du devis y sont aussi suivis, avec leur montant.</p>`,
      images: [["certificats", "Les certificats et obligations, avec leur statut, et les travaux."]]
    },
    {
      id: "documents", titre: "Le coffre-fort documents", icone: "doc",
      texte: `<p>Tous vos documents sont classés par bien et par catégorie : actes, crédits, baux, certificats, assurances, fiscalité, copropriété, travaux. Utilisez la barre de recherche ou les filtres pour retrouver un document en quelques secondes, par exemple pour l’envoyer à un notaire ou à un assureur.</p>
        <p><b>Ajouter un document :</b> bouton « Ajouter », puis choisissez le fichier, ou photographiez le courrier avec votre smartphone. Il est classé et les informations utiles (montant, échéance) sont reportées dans votre dossier.</p>`,
      images: [["documents", "Le coffre-fort : recherche, filtres par bien et par catégorie."]],
      demo: "Dans cette démo, les documents sont fictifs : ils ne s’ouvrent pas et l’ajout est désactivé."
    },
    {
      id: "simulateur", titre: "Le simulateur", icone: "sliders",
      texte: `<p>Le simulateur répond aux questions « et si… ? ». Modifiez les hypothèses (évolution des prix, indexation des loyers, hausse des charges) : la projection de votre patrimoine et les chiffres à la retraite se mettent à jour.</p>
        <p><b>Situation réelle : vous pensez revendre un bien.</b> Choisissez le bien et l’année : le simulateur estime le prix, déduit le capital restant dû, l’indemnité de remploi de la banque, les frais de vente et l’éventuelle taxe sur la plus-value, puis affiche les liquidités récupérées.</p>
        <p><b>Situation réelle : vous envisagez un nouvel achat.</b> Encodez le prix, l’apport, le taux, la durée et le loyer attendu : vous obtenez la mensualité, le cash-flow, le rendement et l’impact sur votre endettement global.</p>`,
      images: [["simulateur", "La projection du patrimoine et les chiffres à la retraite."], ["revente", "La simulation de revente et celle d’un nouvel investissement locatif."]],
      astuce: "Les résultats sont des estimations indicatives. Avant toute décision, validez le scénario avec votre conseillère : elle tiendra compte de votre fiscalité personnelle et de votre situation familiale."
    },
    {
      id: "conseillere", titre: "Contacter votre conseillère", icone: "chat",
      texte: `<p>Le bouton <b>Contacter</b> (en bas du menu, ou en haut de la vue d’ensemble) affiche les coordonnées de votre conseillère et la date de votre prochain rendez-vous. Vous pouvez demander un rendez-vous en choisissant un sujet : revue annuelle, financement d’un nouveau bien, revente, fiscalité, succession et donation.</p>
        <p>Votre conseillère voit le même tableau de bord que vous : inutile de rassembler vos papiers avant le rendez-vous.</p>`,
      images: [["conseiller", "La fenêtre de contact et de demande de rendez-vous."]],
      demo: "Dans cette démo, la demande de rendez-vous n’est pas réellement envoyée."
    },
    {
      id: "mobile", titre: "Sur smartphone", icone: "phone",
      texte: `<p>Cockpit Immo s’adapte au smartphone : la navigation passe dans la barre du bas (Accueil, Biens, Simulateur, Documents) et les onglets d’un bien défilent horizontalement.</p>
        <p>Pour l’ouvrir comme une application, ajoutez la page à votre écran d’accueil depuis le menu de votre navigateur (« Partager → Sur l’écran d’accueil » sur iPhone, « Ajouter à l’écran d’accueil » sur Android).</p>`,
      images: [["mobile-accueil", "La vue d’ensemble sur smartphone."], ["mobile-bien", "La fiche d’un bien sur smartphone."]],
      mobile: true
    }
  ],

  faq: [
    ["D’où vient la valeur estimée de mes biens ?", "Elle part du prix d’achat et suit l’évolution des prix du marché dans votre commune. Elle est revue lors de chaque revue annuelle avec votre conseillère. C’est une estimation, pas une expertise : en cas de vente ou de succession, une expertise reste nécessaire."],
    ["À quelle fréquence les chiffres sont-ils mis à jour ?", "Le capital restant dû, les loyers et les échéances sont recalculés chaque mois. Les montants changent aussi dès qu’un nouveau document est déposé : nouveau bail, extrait de compte de crédit, avertissement-extrait de rôle…"],
    ["Une information est inexacte, que faire ?", "Signalez-la à votre conseillère via le bouton Contacter, en joignant si possible le document qui fait foi. La correction apparaît dans votre tableau de bord."],
    ["Pourquoi mon solde mensuel est-il négatif alors que mes biens sont loués ?", "Le solde mensuel déduit la totalité de vos mensualités, y compris le capital remboursé. Or ce capital n’est pas une dépense : c’est de l’épargne qui augmente votre patrimoine net. Le bilan annuel de chaque bien montre cet « enrichissement »."],
    ["Mes données sont-elles en sécurité ?", "Vos données et documents sont stockés de manière chiffrée et ne sont accessibles qu’à vous, aux personnes que vous autorisez et à votre conseillère."]
  ]
};
