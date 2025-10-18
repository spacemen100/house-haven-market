import { FrenchCity } from "./FrenchCities";
import { FRENCH_DISTRICTS } from "./FrenchDistricts";

type StreetData = {
  [city in FrenchCity]?: {
    [district: string]: string[];
  };
};

export const FRENCH_STREETS: StreetData = {
  "Paris": {
    "1er arrondissement - Louvre": [
      "Rue de Rivoli",
      "Avenue de l'Opéra",
      "Rue Saint-Honoré",
      "Place Vendôme",
      "Rue du Louvre",
      "Quai du Louvre",
      "Rue de la Paix",
      "Rue des Pyramides",
      "Rue Saint-Denis",
      "Rue de la Ferronnerie"
    ],
    "2e arrondissement - Bourse": [
      "Rue Montmartre",
      "Rue du Quatre-Septembre",
      "Rue de la Banque",
      "Rue Réaumur",
      "Rue Saint-Denis",
      "Rue Saint-Fiacre",
      "Rue du Mail",
      "Rue de la Jussienne",
      "Rue d'Aboukir",
      "Rue de Cléry"
    ],
    "3e arrondissement - Temple": [
      "Rue de Bretagne",
      "Rue des Archives",
      "Rue Vieille-du-Temple",
      "Rue du Temple",
      "Rue des Francs-Bourgeois",
      "Rue de Turenne",
      "Rue de Saintonge",
      "Rue de Picardie",
      "Rue Charlot",
      "Rue du Parc-Royal"
    ],
    "4e arrondissement - Hôtel-de-Ville": [
      "Rue de Rivoli",
      "Rue Saint-Antoine",
      "Rue des Rosiers",
      "Rue Vieille-du-Temple",
      "Quai de l'Hôtel-de-Ville",
      "Place des Vosges",
      "Rue du Roi-de-Sicile",
      "Rue Saint-Paul",
      "Rue des Jardins-Saint-Paul",
      "Rue François-Miron"
    ],
    "5e arrondissement - Panthéon": [
      "Boulevard Saint-Michel",
      "Rue Mouffetard",
      "Rue Saint-Jacques",
      "Place de la Contrescarpe",
      "Rue des Écoles",
      "Rue Claude-Bernard",
      "Rue du Cardinal-Lemoine",
      "Rue de la Montagne-Sainte-Geneviève",
      "Rue Descartes",
      "Rue de l'Estrapade"
    ],
    "Le Marais": [
      "Rue des Francs-Bourgeois",
      "Rue Vieille-du-Temple",
      "Rue du Temple",
      "Rue des Archives",
      "Rue de Turenne",
      "Rue de Sévigné",
      "Rue Pavée",
      "Rue des Rosiers",
      "Rue du Roi-de-Sicile",
      "Rue Saint-Antoine"
    ],
    "Saint-Germain-des-Prés": [
      "Boulevard Saint-Germain",
      "Rue de Rennes",
      "Rue du Four",
      "Rue de Buci",
      "Rue de Seine",
      "Rue Bonaparte",
      "Rue des Saints-Pères",
      "Rue de l'Université",
      "Rue du Vieux-Colombier",
      "Rue de l'Abbaye"
    ],
    "Quartier Latin": [
      "Boulevard Saint-Michel",
      "Rue Mouffetard",
      "Rue Saint-Jacques",
      "Rue des Écoles",
      "Rue du Cardinal-Lemoine",
      "Rue de la Montagne-Sainte-Geneviève",
      "Rue Claude-Bernard",
      "Rue du Pot-de-Fer",
      "Rue Lacépède",
      "Rue Linné"
    ],
    "Champs-Élysées": [
      "Avenue des Champs-Élysées",
      "Avenue Montaigne",
      "Avenue George-V",
      "Rue du Faubourg-Saint-Honoré",
      "Rue de la Boétie",
      "Rue de Ponthieu",
      "Rue de Berri",
      "Rue Washington",
      "Rue de Bassano",
      "Rue Galilée"
    ],
    "Montmartre": [
      "Rue Lepic",
      "Rue des Abbesses",
      "Rue Caulaincourt",
      "Rue Saint-Vincent",
      "Rue du Mont-Cenis",
      "Rue Cortot",
      "Rue Norvins",
      "Rue des Saules",
      "Rue de l'Abreuvoir",
      "Place du Tertre"
    ]
  },

  "Marseille": {
    "Vieux-Port": [
      "Quai du Port",
      "Quai de Rive-Neuve",
      "La Canebière",
      "Rue Saint-Ferréol",
      "Rue de la République",
      "Rue Paradis",
      "Cours Belsunce",
      "Rue Breteuil",
      "Rue Grignan",
      "Rue Sainte"
    ],
    "Le Panier": [
      "Rue du Panier",
      "Rue du Petit-Puits",
      "Rue des Moulins",
      "Rue du Refuge",
      "Rue des Repenties",
      "Rue du Lacydon",
      "Place de Lenche",
      "Rue du Baignoir",
      "Rue des Pistoles",
      "Rue du Chantier"
    ],
    "Notre-Dame-de-la-Garde": [
      "Boulevard Notre-Dame",
      "Rue du Commandant-Rolland",
      "Rue du Docteur-Jean-Fiolle",
      "Rue Fort-du-Sanctuaire",
      "Rue du Vallon-des-Auffes",
      "Rue des Catalans",
      "Rue du Onze-Novembre",
      "Rue du Docteur-Gérard",
      "Rue des Peintres",
      "Rue du Vallon-de-l'Oratoire"
    ],
    "Les Calanques": [
      "Corniche du Président-John-Fitzgerald-Kennedy",
      "Avenue de la Corriche",
      "Route des Calanques",
      "Boulevard de la Corderie",
      "Rue du Vallon-de-l'Oriol",
      "Rue des Goudes",
      "Rue du Sormiou",
      "Rue de la Cayolle",
      "Rue de Montredon",
      "Rue du Commandant-de-Larminat"
    ],
    "Prado": [
      "Avenue du Prado",
      "Boulevard Michelet",
      "Rue du Commandant-Rolland",
      "Rue Saint-Barnabé",
      "Rue du Docteur-Charles-Delacroix",
      "Rue du Borde",
      "Rue de Lodi",
      "Rue du Docteur-Julien",
      "Rue du Baretty",
      "Rue Saint-Pierre"
    ],
    "Endoume": [
      "Rue d'Endoume",
      "Rue du Vallon-des-Auffes",
      "Rue des Peintres-Roux",
      "Rue du Docteur-Fiolle",
      "Rue du Onze-Novembre",
      "Rue du Vallon-de-l'Oratoire",
      "Rue des Catalans",
      "Rue du Fort-Saint-Nicolas",
      "Rue du Pharo",
      "Rue des Bergers"
    ],
    "Cours Julien": [
      "Cours Julien",
      "Rue des Trois-Rois",
      "Rue des Trois-Mages",
      "Rue d'Aubagne",
      "Rue de la Palud",
      "Rue du Musée",
      "Rue des Petites-Maries",
      "Rue Pastoret",
      "Rue des Minimes",
      "Rue des Bernardines"
    ],
    "La Plaine": [
      "Place Jean-Jaurès",
      "Rue du Faubourg-du-Cours",
      "Rue des Chapeliers",
      "Rue des Trois-Frères-Carasso",
      "Rue du Théâtre-Français",
      "Rue de la Palud",
      "Rue des Feuillants",
      "Rue des Convalescents",
      "Rue des Petites-Maries",
      "Rue d'Aix"
    ]
  },

  "Lyon": {
    "Presqu'île": [
      "Rue de la République",
      "Rue du Président-Édouard-Herriot",
      "Rue de Brest",
      "Rue Gasparin",
      "Rue de la Barre",
      "Place Bellecour",
      "Place des Terreaux",
      "Rue du Plat",
      "Rue Mercière",
      "Quai Saint-Antoine"
    ],
    "Vieux Lyon": [
      "Rue Saint-Jean",
      "Rue du Bœuf",
      "Rue des Trois-Maries",
      "Rue Lainerie",
      "Rue Tramassac",
      "Rue de la Bombarde",
      "Rue du Palais-de-Justice",
      "Rue de la Juiverie",
      "Montée du Gourguillon",
      "Montée Saint-Barthélémy"
    ],
    "Croix-Rousse": [
      "Boulevard de la Croix-Rousse",
      "Montée de la Grande-Côte",
      "Rue des Capucins",
      "Rue d'Austerlitz",
      "Rue Burdeau",
      "Rue des Tables-Claudiennes",
      "Rue des Fantasques",
      "Rue des Pierres-Plantées",
      "Rue des Chartreux",
      "Rue Imbert-Colomès"
    ],
    "Part-Dieu": [
      "Rue Garibaldi",
      "Rue de la Villette",
      "Rue Servient",
      "Rue Paul-Bert",
      "Rue Moncey",
      "Rue de Bonnel",
      "Rue du Dauphiné",
      "Rue de la Part-Dieu",
      "Rue de l'Épi-de-Blé",
      "Rue de la Vigne"
    ],
    "Confluence": [
      "Quai Perrache",
      "Quai Rambaud",
      "Rue Paul-Montrochet",
      "Rue de la Confluence",
      "Rue Smith",
      "Rue des Docks",
      "Rue de l'Annonciade",
      "Rue Delandine",
      "Rue Sainte-Blandine",
      "Rue de la Charité"
    ],
    "Gerland": [
      "Avenue Jean-Jaurès",
      "Rue Marcel-Mérieux",
      "Rue du Docteur-Émile-Roux",
      "Rue de l'Université",
      "Rue du Professeur-Pierre-Marion",
      "Rue du Professeur-Grignard",
      "Rue du Docteur-Fleming",
      "Rue du Docteur-Calmette",
      "Rue du Professeur-Beauvisage",
      "Rue du Professeur-Zimmern"
    ]
  },

  "Toulouse": {
    "Arnaud Bernard": [
      "Rue du Taur",
      "Rue des Filatiers",
      "Rue des Lois",
      "Rue de la Bourse",
      "Rue des Chapeliers",
      "Rue des Blanchers",
      "Rue du Poids-de-l'Huile",
      "Rue des Gestes",
      "Rue de la Trésorerie",
      "Rue des Marchands"
    ],
    "Capitole": [
      "Place du Capitole",
      "Rue du Taur",
      "Rue d'Alsace-Lorraine",
      "Rue de la Pomme",
      "Rue des Changes",
      "Rue Saint-Rome",
      "Rue du Poids-de-l'Huile",
      "Rue des Filatiers",
      "Rue des Lois",
      "Rue du Languedoc"
    ],
    "Saint-Cyprien": [
      "Allée Charles-de-Fitte",
      "Rue de la République",
      "Rue de Gascogne",
      "Rue des Anges",
      "Rue de Rémusat",
      "Rue de la Concorde",
      "Rue de Cugnaux",
      "Rue du Béarnais",
      "Rue du Lot",
      "Rue de la Chaîne"
    ],
    "Carmes": [
      "Rue des Couteliers",
      "Rue des Polinaires",
      "Rue des Salenques",
      "Rue du Languedoc",
      "Rue de la Dalbade",
      "Rue de la Fonderie",
      "Rue des Marchands",
      "Rue des Filatiers",
      "Rue des Gestes",
      "Rue du Poids-de-l'Huile"
    ],
    "Saint-Étienne": [
      "Rue de la Dalbade",
      "Rue du Parlement",
      "Rue des Fleurs",
      "Rue des Arts",
      "Rue de la Bourse",
      "Rue des Puits-Creusés",
      "Rue du Languedoc",
      "Rue des Couteliers",
      "Rue des Polinaires",
      "Rue des Salenques"
    ],
    "Saint-Aubin": [
      "Rue du Faubourg-Saint-Aubin",
      "Rue de la Colombette",
      "Rue des Amidonniers",
      "Rue de la Grave",
      "Rue des Salenques",
      "Rue de la Bourse",
      "Rue des Filatiers",
      "Rue des Gestes",
      "Rue du Poids-de-l'Huile",
      "Rue des Marchands"
    ]
  },

  "Nice": {
    "Vieux Nice": [
      "Cours Saleya",
      "Rue Saint-François-de-Paule",
      "Rue de la Préfecture",
      "Rue Droite",
      "Rue de la Poissonnerie",
      "Rue Benoît-Bunico",
      "Rue de la Loge",
      "Rue de la Terrasse",
      "Rue du Jésus",
      "Rue de la Boucherie"
    ],
    "Promenade des Anglais": [
      "Promenade des Anglais",
      "Avenue de la Californie",
      "Avenue des Phocéens",
      "Avenue de Suède",
      "Avenue de Verdun",
      "Boulevard Gambetta",
      "Rue de France",
      "Rue de la Buffa",
      "Rue Meyerbeer",
      "Rue de Rivoli"
    ],
    "Carré d'Or": [
      "Avenue de Suède",
      "Avenue de Verdun",
      "Rue de France",
      "Rue de la Buffa",
      "Rue Meyerbeer",
      "Rue du Congrès",
      "Rue de la Tour",
      "Rue Maccarani",
      "Rue de Belgique",
      "Rue d'Angleterre"
    ],
    "Libération": [
      "Avenue de la Libération",
      "Boulevard de l'Armée-des-Alpes",
      "Rue Arson",
      "Rue de Lépante",
      "Rue de la Mantega",
      "Rue Smolett",
      "Rue Rossini",
      "Rue Paganini",
      "Rue Berlioz",
      "Rue Verdi"
    ],
    "Port Lympia": [
      "Quai des Deux-Emmanuel",
      "Quai Lunel",
      "Quai du Commerce",
      "Rue Cassini",
      "Rue Bavastro",
      "Rue Ségurane",
      "Rue de la Providence",
      "Rue de la Terrasse",
      "Rue Bonaparte",
      "Rue de la Préfecture"
    ]
  },

  "Nantes": {
    "Centre-ville": [
      "Rue Crébillon",
      "Rue de la Fosse",
      "Rue du Calvaire",
      "Rue du Château",
      "Rue de la Barillerie",
      "Rue des Carmes",
      "Rue de Verdun",
      "Rue de Strasbourg",
      "Rue de l'Héronnière",
      "Rue du Maréchal-de-Lattre-de-Tassigny"
    ],
    "Île de Nantes": [
      "Boulevard Léon-Bureau",
      "Quai des Antilles",
      "Quai de la Loire",
      "Rue Henri-Gautier",
      "Rue des Usines",
      "Rue de l'Île-Mabon",
      "Rue des Bâteliers",
      "Rue des Chantiers",
      "Rue des Docks",
      "Rue des Trentemoult"
    ],
    "Malakoff": [
      "Rue de Malakoff",
      "Rue du Coudray",
      "Rue des Hauts-Pavés",
      "Rue de la Contrie",
      "Rue des Dervallières",
      "Rue du Landreau",
      "Rue de la Bourgeonnière",
      "Rue des Rochettes",
      "Rue de la Charbonnière",
      "Rue des Garettes"
    ],
    "Doulon": [
      "Rue de Doulon",
      "Rue du Landreau",
      "Rue des Rochettes",
      "Rue de la Charbonnière",
      "Rue des Garettes",
      "Rue de la Contrie",
      "Rue des Dervallières",
      "Rue des Hauts-Pavés",
      "Rue du Coudray",
      "Rue de Malakoff"
    ]
  },

  "Montpellier": {
    "Écusson": [
      "Rue de la Loge",
      "Rue du Palais",
      "Rue de l'Ancien-Courrier",
      "Rue des Étuves",
      "Rue de l'Argenterie",
      "Rue du Bras-de-Fer",
      "Rue du Pila-Saint-Gély",
      "Rue de la Valfère",
      "Rue du Plan-d'Agde",
      "Rue de la Vieille"
    ],
    "Antigone": [
      "Place du Nombre-d'Or",
      "Place du Thessalie",
      "Place du Millénaire",
      "Place de l'École",
      "Place de la Comédie",
      "Place de la Défense",
      "Place de la Révolution",
      "Place de la Démocratie",
      "Place des Martyrs-de-la-Résistance",
      "Place des Arceaux"
    ],
    "Port Marianne": [
      "Rue de la Chenaie",
      "Rue des Violettes",
      "Rue des Jacinthes",
      "Rue des Pivoines",
      "Rue des Lilas",
      "Rue des Magnolias",
      "Rue des Camélias",
      "Rue des Glycines",
      "Rue des Hortensias",
      "Rue des Pâquerettes"
    ],
    "Millénaire": [
      "Avenue du Millénaire",
      "Rue de la Chenaie",
      "Rue des Violettes",
      "Rue des Jacinthes",
      "Rue des Pivoines",
      "Rue des Lilas",
      "Rue des Magnolias",
      "Rue des Camélias",
      "Rue des Glycines",
      "Rue des Hortensias"
    ]
  }
};

export const getStreetsForDistrict = (city: FrenchCity, district: string): string[] => {
  // Trouver la clé de district originale (non traduite)
  const rawDistricts = FRENCH_DISTRICTS[city] || [];
  const rawDistrict = rawDistricts.find(d => 
    i18n.t(`districts.${city}.${d}`, { defaultValue: d }) === district
  ) || district;

  const streets = FRENCH_STREETS[city]?.[rawDistrict] || [];
  return streets.map(street => 
    i18n.t(`streets.${city}.${rawDistrict}.${street}`, { defaultValue: street })
  );
};