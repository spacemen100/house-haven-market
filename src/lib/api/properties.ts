import { supabase } from "@/lib/api/supabaseClient";
import { Property } from "@/types/property";
import { toast } from "sonner";
import { getUserProfile } from "@/lib/profiles"; // Added import

export interface CreatePropertyInput {
  title: string;
  description?: string;
  price: number;
  phone_number?: string;
  cadastral_code?: string;
  propertyType: 'house' | 'apartment' | 'land' | 'commercial';
  listingType: 'sale' | 'rent' | 'rent_by_day' | 'lease';
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
  propertyType: property.property_type,
  listingType: property.listing_type,
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
    console.log('Creating property with data:', input); // Log pour vérifier les données avant l'insertion
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("User not authenticated");

    console.log('Data being inserted into properties table:', input); // Log pour vérifier les données insérées dans la table properties
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

    console.log('Property created:', property); // Log pour vérifier la propriété créée

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


export const getProperties = async (type?: 'sale' | 'rent' | 'rent_by_day' | 'lease'): Promise<Property[]> => {
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

export const getPropertiesByType = async (listingType: 'sale' | 'rent' | 'rent_by_day' | 'lease'): Promise<Property[]> => {
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
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error('Authentication error fetching liked properties:', authError.message);
      // toast.error("Authentication error. Please log in."); // Consider if toast is appropriate here
      return [];
    }
    if (!user) {
      // console.log('User not authenticated, cannot fetch liked properties.');
      // toast.error("Please log in to see your liked properties."); // Consider if toast is appropriate here
      return [];
    }

    const profile = await getUserProfile(user.id);

    if (!profile || !profile.liked_properties || profile.liked_properties.length === 0) {
      // console.log('No liked properties found for this user or profile error.');
      return []; // No liked property IDs found or profile issue
    }

    const likedPropertyIDs = profile.liked_properties;

    const { data: propertiesData, error: propertiesError } = await supabase
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
      .in('id', likedPropertyIDs);

    if (propertiesError) {
      console.error('Error fetching liked properties details:', propertiesError.message);
      toast.error("Failed to fetch details of liked properties.");
      return [];
    }

    if (!propertiesData) {
      return [];
    }

    return propertiesData.map(transformProperty);

  } catch (error: any) {
    console.error('Unexpected error in getLikedProperties:', error.message);
    toast.error("An unexpected error occurred while fetching liked properties.");
    return [];
  }
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
