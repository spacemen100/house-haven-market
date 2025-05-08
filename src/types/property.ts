
export type PropertyType = 'house' | 'apartment' | 'land' | 'commercial';
export type ListingType = 'sale' | 'rent' | 'rent_by_day';
export type PropertyCondition = 'new' | 'good' | 'needs_renovation';
export type KitchenType = 'american' | 'open' | 'closed';
export type PropertyStatus = 'free' | 'under_caution' | 'under_construction';

// types/property.ts
export interface Property {
  id: string;
  title: string;
  description?: string;
  price: number;
  phoneNumber?: string;
  cadastralCode?: string;
  propertyType: 'house' | 'apartment' | 'land' | 'commercial';
  listingType: 'sale' | 'rent' | 'rent_by_day';
  status?: 'free' | 'under_caution' | 'under_construction';
  condition?: 'new' | 'good' | 'needs_renovation';
  plan?: string;
  addressStreet?: string;
  addressCity: string;
  addressDistrict?: string;
  lat?: number;
  lng?: number;
  beds: number;
  baths: number;
  m2: number;
  rooms?: number;
  terraceArea?: number;
  kitchenType?: string;
  ceilingHeight?: number;
  floorLevel?: number;
  totalFloors?: number;
  yearBuilt?: number;
  featured?: boolean;
  hasElevator?: boolean;
  hasVentilation?: boolean;
  hasAirConditioning?: boolean;
  isAccessible?: boolean;
  amenities?: string[];
  equipment?: string[];
  internetTv?: string[];
  storage?: string[];
  security?: string[];
  nearbyPlaces?: string[];
  onlineServices?: string[];
  images?: string[];

  agentName?: string;
  agentPhone?: string;
  projectName?: string;
  contactEmail?: string;
  instagramHandle?: string;
  facebookUrl?: string;
  twitterHandle?: string;
  currency?: string;
  hasGas?: boolean;
  hasLoggia?: boolean;
  buildingMaterial?: string;
  furnitureType?: string;
  hasFireplace?: boolean;
  storeroomType?: string;
  heatingType?: string;
  hotWaterType?: string;
}

