import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Search, Filter, MapPin, SlidersHorizontal, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyCard from "@/components/PropertyCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { useCurrency, Currency } from '@/CurrencyContext';
import { useTranslation } from 'react-i18next';
import { supabase } from "@/lib/api/supabaseClient";
import { getUserProfile } from "@/lib/profiles"; // Added import
import { GEORGIAN_CITIES, GeorgianCity } from "@/data/georgianCities";
// Types and Interfaces
export type PropertyType = 'house' | 'apartment' | 'land' | 'commercial';
export type ListingType = 'sale' | 'rent' | 'rent_by_day' | 'lease';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  phone_number?: string;
  cadastralCode?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    district: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  property_type: PropertyType;
  listing_type: ListingType;
  status?: 'free' | 'under_caution' | 'under_construction';
  condition?: 'new' | 'good' | 'needs_renovation';
  plan?: string;
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
  contactEmail?: string;
  instagramHandle?: string;
  facebookUrl?: string;
  twitterHandle?: string;
  currency?: string;
  has_gas?: boolean;
  has_loggia?: boolean;
  has_fireplace?: boolean;
  has_internet?: boolean;
  has_cable_tv?: boolean;
  has_dishwasher?: boolean;
  has_gas_stove?: boolean;
  has_electric_kettle?: boolean;
  has_induction_oven?: boolean;
  has_microwave?: boolean;
  has_washing_machine?: boolean;
  has_tv?: boolean;
  has_coffee_machine?: boolean;
  has_audio_system?: boolean;
  has_heater?: boolean;
  has_electric_oven?: boolean;
  has_hair_dryer?: boolean;
  has_refrigerator?: boolean;
  has_vacuum_cleaner?: boolean;
  has_dryer?: boolean;
  has_iron?: boolean;
  has_co_detector?: boolean;
  has_smoke_detector?: boolean;
  has_evacuation_ladder?: boolean;
  has_fire_fighting_system?: boolean;
  has_perimeter_cameras?: boolean;
  has_alarm?: boolean;
  has_live_protection?: boolean;
  has_locked_entrance?: boolean;
  has_locked_yard?: boolean;
  near_bus_stop?: boolean;
  near_bank?: boolean;
  near_subway?: boolean;
  near_supermarket?: boolean;
  near_kindergarten?: boolean;
  near_city_center?: boolean;
  near_pharmacy?: boolean;
  near_greenery?: boolean;
  near_park?: boolean;
  near_shopping_centre?: boolean;
  near_school?: boolean;
  near_old_district?: boolean;
  allows_pets?: boolean;
  allows_parties?: boolean;
  allows_smoking?: boolean;
  parking_type?: string;
  has_satellite_tv?: boolean;
  has_phone_line?: boolean;
  price_per_m2?: number;
  created_at?: string;
  user_id?: string;
}

export interface CreatePropertyInput {
  title: string;
  description?: string;
  price: number;
  phone_number?: string;
  cadastral_code?: string;
  propertyType: PropertyType;
  listingType: ListingType;
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
  images?: File[];
  contactEmail?: string;
  instagramHandle?: string;
  facebookUrl?: string;
  twitterHandle?: string;
  currency?: string;
  has_gas?: boolean;
  has_loggia?: boolean;
  has_fireplace?: boolean;
  has_internet?: boolean;
  has_cable_tv?: boolean;
  has_dishwasher?: boolean;
  has_gas_stove?: boolean;
  has_electric_kettle?: boolean;
  has_induction_oven?: boolean;
  has_microwave?: boolean;
  has_washing_machine?: boolean;
  has_tv?: boolean;
  has_coffee_machine?: boolean;
  has_audio_system?: boolean;
  has_heater?: boolean;
  has_electric_oven?: boolean;
  has_hair_dryer?: boolean;
  has_cinema?: boolean;
  has_refrigerator?: boolean;
  has_vacuum_cleaner?: boolean;
  has_dryer?: boolean;
  has_iron?: boolean;
  has_co_detector?: boolean;
  has_smoke_detector?: boolean;
  has_evacuation_ladder?: boolean;
  has_fire_fighting_system?: boolean;
  has_perimeter_cameras?: boolean;
  has_alarm?: boolean;
  has_live_protection?: boolean;
  has_locked_entrance?: boolean;
  has_locked_yard?: boolean;
  near_bus_stop?: boolean;
  near_bank?: boolean;
  near_subway?: boolean;
  near_supermarket?: boolean;
  near_kindergarten?: boolean;
  near_city_center?: boolean;
  near_pharmacy?: boolean;
  near_greenery?: boolean;
  near_park?: boolean;
  near_shopping_centre?: boolean;
  near_school?: boolean;
  near_old_district?: boolean;
  allows_pets?: boolean;
  allows_parties?: boolean;
  allows_smoking?: boolean;
  terrace_area?: number;
  kitchen_type?: string;
  ceiling_height?: number;
  floor_level?: number;
  total_floors?: number;
  year_built?: number;
  featured?: boolean;
  building_material?: string;
  furniture_type?: string;
  storeroom_type?: string;
  heating_type?: string;
  hot_water_type?: string;
  parking_type?: string;
  has_satellite_tv?: boolean;
  has_phone_line?: boolean;
  price_per_m2?: number;
}

// Functions
const transformProperty = (property: any): Property => ({
  id: property.id,
  title: property.title,
  description: property.description || '',
  price: property.price,
  phone_number: property.phone_number,
  cadastralCode: property.cadastral_code,
  address: {
    street: property.address_street || '',
    city: property.address_city,
    state: property.address_state || '',
    zip: property.address_zip || '',
    district: property.address_district || '',
    coordinates: {
      lat: property.lat || 0,
      lng: property.lng || 0
    }
  },
  property_type: property.property_type,
  listing_type: property.listing_type,
  status: property.status || 'free',
  condition: property.condition || 'good',
  plan: property.plan,
  beds: property.beds,
  baths: property.baths,
  m2: property.m2,
  rooms: property.rooms || 0,
  terraceArea: property.terrace_area || 0,
  kitchenType: property.kitchen_type || 'open',
  ceilingHeight: property.ceiling_height || 0,
  floorLevel: property.floor_level || 0,
  totalFloors: property.total_floors || 1,
  yearBuilt: property.year_built || 0,
  featured: property.featured || false,
  amenities: property.property_amenities?.map((a: any) => a.amenity) || [],
  has_elevator: property.has_elevator || false,
  has_ventilation: property.has_ventilation || false,
  has_air_conditioning: property.has_air_conditioning || false,
  equipment: property.property_equipment?.map((e: any) => e.equipment) || [],
  internet_tv: property.property_internet_tv?.map((i: any) => i.option_name) || [],
  storage: property.property_storage?.map((s: any) => s.storage_type) || [],
  security: property.property_security?.map((s: any) => s.security_feature) || [],
  is_accessible: property.is_accessible || false,
  nearby_places: property.property_nearby_places?.map((p: any) => p.place_name) || [],
  online_services: property.property_online_services?.map((s: any) => s.service_name) || [],
  images: property.property_images?.map((i: any) => i.image_url) || [],
  agentName: property.agent_name || '',
  agentPhone: property.agent_phone || '',
  projectName: property.project_name || '',
  created_at: property.created_at,
  user_id: property.user_id,
  contactEmail: property.contact_email,
  instagramHandle: property.instagram_handle,
  facebookUrl: property.facebook_url,
  twitterHandle: property.twitter_handle
});

export const createProperty = async (input: CreatePropertyInput) => {
  try {
    console.log('Creating property with data:', input);
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("User not authenticated");

    console.log('Data being inserted into properties table:', input);
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .insert({
        title: input.title,
        description: input.description,
        price: input.price,
        currency: input.currency || 'GEL',
        phone_number: input.phone_number,
        cadastral_code: input.cadastral_code,
        property_type: input.propertyType,
        listing_type: input.listingType,
        status: input.status,
        condition: input.condition,
        plan: input.plan,
        address_street: input.address_street,
        address_city: input.address_city,
        address_district: input.address_district,
        lat: input.lat,
        lng: input.lng,
        beds: input.beds,
        baths: input.baths,
        m2: input.m2,
        rooms: input.rooms,
        terrace_area: input.terrace_area,
        kitchen_type: input.kitchen_type,
        ceiling_height: input.ceiling_height,
        floor_level: input.floor_level,
        total_floors: input.total_floors,
        year_built: input.year_built,
        featured: input.featured,
        has_elevator: input.has_elevator,
        has_ventilation: input.has_ventilation,
        has_air_conditioning: input.has_air_conditioning,
        is_accessible: input.is_accessible,
        has_gas: input.has_gas,
        has_loggia: input.has_loggia,
        building_material: input.building_material,
        furniture_type: input.furniture_type,
        has_fireplace: input.has_fireplace,
        storeroom_type: input.storeroom_type,
        heating_type: input.heating_type,
        hot_water_type: input.hot_water_type,
        contact_email: input.contactEmail,
        instagram_handle: input.instagramHandle,
        facebook_url: input.facebookUrl,
        twitter_handle: input.twitterHandle,
        user_id: user.id,
        has_gas_stove: input.has_gas_stove,
        has_electric_kettle: input.has_electric_kettle,
        has_induction_oven: input.has_induction_oven,
        has_microwave: input.has_microwave,
        has_electric_oven: input.has_electric_oven,
        has_washing_machine: input.has_washing_machine,
        has_tv: input.has_tv,
        has_coffee_machine: input.has_coffee_machine,
        has_audio_system: input.has_audio_system,
        has_heater: input.has_heater,
        has_hair_dryer: input.has_hair_dryer,
        has_refrigerator: input.has_refrigerator,
        has_vacuum_cleaner: input.has_vacuum_cleaner,
        has_dryer: input.has_dryer,
        has_iron: input.has_iron,
        has_co_detector: input.has_co_detector,
        has_smoke_detector: input.has_smoke_detector,
        has_evacuation_ladder: input.has_evacuation_ladder,
        has_fire_fighting_system: input.has_fire_fighting_system,
        has_perimeter_cameras: input.has_perimeter_cameras,
        has_alarm: input.has_alarm,
        has_live_protection: input.has_live_protection,
        has_locked_entrance: input.has_locked_entrance,
        has_locked_yard: input.has_locked_yard,
        near_bus_stop: input.near_bus_stop,
        near_bank: input.near_bank,
        near_subway: input.near_subway,
        near_supermarket: input.near_supermarket,
        near_kindergarten: input.near_kindergarten,
        near_city_center: input.near_city_center,
        near_pharmacy: input.near_pharmacy,
        near_greenery: input.near_greenery,
        near_park: input.near_park,
        near_shopping_centre: input.near_shopping_centre,
        near_school: input.near_school,
        near_old_district: input.near_old_district,
        allows_pets: input.allows_pets,
        allows_parties: input.allows_parties,
        allows_smoking: input.allows_smoking,
        parking_type: input.parking_type,
      })
      .select()
      .single();

    if (propertyError) throw propertyError;

    console.log('Property created:', property);

    if (input.images?.length) {
      const imagePromises = input.images.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${property.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('property_images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('property_images')
          .getPublicUrl(filePath);

        return supabase
          .from('property_images')
          .insert({
            property_id: property.id,
            image_url: publicUrl
          });
      });

      await Promise.all(imagePromises);
    }

    const relatedDataPromises = [
      ...(input.amenities?.map(amenity =>
        supabase.from('property_amenities').insert({ property_id: property.id, amenity })
      ) || []),
      ...(input.equipment?.map(equipment =>
        supabase.from('property_equipment').insert({ property_id: property.id, equipment })
      ) || []),
      ...(input.internet_tv?.map(option =>
        supabase.from('property_internet_tv').insert({ property_id: property.id, option_name: option })
      ) || []),
      ...(input.storage?.map(storage =>
        supabase.from('property_storage').insert({ property_id: property.id, storage_type: storage })
      ) || []),
      ...(input.security?.map(security =>
        supabase.from('property_security').insert({ property_id: property.id, security_feature: security })
      ) || []),
      ...(input.nearby_places?.map(place =>
        supabase.from('property_nearby_places').insert({ property_id: property.id, place_name: place })
      ) || []),
      ...(input.online_services?.map(service =>
        supabase.from('property_online_services').insert({ property_id: property.id, service_name: service })
      ) || [])
    ];

    await Promise.all(relatedDataPromises);

    toast.success("Property listing created successfully!");
    return property;
  } catch (error) {
    console.error('Error creating property:', error);
    toast.error("Failed to create property listing. Please try again.");
    throw error;
  }
};

export const getProperties = async (type?: ListingType): Promise<Property[]> => {
  try {
    let query = supabase
      .from('properties')
      .select(`
        *,
        property_amenities (amenity),
        property_equipment (equipment),
        property_images (image_url, is_primary),
        property_internet_tv (option_name),
        property_storage (storage_type),
        property_security (security_feature),
        property_nearby_places (place_name),
        property_online_services (service_name)
      `);

    if (type) {
      query = query.eq('listing_type', type);
    }

    const { data: properties, error } = await query;

    if (error) throw error;
    return properties.map(transformProperty);
  } catch (error) {
    console.error('Error fetching properties:', error);
    toast.error("Failed to fetch properties. Please try again.");
    return [];
  }
};

export const getPropertiesByType = async (listingType: ListingType): Promise<Property[]> => {
  return getProperties(listingType);
};

export const getFeaturedProperties = async (): Promise<Property[]> => {
  try {
    const { data: properties, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_amenities (amenity),
        property_equipment (equipment),
        property_images (image_url, is_primary),
        property_internet_tv (option_name),
        property_storage (storage_type),
        property_security (security_feature),
        property_nearby_places (place_name),
        property_online_services (service_name)
      `)
      .eq('featured', true);

    if (error) throw error;
    return properties.map(transformProperty);
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    toast.error("Failed to fetch featured properties. Please try again.");
    return [];
  }
};

export const getMyProperties = async (): Promise<Property[]> => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("User not authenticated");

    const { data: properties, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_amenities (amenity),
        property_equipment (equipment),
        property_images (image_url, is_primary),
        property_internet_tv (option_name),
        property_storage (storage_type),
        property_security (security_feature),
        property_nearby_places (place_name),
        property_online_services (service_name)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return properties.map(transformProperty);
  } catch (error) {
    console.error('Error fetching user properties:', error);
    toast.error("Failed to fetch your properties. Please try again.");
    return [];
  }
};

export const getLikedProperties = async (): Promise<Property[]> => {
  return [];
};

export const likeProperty = async (propertyId: string) => {
  toast.success("Property added to favorites");
  return true;
};

export const unlikeProperty = async (propertyId: string) => {
  toast.success("Property removed from favorites");
  return true;
};

export const checkIfLiked = async (propertyId: string): Promise<boolean> => {
  return false;
};

export const deleteProperty = async (propertyId: string) => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("User not authenticated");

    const relatedTables = [
      'property_amenities',
      'property_equipment',
      'property_images',
      'property_internet_tv',
      'property_storage',
      'property_security',
      'property_nearby_places',
      'property_online_services'
    ];

    await Promise.all(relatedTables.map(table =>
      supabase.from(table).delete().eq('property_id', propertyId)
    ));

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', propertyId)
      .eq('user_id', user.id);

    if (error) throw error;

    toast.success("Property deleted successfully");
    return true;
  } catch (error) {
    console.error('Error deleting property:', error);
    toast.error("Failed to delete property");
    return false;
  }
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getNewestProperties = async (): Promise<Property[]> => {
  try {
    const { data: properties, error } = await supabase
      .from('properties')
      .select(`
        id,
        title,
        description,
        price,
        beds,
        baths,
        m2,
        property_type,
        listing_type,
        created_at,
        featured,
        address_street,
        address_city,
        address_state,
        property_images (image_url),
        property_amenities (amenity),
        property_equipment (equipment)
      `)
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) throw error;

    console.log('Raw properties data:', properties);

    return properties.map(transformProperty);
  } catch (error) {
    console.error('Error fetching newest properties:', error);
    toast.error("Failed to fetch newest properties. Please try again.");
    return [];
  }
};

// Properties Component
const Properties = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const listingTypeFromParams = searchParams.get('type');
  const queryParams = new URLSearchParams(location.search);
  const initialListingType = (queryParams.get("type") as ListingType) || "sale";
  const initialSearch = queryParams.get("search") || "";

  const { currency, setCurrency } = useCurrency();

  // State for basic filters
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [listingType, setListingType] = useState<ListingType>(initialListingType);
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [minBeds, setMinBeds] = useState(0);
  const [minBaths, setMinBaths] = useState(0);
  const [minM2, setMinM2] = useState(0);
  const [maxM2, setMaxM2] = useState(500);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [minPriceInput, setMinPriceInput] = useState(minPrice.toString());
  const [maxPriceInput, setMaxPriceInput] = useState(maxPrice.toString());
  const [minM2Input, setMinM2Input] = useState(minM2.toString());
  const [maxM2Input, setMaxM2Input] = useState(maxM2.toString());
  const [sortOption, setSortOption] = useState<string>("recent");
  const [activeTab, setActiveTab] = useState("filters");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [userLikedProperties, setUserLikedProperties] = useState<string[] | null>(null); // Added state

  const currencyOptions = [
    { value: 'USD', label: t('currency.usd') },
    { value: 'EUR', label: t('currency.eur') },
    { value: 'GEL', label: t('currency.gel') },
  ];

  const formatPrice = (price: number, currency: string) => {
    let locale = 'en-US';
    if (currency === 'EUR') locale = 'fr-FR';
    if (currency === 'GEL') locale = 'ka-GE';

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: currency === 'GEL' ? 2 : 0
    }).format(price);
  };

  // Listing type buttons with translations
  const listingTypeButtons = [
    { value: "sale", label: t('listingType.sale') },
    { value: "rent", label: t('listingType.rent') },
    { value: "rent_by_day", label: t('listingType.rent_by_day') },
    { value: "lease", label: t('listingType.lease') }
  ];

  const handleListingTypeChange = (value: ListingType) => {
    setListingType(value);
  };

  const renderListingTypeFilter = () => (
    <RadioGroup
      value={listingType}
      onValueChange={(value: string) => setListingType(value as ListingType)}
      className="flex flex-col space-y-1"
    >
      {listingTypeButtons.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem
            value={option.value}
            id={`listing-type-${option.value}`}
          />
          <Label htmlFor={`listing-type-${option.value}`}>
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  // State for advanced filters
  const [features, setFeatures] = useState({
    hasElevator: false,
    hasAirConditioning: false,
    isAccessible: false,
    hasFireplace: false,
    hasInternet: false,
    hasCableTV: false,
    allowsPets: false,
    allowsSmoking: false,
    nearSubway: false,
    nearPark: false,
    nearSchool: false,
    hasParking: false,
    hasGas: false,
    hasLoggia: false,
    hasDishwasher: false,
    hasWashingMachine: false,
    hasGasStove: false,
    hasVent: false,
    hasElectricKettle: false,
    hasInductionOven: false,
    hasMicrowave: false,
    hasTv: false,
    hasCoffeeMachine: false,
    hasAudioSystem: false,
    hasHeater: false,
    hasElectricOven: false,
    hasHairDryer: false,
    hasCinema: false,
    hasRefrigerator: false,
    hasVacuumCleaner: false,
    hasDryer: false,
    hasIron: false,
    hasCoDetector: false,
    hasSmokeDetector: false,
    hasEvacuationLadder: false,
    hasFireFightingSystem: false,
    hasPerimeterCameras: false,
    hasAlarm: false,
    hasLiveProtection: false,
    hasLockedEntrance: false,
    hasLockedYard: false,
    nearBusStop: false,
    nearBank: false,
    nearSupermarket: false,
    nearKindergarten: false,
    nearCityCenter: false,
    nearPharmacy: false,
    nearGreenery: false,
    nearOldDistrict: false,
    hasSatelliteTv: false,
    hasPhoneLine: false,
  });

  const [condition, setCondition] = useState<string[]>([]);
  const [furnitureType, setFurnitureType] = useState<string[]>([]);
  const [heatingType, setHeatingType] = useState<string[]>([]);
  const [parkingType, setParkingType] = useState<string[]>([]);
  const [buildingMaterial, setBuildingMaterial] = useState<string[]>([]);
  const [kitchenType, setKitchenType] = useState<string[]>([]);

  const sortOptions = [
    { value: "recent", label: t('sort.recent') },
    { value: "oldest", label: t('sort.oldest') },
    { value: "price-asc", label: t('sort.price_asc') },
    { value: "price-desc", label: t('sort.price_desc') },
    { value: "m2-asc", label: t('sort.m2_asc') },
    { value: "m2-desc", label: t('sort.m2_desc') },
  ];

  const sortProperties = (properties: Property[]) => {
    const sorted = [...properties];

    const parseDate = (dateStr: string | undefined): number => {
      if (!dateStr) return 0;
      if (/^\d+$/.test(dateStr)) {
        return parseInt(dateStr);
      }
      try {
        return new Date(dateStr).getTime();
      } catch (e) {
        return 0;
      }
    };

    switch (sortOption) {
      case "recent":
        return sorted.sort((a, b) => parseDate(b.created_at) - parseDate(a.created_at));
      case "oldest":
        return sorted.sort((a, b) => parseDate(a.created_at) - parseDate(b.created_at));
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "m2-asc":
        return sorted.sort((a, b) => (a.m2 || 0) - (b.m2 || 0));
      case "m2-desc":
        return sorted.sort((a, b) => (b.m2 || 0) - (a.m2 || 0));
      default:
        return sorted;
    }
  };

  // Fetch properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties', listingType],
    queryFn: () => getPropertiesByType(listingType),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const profile = await getUserProfile(user.id);
          setUserLikedProperties(profile?.liked_properties || []);
        } else {
          setUserLikedProperties([]); // No user logged in
        }
      } catch (error) {
        console.error("Error fetching user profile for liked properties:", error);
        setUserLikedProperties([]); // Error case
      }
    };
    fetchProfile();
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    setMinPriceInput(minPrice.toString());
    setMaxPriceInput(maxPrice.toString());
  }, [minPrice, maxPrice]);

  const handleMinPriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setMinPriceInput(value);
    if (value) {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        setMinPrice(Math.min(numValue, maxPrice));
      }
    }
  };

  const handleMaxPriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setMaxPriceInput(value);
    if (value) {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        setMaxPrice(Math.max(numValue, minPrice));
      }
    }
  };

  const handlePriceBlur = () => {
    const min = parseInt(minPriceInput) || 0;
    const max = parseInt(maxPriceInput) || 5000000;
    setMinPrice(Math.min(min, max));
    setMaxPrice(Math.max(min, max));
  };

  useEffect(() => {
    setMinM2Input(minM2.toString());
    setMaxM2Input(maxM2.toString());
  }, [minM2, maxM2]);

  const handleMinM2InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setMinM2Input(value);
    if (value) {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        setMinM2(Math.min(numValue, maxM2));
      }
    }
  };

  const handleMaxM2InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setMaxM2Input(value);
    if (value) {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        setMaxM2(Math.max(numValue, minM2));
      }
    }
  };

  const handleM2Blur = () => {
    const min = parseInt(minM2Input) || 0;
    const max = parseInt(maxM2Input) || 500;
    setMinM2(Math.min(min, max));
    setMaxM2(Math.max(min, max));
  };

  // Apply all filters
  useEffect(() => {
    let filtered = [...properties];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(property => {
        const title = property.title || '';
        const addressStreet = property.address_street || '';
        const addressCity = property.address_city || '';
        const addressState = property.address_state || '';
        const addressZip = property.address_zip || '';

        return (
          title.toLowerCase().includes(query) ||
          addressStreet.toLowerCase().includes(query) ||
          addressCity.toLowerCase().includes(query) ||
          addressState.toLowerCase().includes(query) ||
          addressZip.toLowerCase().includes(query)
        );
      });
    }

    // Property type filter
    if (propertyTypes.length > 0) {
      filtered = filtered.filter(property =>
        propertyTypes.includes(property.property_type)
      );
    }

    // Price filter
    filtered = filtered.filter(property =>
      property.price >= minPrice && property.price <= maxPrice
    );

    // Bedrooms filter
    if (minBeds > 0) {
      filtered = filtered.filter(property => property.beds >= minBeds);
    }

    // Bathrooms filter
    if (minBaths > 0) {
      filtered = filtered.filter(property => property.baths >= minBaths);
    }

    filtered = filtered.filter(property =>
      property.m2 >= minM2 && property.m2 <= maxM2
    );

    // City filter
    if (selectedCities.length > 0) {
      filtered = filtered.filter(property =>
        selectedCities.includes(property.address.city)
      );
    }

    // Features filters
    if (features.hasElevator) {
      filtered = filtered.filter(property => property.has_elevator);
    }
    if (features.hasAirConditioning) {
      filtered = filtered.filter(property => property.has_air_conditioning);
    }
    if (features.isAccessible) {
      filtered = filtered.filter(property => property.is_accessible);
    }
    if (features.hasFireplace) {
      filtered = filtered.filter(property => property.has_fireplace);
    }
    if (features.hasInternet) {
      filtered = filtered.filter(property => property.has_internet);
    }
    if (features.hasCableTV) {
      filtered = filtered.filter(property => property.has_cable_tv);
    }
    if (features.allowsPets) {
      filtered = filtered.filter(property => property.allows_pets);
    }
    if (features.allowsSmoking) {
      filtered = filtered.filter(property => property.allows_smoking);
    }
    if (features.nearSubway) {
      filtered = filtered.filter(property => property.near_subway);
    }
    if (features.nearPark) {
      filtered = filtered.filter(property => property.near_park);
    }
    if (features.nearSchool) {
      filtered = filtered.filter(property => property.near_school);
    }
    if (features.hasParking) {
      filtered = filtered.filter(property => property.parking_type && property.parking_type !== 'none');
    }
    if (features.hasGas) {
      filtered = filtered.filter(property => property.has_gas);
    }
    if (features.hasLoggia) {
      filtered = filtered.filter(property => property.has_loggia);
    }
    if (features.hasDishwasher) {
      filtered = filtered.filter(property => property.has_dishwasher);
    }
    if (features.hasWashingMachine) {
      filtered = filtered.filter(property => property.has_washing_machine);
    }
    if (features.hasGasStove) {
      filtered = filtered.filter(property => property.has_gas_stove);
    }
    if (features.hasVent) {
      filtered = filtered.filter(property => property.has_vent);
    }
    if (features.hasElectricKettle) {
      filtered = filtered.filter(property => property.has_electric_kettle);
    }
    if (features.hasInductionOven) {
      filtered = filtered.filter(property => property.has_induction_oven);
    }
    if (features.hasMicrowave) {
      filtered = filtered.filter(property => property.has_microwave);
    }
    if (features.hasTv) {
      filtered = filtered.filter(property => property.has_tv);
    }
    if (features.hasCoffeeMachine) {
      filtered = filtered.filter(property => property.has_coffee_machine);
    }
    if (features.hasAudioSystem) {
      filtered = filtered.filter(property => property.has_audio_system);
    }
    if (features.hasHeater) {
      filtered = filtered.filter(property => property.has_heater);
    }
    if (features.hasElectricOven) {
      filtered = filtered.filter(property => property.has_electric_oven);
    }
    if (features.hasHairDryer) {
      filtered = filtered.filter(property => property.has_hair_dryer);
    }
    if (features.hasCinema) {
      filtered = filtered.filter(property => property.has_cinema);
    }
    if (features.hasRefrigerator) {
      filtered = filtered.filter(property => property.has_refrigerator);
    }
    if (features.hasVacuumCleaner) {
      filtered = filtered.filter(property => property.has_vacuum_cleaner);
    }
    if (features.hasDryer) {
      filtered = filtered.filter(property => property.has_dryer);
    }
    if (features.hasIron) {
      filtered = filtered.filter(property => property.has_iron);
    }
    if (features.hasCoDetector) {
      filtered = filtered.filter(property => property.has_co_detector);
    }
    if (features.hasSmokeDetector) {
      filtered = filtered.filter(property => property.has_smoke_detector);
    }
    if (features.hasEvacuationLadder) {
      filtered = filtered.filter(property => property.has_evacuation_ladder);
    }
    if (features.hasFireFightingSystem) {
      filtered = filtered.filter(property => property.has_fire_fighting_system);
    }
    if (features.hasPerimeterCameras) {
      filtered = filtered.filter(property => property.has_perimeter_cameras);
    }
    if (features.hasAlarm) {
      filtered = filtered.filter(property => property.has_alarm);
    }
    if (features.hasLiveProtection) {
      filtered = filtered.filter(property => property.has_live_protection);
    }
    if (features.hasLockedEntrance) {
      filtered = filtered.filter(property => property.has_locked_entrance);
    }
    if (features.hasLockedYard) {
      filtered = filtered.filter(property => property.has_locked_yard);
    }
    if (features.nearBusStop) {
      filtered = filtered.filter(property => property.near_bus_stop);
    }
    if (features.nearBank) {
      filtered = filtered.filter(property => property.near_bank);
    }
    if (features.nearSupermarket) {
      filtered = filtered.filter(property => property.near_supermarket);
    }
    if (features.nearKindergarten) {
      filtered = filtered.filter(property => property.near_kindergarten);
    }
    if (features.nearCityCenter) {
      filtered = filtered.filter(property => property.near_city_center);
    }
    if (features.nearPharmacy) {
      filtered = filtered.filter(property => property.near_pharmacy);
    }
    if (features.nearGreenery) {
      filtered = filtered.filter(property => property.near_greenery);
    }
    if (features.nearOldDistrict) {
      filtered = filtered.filter(property => property.near_old_district);
    }
    if (features.hasSatelliteTv) {
      filtered = filtered.filter(property => property.has_satellite_tv);
    }
    if (features.hasPhoneLine) {
      filtered = filtered.filter(property => property.has_phone_line);
    }

    // Condition filter
    if (condition.length > 0) {
      filtered = filtered.filter(property => condition.includes(property.condition));
    }

    // Furniture type filter
    if (furnitureType.length > 0) {
      filtered = filtered.filter(property =>
        property.furniture_type && furnitureType.includes(property.furniture_type)
      );
    }

    // Heating type filter
    if (heatingType.length > 0) {
      filtered = filtered.filter(property =>
        property.heating_type && heatingType.includes(property.heating_type)
      );
    }

    // Parking type filter
    if (parkingType.length > 0) {
      filtered = filtered.filter(property =>
        property.parking_type && parkingType.includes(property.parking_type)
      );
    }

    // Building material filter
    if (buildingMaterial.length > 0) {
      filtered = filtered.filter(property =>
        property.building_material && buildingMaterial.includes(property.building_material)
      );
    }

    // Kitchen type filter
    if (kitchenType.length > 0) {
      filtered = filtered.filter(property =>
        property.kitchen_type && kitchenType.includes(property.kitchen_type)
      );
    }

    // Appliquer le tri final avant de mettre à jour l'état
    const sortedProperties = sortProperties(filtered);
    setFilteredProperties(sortedProperties);

  }, [
    searchQuery, listingType, propertyTypes, minPrice, maxPrice,
    minBeds, minBaths, minM2, maxM2, features, condition,
    furnitureType, heatingType, parkingType, buildingMaterial,
    kitchenType, properties, sortOption, selectedCities
  ]);

  // Update URL when listing type or search changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("type", listingType);
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    navigate(`/properties?${params.toString()}`, { replace: true });
  }, [listingType, searchQuery, navigate]);

  useEffect(() => {
    if (listingTypeFromParams) {
      switch (listingTypeFromParams) {
        case 'sell':
          setActiveTab('filters');
          setListingType('sale');
          break;
        case 'lease':
          setActiveTab('filters');
          setListingType('lease');
          break;
        case 'rent':
          setActiveTab('filters');
          setListingType('rent');
          break;
        case 'daily-rent':
          setActiveTab('filters');
          setListingType('rent_by_day');
          break;
        default:
          break;
      }
    }
  }, [listingTypeFromParams]);

  // Handler functions
  const handlePropertyTypeChange = (type: PropertyType) => {
    setPropertyTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleFeatureChange = (feature: keyof typeof features) => {
    setFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
  };

  const handleMultiSelectChange = (
    value: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setState(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleClearFilters = () => {
    setPropertyTypes([]);
    setMinPrice(0);
    setMaxPrice(5000000);
    setMinBeds(0);
    setMinBaths(0);
    setMinM2(0);
    setMaxM2(500);
    setFeatures({
      hasElevator: false,
      hasAirConditioning: false,
      isAccessible: false,
      hasFireplace: false,
      hasInternet: false,
      hasCableTV: false,
      allowsPets: false,
      allowsSmoking: false,
      nearSubway: false,
      nearPark: false,
      nearSchool: false,
      hasParking: false,
      hasGas: false,
      hasLoggia: false,
      hasDishwasher: false,
      hasWashingMachine: false,
      hasGasStove: false,
      hasVent: false,
      hasElectricKettle: false,
      hasInductionOven: false,
      hasMicrowave: false,
      hasTv: false,
      hasCoffeeMachine: false,
      hasAudioSystem: false,
      hasHeater: false,
      hasElectricOven: false,
      hasHairDryer: false,
      hasCinema: false,
      hasRefrigerator: false,
      hasVacuumCleaner: false,
      hasDryer: false,
      hasIron: false,
      hasCoDetector: false,
      hasSmokeDetector: false,
      hasEvacuationLadder: false,
      hasFireFightingSystem: false,
      hasPerimeterCameras: false,
      hasAlarm: false,
      hasLiveProtection: false,
      hasLockedEntrance: false,
      hasLockedYard: false,
      nearBusStop: false,
      nearBank: false,
      nearSupermarket: false,
      nearKindergarten: false,
      nearCityCenter: false,
      nearPharmacy: false,
      nearGreenery: false,
      nearOldDistrict: false,
      hasSatelliteTv: false,
      hasPhoneLine: false,
    });
    setCondition([]);
    setFurnitureType([]);
    setHeatingType([]);
    setParkingType([]);
    setBuildingMaterial([]);
    setKitchenType([]);
    setSelectedCities([]);
  };

  // Filter options data
  const propertyTypeOptions = [
    { id: "house", label: t('propertyType.house') },
    { id: "apartment", label: t('propertyType.apartment') },
    { id: "land", label: t('propertyType.land') },
    { id: "commercial", label: t('propertyType.commercial') },
  ];

  const conditionOptions = [
    { id: "newly_renovated", label: t('condition.newly_renovated') },
    { id: "under_renovation", label: t('condition.under_renovation') },
    { id: "white_frame", label: t('condition.white_frame') },
    { id: "green_frame", label: t('condition.green_frame') },
    { id: "not_renovated", label: t('condition.not_renovated') },
    { id: "black_frame", label: t('condition.black_frame') },
    { id: "old_renovation", label: t('condition.old_renovation') },
  ];

  const furnitureOptions = [
    { id: "furnished", label: t('furniture.furnished') },
    { id: "semi_furnished", label: t('furniture.semi_furnished') },
    { id: "unfurnished", label: t('furniture.unfurnished') },
  ];

  const heatingOptions = [
    { id: "central", label: t('heating.central') },
    { id: "electric", label: t('heating.electric') },
    { id: "gas", label: t('heating.gas') },
    { id: "wood", label: t('heating.wood') },
  ];

  const parkingOptions = [
    { id: "garage", label: t('parking.garage') },
    { id: "underground", label: t('parking.underground') },
    { id: "street", label: t('parking.street') },
    { id: "carport", label: t('parking.carport') },
  ];

  const buildingMaterialOptions = [
    { id: "brick", label: t('material.brick') },
    { id: "concrete", label: t('material.concrete') },
    { id: "wood", label: t('material.wood') },
    { id: "steel", label: t('material.steel') },
  ];

  const kitchenTypeOptions = [
    { id: "open", label: t('kitchen.open') },
    { id: "closed", label: t('kitchen.closed') },
    { id: "kitchenette", label: t('kitchen.kitchenette') },
    { id: "american", label: t('kitchen.american') },
  ];

  const renderPropertyTypeFilter = (prefix = "") => (
    <div className="space-y-2">
      {propertyTypeOptions.map((option) => (
        <div key={`${prefix}${option.id}`} className="flex items-center space-x-2">
          <Checkbox
            id={`${prefix}${option.id}`}
            checked={propertyTypes.includes(option.id as PropertyType)}
            onCheckedChange={(checked) => {
              if (checked) {
                setPropertyTypes([...propertyTypes, option.id as PropertyType]);
              } else {
                setPropertyTypes(propertyTypes.filter(type => type !== option.id));
              }
            }}
          />
          <Label htmlFor={`${prefix}${option.id}`}>
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );

  const renderConditionFilter = (prefix = "") => (
    <div className="space-y-2">
      {conditionOptions.map((option) => (
        <div key={`${prefix}${option.id}`} className="flex items-center space-x-2">
          <Checkbox
            id={`${prefix}${option.id}`}
            checked={condition.includes(option.id)}
            onCheckedChange={() => handleMultiSelectChange(option.id, condition, setCondition)}
          />
          <label
            htmlFor={`${prefix}${option.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );

  const renderFeaturesFilter = (prefix = "") => (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}elevator`}
          checked={features.hasElevator}
          onCheckedChange={() => handleFeatureChange("hasElevator")}
        />
        <label htmlFor={`${prefix}elevator`} className="text-sm">{t('features.elevator')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}ac`}
          checked={features.hasAirConditioning}
          onCheckedChange={() => handleFeatureChange("hasAirConditioning")}
        />
        <label htmlFor={`${prefix}ac`} className="text-sm">{t('features.airConditioning')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}accessible`}
          checked={features.isAccessible}
          onCheckedChange={() => handleFeatureChange("isAccessible")}
        />
        <label htmlFor={`${prefix}accessible`} className="text-sm">{t('features.accessible')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}fireplace`}
          checked={features.hasFireplace}
          onCheckedChange={() => handleFeatureChange("hasFireplace")}
        />
        <label htmlFor={`${prefix}fireplace`} className="text-sm">{t('features.fireplace')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}internet`}
          checked={features.hasInternet}
          onCheckedChange={() => handleFeatureChange("hasInternet")}
        />
        <label htmlFor={`${prefix}internet`} className="text-sm">{t('features.internet')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}cable-tv`}
          checked={features.hasCableTV}
          onCheckedChange={() => handleFeatureChange("hasCableTV")}
        />
        <label htmlFor={`${prefix}cable-tv`} className="text-sm">{t('features.cableTv')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}pets`}
          checked={features.allowsPets}
          onCheckedChange={() => handleFeatureChange("allowsPets")}
        />
        <label htmlFor={`${prefix}pets`} className="text-sm">{t('features.petsAllowed')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}smoking`}
          checked={features.allowsSmoking}
          onCheckedChange={() => handleFeatureChange("allowsSmoking")}
        />
        <label htmlFor={`${prefix}smoking`} className="text-sm">{t('features.smokingAllowed')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}gas`}
          checked={features.hasGas}
          onCheckedChange={() => handleFeatureChange("hasGas")}
        />
        <label htmlFor={`${prefix}gas`} className="text-sm">{t('features.gas')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}loggia`}
          checked={features.hasLoggia}
          onCheckedChange={() => handleFeatureChange("hasLoggia")}
        />
        <label htmlFor={`${prefix}loggia`} className="text-sm">{t('features.loggia')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}dishwasher`}
          checked={features.hasDishwasher}
          onCheckedChange={() => handleFeatureChange("hasDishwasher")}
        />
        <label htmlFor={`${prefix}dishwasher`} className="text-sm">{t('features.dishwasher')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}washing-machine`}
          checked={features.hasWashingMachine}
          onCheckedChange={() => handleFeatureChange("hasWashingMachine")}
        />
        <label htmlFor={`${prefix}washing-machine`} className="text-sm">{t('features.washingMachine')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}gas-stove`}
          checked={features.hasGasStove}
          onCheckedChange={() => handleFeatureChange("hasGasStove")}
        />
        <label htmlFor={`${prefix}gas-stove`} className="text-sm">{t('features.gasStove')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}vent`}
          checked={features.hasVent}
          onCheckedChange={() => handleFeatureChange("hasVent")}
        />
        <label htmlFor={`${prefix}vent`} className="text-sm">{t('features.vent')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}electric-kettle`}
          checked={features.hasElectricKettle}
          onCheckedChange={() => handleFeatureChange("hasElectricKettle")}
        />
        <label htmlFor={`${prefix}electric-kettle`} className="text-sm">{t('features.electricKettle')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}induction-oven`}
          checked={features.hasInductionOven}
          onCheckedChange={() => handleFeatureChange("hasInductionOven")}
        />
        <label htmlFor={`${prefix}induction-oven`} className="text-sm">{t('features.inductionOven')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}microwave`}
          checked={features.hasMicrowave}
          onCheckedChange={() => handleFeatureChange("hasMicrowave")}
        />
        <label htmlFor={`${prefix}microwave`} className="text-sm">{t('features.microwave')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}tv`}
          checked={features.hasTv}
          onCheckedChange={() => handleFeatureChange("hasTv")}
        />
        <label htmlFor={`${prefix}tv`} className="text-sm">{t('features.tv')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}coffee-machine`}
          checked={features.hasCoffeeMachine}
          onCheckedChange={() => handleFeatureChange("hasCoffeeMachine")}
        />
        <label htmlFor={`${prefix}coffee-machine`} className="text-sm">{t('features.coffeeMachine')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}audio-system`}
          checked={features.hasAudioSystem}
          onCheckedChange={() => handleFeatureChange("hasAudioSystem")}
        />
        <label htmlFor={`${prefix}audio-system`} className="text-sm">{t('features.audioSystem')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}heater`}
          checked={features.hasHeater}
          onCheckedChange={() => handleFeatureChange("hasHeater")}
        />
        <label htmlFor={`${prefix}heater`} className="text-sm">{t('features.heater')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}electric-oven`}
          checked={features.hasElectricOven}
          onCheckedChange={() => handleFeatureChange("hasElectricOven")}
        />
        <label htmlFor={`${prefix}electric-oven`} className="text-sm">{t('features.electricOven')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}hair-dryer`}
          checked={features.hasHairDryer}
          onCheckedChange={() => handleFeatureChange("hasHairDryer")}
        />
        <label htmlFor={`${prefix}hair-dryer`} className="text-sm">{t('features.hairDryer')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}cinema`}
          checked={features.hasCinema}
          onCheckedChange={() => handleFeatureChange("hasCinema")}
        />
        <label htmlFor={`${prefix}cinema`} className="text-sm">{t('features.cinema')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}refrigerator`}
          checked={features.hasRefrigerator}
          onCheckedChange={() => handleFeatureChange("hasRefrigerator")}
        />
        <label htmlFor={`${prefix}refrigerator`} className="text-sm">{t('features.refrigerator')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}vacuum-cleaner`}
          checked={features.hasVacuumCleaner}
          onCheckedChange={() => handleFeatureChange("hasVacuumCleaner")}
        />
        <label htmlFor={`${prefix}vacuum-cleaner`} className="text-sm">{t('features.vacuumCleaner')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}dryer`}
          checked={features.hasDryer}
          onCheckedChange={() => handleFeatureChange("hasDryer")}
        />
        <label htmlFor={`${prefix}dryer`} className="text-sm">{t('features.dryer')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}iron`}
          checked={features.hasIron}
          onCheckedChange={() => handleFeatureChange("hasIron")}
        />
        <label htmlFor={`${prefix}iron`} className="text-sm">{t('features.iron')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}co-detector`}
          checked={features.hasCoDetector}
          onCheckedChange={() => handleFeatureChange("hasCoDetector")}
        />
        <label htmlFor={`${prefix}co-detector`} className="text-sm">{t('features.coDetector')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}smoke-detector`}
          checked={features.hasSmokeDetector}
          onCheckedChange={() => handleFeatureChange("hasSmokeDetector")}
        />
        <label htmlFor={`${prefix}smoke-detector`} className="text-sm">{t('features.smokeDetector')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}evacuation-ladder`}
          checked={features.hasEvacuationLadder}
          onCheckedChange={() => handleFeatureChange("hasEvacuationLadder")}
        />
        <label htmlFor={`${prefix}evacuation-ladder`} className="text-sm">{t('features.evacuationLadder')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}fire-fighting-system`}
          checked={features.hasFireFightingSystem}
          onCheckedChange={() => handleFeatureChange("hasFireFightingSystem")}
        />
        <label htmlFor={`${prefix}fire-fighting-system`} className="text-sm">{t('features.fireFightingSystem')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}perimeter-cameras`}
          checked={features.hasPerimeterCameras}
          onCheckedChange={() => handleFeatureChange("hasPerimeterCameras")}
        />
        <label htmlFor={`${prefix}perimeter-cameras`} className="text-sm">{t('features.perimeterCameras')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}alarm`}
          checked={features.hasAlarm}
          onCheckedChange={() => handleFeatureChange("hasAlarm")}
        />
        <label htmlFor={`${prefix}alarm`} className="text-sm">{t('features.alarm')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}live-protection`}
          checked={features.hasLiveProtection}
          onCheckedChange={() => handleFeatureChange("hasLiveProtection")}
        />
        <label htmlFor={`${prefix}live-protection`} className="text-sm">{t('features.liveProtection')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}locked-entrance`}
          checked={features.hasLockedEntrance}
          onCheckedChange={() => handleFeatureChange("hasLockedEntrance")}
        />
        <label htmlFor={`${prefix}locked-entrance`} className="text-sm">{t('features.lockedEntrance')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}locked-yard`}
          checked={features.hasLockedYard}
          onCheckedChange={() => handleFeatureChange("hasLockedYard")}
        />
        <label htmlFor={`${prefix}locked-yard`} className="text-sm">{t('features.lockedYard')}</label>
      </div>
    </div>
  );

  const renderNearbyFilter = (prefix = "") => (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}subway`}
          checked={features.nearSubway}
          onCheckedChange={() => handleFeatureChange("nearSubway")}
        />
        <label htmlFor={`${prefix}subway`} className="text-sm">{t('nearby.subway')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}park`}
          checked={features.nearPark}
          onCheckedChange={() => handleFeatureChange("nearPark")}
        />
        <label htmlFor={`${prefix}park`} className="text-sm">{t('nearby.park')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}school`}
          checked={features.nearSchool}
          onCheckedChange={() => handleFeatureChange("nearSchool")}
        />
        <label htmlFor={`${prefix}school`} className="text-sm">{t('nearby.school')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}bus-stop`}
          checked={features.nearBusStop}
          onCheckedChange={() => handleFeatureChange("nearBusStop")}
        />
        <label htmlFor={`${prefix}bus-stop`} className="text-sm">{t('nearby.busStop')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}bank`}
          checked={features.nearBank}
          onCheckedChange={() => handleFeatureChange("nearBank")}
        />
        <label htmlFor={`${prefix}bank`} className="text-sm">{t('nearby.bank')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}supermarket`}
          checked={features.nearSupermarket}
          onCheckedChange={() => handleFeatureChange("nearSupermarket")}
        />
        <label htmlFor={`${prefix}supermarket`} className="text-sm">{t('nearby.supermarket')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}kindergarten`}
          checked={features.nearKindergarten}
          onCheckedChange={() => handleFeatureChange("nearKindergarten")}
        />
        <label htmlFor={`${prefix}kindergarten`} className="text-sm">{t('nearby.kindergarten')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}city-center`}
          checked={features.nearCityCenter}
          onCheckedChange={() => handleFeatureChange("nearCityCenter")}
        />
        <label htmlFor={`${prefix}city-center`} className="text-sm">{t('nearby.cityCenter')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}pharmacy`}
          checked={features.nearPharmacy}
          onCheckedChange={() => handleFeatureChange("nearPharmacy")}
        />
        <label htmlFor={`${prefix}pharmacy`} className="text-sm">{t('nearby.pharmacy')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}greenery`}
          checked={features.nearGreenery}
          onCheckedChange={() => handleFeatureChange("nearGreenery")}
        />
        <label htmlFor={`${prefix}greenery`} className="text-sm">{t('nearby.greenery')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}old-district`}
          checked={features.nearOldDistrict}
          onCheckedChange={() => handleFeatureChange("nearOldDistrict")}
        />
        <label htmlFor={`${prefix}old-district`} className="text-sm">{t('nearby.oldDistrict')}</label>
      </div>
    </div>
  );

  const renderAdditionalFeaturesFilter = (prefix = "") => (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}satellite-tv`}
          checked={features.hasSatelliteTv}
          onCheckedChange={() => handleFeatureChange("hasSatelliteTv")}
        />
        <label htmlFor={`${prefix}satellite-tv`} className="text-sm">{t('additionalFeatures.satelliteTv')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}phone-line`}
          checked={features.hasPhoneLine}
          onCheckedChange={() => handleFeatureChange("hasPhoneLine")}
        />
        <label htmlFor={`${prefix}phone-line`} className="text-sm">{t('additionalFeatures.phoneLine')}</label>
      </div>
    </div>
  );

  const renderKeywordSearch = () => (
    <div className="space-y-4">
      <h3 className="font-medium">{t('filters.keywordSearch')}</h3>
      <div className="flex bg-white rounded-lg p-3">
        <div className="flex items-center pl-3 text-estate-neutral-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder={t('filters.keywordPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 py-2 px-3 outline-none"
        />
      </div>
    </div>
  );

  const renderMultiSelectFilter = (
    options: { id: string; label: string }[],
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    title: string,
    prefix = ""
  ) => (
    <div className="space-y-2">
      <h4 className="font-medium">{title}</h4>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={`${prefix}${option.id}`} className="flex items-center space-x-2">
            <Checkbox
              id={`${prefix}${option.id}`}
              checked={selected.includes(option.id)}
              onCheckedChange={() => handleMultiSelectChange(option.id, selected, setSelected)}
            />
            <label
              htmlFor={`${prefix}${option.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCityFilter = (prefix = "") => (
    <div className="space-y-2">
      <h4 className="font-medium">{t('filters.city')}</h4>
      <div className="max-h-60 overflow-y-auto">
        {GEORGIAN_CITIES.map((city) => (
          <div key={`${prefix}city-${city}`} className="flex items-center space-x-2">
            <Checkbox
              id={`${prefix}city-${city}`}
              checked={selectedCities.includes(city)}
              onCheckedChange={() =>
                handleMultiSelectChange(city, selectedCities, setSelectedCities)
              }
            />
            <Label htmlFor={`${prefix}city-${city}`}>
              {t(`cities.${city}`)}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );

  // Mobile filters drawer
  const renderMobileFilters = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden ${isFilterOpen ? 'block' : 'hidden'}`}>
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white p-6 overflow-y-auto animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{t('filters.title')}</h2>
          <Button
            variant="ghost"
            size="icon"
            className="text-estate-neutral-500"
            onClick={() => setIsFilterOpen(false)}
          >
            <X size={24} />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="filters">{t('filters.filters')}</TabsTrigger>
            <TabsTrigger value="keyword">{t('filters.keywordSearch')}</TabsTrigger>
          </TabsList>
          <TabsContent value="filters">
            <div className="space-y-6">
              {/* Listing Type */}
              <div className="space-y-3">
                <h3 className="font-medium">{t('filters.listingType')}</h3>
                {renderListingTypeFilter()}
              </div>

              {/* Property Type */}
              <div className="space-y-3">
                <h3 className="font-medium">{t('filters.propertyType')}</h3>
                {renderPropertyTypeFilter("mobile-")}
              </div>

              {/* City Filter */}
              <div className="space-y-3">
                <h3 className="font-medium">{t('filters.city')}</h3>
                {renderCityFilter("mobile-")}
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <h4 className="font-medium">{t('filters.priceRange')}</h4>
                <div className="px-2">
                  <Slider
                    value={[minPrice, maxPrice]}
                    max={5000000}
                    step={100000}
                    onValueChange={(values) => {
                      setMinPrice(values[0]);
                      setMaxPrice(values[1]);
                    }}
                  />
                </div>
                <div className="flex justify-between gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={minPriceInput}
                      onChange={handleMinPriceInputChange}
                      onBlur={handlePriceBlur}
                      className="w-20 border rounded px-2 py-1 text-sm"
                    />
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as Currency)}
                      className="p-2 border rounded-md"
                    >
                      <option value="USD">$</option>
                      <option value="GEL">₾</option>
                      <option value="EUR">€</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={maxPriceInput}
                      onChange={handleMaxPriceInputChange}
                      onBlur={handlePriceBlur}
                      className="w-20 border rounded px-2 py-1 text-sm"
                    />
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as Currency)}
                      className="p-2 border rounded-md"
                    >
                      <option value="USD">$</option>
                      <option value="GEL">₾</option>
                      <option value="EUR">€</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">{t('filters.currency')}</h4>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="p-2 border rounded-md"
                >
                  <option value="GEL">₾</option>
                  <option value="USD">$</option>
                  <option value="EUR">€</option>
                </select>
              </div>

              {/* Surface (m²) */}
              <div className="space-y-3">
                <h3 className="font-medium">{t('filters.surface')}</h3>
                <div className="px-2">
                  <Slider
                    value={[minM2, maxM2]}
                    max={500}
                    step={10}
                    onValueChange={(values) => {
                      setMinM2(values[0]);
                      setMaxM2(values[1]);
                    }}
                  />
                </div>
                <div className="flex justify-between gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={minM2Input}
                      onChange={handleMinM2InputChange}
                      onBlur={handleM2Blur}
                      className="w-20 border rounded px-2 py-1 text-sm"
                    />
                    <span className="text-sm">m²</span>
                  </div>
                  <span className="text-sm">{t('filters.to')}</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={maxM2Input}
                      onChange={handleMaxM2InputChange}
                      onBlur={handleM2Blur}
                      className="w-20 border rounded px-2 py-1 text-sm"
                    />
                    <span className="text-sm">m²</span>
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="space-y-3">
                <h3 className="font-medium">{t('filters.bedrooms')}</h3>
                <div className="flex flex-wrap gap-2">
                  {[0, 1, 2, 3, 4].map(num => (
                    <Button
                      key={`mobile-beds-${num}`}
                      variant={minBeds === num ? "default" : "outline"}
                      className={minBeds === num ? "bg-teal-500 hover:bg-teal-600" : ""}
                      size="sm"
                      onClick={() => setMinBeds(num)}
                    >
                      {num === 0 ? t('filters.any') : `${num}+`}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div className="space-y-3">
                <h3 className="font-medium">{t('filters.bathrooms')}</h3>
                <div className="flex flex-wrap gap-2">
                  {[0, 1, 2, 3].map(num => (
                    <Button
                      key={`mobile-baths-${num}`}
                      variant={minBaths === num ? "default" : "outline"}
                      className={minBaths === num ? "bg-teal-500 hover:bg-teal-600" : ""}
                      size="sm"
                      onClick={() => setMinBaths(num)}
                    >
                      {num === 0 ? t('filters.any') : `${num}+`}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Property Condition */}
              <div className="space-y-3">
                <h3 className="font-medium">{t('filters.propertyCondition')}</h3>
                {renderConditionFilter("mobile-")}
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-medium">{t('filters.features')}</h3>
                {renderFeaturesFilter("mobile-")}
              </div>

              {/* Nearby */}
              <div className="space-y-3">
                <h3 className="font-medium">{t('filters.nearby')}</h3>
                {renderNearbyFilter("mobile-")}
              </div>

              {/* Additional Features */}
              <div className="space-y-3">
                <h3 className="font-medium">{t('filters.additionalFeatures')}</h3>
                {renderAdditionalFeaturesFilter("mobile-")}
              </div>

              {/* Furniture Type */}
              {renderMultiSelectFilter(
                furnitureOptions,
                furnitureType,
                setFurnitureType,
                t('filters.furnitureType'),
                "mobile-"
              )}

              {/* Heating Type */}
              {renderMultiSelectFilter(
                heatingOptions,
                heatingType,
                setHeatingType,
                t('filters.heatingType'),
                "mobile-"
              )}

              {/* Parking Type */}
              {renderMultiSelectFilter(
                parkingOptions,
                parkingType,
                setParkingType,
                t('filters.parkingType'),
                "mobile-"
              )}

              {/* Building Material */}
              {renderMultiSelectFilter(
                buildingMaterialOptions,
                buildingMaterial,
                setBuildingMaterial,
                t('filters.buildingMaterial'),
                "mobile-"
              )}

              {/* Kitchen Type */}
              {renderMultiSelectFilter(
                kitchenTypeOptions,
                kitchenType,
                setKitchenType,
                t('filters.kitchenType'),
                "mobile-"
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleClearFilters}
                >
                  {t('filters.clearAll')}
                </Button>
                <Button
                  className="flex-1 bg-teal-500 hover:bg-teal-600"
                  onClick={() => setIsFilterOpen(false)}
                >
                  {t('filters.showResults')}
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="keyword">
            {renderKeywordSearch()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  // Desktop filters sidebar
  const renderDesktopFilters = () => (
    <div className="hidden lg:block w-80 h-fit bg-white rounded-lg p-6 shadow-sm border border-estate-neutral-100 space-y-6 sticky top-4">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Filter size={20} />
        <span>{t('filters.title')}</span>
      </h3>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex w-full">
          <TabsTrigger value="filters" className="flex-1">{t('filters.filters')}</TabsTrigger>
          <TabsTrigger value="keyword" className="flex-1">{t('filters.keywordSearch')}</TabsTrigger>
        </TabsList>
        <TabsContent value="filters">
          {/* Listing Type */}
          <div className="space-y-3">
            <h4 className="font-medium">{t('filters.listingType')}</h4>
            {renderListingTypeFilter()}
          </div>

          <hr />

          {/* Property Type */}
          <div className="space-y-3">
            <h4 className="font-medium">{t('filters.propertyType')}</h4>
            {renderPropertyTypeFilter()}
          </div>

          <hr />

          {/* City Filter */}
          <div className="space-y-3">
            <h4 className="font-medium">{t('filters.city')}</h4>
            {renderCityFilter()}
          </div>

          <hr />

          {/* Price Range */}
          <div className="space-y-3">
            <h3 className="font-medium">{t('filters.priceRange')}</h3>
            <div className="px-2">
              <Slider
                value={[minPrice, maxPrice]}
                max={5000000}
                step={100000}
                onValueChange={(values) => {
                  setMinPrice(values[0]);
                  setMaxPrice(values[1]);
                }}
              />
            </div>
            <div className="flex justify-between gap-2 mt-2">
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={minPriceInput}
                  onChange={handleMinPriceInputChange}
                  onBlur={handlePriceBlur}
                  className="w-20 border rounded px-2 py-1 text-sm"
                />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="p-2 border rounded-md"
                >
                  <option value="USD">$</option>
                  <option value="GEL">₾</option>
                  <option value="EUR">€</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={maxPriceInput}
                  onChange={handleMaxPriceInputChange}
                  onBlur={handlePriceBlur}
                  className="w-20 border rounded px-2 py-1 text-sm"
                />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="p-2 border rounded-md"
                >
                  <option value="USD">$</option>
                  <option value="GEL">₾</option>
                  <option value="EUR">€</option>
                </select>
              </div>
            </div>
          </div>

          <hr />

          {/* Surface (m²) */}
          <div className="space-y-3">
            <h4 className="font-medium">{t('filters.surface')}</h4>
            <div className="px-2">
              <Slider
                value={[minM2, maxM2]}
                max={500}
                step={10}
                onValueChange={(values) => {
                  setMinM2(values[0]);
                  setMaxM2(values[1]);
                }}
              />
            </div>
            <div className="flex justify-between gap-2 mt-2">
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={minM2Input}
                  onChange={handleMinM2InputChange}
                  onBlur={handleM2Blur}
                  className="w-20 border rounded px-2 py-1 text-sm"
                />
                <span className="text-sm">m²</span>
              </div>
              <span className="text-sm">{t('filters.to')}</span>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={maxM2Input}
                  onChange={handleMaxM2InputChange}
                  onBlur={handleM2Blur}
                  className="w-20 border rounded px-2 py-1 text-sm"
                />
                <span className="text-sm">m²</span>
              </div>
            </div>
          </div>

          <hr />

          {/* Bedrooms */}
          <div className="space-y-3">
            <h4 className="font-medium">{t('filters.bedrooms')}</h4>
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3, 4].map(num => (
                <Button
                  key={`beds-${num}`}
                  variant={minBeds === num ? "default" : "outline"}
                  className={minBeds === num ? "bg-teal-500 hover:bg-teal-600" : ""}
                  size="sm"
                  onClick={() => setMinBeds(num)}
                >
                  {num === 0 ? t('filters.any') : `${num}+`}
                </Button>
              ))}
            </div>
          </div>

          <hr />

          {/* Bathrooms */}
          <div className="space-y-3">
            <h4 className="font-medium">{t('filters.bathrooms')}</h4>
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3].map(num => (
                <Button
                  key={`baths-${num}`}
                  variant={minBaths === num ? "default" : "outline"}
                  className={minBaths === num ? "bg-teal-500 hover:bg-teal-600" : ""}
                  size="sm"
                  onClick={() => setMinBaths(num)}
                >
                  {num === 0 ? t('filters.any') : `${num}+`}
                </Button>
              ))}
            </div>
          </div>

          <hr />

          {/* Property Condition */}
          <div className="space-y-3">
            <h4 className="font-medium">{t('filters.propertyCondition')}</h4>
            {renderConditionFilter()}
          </div>

          <hr />

          {/* Features */}
          <div className="space-y-3">
            <h4 className="font-medium">{t('filters.features')}</h4>
            {renderFeaturesFilter()}
          </div>

          <hr />

          {/* Nearby */}
          <div className="space-y-3">
            <h4 className="font-medium">{t('filters.nearby')}</h4>
            {renderNearbyFilter()}
          </div>

          <hr />

          {/* Additional Features */}
          <div className="space-y-3">
            <h4 className="font-medium">{t('filters.additionalFeatures')}</h4>
            {renderAdditionalFeaturesFilter()}
          </div>

          <hr />

          {/* Furniture Type */}
          {renderMultiSelectFilter(
            furnitureOptions,
            furnitureType,
            setFurnitureType,
            t('filters.furnitureType')
          )}

          <hr />

          {/* Heating Type */}
          {renderMultiSelectFilter(
            heatingOptions,
            heatingType,
            setHeatingType,
            t('filters.heatingType')
          )}

          <hr />

          {/* Parking Type */}
          {renderMultiSelectFilter(
            parkingOptions,
            parkingType,
            setParkingType,
            t('filters.parkingType')
          )}

          <hr />

          {/* Building Material */}
          {renderMultiSelectFilter(
            buildingMaterialOptions,
            buildingMaterial,
            setBuildingMaterial,
            t('filters.buildingMaterial')
          )}

          <hr />

          {/* Kitchen Type */}
          {renderMultiSelectFilter(
            kitchenTypeOptions,
            kitchenType,
            setKitchenType,
            t('filters.kitchenType')
          )}

          <hr />

          <Button
            variant="outline"
            className="w-full"
            onClick={handleClearFilters}
          >
            {t('filters.clearAll')}
          </Button>
        </TabsContent>
        <TabsContent value="keyword">
          {renderKeywordSearch()}
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div>
      <Navbar />

      {/* Main Content */}
      <div className="container py-8">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Mobile filter toggle */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">
              {filteredProperties.length} {t('propertiesFound')}
            </div>
            <Button
              variant="outline"
              className="flex gap-2 items-center"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter size={18} />
              <span>{t('filters.title')}</span>
            </Button>
          </div>

          {/* Mobile Filters */}
          {renderMobileFilters()}

          {/* Desktop Filters */}
          {renderDesktopFilters()}

          {/* Properties Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {isLoading ? t('loading') : `${filteredProperties.length} ${t('propertiesFound')}`}
              </h2>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white border border-estate-neutral-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-estate-neutral-500">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="animate-pulse">
                    <div className="bg-gray-200 h-56 rounded-lg mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {userLikedProperties !== null && filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} userLikedProperties={userLikedProperties} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center border border-estate-neutral-200">
                <h3 className="text-xl font-semibold mb-2">{t('noProperties.title')}</h3>
                <p className="text-estate-neutral-600 mb-4">
                  {t('noProperties.description')}
                </p>
                <Button variant="outline" onClick={handleClearFilters}>
                  {t('filters.clearAll')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Properties;
