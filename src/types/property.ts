
export type PropertyType = 'house' | 'apartment' | 'land' | 'commercial';

export type ListingType = 'sale' | 'rent';

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
}
