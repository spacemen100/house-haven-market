export type PropertyType = 'house' | 'apartment' | 'land' | 'commercial';
export type ListingType = 'sale' | 'rent' | 'rent_by_day' | 'lease';
export type PropertyCondition = 'new' | 'good' | 'needs_renovation';
export type KitchenType = 'american' | 'open' | 'closed';
export type PropertyStatus = 'free' | 'under_caution' | 'under_construction';

// types/property.ts
export interface Property {
  id: string;
  title: string;
  description?: string;
  price: number;
  phone_number?: string;
  cadastral_code?: string;
  propertyType: 'house' | 'apartment' | 'land' | 'commercial';
  listingType: 'sale' | 'rent' | 'rent_by_day'| 'lease';
  status?: 'free' | 'under_caution' | 'under_construction';
  condition?: 'new' | 'good' | 'needs_renovation';
  plan?: string;
  address_street?: string;
  address_city: string;
  address_district?: string;
  lat?: number;
  lng?: number;
  beds: number;
  baths: number;
  m2: number;
  rooms?: number;
  terrace_area?: number;
  kitchen_type?: string;
  ceiling_height?: number;
  floor_level?: number;
  total_floors?: number;
  year_built?: number;
  featured?: boolean;
  has_elevator?: boolean;
  has_ventilation?: boolean;
  has_air_conditioning?: boolean;
  is_accessible?: boolean;
  amenities?: string[];
  equipment?: string[];
  internet_tv?: string[];
  storage?: string[];
  security?: string[];
  nearby_places?: string[];
  online_services?: string[];
  images?: string[];

  agent_name?: string;
  agent_phone?: string;
  project_name?: string;
  contact_email?: string;
  instagram_handle?: string;
  facebook_url?: string;
  twitter_handle?: string;
  currency?: string;
  has_gas?: boolean;
  has_loggia?: boolean;
  building_material?: string;
  furniture_type?: string;
  has_fireplace?: boolean;
  storeroom_type?: string;
  heating_type?: string;
  hot_water_type?: string;
}

