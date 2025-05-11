import { GeorgianCity } from "./georgianCities";

type StreetData = {
  [city in GeorgianCity]?: {
    [district: string]: string[];
  };
};

export const GEORGIAN_STREETS: StreetData = {
  "Tbilissi": {
    "Vake-Saburtalo": [
      "Chavchavadze Avenue",
      "Pekini Street",
      "Irakli Abashidze Street",
    "Tsereteli Avenue",
    "Vazha Pshavela Avenue",
      "Alexander Kazbegi Avenue",
      "Tamarashvili Street",
      "Lisi Lake Road",
      "Chitadze Street",
    "Grigol Tabidze Street",
    "Akaki Tsereteli Street",
    "Besiki Street",
    "Zakaria Paliashvili Street"
    ],
    "Isani-Samgori": [
      "Ketevan Tsamebuli Avenue",
      "Aghmashenebeli Avenue",
    "Queen Ketevan Street",
    "Vazha Pshavela Avenue",
    "Tsereteli Avenue",
      "Samgori Street",
          "Akaki Tsereteli Street",
    "Tsinamdzgvrishvili Street",
      "Varketili Street",
      "Navtlugi Street",
      "Abashvili Street"
    ],
    "Didube-Chughureti": [
          "Merab Kostava Avenue",
      "Tsereteli Avenue",
      "Aghmashenebeli Avenue",
      "Marjanishvili Street",
          "Zviad Gamsakhurdia Street",
      "Chughureti Street",
      "Zubalashvili Street",
      "Kukia Street",
      "Didube Street",
    "Kukia Street",
    "Orbeliani Street",
    "Marjanishvili Street"
    ],
    "Gldani-Nadzaladevi": [
      "Guramishvili Avenue",
          "Vazha Pshavela Avenue",
      "Khizanishvili Street",
      "Nadzaladevi Street",
      "Gldani Street",
      "Davit Agmashenebeli Alley",
          "Mukhran Machavariani Street",
    "Aleksi-Meskhishvili Street"
    ],
    "Mtatsminda-Krtsanisi": [
      "Rustaveli Avenue",
      "Mtatsminda Street",
      "Krtsanisi Street",
      "Giorgi Leonidze Street",
      "Chavchavadze Avenue",
    "Shota Rustaveli Avenue",
    "Leselidze Street",
    "Betlemi Street",
      "Tabukashvili Street",
      "Chonkadze Street"
    ],
    "Old Tbilisi": [
      "Kote Abkhazi Street",
      "Erekle II Street",
      "Leselidze Street",
      "Lado Asatiani Street",
    "Shavteli Street",
      "Sioni Street",
      "Shavteli Street",
      "Gorgasali Street"
    ],
    "Dighomi": [
      "Didi Dighomi Street",
          "Digomi Street",
      "Petre Kavtaradze Street",
      "Guramishvili Avenue",
      "Aghmashenebeli Alley"
    ],
    "Avlabari": [
      "Metekhi Rise",
      "Samreklo Street",
      "Metekhi Street",
      "Gorgasali Street",
      "Ketevan Tsamebuli Avenue"
    ],
    "Vera": [
      "Melikishvili Avenue",
      "Janashia Street",
      "Tarkhnishvili Street",
      "Zandukeli Street",
          "Kipshidze Street",
              "Tarkhnishvili Street"
    ],
    "Sololaki": [
      "Lado Asatiani Street",
      "Shalva Dadiani Street",
      "Machabeli Street"
    ],
    "Ortachala": [
      "Krtsanisi Street",
      "Gorgasali Street",
      "Ortachala Rise"
    ],
    
    "Lisi": [
      "Lisi Lake Road",
      "Lisi Hill Street"
    ],
    "Tskneti": [
      "Tskneti Highway",
      "Tskneti Center Street"
    ],
    "Tabakhmela": [
      "Tabakhmela Village Road"
    ],
    "Kojori": [
      "Kojori-Tbilisi Road"
    ],
    "Bagebi": [
      "Bagebi Street",
      "University Street"
    ],
    "Nutsubidze Plateau": [
      "Nutsubidze Street",
      "Vazha Pshavela Avenue (Segment IV)"
    ],
    "Temka": [
      "Temka Street",
      "Khizanishvili Street"
    ],
    "Lilo": [
      "Lilo Settlement",
      "Lilo Airport Road"
    ],
    "Okrokana": [
      "Okrokana Road"
    ],
    "Shindisi": [
      "Shindisi-Tbilisi Road"
    ],
    "Tsavkisi": [
      "Tsavkisi Village Road"
    ],
    "Sofelgora": [
      "Sofelgora Road"
    ]
  },

  "Batumi": {
    "City Center": [
      "Ninoshvili Street",
      "King Parnavaz Street",
      "Chavchavadze Street",
      "Seaside Boulevard",
      "Memed Abashidze Avenue",
      "Zubalashvili Street",
      "Gorgiladze Street",
      "Europe Square",
      "Piazza Square",
      "May 6 Park Street"
    ],
    "Old Boulevard": [
      "Batumi Boulevard",
      "Zakaria Paliashvili Street",
      "Seaside Promenade",
      "Alphabetic Tower Street",
      "Neptune Square",
      "Dancing Fountains Street"
    ],
    "New Boulevard": [
      "Miracle Park Street",
      "Chacha Tower Street",
      "Bike Lane",
      "Skatepark Street"
    ],
    "Gonio": [
      "Gonio Fortress Road",
      "Beachside Street",
      "Airport Highway",
      "Adjara Street",
      "Ancient Road"
    ],
    "Makhinjauri": [
      "Botanical Garden Street",
      "Green Cape Road",
      "Resort Avenue",
      "Mountain View Street"
    ],
    "Bagrationi": [
      "King Bagration Street",
      "Heroes Square",
      "Victory Street",
      "Military Road"
    ],
    "Port Area": [
      "Harbor Street",
      "Ferry Terminal Road",
      "Fisherman's Wharf",
      "Marine Station Street"
    ],
    "Anaria": [
      "Anaria Beach Street",
      "Residential Lane",
      "Palm Tree Avenue",
      "Sunset Boulevard"
    ],
    "Industrial Zone": [
      "Factory Street",
      "Cargo Port Road",
      "Railway Access Street"
    ],
    "Historical District": [
      "Old Batumi Street",
      "Mosque Street",
      "Orta Mosque Alley",
      "Jewish Quarter Street"
    ],
    "Tamarisi": [
      "Tamarisi Street",
      "Border Road",
      "Rustavi Settlement Street"
    ],
    "Chakvi": [
      "Chakvi Highway",
      "Resort Street",
      "Beachfront Road"
    ],
    "Kobuleti Outskirts": [
      "Kobuleti-Batumi Highway",
      "Forest Lane",
      "Seaside Alley"
    ],
    "Airport Area": [
      "Batumi International Airport Road",
      "Tbel Abuseridze Street",
      "Aviation Street"
    ],
    "Adlia": [
      "Adlia Street",
      "Shalva Inasaridze Street",
      "New Adlia Boulevard"
    ],
    "Angisa": [
      "Angisa Street",
      "Sunrise Road",
      "Residential Lane"
    ],
    "Tamar Mephe": [
      "Tamar Mephe Avenue",
      "Queen Tamar Street",
      "Adjara Alley"
    ],
    "Green Cape": [
      "Green Cape Coastal Road",
      "Garden Entrance Street",
      "Sea View Path"
    ],
    "Kakhaberi": [
      "Kakhaberi Street",
      "Canal Street",
      "Southern Bay Street"
    ]
  },

  // ... (keep other cities as they were)
  "Kutaisi": {
    "City Center": [
      "David Agmashenebeli Street",
      "Shota Rustaveli Street",
      "Tsereteli Street",
      "Queen Tamar Street",
      "Vekua Street"
    ],
    "White Bridge": [
      "White Bridge Street",
      "Rioni River Street",
      "Colchis Street"
    ],
    "Bagrati": [
      "Bagrati Cathedral Street",
      "Gelati Monastery Road",
      "Historical Museum Street"
    ],
    "Motsameta": [
      "Motsameta Monastery Street",
      "River View Street",
      "Monastery Hill Road"
    ],
    "Gelati": [
      "Gelati Academy Street",
      "Science Avenue",
      "University Lane"
    ],
    "Sataplia": [
      "Sataplia Cave Street",
      "Dinosaur Park Road",
      "Nature Reserve Lane"
    ],
    "Tskaltubo": [
      "Spa Resort Street",
      "Health Avenue",
      "Sanatorium Lane"
    ],
    "Avangard": [
      "Avangard Street",
      "Market Lane",
      "Station Road"
    ],
    "Gora": [
      "Gora Hill Street",
      "Viewpoint Road",
      "Fortress Lane"
    ],
    "Red Bridge": [
      "Red Bridge Street",
      "Bridge Market Road",
      "Railway Overpass Street"
    ],
    "Khoni Road Area": [
      "Khoni Highway",
      "Industrial Lane",
      "Logistics Street"
    ],
    "Nikea": [
      "Nikea Street",
      "Residential Alley",
      "Parkview Street"
    ],
    "Chkvishi": [
      "Village Road",
      "River Trail",
      "Farmland Street"
    ],
    "Rioni District": [
      "Rioni Riverside Street",
      "Fishing Dock Road",
      "Lower Town Avenue"
    ],
    "Mukhrani": [
      "Mukhrani Street",
      "Old Quarter Lane",
      "Historic Trail"
    ],
    "Tskhenistskali": [
      "Tskhenistskali River Road",
      "Bridgeview Street",
      "East Bank Path"
    ]
  },

  "Rustavi": {
    "City Center": [
      "Rustaveli Street",
      "Shartava Street",
      "Chavchavadze Street",
      "Freedom Square",
      "City Hall Street"
    ],
    "East Zone": [
      "Rustavi Street",
      "Metallurgists Street",
      "Industrial Road",
      "Power Plant Avenue"
    ],
    "West Zone": [
      "Giorgi Chkondideli Street",
      "Ilia Chavchavadze Street",
      "Vakhtang Gorgasali Street",
      "Mshvidoba Street"
    ],
    "Old Rustavi": [
      "Beridze Street",
      "Shamkorets Street",
      "Old Factory Road"
    ],
    "New Rustavi": [
      "New District Street",
      "Block A Street",
      "Modern Avenue",
      "Residential Complex Lane"
    ],
    "Rustavi Industrial Park": [
      "Tech Park Street",
      "Warehouse Road",
      "Logistics Street"
    ],
    "Krtsanisi District": [
      "Krtsanisi Road",
      "Hilltop Street",
      "Gardabani Border Lane"
    ],
    "Shavnabada Area": [
      "Shavnabada Street",
      "Military Base Road",
      "South Access Lane"
    ],
    "Rustavi Lake Area": [
      "Lake Promenade",
      "Waterfront Avenue",
      "Picnic Park Road"
    ]
  },

  "Gori": {
    "City Center": [
      "Stalin Avenue",
      "Chavchavadze Street",
      "Ketskhoveli Street",
      "Freedom Square",
      "Cultural Center Street"
    ],
    "Tserovani": [
      "Tserovani Settlement Street",
      "Tserovani Residential Lane"
    ],
    "Fortress Area": [
      "Gori Fortress Street",
      "Museum Street",
      "Old Fortress Road",
      "Historical District Lane"
    ],
    "Gori University Area": [
      "Gori University Street",
      "Science Avenue",
      "Student Quarter Lane"
    ],
    "Zemo Gori": [
      "Zemo Gori Street",
      "Highland District Road",
      "Mountain View Lane"
    ],
    "Lower Gori": [
      "Mtkvari River Road",
      "Suburban Avenue",
      "Industrial Zone Lane"
    ],
    "Gori Industrial Zone": [
      "Industrial District Street",
      "Factory Road",
      "Transportation Hub Lane"
    ],
    "Kakhati District": [
      "Kakhati Street",
      "Central Park Road",
      "Kakhati Square"
    ],
    "Gori Lake Area": [
      "Lake Promenade",
      "Picnic Park Road",
      "Lakeside Avenue"
    ]
  },

  "Zugdidi": {
    "City Center": [
      "Dadiani Street",
      "Merab Kostava Street",
      "Rustaveli Street",
      "Shota Rustaveli Square",
      "Freedom Square"
    ],
    "Suburban": [
      "Tamar Mepe Street",
      "Kolkheti Street",
      "Kvirike Street",
      "Kobuleti Road",
      "Mtsvane Kontskhi Street"
    ],
    "Dadiani Palace Area": [
      "Dadiani Palace Street",
      "Park Avenue",
      "Historical Museum Street"
    ],
    "Old Town": [
      "Old Bazaar Street",
      "Tbilisi Street",
      "Rioni River Road"
    ],
    "Zugdidi Park Area": [
      "Zugdidi Park Avenue",
      "Green Boulevard",
      "Recreational Zone Road"
    ],
    "Industrial Zone": [
      "Factory Street",
      "Cargo Port Road",
      "Workshop Avenue"
    ],
    "Zugdidi Port Area": [
      "Zugdidi Port Road",
      "Ferry Terminal Lane",
      "Waterfront Street"
    ]
  },
  "Poti": {
    "Port Area": [
      "Port Street",
      "Seaside Avenue",
      "Industrial Zone Road"
    ],
    "Beachside": [
      "Beach Boulevard",
      "Marina Street",
      "Lighthouse Lane"
    ],
    "City Center": [
      "Nikoladze Street",
      "Chavchavadze Street",
      "Rustaveli Avenue",
      "Freedom Square",
      "Dadiani Street"
    ],
    "Maltakva": [
      "Maltakva Beach Road",
      "Maltakva Park Street",
      "Maltakva Village Street"
    ],
    "Nabada": [
      "Nabada Street",
      "Port Access Road",
      "Industrial Park Lane"
    ],
    "Suburban Areas": [
      "Tamar Mepe Street",
      "Kolkheti Street",
      "Rioni River Road"
    ],
    "Khobi": [
      "Khobi Central Street",
      "Egrisi Mountain Road"
    ],
    "Ureki": [
      "Ureki Beach Road",
      "Black Sand Avenue",
      "Resort Street"
    ],
    "Zugdidi": [
      "Zugdidi Central Avenue",
      "Samegrelo Street",
      "Zugdidi Park Road"
    ],
    "Lac Paliastomi": [
      "Paliastomi Lake Shore Road",
      "Paliastomi Nature Reserve Street"
    ],
    "Kolkheti National Park": [
      "Kolkhida Wetlands Road",
      "Nature Reserve Path"
    ]
  },
  "Borjomi": {
    "Central Park": [
      "Park Avenue",
      "Mineral Springs Street",
      "Stalin Street"
    ],
    "Resort Area": [
      "Spa Street",
      "Wellness Avenue",
      "Sanatorium Road"
    ]
  },
  "Telavi": {
    "Old Town": [
      "King Erekle II Street",
      "Wine Valley Road",
      "Fortress Hill Street"
    ],
    "Wine District": [
      "Vineyard Lane",
      "Cellar Street",
      "Harvest Road"
    ]
  },
  "Mtskheta": {
    "Old Town": [
      "Svetitskhoveli Street",
      "Armazi Street",
      "Church Hill Road"
    ],
    "Monastery Area": [
      "Jvari Monastery Street",
      "Monastic Lane",
      "Pilgrimage Road"
    ]
  },
  "Akhaltsikhe": {
    "Rabati Fortress": [
      "Fortress Road",
      "Ahmed-Pasha Street",
      "Old Town Street"
    ],
    "Cultural District": [
      "Museum Street",
      "Art Gallery Lane",
      "Cultural Center Road"
    ]
  },
  "Kvareli": {
    "Wine District": [
      "Kindzmarauli Street",
      "Winemakers Alley",
      "Lakeview Street"
    ],
    "Nature Reserve": [
      "Forest Trail",
      "Lake Street",
      "Wildlife Lane"
    ]
  },
  "Ambrolauri": {
    "Wine District": [
      "Khvanchkara Street",
      "Usakhelauri Lane",
      "Racha Valley Road"
    ],
    "Mountain Area": [
      "Alpine Street",
      "Ski Resort Road",
      "Mountain View Lane"
    ]
  },
  "Akhalkalaki": {
    "Armenian District": [
      "Yerevan Street",
      "Lake Sevan Street",
      "Mount Ararat Street"
    ],
    "Historic Center": [
      "Ancient Street",
      "Heritage Lane",
      "Cultural Road"
    ]
  },
  "Bolnisi": {
    "German Settlement": [
      "Katharinenfeld Street",
      "Martin Luther Street",
      "Vinegrowers Lane"
    ],
    "Industrial Zone": [
      "Factory Street",
      "Manufacturing Avenue",
      "Warehouse Lane"
    ]
  },
  "Samtredia": {
    "City Center": [
      "Rustaveli Street",
      "Chavchavadze Street",
      "Tamar Mepe Street",
      "Gogebashvili Street",
      "Kostava Street"
    ],
    "Railway District": [
      "Station Street",
      "Railway Workers Street",
      "Depot Street"
    ],
    "Industrial Zone": [
      "Factory Street",
      "Warehouse Lane",
      "Logistics Avenue"
    ]
  },
  "Khashuri": {
    "City Center": [
      "Rustaveli Street",
      "Chavchavadze Street",
      "Tsereteli Street",
      "Kostava Street",
      "Queen Tamar Street"
    ],
    "Surami District": [
      "Surami Street",
      "Mineral Water Street",
      "Resort Lane"
    ],
    "Railway District": [
      "Station Street",
      "Railway Avenue",
      "Depot Street"
    ]
  },
  "Senaki": {
    "City Center": [
      "Rustaveli Street",
      "Chavchavadze Street",
      "Kutaisi Street",
      "Kostava Street",
      "Tamar Mepe Street"
    ],
    "Old Town": [
      "Church Street",
      "Market Street",
      "Theatre Street"
    ],
    "Railway District": [
      "Station Street",
      "Railway Workers Street",
      "Depot Street"
    ]
  }
};



export const getStreetsForDistrict = (city: GeorgianCity, district: string): string[] => {
  return GEORGIAN_STREETS[city]?.[district] || [];
};