// src/lib/api/properties.ts
import { supabase } from "@/lib/api/supabaseClient";
import { Property } from "@/types/property";
import { toast } from "sonner";

export interface CreatePropertyInput {
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
  m2: number; // Changé de sqft à m2
  rooms?: number;
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
  images?: File[];
  contactEmail?: string;
  instagramHandle?: string;
  facebookUrl?: string;
  twitterHandle?: string;
  currency?: string;
  // Ajouter tous les champs booléens
  has_elevator?: boolean;
  has_ventilation?: boolean;
  has_air_conditioning?: boolean;
  is_accessible?: boolean;
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
  
  // Ajouter les autres champs manquants
  terrace_area?: number;
  kitchen_type?: string;
  ceiling_height?: number;
  floor_level?: number;
  total_floors?: number;
  phone_number?: string;
  cadastral_code?: string;
  property_type?: string;
  listing_type?: string;
  building_material?: string;
  furniture_type?: string;
  storeroom_type?: string;
  heating_type?: string;
  hot_water_type?: string;
  parking_type?: string;
}

const transformProperty = (property: any): Property => ({
  id: property.id,
  title: property.title,
  description: property.description || '',
  price: property.price,
  phoneNumber: property.phone_number,
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
  propertyType: property.property_type,
  listingType: property.listing_type,
  status: property.status || 'free',
  condition: property.condition || 'good',
  plan: property.plan,
  beds: property.beds,
  baths: property.baths,
  m2: property.m2, // Changé de sqft à m2
  rooms: property.rooms || 0,
  terraceArea: property.terrace_area || 0,
  kitchenType: property.kitchen_type || 'open',
  ceilingHeight: property.ceiling_height || 0,
  floorLevel: property.floor_level || 0,
  totalFloors: property.total_floors || 1,
  yearBuilt: property.year_built || 0,
  featured: property.featured || false,
  amenities: property.property_amenities?.map((a: any) => a.amenity) || [],
  hasElevator: property.has_elevator || false,
  hasVentilation: property.has_ventilation || false,
  hasAirConditioning: property.has_air_conditioning || false,
  equipment: property.property_equipment?.map((e: any) => e.equipment) || [],
  internetTV: property.property_internet_tv?.map((i: any) => i.option_name) || [],
  storage: property.property_storage?.map((s: any) => s.storage_type) || [],
  security: property.property_security?.map((s: any) => s.security_feature) || [],
  isAccessible: property.is_accessible || false,
  nearbyPlaces: property.property_nearby_places?.map((p: any) => p.place_name) || [],
  onlineServices: property.property_online_services?.map((s: any) => s.service_name) || [],
  images: property.property_images?.map((i: any) => i.image_url) || [],
  agentName: property.agent_name || '',
  agentPhone: property.agent_phone || '',
  projectName: property.project_name || '',
  createdAt: property.created_at,
  userId: property.user_id,
  contactEmail: property.contact_email,
  instagramHandle: property.instagram_handle,
  facebookUrl: property.facebook_url,
  twitterHandle: property.twitter_handle
});

export const createProperty = async (input: CreatePropertyInput) => {
  try {
    // 1. Authentification et validation
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("User not authenticated");

    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .insert({
        title: input.title,
        description: input.description,
        price: input.price,
        currency: input.currency || 'GEL',
        phone_number: input.phoneNumber,
        cadastral_code: input.cadastralCode,
        property_type: input.propertyType,
        listing_type: input.listingType,
        status: input.status,
        condition: input.condition,
        plan: input.plan,
        address_street: input.addressStreet,
        address_city: input.addressCity,
        address_district: input.addressDistrict,
        lat: input.lat,
        lng: input.lng,
        beds: input.beds,
        baths: input.baths,
        m2: input.m2,
        rooms: input.rooms,
        terrace_area: input.terraceArea,
        kitchen_type: input.kitchenType,
        ceiling_height: input.ceilingHeight,
        floor_level: input.floorLevel,
        total_floors: input.totalFloors,
        year_built: input.yearBuilt,
        featured: input.featured,
        has_elevator: input.hasElevator,
        has_ventilation: input.hasVentilation,
        has_air_conditioning: input.hasAirConditioning,
        is_accessible: input.isAccessible,
        has_gas: input.hasGas,
        has_loggia: input.hasLoggia,
        building_material: input.buildingMaterial,
        furniture_type: input.furnitureType,
        has_fireplace: input.hasFireplace,
        storeroom_type: input.storeroomType,
        heating_type: input.heatingType,
        hot_water_type: input.hotWaterType,
        contact_email: input.contactEmail,
        instagram_handle: input.instagramHandle,
        facebook_url: input.facebookUrl,
        twitter_handle: input.twitterHandle,
        user_id: user.id,
         // Ajouter tous les nouveaux champs
         plan: input.plan,
         rooms: input.rooms,
         terrace_area: input.terrace_area,
         kitchen_type: input.kitchen_type,
         ceiling_height: input.ceiling_height,
         floor_level: input.floor_level,
         total_floors: input.total_floors,
         phone_number: input.phone_number,
         cadastral_code: input.cadastral_code,
         property_type: input.property_type,
         listing_type: input.listing_type,
         building_material: input.building_material,
         furniture_type: input.furniture_type,
         storeroom_type: input.storeroom_type,
         heating_type: input.heating_type,
         hot_water_type: input.hot_water_type,
         parking_type: input.parking_type,
         has_elevator: input.has_elevator || false,
         has_ventilation: input.has_ventilation || false,
         has_air_conditioning: input.has_air_conditioning || false,
         is_accessible: input.is_accessible || false,
         has_gas: input.has_gas || false,
         has_loggia: input.has_loggia || false,
         has_fireplace: input.has_fireplace || false,
         has_internet: input.has_internet || false,
         has_cable_tv: input.has_cable_tv || false,
         has_dishwasher: input.has_dishwasher || false,
         has_gas_stove: input.has_gas_stove || false,
         has_electric_kettle: input.has_electric_kettle || false,
         has_induction_oven: input.has_induction_oven || false,
         has_microwave: input.has_microwave || false,
         has_washing_machine: input.has_washing_machine || false,
         has_tv: input.has_tv || false,
         has_coffee_machine: input.has_coffee_machine || false,
         has_audio_system: input.has_audio_system || false,
         has_heater: input.has_heater || false,
         has_electric_oven: input.has_electric_oven || false,
         has_hair_dryer: input.has_hair_dryer || false,
         has_refrigerator: input.has_refrigerator || false,
         has_vacuum_cleaner: input.has_vacuum_cleaner || false,
         has_dryer: input.has_dryer || false,
         has_iron: input.has_iron || false,
         has_co_detector: input.has_co_detector || false,
         has_smoke_detector: input.has_smoke_detector || false,
         has_evacuation_ladder: input.has_evacuation_ladder || false,
         has_fire_fighting_system: input.has_fire_fighting_system || false,
         has_perimeter_cameras: input.has_perimeter_cameras || false,
         has_alarm: input.has_alarm || false,
         has_live_protection: input.has_live_protection || false,
         has_locked_entrance: input.has_locked_entrance || false,
         has_locked_yard: input.has_locked_yard || false,
         near_bus_stop: input.near_bus_stop || false,
         near_bank: input.near_bank || false,
         near_subway: input.near_subway || false,
         near_supermarket: input.near_supermarket || false,
         near_kindergarten: input.near_kindergarten || false,
         near_city_center: input.near_city_center || false,
         near_pharmacy: input.near_pharmacy || false,
         near_greenery: input.near_greenery || false,
         near_park: input.near_park || false,
         near_shopping_centre: input.near_shopping_centre || false,
         near_school: input.near_school || false,
         near_old_district: input.near_old_district || false,
         allows_pets: input.allows_pets || false,
         allows_parties: input.allows_parties || false,
         allows_smoking: input.allows_smoking || false,
      })
      .select()
      .single();

    if (propertyError) throw propertyError;

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
      ...(input.internetTv?.map(option =>
        supabase.from('property_internet_tv').insert({ property_id: property.id, option_name: option })
      ) || []),
      ...(input.storage?.map(storage =>
        supabase.from('property_storage').insert({ property_id: property.id, storage_type: storage })
      ) || []),
      ...(input.security?.map(security =>
        supabase.from('property_security').insert({ property_id: property.id, security_feature: security })
      ) || []),
      ...(input.nearbyPlaces?.map(place =>
        supabase.from('property_nearby_places').insert({ property_id: property.id, place_name: place })
      ) || []),
      ...(input.onlineServices?.map(service =>
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

export const getProperties = async (type?: 'sale' | 'rent' | 'rent_by_day'): Promise<Property[]> => {
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

export const getPropertiesByType = async (listingType: 'sale' | 'rent' | 'rent_by_day'): Promise<Property[]> => {
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

// Temporarily removing favorite property functions until we create a user_likes table in Supabase
export const getLikedProperties = async (): Promise<Property[]> => {
  // This will be implemented when we create a user_likes table
  return [];
};

export const likeProperty = async (propertyId: string) => {
  // This will be implemented when we create a user_likes table
  toast.success("Property added to favorites");
  return true;
};

export const unlikeProperty = async (propertyId: string) => {
  // This will be implemented when we create a user_likes table
  toast.success("Property removed from favorites");
  return true;
};

export const checkIfLiked = async (propertyId: string): Promise<boolean> => {
  // This will be implemented when we create a user_likes table
  return false;
};

export const deleteProperty = async (propertyId: string) => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("User not authenticated");

    // First delete all related data
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

    // Then delete the property
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
        m2, // Changé de sqft à m2
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
        // ... autres relations nécessaires ...
      `)
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) throw error;

    console.log('Raw properties data:', properties); // Debug

    return properties.map(transformProperty);
  } catch (error) {
    console.error('Error fetching newest properties:', error);
    toast.error("Failed to fetch newest properties. Please try again.");
    return [];
  }
};
