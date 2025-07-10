export const quizQuestions = {
  1: {
    chapter: [
      {
        id: 1,
        question: "Selon les normes SYCEBNL, quelles sont les trois catégories principales d'activités qui génèrent des flux de trésorerie ?",
        options: [
          "Activités courantes, exceptionnelles et financières",
          "Activités opérationnelles, d'investissement et de financement",
          "Encaissements, décaissements et reports",
          "Revenus, charges et résultat"
        ],
        correctAnswer: 1,
        explanation: "Le Tableau de Flux de Trésorerie (TFT) classe les mouvements de liquidités en trois catégories fondamentales : les activités opérationnelles (liées à l'exploitation courante), les activités d'investissement (liées aux acquisitions et cessions d'immobilisations) et les activités de financement (liées aux capitaux propres et aux emprunts). Cette classification permet une analyse claire de l'origine et de l'utilisation de la trésorerie."
      },
      {
        id: 2,
        question: "Comment est calculée la trésorerie nette initiale dans le cadre du Tableau de Flux de Trésorerie SYCEBNL ?",
        options: [
          "Trésorerie actif N-1 + Trésorerie passif N-1",
          "Trésorerie actif N-1 - Trésorerie passif N-1",
          "Trésorerie actif N - Trésorerie passif N",
          "Disponibilités + Placements"
        ],
        correctAnswer: 1,
        explanation: "La trésorerie nette initiale correspond à la différence entre la trésorerie active (disponibilités) et la trésorerie passive (découverts bancaires, concours bancaires courants) à la fin de l'exercice précédent (N-1). C'est le point de départ du Tableau de Flux de Trésorerie pour l'exercice en cours."
      },
      {
        id: 3,
        question: "Pour calculer les encaissements de cotisations, quelle formule doit être utilisée en tenant compte des variations de créances adhérents ?",
        options: [
          "Cotisations de l'exercice + Variation des créances adhérents",
          "Cotisations de l'exercice - Variation des créances adhérents",
          "Cotisations de l'exercice uniquement",
          "Créances adhérents fin d'exercice"
        ],
        correctAnswer: 1,
        explanation: "Pour obtenir l'encaissement réel des cotisations, il faut ajuster les cotisations de l'exercice par la variation des créances adhérents. Si les créances augmentent, cela signifie qu'une partie des cotisations n'a pas encore été encaissée, d'où une soustraction. Si elles diminuent, cela signifie des encaissements de cotisations antérieures, d'où une addition. La formule correcte est : Encaissement = Cotisations de l'exercice - (Créances adhérents N - Créances adhérents N-1)."
      },
      {
        id: 4,
        question: "Dans le calcul des flux de trésorerie des activités opérationnelles, comment les intérêts courus doivent-ils être traités ?",
        options: [
          "Inclus dans les flux de trésorerie",
          "Exclus des flux de trésorerie",
          "Comptabilisés à part",
          "Reportés à l'exercice suivant"
        ],
        correctAnswer: 1,
        explanation: "Les intérêts courus représentent des charges ou produits financiers qui ont été comptabilisés mais qui n'ont pas encore donné lieu à un mouvement de trésorerie effectif. Par conséquent, ils doivent être exclus (retraités) du calcul des flux de trésorerie opérationnels, car seuls les flux réels d'argent sont pris en compte dans le TFT."
      },
      {
        id: 5,
        question: "Quelle est la formule correcte pour calculer les encaissements de subventions d'exploitation ?",
        options: [
          "Subventions acquises + Variation des créances subventions",
          "Subventions acquises - Variation des créances subventions",
          "Subventions acquises uniquement",
          "Créances subventions fin d'exercice"
        ],
        correctAnswer: 1,
        explanation: "Similaire aux cotisations, l'encaissement réel des subventions d'exploitation est obtenu en ajustant les subventions acquises (celles qui sont dues pour l'exercice) par la variation des créances sur subventions. Une augmentation des créances sur subventions signifie que la subvention n'a pas encore été entièrement encaissée, réduisant le flux de trésorerie."
      },
      {
        id: 6,
        question: "Comment sont calculées les charges de personnel décaissées ?",
        options: [
          "Charges de personnel + Variation des dettes personnel",
          "Charges de personnel - Variation des dettes personnel",
          "Charges de personnel uniquement",
          "Dettes personnel fin d'exercice"
        ],
        correctAnswer: 1,
        explanation: "Pour déterminer les décaissements réels liés au personnel, il faut ajuster les charges de personnel de l'exercice par la variation des dettes envers le personnel (salaires à payer, charges sociales à verser). Si les dettes augmentent, cela signifie qu'une partie des charges n'a pas encore été décaissée, d'où une soustraction. Si elles diminuent, cela signifie des décaissements de charges antérieures, d'où une addition. La formule correcte est : Décaissement = Charges de personnel - (Dettes personnel N - Dettes personnel N-1)."
      },
      {
        id: 7,
        question: "Comment s'effectue le contrôle final de la cohérence du tableau de flux de trésorerie ?",
        options: [
          "Trésorerie nette finale calculée = Trésorerie nette comptable",
          "Somme des flux = Variation de trésorerie",
          "Les deux premières réponses sont correctes",
          "Uniquement la somme des encaissements doit être égale à la somme des décaissements"
        ],
        correctAnswer: 2,
        explanation: "Le contrôle final du TFT s'effectue de deux manières complémentaires : 1) La trésorerie nette finale calculée à partir des flux doit être égale à la trésorerie nette figurant au bilan de fin d'exercice. 2) La somme algébrique des flux des trois catégories (opérationnels, investissement, financement) doit être égale à la variation nette de trésorerie de la période. Ces deux vérifications garantissent la cohérence et l'exactitude du tableau."
      },
      {
        id: 8,
        question: "Quels éléments sont généralement inclus dans les revenus liés à la générosité pour une association ?",
        options: [
          "Uniquement les dons manuels",
          "Dons et legs uniquement",
          "Dons, legs et collectes publiques",
          "Dons, legs, collectes publiques et manifestations de soutien"
        ],
        correctAnswer: 3,
        explanation: "Les revenus liés à la générosité englobent toutes les formes de soutien financier provenant du public. Cela inclut les dons manuels (argent, biens), les legs (héritages), les fonds collectés lors d'événements publics (collectes, kermesses) et les revenus générés par des manifestations de soutien (ventes de produits artisanaux, concerts caritatifs)."
      },
      {
        id: 9,
        question: "Dans le cas VERDAS, si la trésorerie active N-1 est de 15 000 000 et la trésorerie passive N-1 est de 2 500 000, quelle est la trésorerie nette initiale ?",
        options: [
          "12 500 000",
          "10 000 000",
          "2 500 000",
          "15 000 000"
        ],
        correctAnswer: 0,
        explanation: "La trésorerie nette initiale est calculée comme Trésorerie active N-1 - Trésorerie passive N-1. Donc, 15 000 000 - 2 500 000 = 12 500 000."
      },
      {
        id: 10,
        question: "Les 'autres décaissements' dans les activités opérationnelles incluent généralement :",
        options: [
          "Uniquement les impôts et taxes",
          "Impôts, taxes et autres charges d'exploitation non spécifiées ailleurs",
          "Impôts, taxes, autres charges et charges financières",
          "Toutes les charges sauf personnel et fournisseurs"
        ],
        correctAnswer: 1,
        explanation: "Les 'autres décaissements' dans les activités opérationnelles regroupent toutes les sorties de trésorerie liées à l'exploitation courante qui ne sont pas spécifiquement classées comme paiements aux fournisseurs ou au personnel. Cela inclut typiquement les impôts et taxes payés, les loyers, les assurances, les frais bancaires, et autres charges diverses."
      }
    ],
    module: [
      {
        id: 11,
        question: "Le flux de trésorerie provenant des activités d'investissement est généralement :",
        options: [
          "Positif, car il s'agit de ventes d'actifs",
          "Négatif, car il s'agit principalement d'acquisitions d'actifs",
          "Nul, car les acquisitions compensent les cessions",
          "Variable selon les organisations et leur phase de développement"
        ],
        correctAnswer: 3,
        explanation: "Le flux de trésorerie d'investissement est variable. Pour une organisation en croissance ou en phase de modernisation, il est souvent négatif (plus d'acquisitions que de cessions). Pour une organisation qui se restructure ou qui vend des actifs importants, il peut être positif. Il est donc essentiel d'analyser le contexte."
      },
      {
        id: 12,
        question: "Comment les subventions d'investissement reçues en nature doivent-elles être traitées dans le Tableau de Flux de Trésorerie ?",
        options: [
          "Incluses dans les flux de trésorerie d'investissement",
          "Exclues des flux de trésorerie",
          "Comptabilisées à 50%",
          "Reportées sur l'exercice suivant"
        ],
        correctAnswer: 1,
        explanation: "Les subventions d'investissement reçues en nature (par exemple, un don de matériel) ne génèrent pas de mouvement de trésorerie. Le Tableau de Flux de Trésorerie ne retrace que les flux réels d'argent. Par conséquent, ces subventions doivent être exclues du TFT. Seules les subventions d'investissement reçues en numéraire sont prises en compte dans les flux de financement."
      },
      {
        id: 13,
        question: "L'acquisition d'immobilisations à crédit impacte les flux de trésorerie :",
        options: [
          "Immédiatement au moment de l'acquisition",
          "Au moment du paiement effectif des échéances du crédit",
          "Les deux exercices, celui de l'acquisition et celui du paiement",
          "Uniquement le bilan, sans impact sur les flux"
        ],
        correctAnswer: 1,
        explanation: "Le Tableau de Flux de Trésorerie est basé sur le principe de la caisse. Une acquisition à crédit ne génère pas de sortie de trésorerie au moment de l'acquisition. Les flux de trésorerie ne sont impactés qu'au moment où les paiements (décaissements) liés à ce crédit sont effectivement réalisés."
      },
      {
        id: 14,
        question: "Les prêts accordés par l'organisation à son personnel sont classés dans quelles activités ?",
        options: [
          "Activités opérationnelles",
          "Activités d'investissement",
          "Activités de financement",
          "Hors tableau"
        ],
        correctAnswer: 1,
        explanation: "Les prêts accordés au personnel sont considérés comme des immobilisations financières pour l'organisation, car ils représentent des créances à long terme. Par conséquent, les flux liés à ces prêts (octroi ou remboursement) sont classés dans les activités d'investissement."
      },
      {
        id: 15,
        question: "Dans le financement par fonds propres, quels éléments sont généralement inclus ?",
        options: [
          "Uniquement les apports en capital",
          "Apports en capital et subventions d'investissement reçues",
          "Apports en capital, subventions d'investissement et emprunts bancaires",
          "Tous les financements externes"
        ],
        correctAnswer: 1,
        explanation: "Le financement par fonds propres inclut les apports en capital (dotations, apports des membres) qui augmentent les ressources permanentes de l'organisation, ainsi que les subventions d'investissement reçues en numéraire, car elles contribuent à la structure financière à long terme et sont destinées à financer des immobilisations."
      },
      {
        id: 16,
        question: "Un emprunt bancaire contracté pendant l'exercice génère :",
        options: [
          "Un flux de trésorerie négatif",
          "Un flux de trésorerie positif",
          "Aucun flux de trésorerie",
          "Un flux d'investissement"
        ],
        correctAnswer: 1,
        explanation: "La contraction d'un emprunt bancaire se traduit par une entrée d'argent dans les caisses de l'organisation. Il s'agit donc d'un encaissement, ce qui génère un flux de trésorerie positif dans la section des activités de financement."
      },
      {
        id: 17,
        question: "Les écarts de conversion sur emprunts en devises doivent-ils être inclus dans les flux de trésorerie ?",
        options: [
          "Oui, car ils impactent le montant de la dette",
          "Non, car ils ne génèrent pas de flux de trésorerie réels",
          "Oui, mais uniquement la partie réalisée",
          "Ils sont comptabilisés séparément et n'apparaissent pas dans le TFT"
        ],
        correctAnswer: 1,
        explanation: "Les écarts de conversion sur emprunts en devises sont des ajustements comptables qui reflètent la variation de la valeur de la dette due aux fluctuations des taux de change. Cependant, ils ne correspondent pas à des mouvements réels d'argent. Par conséquent, ils doivent être exclus (retraités) du Tableau de Flux de Trésorerie."
      },
      {
        id: 18,
        question: "Le remboursement du capital d'un emprunt génère :",
        options: [
          "Un flux de trésorerie positif",
          "Un flux de trésorerie négatif",
          "Aucun flux de trésorerie",
          "Un flux d'investissement"
        ],
        correctAnswer: 1,
        explanation: "Le remboursement du capital d'un emprunt implique une sortie d'argent de l'organisation. Il s'agit donc d'un décaissement, ce qui génère un flux de trésorerie négatif dans la section des activités de financement."
      },
      {
        id: 19,
        question: "La variation de trésorerie nette de la période correspond à :",
        options: [
          "La somme des flux opérationnels uniquement",
          "La somme algébrique des flux opérationnels, d'investissement et de financement",
          "La différence entre encaissements et décaissements",
          "Le résultat net de l'exercice"
        ],
        correctAnswer: 1,
        explanation: "La variation de trésorerie nette de la période est la somme algébrique des flux de trésorerie générés par les trois catégories d'activités : opérationnelles, d'investissement et de financement. C'est cette variation qui, ajoutée à la trésorerie nette initiale, donne la trésorerie nette finale."
      },
      {
        id: 20,
        question: "Dans le cas VERDAS, si la trésorerie nette initiale est de 10 000 000 et la variation nette de trésorerie est de 27 880 000, quelle est la trésorerie nette finale ?",
        options: [
          "33 680 000",
          "37 880 000",
          "40 000 000",
          "27 880 000"
        ],
        correctAnswer: 1,
        explanation: "La trésorerie nette finale est la somme de la trésorerie nette initiale et de la variation nette de trésorerie. Donc, 10 000 000 + 27 880 000 = 37 880 000."
      }
    ]
  },
  2: {
    chapter: [
      {
        id: 21,
        question: "Le tableau emplois-ressources (TER) permet principalement de :",
        options: [
          "Suivre uniquement les dépenses",
          "Contrôler l'utilisation des fonds du projet",
          "Calculer le résultat",
          "Établir le bilan"
        ],
        correctAnswer: 1,
        explanation: "Le TER est un outil de gestion qui permet de s'assurer que les fonds reçus (ressources) sont utilisés conformément aux objectifs et aux prévisions (emplois) du projet ou de l'organisation. Il offre une vision claire de l'affectation des fonds."
      },
      {
        id: 22,
        question: "Les ressources d'un projet dans un TER comprennent :",
        options: [
          "Uniquement les fonds des bailleurs",
          "Fonds des bailleurs et contrepartie État",
          "Fonds des bailleurs, contrepartie État et autres fonds",
          "Tous les financements disponibles"
        ],
        correctAnswer: 3,
        explanation: "Les ressources d'un projet sont toutes les sources de financement disponibles, qu'elles proviennent des bailleurs de fonds, de la contrepartie de l'État, d'autres fonds spécifiques (comme les revenus de manifestations ou de générosité) ou des reports d'exercices précédents. L'objectif est d'avoir une vue exhaustive des moyens financiers."
      },
      {
        id: 23,
        question: "Les emplois d'investissement dans un TER incluent :",
        options: [
          "Uniquement les immobilisations corporelles",
          "Immobilisations corporelles et incorporelles",
          "Toutes les immobilisations et avances",
          "Tous les investissements du projet"
        ],
        correctAnswer: 2,
        explanation: "Les emplois d'investissement couvrent toutes les acquisitions d'actifs à long terme, qu'ils soient incorporels (logiciels, brevets), corporels (terrains, bâtiments, matériel) ou financiers (participations, prêts), ainsi que les avances et acomptes versés sur ces immobilisations. Ces investissements sont essentiels pour la croissance et la pérennité de l'organisation."
      },
      {
        id: 24,
        question: "Les emplois de fonctionnement regroupent :",
        options: [
          "Uniquement les charges de personnel",
          "Charges de personnel et achats",
          "Toutes les charges d'exploitation",
          "Charges courantes et exceptionnelles"
        ],
        correctAnswer: 2,
        explanation: "Les emplois de fonctionnement correspondent à l'ensemble des charges nécessaires à l'activité courante de l'organisation. Cela inclut les achats de biens et services, les charges de personnel, les impôts et taxes, les services extérieurs, les frais financiers, et toutes les autres charges opérationnelles qui ne sont pas des investissements."
      },
      {
        id: 25,
        question: "Le principe d'équilibre dans un TER impose que :",
        options: [
          "Emplois = Ressources",
          "Emplois ≤ Ressources",
          "Emplois ≥ Ressources",
          "Emplois ≠ Ressources"
        ],
        correctAnswer: 0,
        explanation: "Le principe fondamental du TER est que le total des emplois doit être égal au total des ressources. Cela signifie que toutes les ressources collectées doivent être affectées à des emplois spécifiques, assurant ainsi un équilibre financier. Si ce n'est pas le cas, il y a un excédent ou un déficit à justifier."
      },
      {
        id: 26,
        question: "L'excédent de ressources sur emplois dans un TER indique :",
        options: [
          "Un déficit de financement",
          "Un surplus de financement",
          "Une erreur de calcul",
          "Un équilibre parfait"
        ],
        correctAnswer: 1,
        explanation: "Un excédent de ressources sur emplois signifie que l'organisation a collecté plus de fonds qu'elle n'en a dépensé pour ses emplois prévus. Cela représente un surplus de financement qui peut être reporté à l'exercice suivant, ou réaffecté à de nouveaux projets ou réserves."
      },
      {
        id: 27,
        question: "Les avances sur charges représentent :",
        options: [
          "Des charges déjà payées",
          "Des charges à payer",
          "Des charges à justifier",
          "Des charges exceptionnelles"
        ],
        correctAnswer: 2,
        explanation: "Les avances sur charges sont des décaissements effectués pour des dépenses qui n'ont pas encore été entièrement consommées ou justifiées. Elles nécessitent un suivi rigoureux pour s'assurer de leur bonne affectation et de leur régularisation future."
      },
      {
        id: 28,
        question: "Le contrôle budgétaire, en lien avec le TER, vise à :",
        options: [
          "Vérifier les calculs",
          "Comparer prévisions et réalisations",
          "Valider les factures",
          "Approuver les paiements"
        ],
        correctAnswer: 1,
        explanation: "Le contrôle budgétaire consiste à comparer les réalisations (les emplois et ressources effectifs) avec les prévisions budgétaires. Cela permet d'identifier les écarts (positifs ou négatifs), d'en analyser les causes et de prendre des mesures correctives si nécessaire pour maintenir le cap financier."
      },
      {
        id: 29,
        question: "Les fonds disponibles en début d'exercice dans un TER correspondent à :",
        options: [
          "La trésorerie initiale",
          "Les reports de l'exercice précédent",
          "Les engagements",
          "Les subventions acquises"
        ],
        correctAnswer: 1,
        explanation: "Les fonds disponibles en début d'exercice sont les ressources non utilisées et reportées de l'exercice précédent. Ils constituent une ressource pour le nouvel exercice et sont essentiels pour assurer la continuité des activités."
      },
      {
        id: 30,
        question: "La présentation cumulative dans un TER permet de :",
        options: [
          "Suivre l'évolution depuis le début du projet",
          "Comparer avec l'exercice précédent",
          "Calculer les moyennes",
          "Prévoir l'exercice suivant"
        ],
        correctAnswer: 0,
        explanation: "La présentation cumulative permet d'avoir une vision globale de l'utilisation des fonds et des ressources depuis le début du projet, en additionnant les montants de chaque période. Cela est particulièrement utile pour les projets pluriannuels afin de suivre l'avancement global."
      }
    ],
    module: [
      {
        id: 31,
        question: "Dans le cas pratique du cours (Cas 2), le total des ressources s'élève à :",
        options: [
          "1 174 085 500 FCFA",
          "934 520 800 FCFA",
          "239 564 700 FCFA",
          "1 000 000 000 FCFA"
        ],
        correctAnswer: 0,
        explanation: "Selon le tableau emplois-ressources du Cas 2, le total des ressources (I. RESSOURCES) est de 1 174 085 500 FCFA. Ce montant représente l'ensemble des fonds disponibles pour le projet."
      },
      {
        id: 32,
        question: "Le total des emplois dans l'exemple pratique (Cas 2) est de :",
        options: [
          "1 174 085 500 FCFA",
          "934 520 800 FCFA",
          "239 564 700 FCFA",
          "683 270 800 FCFA"
        ],
        correctAnswer: 1,
        explanation: "Le total des emplois (II. EMPLOIS) dans le Cas 2 est la somme des immobilisations (A- TOTAL DES IMMOBILISATIONS) et des charges de fonctionnement (B- TOTAL DES CHARGES DE FONCTIONNEMENT), soit 251 250 000 FCFA + 683 270 800 FCFA = 934 520 800 FCFA."
      },
      {
        id: 33,
        question: "L'excédent de ressources sur emplois dans l'exemple (Cas 2) est de :",
        options: [
          "1 174 085 500 FCFA",
          "934 520 800 FCFA",
          "239 564 700 FCFA",
          "683 270 800 FCFA"
        ],
        correctAnswer: 2,
        explanation: "L'excédent de ressources sur emplois (III. EXCEDENT /DEFICIT DES FONDS RECUS SUR LES EMPLOIS) est calculé en soustrayant le total des emplois du total des ressources : 1 174 085 500 FCFA - 934 520 800 FCFA = 239 564 700 FCFA. Cet excédent représente les fonds non utilisés à la fin de la période."
      },
      {
        id: 34,
        question: "Les immobilisations incorporelles dans l'exemple (Cas 2) représentent :",
        options: [
          "15 000 000 FCFA",
          "20 000 000 FCFA",
          "25 000 000 FCFA",
          "30 000 000 FCFA"
        ],
        correctAnswer: 0,
        explanation: "Dans le tableau emplois-ressources du Cas 2, les immobilisations incorporelles (Logiciels et sites internet) sont de 15 000 000 FCFA."
      },
      {
        id: 35,
        question: "Les charges de personnel dans l'exemple (Cas 2) s'élèvent à :",
        options: [
          "150 000 000 FCFA",
          "170 000 000 FCFA",
          "184 000 000 FCFA",
          "200 000 000 FCFA"
        ],
        correctAnswer: 2,
        explanation: "Dans le tableau emplois-ressources du Cas 2, les charges de personnel (Personnel rémunérations dûs) sont de 184 000 000 FCFA."
      },
      {
        id: 36,
        question: "L'équilibre financier du projet dans le Cas 2 est :",
        options: [
          "Déficitaire",
          "Équilibré",
          "Excédentaire",
          "Indéterminé"
        ],
        correctAnswer: 2,
        explanation: "Le projet présente un excédent de ressources sur emplois (239 564 700 FCFA), ce qui indique une situation financière excédentaire. Cela signifie que le projet a généré plus de ressources qu'il n'en a consommé pour ses emplois."
      },
      {
        id: 37,
        question: "Les fonds disponibles en fin d'exercice dans le Cas 2 correspondent à :",
        options: [
          "La trésorerie finale",
          "L'excédent de ressources",
          "Les engagements",
          "Les provisions"
        ],
        correctAnswer: 1,
        explanation: "Dans un TER, les fonds disponibles en fin d'exercice sont directement liés à l'excédent de ressources sur emplois. C'est ce surplus qui constitue les fonds reportables pour la période suivante."
      },
      {
        id: 38,
        question: "Le contrôle final dans le Cas 2 vérifie que :",
        options: [
          "Total ressources = Total emplois",
          "Fonds disponibles fin = Excédent ressources",
          "Emplois ≤ Ressources",
          "Toutes les réponses précédentes"
        ],
        correctAnswer: 3,
        explanation: "Le contrôle final du TER vérifie la cohérence globale du tableau. Cela inclut la vérification que le total des ressources est égal au total des emplois, que les fonds disponibles en fin d'exercice correspondent bien à l'excédent de ressources, et que les emplois ne dépassent pas les ressources disponibles."
      },
      {
        id: 39,
        question: "La gestion par projet, telle qu'illustrée par le TER, impose :",
        options: [
          "Un suivi séparé des fonds",
          "Une comptabilité analytique",
          "Un reporting spécifique",
          "Toutes les réponses précédentes"
        ],
        correctAnswer: 3,
        explanation: "La gestion par projet, et l'utilisation d'outils comme le TER, impose un suivi financier rigoureux et spécifique. Cela inclut un suivi séparé des fonds alloués à chaque projet, une comptabilité analytique pour ventiler les coûts, et un reporting adapté pour rendre compte de l'utilisation des fonds aux bailleurs et parties prenantes."
      },
      {
        id: 40,
        question: "L'utilisation optimale des ressources, selon le TER, implique :",
        options: [
          "Dépenser tous les fonds",
          "Respecter les objectifs du projet",
          "Maximiser les investissements",
          "Minimiser les charges"
        ],
        correctAnswer: 1,
        explanation: "L'utilisation optimale des ressources ne signifie pas nécessairement de dépenser tous les fonds, mais plutôt de s'assurer que chaque dépense contribue directement à l'atteinte des objectifs du projet. Il s'agit d'une gestion efficiente et efficace des moyens alloués."
      }
    ]
  },
  3: {
    chapter: [
      {
        id: 41,
        question: "Le ratio de liquidité générale se calcule par :",
        options: [
          "Actif circulant / Passif circulant",
          "Disponibilités / Dettes court terme",
          "Actif total / Passif total",
          "Créances / Dettes"
        ],
        correctAnswer: 0,
        explanation: "Le ratio de liquidité générale est un indicateur clé de la capacité d'une organisation à faire face à ses dettes à court terme (passif circulant) avec ses actifs à court terme (actif circulant). Un ratio supérieur à 1 est généralement considéré comme sain."
      },
      {
        id: 42,
        question: "Un ratio de liquidité générale de 2 signifie que :",
        options: [
          "L'entité est en difficulté",
          "L'entité peut faire face à ses dettes court terme",
          "L'entité a trop de liquidités",
          "L'entité est surendettée"
        ],
        correctAnswer: 1,
        explanation: "Un ratio de 2 indique que l'organisation dispose de deux fois plus d'actifs circulants que de passifs circulants. Cela suggère une excellente capacité à honorer ses obligations à court terme et une bonne gestion de sa trésorerie."
      },
      {
        id: 43,
        question: "Le ratio d'autonomie financière mesure :",
        options: [
          "La capacité de remboursement",
          "L'indépendance financière",
          "La rentabilité",
          "La liquidité"
        ],
        correctAnswer: 1,
        explanation: "Le ratio d'autonomie financière évalue la proportion des fonds propres par rapport au total des ressources (fonds propres + dettes). Un ratio élevé indique une plus grande indépendance vis-à-vis des financements externes et une meilleure solidité financière."
      },
      {
        id: 44,
        question: "Le ratio d'endettement peut se calculer par :",
        options: [
          "Dettes / Actif total",
          "Dettes / Fonds propres",
          "Dettes long terme / Fonds propres",
          "Toutes les réponses précédentes"
        ],
        correctAnswer: 3,
        explanation: "Il existe plusieurs ratios d'endettement, chacun offrant une perspective différente sur le niveau d'endettement de l'organisation. Les plus courants sont Dettes totales / Actif total (pourcentage de l'actif financé par la dette), Dettes totales / Fonds propres (levier financier), ou Dettes à long terme / Fonds propres (structure de financement à long terme)."
      },
      {
        id: 45,
        question: "Le besoin en fonds de roulement (BFR) représente :",
        options: [
          "Les liquidités disponibles",
          "Le financement des actifs circulants",
          "Les dettes court terme",
          "Les immobilisations"
        ],
        correctAnswer: 1,
        explanation: "Le BFR est la partie des actifs circulants (stocks, créances clients) qui n'est pas financée par les dettes circulantes (dettes fournisseurs, fiscales, sociales). Il représente le besoin de financement généré par le cycle d'exploitation de l'organisation."
      },
      {
        id: 46,
        question: "Un BFR positif indique :",
        options: [
          "Un excédent de liquidités",
          "Un besoin de financement",
          "Une situation équilibrée",
          "Une rentabilité élevée"
        ],
        correctAnswer: 1,
        explanation: "Un BFR positif signifie que les actifs circulants sont supérieurs aux passifs circulants, créant un besoin de financement permanent pour l'exploitation. Ce besoin doit être couvert par des ressources stables (fonds propres, emprunts à long terme) pour éviter des tensions de trésorerie."
      },
      {
        id: 47,
        question: "Le ratio de couverture des intérêts se calcule par :",
        options: [
          "Résultat / Intérêts",
          "Résultat avant intérêts / Intérêts",
          "Produits / Intérêts",
          "Charges / Intérêts"
        ],
        correctAnswer: 1,
        explanation: "Ce ratio mesure la capacité de l'organisation à couvrir ses charges d'intérêts avec son résultat d'exploitation. Il est calculé en divisant le résultat avant intérêts et impôts (EBIT) par les charges d'intérêts. Un ratio élevé indique une bonne capacité à rembourser les intérêts de la dette."
      },
      {
        id: 48,
        question: "L'analyse horizontale consiste à :",
        options: [
          "Comparer les postes d'un même exercice",
          "Comparer les exercices entre eux",
          "Calculer des ratios",
          "Analyser les écarts"
        ],
        correctAnswer: 1,
        explanation: "L'analyse horizontale consiste à étudier l'évolution des postes des états financiers sur plusieurs périodes (par exemple, d'une année à l'autre). Cela permet d'identifier les tendances, les croissances ou les diminutions significatives au fil du temps."
      },
      {
        id: 49,
        question: "L'analyse verticale consiste à :",
        options: [
          "Comparer les postes d'un même exercice",
          "Comparer les exercices entre eux",
          "Calculer des pourcentages par rapport au total",
          "Analyser les tendances"
        ],
        correctAnswer: 2,
        explanation: "L'analyse verticale consiste à exprimer chaque poste des états financiers en pourcentage d'un total (par exemple, chaque charge en pourcentage du chiffre d'affaires, ou chaque actif en pourcentage du total de l'actif). Cela permet de comprendre la structure interne de l'organisation et l'importance relative de chaque élément."
      },
      {
        id: 50,
        question: "Le fonds de roulement (FR) se calcule par :",
        options: [
          "Actif circulant - Passif circulant",
          "Fonds propres - Immobilisations",
          "Ressources stables - Emplois stables",
          "Les réponses B et C"
        ],
        correctAnswer: 3,
        explanation: "Le fonds de roulement peut être calculé de deux manières équivalentes : soit par le haut du bilan (Ressources stables - Emplois stables), soit par le bas du bilan (Actif circulant - Passif circulant). Il représente la partie des ressources stables qui finance les actifs circulants, assurant ainsi une marge de sécurité financière."
      }
    ],
    module: [
      {
        id: 51,
        question: "Pour une association, l'analyse financière doit tenir compte :",
        options: [
          "Uniquement de la rentabilité",
          "De la mission sociale",
          "De l'équilibre financier et de la mission",
          "Uniquement des subventions"
        ],
        correctAnswer: 2,
        explanation: "L'analyse financière d'une association doit être holistique, intégrant à la fois la recherche de l'équilibre financier (viabilité économique et pérennité) et l'évaluation de l'atteinte de sa mission sociale (pertinence, efficacité et impact des actions menées)."
      },
      {
        id: 52,
        question: "Les indicateurs de performance pour une association incluent :",
        options: [
          "Coût par bénéficiaire",
          "Taux de réalisation des objectifs",
          "Ratio ressources/emplois",
          "Toutes les réponses précédentes"
        ],
        correctAnswer: 3,
        explanation: "Les associations utilisent une variété d'indicateurs de performance, à la fois financiers (ratio ressources/emplois, gestion des subventions) et non financiers (coût par bénéficiaire, taux de réalisation des objectifs, nombre de personnes aidées, qualité des services), pour évaluer leur efficacité, leur impact social et leur gestion."
      },
      {
        id: 53,
        question: "La solvabilité d'une association s'apprécie par :",
        options: [
          "Sa capacité à honorer ses engagements à long terme",
          "Son résultat annuel",
          "Ses subventions",
          "Sa trésorerie"
        ],
        correctAnswer: 0,
        explanation: "La solvabilité mesure la capacité d'une association à faire face à l'ensemble de ses engagements financiers, à court et à long terme. Elle est essentielle pour la pérennité de l'organisation et sa crédibilité auprès des partenaires et financeurs."
      },
      {
        id: 54,
        question: "La diversification des ressources permet de :",
        options: [
          "Augmenter les revenus",
          "Réduire les risques",
          "Améliorer l'efficacité",
          "Diminuer les coûts"
        ],
        correctAnswer: 1,
        explanation: "La diversification des sources de financement (subventions publiques, mécénat, dons privés, activités lucratives, partenariats) permet de réduire la dépendance à une seule source et ainsi de minimiser les risques financiers en cas de baisse ou de suppression de l'une d'entre elles."
      },
      {
        id: 55,
        question: "Le ratio charges/produits indique :",
        options: [
          "La rentabilité",
          "L'efficience",
          "La liquidité",
          "L'endettement"
        ],
        correctAnswer: 1,
        explanation: "Ce ratio mesure l'efficience de l'association dans l'utilisation de ses ressources. Un ratio faible indique que l'association parvient à générer ses activités avec un coût relativement bas par rapport aux produits générés, maximisant ainsi l'impact de chaque euro."
      },
      {
        id: 56,
        question: "Un ratio charges/produits de 0,9 signifie :",
        options: [
          "90% des produits sont consommés par les charges",
          "L'association est déficitaire",
          "L'association dégage un excédent",
          "Les réponses A et C"
        ],
        correctAnswer: 3,
        explanation: "Un ratio de 0,9 signifie que pour chaque euro de produit, 0,90 euro est consommé par les charges. Cela implique que 90% des produits sont utilisés pour couvrir les charges, et donc que l'association dégage un excédent de 10% (1 - 0,9 = 0,1). C'est un signe de bonne gestion."
      },
      {
        id: 57,
        question: "Les réserves d'une association constituent :",
        options: [
          "Des fonds propres",
          "Des provisions",
          "Des dettes",
          "Des charges"
        ],
        correctAnswer: 0,
        explanation: "Les réserves sont des fonds propres accumulés par l'association au fil du temps. Elles renforcent sa solidité financière, sa capacité à faire face à des imprévus, à financer de futurs projets ou à assurer sa pérennité à long terme."
      },
      {
        id: 58,
        question: "Le suivi budgétaire permet de :",
        options: [
          "Contrôler l'exécution du budget",
          "Identifier les écarts",
          "Prendre des mesures correctives",
          "Toutes les réponses précédentes"
        ],
        correctAnswer: 3,
        explanation: "Le suivi budgétaire est un processus continu et essentiel. Il permet de contrôler si les dépenses et les recettes sont conformes aux prévisions, d'identifier rapidement les écarts (positifs ou négatifs), d'en analyser les causes et de prendre les décisions nécessaires pour corriger le tir et maintenir le cap financier."
      },
      {
        id: 59,
        question: "L'analyse des écarts compare :",
        options: [
          "Réalisations et prévisions",
          "Exercices entre eux",
          "Postes du bilan",
          "Ratios financiers"
        ],
        correctAnswer: 0,
        explanation: "L'analyse des écarts consiste à comparer les données réelles (réalisations) avec les données prévisionnelles (budget). Cela permet de mesurer la performance, d'expliquer les différences entre ce qui était attendu et ce qui a été réellement atteint, et d'ajuster les prévisions futures."
      },
      {
        id: 60,
        question: "Un tableau de bord efficace doit être :",
        options: [
          "Exhaustif",
          "Synthétique et pertinent",
          "Complexe",
          "Détaillé"
        ],
        correctAnswer: 1,
        explanation: "Un tableau de bord doit fournir une vue d'ensemble claire et concise des indicateurs clés de performance. Il doit être synthétique pour faciliter la prise de décision rapide et pertinent en ne présentant que les informations essentielles à la gestion et au pilotage de l'organisation."
      }
    ]
  },
  4: {
    chapter: [
      {
        id: 61,
        question: "Dans le cas VERDAS, le résultat des activités ordinaires est de :",
        options: [
          "69 600 000 FCFA",
          "87 600 000 FCFA",
          "577 200 000 FCFA",
          "489 600 000 FCFA"
        ],
        correctAnswer: 1,
        explanation: "Le résultat des activités ordinaires est calculé comme la différence entre les revenus des activités ordinaires (577 200 000 FCFA) et les charges des activités ordinaires (489 600 000 FCFA), soit 577 200 000 - 489 600 000 = 87 600 000 FCFA. Ce résultat est un indicateur clé de la performance opérationnelle de l'association."
      },
      {
        id: 62,
        question: "Le résultat HAO (Hors Activités Ordinaires) dans le cas VERDAS est de :",
        options: [
          "27 000 000 FCFA",
          "-18 000 000 FCFA",
          "45 000 000 FCFA",
          "9 000 000 FCFA"
        ],
        correctAnswer: 1,
        explanation: "Le résultat HAO est la différence entre les produits HAO (27 000 000 FCFA) et les charges HAO (45 000 000 FCFA), soit 27 000 000 - 45 000 000 = -18 000 000 FCFA. Il s'agit donc d'un déficit sur les activités hors ordinaires, ce qui mérite une analyse approfondie."
      },
      {
        id: 63,
        question: "Le résultat net de l'exercice VERDAS s'élève à :",
        options: [
          "87 600 000 FCFA",
          "-18 000 000 FCFA",
          "69 600 000 FCFA",
          "105 600 000 FCFA"
        ],
        correctAnswer: 2,
        explanation: "Le résultat net de l'exercice est la somme du résultat des activités ordinaires (87 600 000 FCFA) et du résultat HAO (-18 000 000 FCFA), soit 87 600 000 + (-18 000 000) = 69 600 000 FCFA. C'est le résultat final de l'exercice comptable."
      },
      {
        id: 64,
        question: "Les cotisations figurant dans la balance après inventaire du cas VERDAS s'élèvent à :",
        options: [
          "150 000 000 FCFA",
          "157 500 000 FCFA",
          "45 000 000 FCFA",
          "22 500 000 FCFA"
        ],
        correctAnswer: 0,
        explanation: "Selon l'extrait de la balance après inventaire fourni dans le cas VERDAS, les cotisations (libellées 'RA Cotisations') s'élèvent à 150 000 000 FCFA. C'est le montant comptabilisé avant tout ajustement pour le TFT."
      },
      {
        id: 65,
        question: "Les encaissements de cotisations dans le cas VERDAS sont de :",
        options: [
          "150 000 000 FCFA",
          "157 500 000 FCFA",
          "45 000 000 FCFA",
          "22 500 000 FCFA"
        ],
        correctAnswer: 1,
        explanation: "Les encaissements de cotisations sont calculés en ajustant les cotisations de l'exercice par la variation des créances adhérents. D'après le corrigé du cas VERDAS, cela donne 157 500 000 FCFA. Cet ajustement est crucial pour passer d'une logique comptable à une logique de trésorerie."
      },
      {
        id: 66,
        question: "Les subventions d'exploitation encaissées VERDAS sont de :",
        options: [
          "225 000 000 FCFA",
          "213 750 000 FCFA",
          "33 750 000 FCFA",
          "22 500 000 FCFA"
        ],
        correctAnswer: 1,
        explanation: "Les subventions d'exploitation encaissées sont calculées en ajustant les subventions d'exploitation de l'exercice par la variation des créances de subventions. D'après le corrigé du cas VERDAS, cela donne 213 750 000 FCFA. Seuls les montants effectivement reçus sont pris en compte dans le TFT."
      },
      {
        id: 67,
        question: "La variation de trésorerie nette dans le cas VERDAS est de :",
        options: [
          "10 000 000 FCFA",
          "27 880 000 FCFA",
          "37 880 000 FCFA",
          "33 680 000 FCFA"
        ],
        correctAnswer: 1,
        explanation: "La variation de trésorerie nette de la période est la somme algébrique des flux opérationnels, d'investissement et de financement. D'après le corrigé du cas VERDAS, cette variation est de 27 880 000 FCFA. C'est le montant qui explique l'évolution de la trésorerie entre le début et la fin de l'exercice."
      },
      {
        id: 68,
        question: "Les décaissements aux fournisseurs VERDAS s'élèvent à :",
        options: [
          "150 000 000 FCFA",
          "275 050 000 FCFA",
          "193 600 000 FCFA",
          "248 100 000 FCFA"
        ],
        correctAnswer: 1,
        explanation: "Les décaissements aux fournisseurs sont calculés en ajustant les achats de biens et services par la variation des dettes fournisseurs. D'après le corrigé du cas VERDAS, le total des décaissements aux fournisseurs est de 275 050 000 FCFA. C'est une composante majeure des flux opérationnels."
      },
      {
        id: 69,
        question: "Les flux d'investissement VERDAS sont de :",
        options: [
          "-985 500 000 FCFA",
          "-989 970 000 FCFA",
          "-950 000 000 FCFA",
          "-988 000 000 FCFA"
        ],
        correctAnswer: 1,
        explanation: "Les flux d'investissement nets sont calculés en prenant en compte les acquisitions et cessions d'immobilisations. D'après le corrigé du cas VERDAS, les flux d'investissement s'élèvent à -989 970 000 FCFA. Ce montant négatif est typique pour une organisation qui investit massivement."
      },
      {
        id: 70,
        question: "Les flux de financement VERDAS totalisent :",
        options: [
          "946 500 000 FCFA",
          "957 000 000 FCFA",
          "700 000 000 FCFA",
          "246 500 000 FCFA"
        ],
        correctAnswer: 1,
        explanation: "Les flux de financement sont la somme des encaissements liés aux fonds propres et aux emprunts, moins les remboursements. D'après le corrigé du cas VERDAS, les flux de financement totaux sont de 957 000 000 FCFA. Cela montre une forte activité de financement pour soutenir les investissements."
      }
    ],
    module: [
      {
        id: 71,
        question: "La méthodologie d'analyse d'un cas pratique comprend généralement :",
        options: [
          "Lecture, analyse, calculs, contrôles",
          "Calculs uniquement",
          "Lecture et calculs",
          "Contrôles uniquement"
        ],
        correctAnswer: 0,
        explanation: "Une analyse complète d'un cas pratique implique plusieurs étapes séquentielles et interdépendantes : une lecture attentive de l'énoncé pour comprendre le contexte, une analyse des informations fournies pour identifier les données pertinentes, la réalisation des calculs nécessaires pour obtenir les résultats financiers, et enfin des contrôles pour vérifier la cohérence et l'exactitude des résultats obtenus."
      },
      {
        id: 72,
        question: "Les retraitements nécessaires dans un TFT concernent :",
        options: [
          "Les éléments sans impact trésorerie",
          "Les variations de créances et dettes",
          "Les opérations en nature",
          "Toutes les réponses précédentes"
        ],
        correctAnswer: 3,
        explanation: "Pour établir un Tableau de Flux de Trésorerie (TFT) précis, il est nécessaire de retraiter plusieurs types d'éléments : les éléments sans impact sur la trésorerie (comme les amortissements et les provisions), les variations des créances et dettes (pour passer du résultat comptable aux flux de trésorerie réels), et les opérations en nature (qui ne génèrent pas de flux monétaires). Tous ces retraitements sont essentiels pour obtenir une image fidèle des mouvements de trésorerie."
      },
      {
        id: 73,
        question: "La cohérence du tableau de flux se vérifie par :",
        options: [
          "Trésorerie finale calculée = Trésorerie comptable",
          "Somme des flux = Variation de trésorerie",
          "Équilibre des totaux",
          "Toutes les réponses précédentes"
        ],
        correctAnswer: 3,
        explanation: "La cohérence d'un TFT est vérifiée par plusieurs points de contrôle essentiels : la trésorerie finale calculée à partir des flux doit correspondre à la trésorerie comptable à la fin de l'exercice ; la somme des flux des trois activités (opérationnelles, investissement, financement) doit être égale à la variation globale de trésorerie de la période ; et les totaux doivent s'équilibrer, garantissant l'exactitude des calculs."
      },
      {
        id: 74,
        question: "L'interprétation des résultats d'un TFT doit porter sur :",
        options: [
          "L'évolution de la trésorerie",
          "L'origine des flux",
          "La capacité d'autofinancement",
          "Toutes les réponses précédentes"
        ],
        correctAnswer: 3,
        explanation: "L'interprétation d'un TFT doit être exhaustive et analyser l'évolution globale de la trésorerie (augmentation ou diminution), l'origine des flux (d'où vient l'argent et où va-t-il), la capacité de l'organisation à s'autofinancer (générer de la trésorerie par ses propres opérations), et sa dépendance vis-à-vis des financements externes. Une analyse complète permet de comprendre la santé financière de l'organisation."
      },
      {
        id: 75,
        question: "Des flux opérationnels positifs indiquent :",
        options: [
          "Une bonne gestion",
          "Une capacité d'autofinancement",
          "Un excédent d'exploitation",
          "Toutes les réponses précédentes"
        ],
        correctAnswer: 3,
        explanation: "Des flux opérationnels positifs sont un signe très favorable de la santé financière d'une organisation. Ils indiquent que l'activité principale génère suffisamment de trésorerie pour couvrir ses dépenses courantes, qu'elle a une capacité à s'autofinancer (financer ses investissements et rembourser ses dettes sans recourir à des financements externes), et qu'elle dégage un excédent d'exploitation, démontrant une bonne gestion et une viabilité à long terme."
      },
      {
        id: 76,
        question: "Les flux d'investissement négatifs sont :",
        options: [
          "Inquiétants",
          "Normaux pour une entité en développement",
          "À éviter",
          "Exceptionnels"
        ],
        correctAnswer: 1,
        explanation: "Des flux d'investissement négatifs sont souvent normaux et même souhaitables pour une organisation en développement ou en phase de croissance. Cela signifie qu'elle investit dans de nouveaux actifs (immobilisations) pour assurer sa croissance future, améliorer sa productivité ou étendre ses activités. Ce n'est pas un signe de faiblesse, mais plutôt de dynamisme et de vision à long terme."
      },
      {
        id: 77,
        question: "La structure optimale des flux dépend :",
        options: [
          "De la nature de l'entité",
          "De sa stratégie",
          "De son cycle de vie",
          "Toutes les réponses précédentes"
        ],
        correctAnswer: 3,
        explanation: "La structure idéale des flux de trésorerie varie considérablement en fonction de plusieurs facteurs : la nature de l'entité (entreprise commerciale, association, institution publique), de sa stratégie (croissance rapide, consolidation, diversification), et de son cycle de vie (démarrage, maturité, déclin). Il n'existe pas de structure unique 'optimale' universelle, mais plutôt une structure adaptée au contexte spécifique de l'organisation."
      },
      {
        id: 78,
        question: "Les recommandations d'amélioration peuvent porter sur :",
        options: [
          "La gestion de trésorerie",
          "Le financement",
          "L'investissement",
          "Toutes les réponses précédentes"
        ],
        correctAnswer: 3,
        explanation: "L'analyse des flux de trésorerie peut déboucher sur des recommandations dans tous les domaines financiers : optimisation de la gestion de trésorerie (par exemple, en réduisant les délais de paiement des clients ou en négociant des délais plus longs avec les fournisseurs), choix des modes de financement (recours à l'emprunt, augmentation des fonds propres), et décisions d'investissement (opportunités, rentabilité des projets)."
      },
      {
        id: 79,
        question: "Le suivi des flux de trésorerie permet de :",
        options: [
          "Anticiper les besoins de financement",
          "Optimiser les placements",
          "Gérer les risques",
          "Toutes les réponses précédentes"
        ],
        correctAnswer: 3,
        explanation: "Un suivi régulier et rigoureux des flux de trésorerie est crucial pour plusieurs raisons : il permet d'anticiper les besoins de financement (pour éviter les ruptures de trésorerie), d'optimiser l'utilisation des excédents de trésorerie (en les plaçant de manière rentable), et de gérer les risques de liquidité (en s'assurant que l'organisation dispose toujours des fonds nécessaires pour faire face à ses obligations). C'est un outil essentiel de pilotage financier."
      },
      {
        id: 80,
        question: "La maîtrise du système SYCEBNL implique :",
        options: [
          "Connaissance des principes",
          "Capacité d'application",
          "Analyse et interprétation",
          "Toutes les réponses précédentes"
        ],
        correctAnswer: 3,
        explanation: "Maîtriser le système SYCEBNL ne se limite pas à la connaissance théorique des principes et des concepts financiers. Cela inclut également la capacité à appliquer ces principes dans des cas concrets, à analyser les résultats obtenus (par exemple, les tableaux de flux de trésorerie ou emplois-ressources) et à les interpréter pour prendre des décisions éclairées et pertinentes. C'est une compétence complète qui combine théorie et pratique."
      }
    ]
  }
};


