import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types/property";
import { toast } from "sonner";

export interface CreatePropertyInput {
  // Basic Information
  title: string;
  description?: string;
  price: number;
  phoneNumber?: string;
  cadastralCode?: string;
  
  // Property Details
  propertyType: 'house' | 'apartment' | 'land' | 'commercial';
  listingType: 'sale' | 'rent' | 'rent_by_day';
  status?: 'free' | 'under_caution' | 'under_construction';
  condition?: 'new' | 'good' | 'needs_renovation';
  plan?: string;
  
  // Location
  addressStreet?: string;
  addressCity: string;
  addressDistrict?: string;
  lat?: number;
  lng?: number;
  
  // Specifications
  beds: number;
  baths: number;
  sqft: number;
  rooms?: number;
  hasElevator?: boolean;
  hasVentilation?: boolean;
  hasAirConditioning?: boolean;
  isAccessible?: boolean;
  
  // Arrays of related data
  amenities?: string[];
  equipment?: string[];
  internetTv?: string[];
  storage?: string[];
  security?: string[];
  nearbyPlaces?: string[];
  onlineServices?: string[];
  
  // Images
  images?: File[];
}

export const createProperty = async (input: CreatePropertyInput) => {
  try {
    // First, create the main property record
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .insert({
        title: input.title,
        description: input.description,
        price: input.price,
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
        sqft: input.sqft,
        rooms: input.rooms,
        has_elevator: input.hasElevator,
        has_ventilation: input.hasVentilation,
        has_air_conditioning: input.hasAirConditioning,
        is_accessible: input.isAccessible
      })
      .select()
      .single();

    if (propertyError) throw propertyError;
    
    // Upload images if any
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
    
    // Insert related data in parallel
    const relatedDataPromises = [
      // Amenities
      ...(input.amenities?.map(amenity => 
        supabase.from('property_amenities').insert({ property_id: property.id, amenity })
      ) || []),
      
      // Equipment
      ...(input.equipment?.map(equipment => 
        supabase.from('property_equipment').insert({ property_id: property.id, equipment })
      ) || []),
      
      // Internet/TV
      ...(input.internetTv?.map(option => 
        supabase.from('property_internet_tv').insert({ property_id: property.id, option_name: option })
      ) || []),
      
      // Storage
      ...(input.storage?.map(storage => 
        supabase.from('property_storage').insert({ property_id: property.id, storage_type: storage })
      ) || []),
      
      // Security
      ...(input.security?.map(security => 
        supabase.from('property_security').insert({ property_id: property.id, security_feature: security })
      ) || []),
      
      // Nearby Places
      ...(input.nearbyPlaces?.map(place => 
        supabase.from('property_nearby_places').insert({ property_id: property.id, place_name: place })
      ) || []),
      
      // Online Services
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

export const getProperties = async (type: 'sale' | 'rent' = 'sale'): Promise<Property[]> => {
  try {
    // Fetch properties and related data
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
      .eq('listing_type', type);

    if (error) throw error;

    // Transform the data to match the Property type
    const transformedProperties: Property[] = properties.map(property => ({
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
      sqft: property.sqft,
      rooms: property.rooms || 0,
      terraceArea: property.terrace_area || 0,
      kitchenType: property.kitchen_type || 'open',
      ceilingHeight: property.ceiling_height || 0,
      floorLevel: property.floor_level || 0,
      totalFloors: property.total_floors || 1,
      yearBuilt: property.year_built || 0,
      featured: property.featured || false,
      amenities: property.property_amenities?.map(a => a.amenity) || [],
      hasElevator: property.has_elevator || false,
      hasVentilation: property.has_ventilation || false,
      hasAirConditioning: property.has_air_conditioning || false,
      equipment: property.property_equipment?.map(e => e.equipment) || [],
      internetTV: property.property_internet_tv?.map(i => i.option_name) || [],
      storage: property.property_storage?.map(s => s.storage_type) || [],
      security: property.property_security?.map(s => s.security_feature) || [],
      isAccessible: property.is_accessible || false,
      nearbyPlaces: property.property_nearby_places?.map(p => p.place_name) || [],
      onlineServices: property.property_online_services?.map(s => s.service_name) || [],
      images: property.property_images?.map(i => i.image_url) || [],
      agentName: property.agent_name || '',
      agentPhone: property.agent_phone || '',
      projectName: property.project_name || ''
    }));

    return transformedProperties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    toast.error("Failed to fetch properties. Please try again.");
    return [];
  }
};

export const getPropertiesByType = async (listingType: 'sale' | 'rent'): Promise<Property[]> => {
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

    // Use the same transformation logic as getProperties
    const transformedProperties: Property[] = properties.map(property => ({
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
      sqft: property.sqft,
      rooms: property.rooms || 0,
      terraceArea: property.terrace_area || 0,
      kitchenType: property.kitchen_type || 'open',
      ceilingHeight: property.ceiling_height || 0,
      floorLevel: property.floor_level || 0,
      totalFloors: property.total_floors || 1,
      yearBuilt: property.year_built || 0,
      featured: property.featured || false,
      amenities: property.property_amenities?.map(a => a.amenity) || [],
      hasElevator: property.has_elevator || false,
      hasVentilation: property.has_ventilation || false,
      hasAirConditioning: property.has_air_conditioning || false,
      equipment: property.property_equipment?.map(e => e.equipment) || [],
      internetTV: property.property_internet_tv?.map(i => i.option_name) || [],
      storage: property.property_storage?.map(s => s.storage_type) || [],
      security: property.property_security?.map(s => s.security_feature) || [],
      isAccessible: property.is_accessible || false,
      nearbyPlaces: property.property_nearby_places?.map(p => p.place_name) || [],
      onlineServices: property.property_online_services?.map(s => s.service_name) || [],
      images: property.property_images?.map(i => i.image_url) || [],
      agentName: property.agent_name || '',
      agentPhone: property.agent_phone || '',
      projectName: property.project_name || ''
    }));

    return transformedProperties;
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    toast.error("Failed to fetch featured properties. Please try again.");
    return [];
  }
};
