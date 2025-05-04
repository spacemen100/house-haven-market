import { GeorgianCity } from "./georgianCities";

type StreetData = {
  [city in GeorgianCity]?: {
    [district: string]: string[];
  };
};

export const GEORGIAN_STREETS: StreetData = {
  "Tbilissi": {
    "Vake-Saburtalo": [
      "Rue Chavchavadze",
      "Rue Pekini",
      "Rue Irakli Abashidze",
      "Rue Tsereteli",
      "Rue Vazha Pshavela"
    ],
    "Isani-Samgori": [
      "Rue Aghmashenebeli",
      "Rue Ketevan Tsamebuli",
      "Rue Vazha Pshavela",
      "Rue Tsereteli"
    ],
    // ... autres quartiers de Tbilissi
  },
  "Batoumi": {
    "Centre-ville": [
      "Rue Ninoshvili",
      "Rue Parnavaz Mepe",
      "Rue Chavchavadze",
      "Boulevard Maritime"
    ],
    // ... autres quartiers de Batoumi
  },
  // ... autres villes
};

export const getStreetsForDistrict = (city: GeorgianCity, district: string): string[] => {
  return GEORGIAN_STREETS[city]?.[district] || [];
};