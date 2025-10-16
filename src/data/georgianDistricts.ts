import { FrenchCity } from "./georgianCities";
import i18n from 'i18next';

type DistrictData = {
  [key in FrenchCity]?: string[];
};

export const GEORGIAN_DISTRICTS: DistrictData = {
  "Tbilissi": [
    "Vake-Saburtalo",
    "Isani-Samgori",
    "Didube-Chughureti",
    "Gldani-Nadzaladevi",
    "Mtatsminda-Krtsanisi",
    "Old Tbilisi",
    "Dighomi",
    "Avlabari",
    "Vera",
    "Sololaki",
    "Ortachala",
    "Lisi",
    "Tskneti",
    "Tabakhmela",
    "Kojori",
    "Bagebi",
    "Nutsubidze Plateau",
    "Temka",
    "Lilo",
    "Okrokana",
    "Shindisi",
    "Tsavkisi",
    "Sofelgora",
    "Didgori",
    "Narikala",
    "Tsereteli Avenue",
    "Rustaveli Avenue",
  ],
  "Batumi": [
    "City Center",
    "Old Boulevard",
    "New Boulevard",
    "Gonio",
    "Makhinjauri",
    "Bagrationi",
    "Port Area",
    "Anaria",
    "Industrial Zone",
    "Historical District",
    "Tamarisi",
    "Chakvi",
    "Kobuleti Outskirts",
    "Airport Area",
    "Adlia",
    "Angisa",
    "Tamar Mephe",
    "Green Cape",
    "Kakhaberi",
        "Piazza Square",
            "Batumi Plaza",
  ],
  "Kutaisi": [
    "City Center",
    "Gamardsuli",
    "Sachkhere",
    "Vakis Park",
    "White Bridge",
        "David Agmashenebeli Avenue",
            "Kutaisi Central Park",
    "Bagrati",
    "Motsameta",
    "Gelati",
    "Sataplia",
    "Tskaltubo",
    "Avangard",
    "Gora",
    "Red Bridge",
    "Khoni Road Area",
    "Nikea",
    "Chkvishi",
    "Rioni District",
    "Mukhrani",
    "Tskhenistskali"
  ],
  "Rustavi": [
    "City Center",
    "East Zone",
    "West Zone",
    "Old Rustavi",
    "New Rustavi",
    "Rustavi Industrial Park",
    "Krtsanisi District",
    "Shavnabada Area",
    "Rustavi Lake Area",
        "Varketili"
  ],
  "Gori": [
    "City Center",
        "Staline",
    "Tserovani",
    "Fortress Area",
    "Gori University Area",
    "Zemo Gori",
    "Lower Gori",
    "Gori Industrial Zone",
    "Kakhati District",
    "Gori Lake Area"
  ],
  "Zugdidi": [
    "City Center",
    "Suburban",
    "Dadiani Palace Area",
    "Old Town",
    "Zugdidi Park Area",
    "Industrial Zone",
    "Zugdidi Port Area"
  ],
  "Poti": [
    "Port Area",
    "Beachside",
    "City Center",
    "Maltakva",
    "Nabada",
    "Suburban Areas",
    "Khobi",
    "Ureki",
    "Zugdidi",
    "Paliastomi Lake District",
    "Kolkheti National Park",
        "Colchis Avenue",
  ],
  "Borjomi": [
    "Central Park",
    "Resort Area"
  ],
  "Telavi": [
    "Old Town",
    "Wine District"
  ],
  "Mtskheta": [
    "Old Town",
    "Monastery Area"
  ],
  "Akhaltsikhe": [
    "Rabati Fortress",
    "Cultural District"
  ],
  "Kvareli": [
    "Wine District",
    "Nature Reserve"
  ],
  "Ambrolauri": [
    "Wine District",
    "Mountain Area"
  ],
  "Akhalkalaki": [
    "Armenian District",
    "Historic Center"
  ],
  "Bolnisi": [
    "German Settlement",
    "Industrial Zone"
  ],
  "Samtredia": [
    "City Center",
    "Railway District",
    "Industrial Zone"
  ],
  "Khashuri": [
    "City Center",
    "Surami District",
    "Railway District"
  ],
  "Senaki": [
    "City Center",
    "Old Town",
    "Railway District"
  ],
  "Kobouleti": [
    "Beachfront",
    "Central Park",
    "Kobuleti Boulevard",
    "Resort Area",
    "Old Kobuleti"
  ],
  "Khachouri": [
    "Central District",
    "Khachouri Park",
    "Industrial Zone"
  ],
  "Zestaponi": [
    "Industrial Zone",
    "Central District",
    "Ferroalloy Plant Area"
  ],
  "Marneouli": [
    "Central District",
    "Marneuli Park",
    "Border Zone"
  ],

  "Ozourguéti": [
    "Central District",
    "Ozurgeti Park",
    "Administrative Center"
  ],
  "Kaspi": [
    "Industrial Zone",
    "Central District",
    "Kaspi Fortress"
  ],
  "Tchiatoura": [
    "Manganese Mine Area",
    "Central District",
    "Industrial Zone"
  ],
  "Tskhaltubo": [
    "Spa Resort Area",
    "Central Park",
    "Old Sanatoriums"
  ],
  "Sagaredjo": [
    "Central District",
    "Agricultural Zone",
    "Sagarejo Park"
  ],
  "Gardabani": [
    "Industrial Zone",
    "Central District",
    "Border Area"
  ],

  "Tqibuli": [
    "Coal Mining District",
    "Central Area",
    "Industrial Zone"
  ],
  "Khoni": [
    "Central District",
    "Agricultural Zone",
    "Khoni Park"
  ],

  "Gourdjaani": [
    "Wine District",
    "Central Area",
    "Alazani Valley Zone"
  ],

  "Akhmeta": [
    "Central District",
    "Pankisi Valley",
    "Agricultural Zone"
  ],
  "Kareli": [
    "Central District",
    "Industrial Zone",
    "Kareli Park"
  ],
  "Lantchkhouti": [
    "Tea Plantation Area",
    "Central District",
    "Subtropical Zone"
  ],
  "Tsalendjikha": [
    "Central District",
    "Agricultural Area",
    "Tsalenjikha Cathedral"
  ],
  "Doucheti": [
    "Central District",
    "Mountain View Area",
    "Agricultural Zone"
  ],
  "Satchkhere": [
    "Industrial Zone",
    "Central District",
    "Mining Area"
  ],
  "Dedoplistsqaro": [
    "Vashlovani Reserve Area",
    "Central District",
    "Agricultural Zone"
  ],
  "Lagodekhi": [
    "National Park Area",
    "Central District",
    "Border Zone"
  ],
  "Ninotsminda": [
    "Central District",
    "Lake Khanchali Area",
    "Agricultural Zone"
  ],
  "Tsageri": [
    "Mountain District",
    "Central Area",
    "Forest Zone"
  ],
  "Oni": [
    "Central District",
    "Mountain View Area",
    "Historical Jewish Quarter"
  ],

  "Aspindza": [
    "Vardzia Cave Town Area",
    "Central District",
    "Agricultural Zone"
  ],
  "Tianeti": [
    "Central District",
    "Mountainous Area",
    "Forest Zone"
  ],
  "Kharagaouli": [
    "Central District",
    "Borjomi-Kharagauli Park",
    "Mountain Zone"
  ],
  "Baghdati": [
    "Central District",
    "Mayakovsky Museum Area",
    "Forest Zone"
  ],
  "Vani": [
    "Archaeological Site",
    "Central District",
    "Agricultural Zone"
  ],
  "Dmanissi": [
    "Historical Site",
    "Central District",
    "Archaeological Zone"
  ],
  "Tsnori": [
    "Wine District",
    "Central Area",
    "Agricultural Zone"
  ],
  "Tkibouli": [
    "Coal Mining District",
    "Central Area",
    "Industrial Zone"
  ]
};

export const getDistrictsForCity = (city: FrenchCity): string[] => {
  const districts = GEORGIAN_DISTRICTS[city] || [];
  return districts.map(district => 
    i18n.t(`districts.${city}.${district}`, { defaultValue: district })
  );
};