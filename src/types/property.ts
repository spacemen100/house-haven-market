
export type PropertyType = 'house' | 'apartment' | 'land' | 'commercial';
export type ListingType = 'sale' | 'rent' | 'rent_by_day';
export type PropertyCondition = 'new' | 'good' | 'needs_renovation';
export type KitchenType = 'american' | 'open' | 'closed';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  images: string[];
  beds: number;
  baths: number;
  sqft: number;
  propertyType: PropertyType;
  listingType: ListingType;
  featured?: boolean;
  yearBuilt: number;
  agentName?: string;
  agentPhone?: string;
  amenities?: string[];
  
  // New fields from sell form
  plan?: string;
  cadastralCode?: string;
  status?: string;
  condition?: PropertyCondition;
  terraceArea?: number;
  kitchenType?: KitchenType;
  ceilingHeight?: number;
  hasElevator?: boolean;
  hasVentilation?: boolean;
  floorLevel?: number;
  totalFloors?: number;
  projectName?: string;
  
  // Equipment and services
  equipment?: string[];
  internetTV?: string[];
  storage?: string[];
  security?: string[];
  isAccessible?: boolean;
  
  // Environment
  nearbyPlaces?: string[];
  onlineServices?: string[];
}
