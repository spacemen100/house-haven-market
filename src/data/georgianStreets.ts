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
    ]
  },
  "Rustavi": {
    "East Zone": [
      "Rustavi 1st Street",
      "Industrial Avenue",
      "Metallurgist Street"
    ],
    "City Center": [
      "Central Avenue",
      "Vazha Pshavela Street",
      "Stalin Avenue"
    ]
  },
  "Gori": {
    "City Center": [
      "Stalin Avenue",
      "Chavchavadze Street",
      "Ketskhoveli Street"
    ],
    "Tserovani": [
      "Main Settlement Street",
      "IDP Housing Street"
    ]
  },
  "Zugdidi": {
    "City Center": [
      "Dadiani Palace Street",
      "Merab Kostava Street",
      "Rukhi Highway"
    ]
  },
  "Poti": {
    "Port Area": [
      "Port Street",
      "Seaside Avenue",
      "Industrial Zone Road"
    ]
  },
  "Bordjomi": {
    "Central Park": [
      "Park Avenue",
      "Mineral Springs Street",
      "Stalin Street"
    ]
  },
  "Telavi": {
    "Old Town": [
      "King Erekle II Street",
      "Wine Valley Road",
      "Fortress Hill Street"
    ]
  },
  "Mtskheta": {
    "Old Town": [
      "Svetitskhoveli Street",
      "Armazi Street",
      "Church Hill Road"
    ]
  },
  "Akhaltsikhe": {
    "Rabati Fortress": [
      "Fortress Road",
      "Ahmed-Pasha Street",
      "Old Town Street"
    ]
  },
  "Kvareli": {
    "Wine District": [
      "Kindzmarauli Street",
      "Winemakers Alley",
      "Lakeview Street"
    ]
  },
  "Ambrolauri": {
    "Wine District": [
      "Khvanchkara Street",
      "Usakhelauri Lane",
      "Racha Valley Road"
    ]
  },
  "Akhalkalaki": {
    "Armenian District": [
      "Yerevan Street",
      "Lake Sevan Street",
      "Mount Ararat Street"
    ]
  },
  "Bolnisi": {
    "German Settlement": [
      "Katharinenfeld Street",
      "Martin Luther Street",
      "Vinegrowers Lane"
    ]
  }
};



export const getStreetsForDistrict = (city: GeorgianCity, district: string): string[] => {
  return GEORGIAN_STREETS[city]?.[district] || [];
};