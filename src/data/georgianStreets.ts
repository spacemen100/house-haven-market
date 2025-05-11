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
      "Chitadze Street",
      "Grigol Tabidze Street",
      "Akaki Tsereteli Street",
      "Besiki Street"
    ],
    "Isani-Samgori": [
      "Aghmashenebeli Avenue",
      "Queen Ketevan Street",
      "Vazha Pshavela Avenue",
      "Tsereteli Avenue",
      "Samgori Street",
      "Akaki Tsereteli Street",
      "Tsinamdzgvrishvili Street",
      "Varketili Street"
    ],
    "Didube-Chughureti": [
      "Merab Kostava Avenue",
      "Aghmashenebeli Avenue",
      "Zviad Gamsakhurdia Street",
      "Chughureti Street",
      "Didube Street",
      "Kukia Street",
      "Orbeliani Street"
    ],
    "Gldani-Nadzaladevi": [
      "Guramishvili Street",
      "Vazha Pshavela Avenue",
      "Nadzaladevi Street",
      "Gldani Street",
      "Mukhran Machavariani Street",
      "Aleksi-Meskhishvili Street"
    ],
    "Mtatsminda-Krtsanisi": [
      "Mtatsminda Street",
      "Krtsanisi Street",
      "Chavchavadze Avenue",
      "Shota Rustaveli Avenue",
      "Leselidze Street",
      "Betlemi Street"
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
    "Gonio": [
      "Gonio Fortress Road",
      "Beachside Street",
      "Airport Highway",
      "Adjara Street",
      "Ancient Road"
    ],
    "Old Boulevard": [
      "Batumi Boulevard",
      "Zakaria Paliashvili Street",
      "Seaside Promenade",
      "Alphabetic Tower Street",
      "Neptune Square",
      "Dancing Fountains Street"
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
    "New Boulevard": [
      "Miracle Park Street",
      "Chacha Tower Street",
      "Bike Lane",
      "Skatepark Street"
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
  ]
},
  "Rustavi": {
    "East Zone": [
      "Rustavi Street",
      "Metallurgists Street"
    ],
    "City Center": [
      "Rustaveli Street",
      "Shartava Street",
      "Chavchavadze Street"
    ],
    "West Zone": [
      "Giorgi Chkondideli Street",
      "Ilia Chavchavadze Street",
      "Vakhtang Gorgasali Street"
    ]
  },
  "Gori": {
    "City Center": [
      "Stalin Avenue",
      "Chavchavadze Street",
      "Ketskhoveli Street"
    ],
    "Tserovani": [
      "Tserovani Settlement Street"
    ],
    "Fortress Area": [
      "Gori Fortress Street",
      "Museum Street"
    ]
  },
  "Zugdidi": {
    "City Center": [
      "Dadiani Street",
      "Merab Kostava Street",
      "Rustaveli Street"
    ],
    "Suburban": [
      "Tamar Mepe Street",
      "Kolkheti Street"
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
  }
};



export const getStreetsForDistrict = (city: GeorgianCity, district: string): string[] => {
  return GEORGIAN_STREETS[city]?.[district] || [];
};