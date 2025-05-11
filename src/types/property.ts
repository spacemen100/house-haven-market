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
  address_state?: string; // Added to resolve addressState issue
  address_zip?: string; // Added to resolve addressZip issue
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

  created_at?: string; // Added to resolve sorting issues
  property_type?: PropertyType; // Adjusted type to match PropertyType
  has_internet?: boolean; // Added to match usage in Properties.tsx
  has_cable_tv?: boolean; // Added to match usage in Properties.tsx
  allows_pets?: boolean; // Added to match usage in Properties.tsx
  allows_smoking?: boolean; // Added to match usage in Properties.tsx
  near_subway?: boolean; // Added to match usage in Properties.tsx
  near_park?: boolean; // Added to match usage in Properties.tsx
  near_school?: boolean; // Added to match usage in Properties.tsx
  parking_type?: string; // Added to match usage in Properties.tsx
  has_dishwasher?: boolean; // Added to match usage in Properties.tsx
  has_washing_machine?: boolean; // Added to match usage in Properties.tsx
  has_gas_stove?: boolean; // Added to match usage in Properties.tsx
  has_vent?: boolean; // Added to match usage in Properties.tsx
  has_electric_kettle?: boolean; // Added to match usage in Properties.tsx
  has_induction_oven?: boolean; // Added to match usage in Properties.tsx
  has_microwave?: boolean; // Added to match usage in Properties.tsx
  has_tv?: boolean; // Added to match usage in Properties.tsx
  has_coffee_machine?: boolean; // Added to match usage in Properties.tsx
  has_audio_system?: boolean; // Added to match usage in Properties.tsx
  has_heater?: boolean; // Added to match usage in Properties.tsx
  has_electric_oven?: boolean; // Added to match usage in Properties.tsx
  has_hair_dryer?: boolean; // Added to match usage in Properties.tsx
  has_cinema?: boolean; // Added to match usage in Properties.tsx
  has_refrigerator?: boolean; // Added to match usage in Properties.tsx
  has_vacuum_cleaner?: boolean; // Added to match usage in Properties.tsx
  has_dryer?: boolean; // Added to match usage in Properties.tsx
  has_iron?: boolean; // Added to match usage in Properties.tsx
  has_co_detector?: boolean; // Added to match usage in Properties.tsx
  has_smoke_detector?: boolean; // Added to match usage in Properties.tsx
  has_evacuation_ladder?: boolean; // Added to match usage in Properties.tsx
  has_fire_fighting_system?: boolean; // Added to match usage in Properties.tsx
  has_perimeter_cameras?: boolean; // Added to match usage in Properties.tsx
  has_alarm?: boolean; // Added to match usage in Properties.tsx
  has_live_protection?: boolean; // Added to match usage in Properties.tsx
  has_locked_entrance?: boolean; // Added to match usage in Properties.tsx
  has_locked_yard?: boolean; // Added to match usage in Properties.tsx
  near_bus_stop?: boolean; // Added to match usage in Properties.tsx
  near_bank?: boolean; // Added to match usage in Properties.tsx
  near_supermarket?: boolean; // Added to match usage in Properties.tsx
  near_kindergarten?: boolean; // Added to match usage in Properties.tsx
  near_city_center?: boolean; // Added to match usage in Properties.tsx
  near_pharmacy?: boolean; // Added to match usage in Properties.tsx
  near_greenery?: boolean; // Added to match usage in Properties.tsx
  near_old_district?: boolean; // Added to match usage in Properties.tsx
  has_satellite_tv?: boolean; // Added to match usage in Properties.tsx
  has_phone_line?: boolean; // Added to match usage in Properties.tsx
}

