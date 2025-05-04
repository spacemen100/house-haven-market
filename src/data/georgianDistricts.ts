import { GeorgianCity } from "./georgianCities";

type DistrictData = {
  [key in GeorgianCity]?: string[];
};

export const GEORGIAN_DISTRICTS: DistrictData = {
  "Tbilissi": [
    "Vake-Saburtalo",
    "Isani-Samgori",
    "Didube-Chughureti",
    "Gldani-Nadzaladevi",
    "Mtatsminda-Krtsanisi",
    "Didgori",
    "Digomi",
    "Narikala",
    "Avlabari",
    "Vera"
  ],
  "Batoumi": [
    "Centre-ville",
    "Gonio",
    "Makhinjauri",
    "Bagrationi",
    "Rue de la Mer",
    "Anaria",
    "Old Boulevard",
    "Port"
  ],
  "Koutaïssi": [
    "Centre",
    "Gamardsuli",
    "Sachkhere",
    "Vakis Park",
    "Rioni",
    "Tskaltubo Road",
    "White Bridge"
  ],
  // Ajoutez les autres villes avec leurs quartiers
  "Roustavi": ["Zone Est", "Zone Ouest", "Centre"],
  "Gori": ["Centre", "Staline", "Tserovani"],
  // ... (complétez pour les autres villes)
};

export const getDistrictsForCity = (city: GeorgianCity): string[] => {
  return GEORGIAN_DISTRICTS[city] || [];
};