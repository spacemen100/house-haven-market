
export type PropertyType = 'house' | 'apartment' | 'land' | 'commercial';
export type ListingType = 'sale' | 'rent' | 'rent_by_day';
export type PropertyCondition = 'new' | 'good' | 'needs_renovation';
export type KitchenType = 'american' | 'open' | 'closed';
export type PropertyStatus = 'free' | 'under_caution' | 'under_construction';

export interface Property {
  // Basic Information
  id: string;
  title: string;
  description: string;
  price: number;
  phoneNumber?: string;
  cadastralCode?: string;
  
  // Location
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    district?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  
  // Property Details
  propertyType: PropertyType;
  listingType: ListingType;
  status?: PropertyStatus;
  condition?: PropertyCondition;
  plan?: string;
  
  // Specifications
  beds: number;
  baths: number;
  sqft: number;
  rooms?: number;
  terraceArea?: number;
  kitchenType?: KitchenType;
  ceilingHeight?: number;
  floorLevel?: number;
  totalFloors?: number;
  yearBuilt: number;
  
  // Features and Amenities
  featured?: boolean;
  amenities?: string[];
  hasElevator?: boolean;
  hasVentilation?: boolean;
  hasAirConditioning?: boolean;
  
  // Equipment and Services
  equipment?: string[];
  internetTV?: string[];
  storage?: string[];
  security?: string[];
  isAccessible?: boolean;
  
  // Environment
  nearbyPlaces?: string[];
  onlineServices?: string[];
  
  // Media
  images: string[];
  
  // Agent Information
  agentName?: string;
  agentPhone?: string;
  projectName?: string;
}
