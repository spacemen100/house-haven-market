import { Property } from "@/types/property";

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Farmhouse with Pool",
    description: "This stunning modern farmhouse sits on 2 acres of beautifully landscaped grounds and features an open concept living space with high ceilings, a gourmet kitchen with top-of-the-line appliances, and a resort-style backyard with a pool and outdoor kitchen.",
    price: 750000,
    phoneNumber: "(555) 123-4567",
    cadastralCode: "MF123456",
    address: {
      street: "123 Oak Lane",
      city: "Riverside",
      state: "CA",
      zip: "92504",
      district: "North Hills",
      coordinates: {
        lat: 34.1234,
        lng: -118.4321
      }
    },
    propertyType: "house",
    listingType: "sale",
    status: "free",
    condition: "new",
    plan: "luxury_villa.pdf",
    beds: 4,
    baths: 3.5,
    sqft: 3200,
    rooms: 8,
    terraceArea: 500,
    kitchenType: "open",
    ceilingHeight: 3.2,
    floorLevel: 0,
    totalFloors: 2,
    yearBuilt: 2019,
    featured: true,
    amenities: ["Pool", "Outdoor Kitchen", "Home Office", "Smart Home"],
    hasElevator: false,
    hasVentilation: true,
    hasAirConditioning: true,
    equipment: ["Dishwasher", "Wine Cellar", "Security System"],
    internetTV: ["High-speed Fiber", "Cable TV", "Smart TV"],
    storage: ["Garage", "Basement Storage"],
    security: ["24/7 Security", "Smart Locks", "Cameras"],
    isAccessible: true,
    nearbyPlaces: ["Shopping Center", "Schools", "Parks", "Hospital"],
    onlineServices: ["Virtual Tours", "Online Payments"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3",
    ],
    agentName: "Sarah Johnson",
    agentPhone: "(555) 123-4567",
    projectName: "Riverside Estates"
  },
  {
    id: "2",
    title: "Downtown Luxury Condo",
    description: "Experience luxury living in this high-rise condo with floor-to-ceiling windows offering breathtaking city views. Features include hardwood floors, granite countertops, stainless steel appliances, and access to premium building amenities.",
    price: 4500,
    phoneNumber: "(555) 987-6543",
    cadastralCode: "LC789012",
    address: {
      street: "789 Urban Ave, Unit 1802",
      city: "Metropolis",
      state: "CA",
      zip: "90210",
      district: "Downtown",
      coordinates: {
        lat: 34.0522,
        lng: -118.2437
      }
    },
    propertyType: "apartment",
    listingType: "rent",
    status: "free",
    condition: "new",
    plan: "luxury_condo.pdf",
    beds: 2,
    baths: 2,
    sqft: 1500,
    rooms: 4,
    terraceArea: 100,
    kitchenType: "american",
    ceilingHeight: 2.8,
    floorLevel: 18,
    totalFloors: 35,
    yearBuilt: 2018,
    featured: true,
    amenities: ["Gym", "Rooftop Pool", "Concierge", "Pet Friendly"],
    hasElevator: true,
    hasVentilation: true,
    hasAirConditioning: true,
    equipment: ["Washer/Dryer", "Dishwasher", "Smart Appliances"],
    internetTV: ["Fiber Internet", "Smart Home Hub"],
    storage: ["Storage Unit", "Bike Storage"],
    security: ["24/7 Doorman", "Security Cameras"],
    isAccessible: true,
    nearbyPlaces: ["Metro Station", "Restaurants", "Shopping"],
    onlineServices: ["Building App", "Package Tracking"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3",
    ],
    agentName: "Michael Rodriguez",
    agentPhone: "(555) 987-6543",
    projectName: "Urban Heights"
  },
  {
    id: "3",
    title: "Oceanfront Development Land",
    description: "Prime oceanfront development opportunity with 5 acres of land zoned for residential or commercial use. Features 200 feet of water frontage with spectacular views and easy access to major highways.",
    price: 1200000,
    address: {
      street: "Ocean Drive",
      city: "Coastal Haven",
      state: "FL",
      zip: "33139"
    },
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=2734&ixlib=rb-4.0.3",
    ],
    beds: 0,
    baths: 0,
    sqft: 217800,
    propertyType: "land",
    listingType: "sale",
    featured: true,
    yearBuilt: 0,
    agentName: "Robert Chen",
    agentPhone: "(555) 456-7890"
  },
  {
    id: "4",
    title: "Renovated Craftsman Bungalow",
    description: "Charming craftsman bungalow completely renovated with attention to original details. Features include a welcoming front porch, hardwood floors, built-ins, updated kitchen and bathrooms, and a detached garage.",
    price: 625000,
    address: {
      street: "456 Maple Street",
      city: "Oakdale",
      state: "OR",
      zip: "97123"
    },
    images: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=2960&ixlib=rb-4.0.3",
    ],
    beds: 3,
    baths: 2,
    sqft: 1850,
    propertyType: "house",
    listingType: "sale",
    yearBuilt: 1925,
    agentName: "Lisa Washington",
    agentPhone: "(555) 765-4321"
  },
  {
    id: "5",
    title: "Luxury Waterfront Estate",
    description: "Spectacular waterfront estate featuring breathtaking views, private dock, infinity pool, and luxury finishes throughout. This home offers the ultimate in luxury living with smart home technology, home theater, wine cellar, and spa-like bathrooms.",
    price: 3800000,
    address: {
      street: "100 Lakeshore Drive",
      city: "Lakeview",
      state: "WA",
      zip: "98001"
    },
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2971&ixlib=rb-4.0.3",
    ],
    beds: 6,
    baths: 7.5,
    sqft: 8500,
    propertyType: "house",
    listingType: "sale",
    featured: true,
    yearBuilt: 2017,
    agentName: "David Thompson",
    agentPhone: "(555) 222-3333",
    amenities: ["Waterfront", "Pool", "Wine Cellar", "Home Theater", "Boat Dock"]
  },
  {
    id: "6",
    title: "Modern Studio Apartment",
    description: "Stylish studio apartment in the heart of the city, perfect for young professionals. Features include a modern kitchen, full bath, built-in storage, and building amenities such as a fitness center and rooftop lounge.",
    price: 1800,
    address: {
      street: "555 Downtown Blvd, Unit 306",
      city: "Metropolis",
      state: "CA",
      zip: "90210"
    },
    images: [
      "https://images.unsplash.com/photo-1626178793926-22b28830aa30?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3",
    ],
    beds: 0,
    baths: 1,
    sqft: 600,
    propertyType: "apartment",
    listingType: "rent",
    yearBuilt: 2020,
    agentName: "Jennifer Liu",
    agentPhone: "(555) 444-5555",
    amenities: ["Fitness Center", "Rooftop Lounge", "Package Receiving", "Bike Storage"]
  }
];

export const getPropertiesByType = (listingType: 'sale' | 'rent'): Property[] => {
  return properties.filter(property => property.listingType === listingType);
};

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find(property => property.id === id);
};

export const getFeaturedProperties = (): Property[] => {
  return properties.filter(property => property.featured);
};
