import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Property, PropertyType, ListingType, PropertyStatus, PropertyCondition, KitchenType } from "@/types/property";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyHeader from "@/components/property/PropertyHeader";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertySpecs from "@/components/property/PropertySpecs";
import PropertyFeatures from "@/components/property/PropertyFeatures";
import PropertyAdditionalFeatures from "@/components/property/PropertyAdditionalFeatures";
import AgentContact from "@/components/property/AgentContact";
import { Loader2 } from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        if (!id) {
          navigate("/properties");
          return;
        }

        // Fetch property data
        const { data: propertyData, error: propertyError } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();

        if (propertyError || !propertyData) {
          console.error("Error fetching property:", propertyError);
          navigate("/properties");
          return;
        }

        // Fetch related property data
        const [
          amenitiesResult,
          equipmentResult,
          imagesResult,
          internetTvResult,
          storageResult,
          securityResult,
          nearbyPlacesResult,
          onlineServicesResult
        ] = await Promise.all([
          supabase.from('property_amenities').select('amenity').eq('property_id', id),
          supabase.from('property_equipment').select('equipment').eq('property_id', id),
          supabase.from('property_images').select('image_url').eq('property_id', id),
          supabase.from('property_internet_tv').select('option_name').eq('property_id', id),
          supabase.from('property_storage').select('storage_type').eq('property_id', id),
          supabase.from('property_security').select('security_feature').eq('property_id', id),
          supabase.from('property_nearby_places').select('place_name').eq('property_id', id),
          supabase.from('property_online_services').select('service_name').eq('property_id', id)
        ]);

        // Transform the data to match the Property type with proper type casting
        const propertyObject: Property = {
          id: propertyData.id,
          title: propertyData.title,
          description: propertyData.description || '',
          price: propertyData.price,
          phoneNumber: propertyData.phone_number,
          cadastralCode: propertyData.cadastral_code,
          address: {
            street: propertyData.address_street || '',
            city: propertyData.address_city,
            state: propertyData.address_state || '',
            zip: propertyData.address_zip || '',
            district: propertyData.address_district || '',
            coordinates: {
              lat: propertyData.lat || 0,
              lng: propertyData.lng || 0
            }
          },
          propertyType: propertyData.property_type as PropertyType,
          listingType: propertyData.listing_type as ListingType,
          status: propertyData.status as PropertyStatus || 'free',
          condition: propertyData.condition as PropertyCondition || 'good',
          plan: propertyData.plan,
          beds: propertyData.beds,
          baths: propertyData.baths,
          sqft: propertyData.sqft,
          rooms: propertyData.rooms || 0,
          terraceArea: propertyData.terrace_area || 0,
          kitchenType: propertyData.kitchen_type as KitchenType || 'open',
          ceilingHeight: propertyData.ceiling_height || 0,
          floorLevel: propertyData.floor_level || 0,
          totalFloors: propertyData.total_floors || 1,
          yearBuilt: propertyData.year_built || 0,
          featured: propertyData.featured || false,
          amenities: amenitiesResult.data?.map(a => a.amenity) || [],
          hasElevator: propertyData.has_elevator || false,
          hasVentilation: propertyData.has_ventilation || false,
          hasAirConditioning: propertyData.has_air_conditioning || false,
          equipment: equipmentResult.data?.map(e => e.equipment) || [],
          internetTV: internetTvResult.data?.map(i => i.option_name) || [],
          storage: storageResult.data?.map(s => s.storage_type) || [],
          security: securityResult.data?.map(s => s.security_feature) || [],
          isAccessible: propertyData.is_accessible || false,
          nearbyPlaces: nearbyPlacesResult.data?.map(p => p.place_name) || [],
          onlineServices: onlineServicesResult.data?.map(s => s.service_name) || [],
          images: imagesResult.data?.map(i => i.image_url) || [],
          agentName: propertyData.agent_name || '',
          agentPhone: propertyData.agent_phone || '',
          projectName: propertyData.project_name || ''
        };

        setProperty(propertyObject);
      } catch (error) {
        console.error("Error fetching property details:", error);
        navigate("/properties");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyDetails();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="container py-24 flex justify-center items-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-estate-800 mx-auto mb-4" />
            <p className="text-lg text-estate-neutral-600">Chargement des détails de la propriété...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div>
        <Navbar />
        <div className="container py-24 flex justify-center items-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-estate-800 mb-4">Propriété non trouvée</h2>
            <p className="text-lg text-estate-neutral-600 mb-6">Cette propriété n'existe pas ou a été supprimée.</p>
            <button 
              onClick={() => navigate('/properties')}
              className="bg-estate-800 text-white px-6 py-3 rounded-lg hover:bg-estate-700 transition-colors"
            >
              Retour à la liste des propriétés
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className="container py-8">
        <PropertyHeader property={property} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PropertyGallery property={property} />
            <PropertySpecs property={property} />
            <PropertyFeatures property={property} />
            <PropertyAdditionalFeatures property={property} />
          </div>
          
          <div>
            <AgentContact property={property} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
