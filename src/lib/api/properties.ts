
import { supabase } from "@/integrations/supabase/client";
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
