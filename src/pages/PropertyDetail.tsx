import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types/property";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyHeader from "@/components/property/PropertyHeader";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertySpecs from "@/components/property/PropertySpecs";
import PropertyFeatures from "@/components/property/PropertyFeatures";
import PropertyAdditionalFeatures from "@/components/property/PropertyAdditionalFeatures";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Phone, Mail, User } from "lucide-react";

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

        // Fetch property data with all fields
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

        // Fetch all related data
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

        // Transform the data to match the Property type with all fields
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
          propertyType: propertyData.property_type,
          listingType: propertyData.listing_type,
          status: propertyData.status || 'free',
          condition: propertyData.condition || 'good',
          plan: propertyData.plan,
          beds: propertyData.beds,
          baths: propertyData.baths,
          sqft: propertyData.sqft,
          rooms: propertyData.rooms || 0,
          terraceArea: propertyData.terrace_area || 0,
          kitchenType: propertyData.kitchen_type || 'open',
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
          projectName: propertyData.project_name || '',
          createdAt: propertyData.created_at,
          userId: propertyData.user_id,
          contactEmail: propertyData.contact_email,
          instagramHandle: propertyData.instagram_handle,
          facebookUrl: propertyData.facebook_url,
          twitterHandle: propertyData.twitter_handle,
          referenceNumber: propertyData.reference_number,
          pricePerSqm: propertyData.price_per_sqm,
          hasGas: propertyData.has_gas,
          hasLoggia: propertyData.has_loggia,
          buildingMaterial: propertyData.building_material,
          furnitureType: propertyData.furniture_type,
          hasFireplace: propertyData.has_fireplace,
          storeroomType: propertyData.storeroom_type,
          heatingType: propertyData.heating_type,
          hotWaterType: propertyData.hot_water_type,
          hasInternet: propertyData.has_internet,
          hasCableTV: propertyData.has_cable_tv,
          hasDishwasher: propertyData.has_dishwasher,
          hasGasStove: propertyData.has_gas_stove,
          hasVent: propertyData.has_vent,
          hasElectricKettle: propertyData.has_electric_kettle,
          hasInductionOven: propertyData.has_induction_oven,
          hasMicrowave: propertyData.has_microwave,
          hasWashingMachine: propertyData.has_washing_machine,
          hasTV: propertyData.has_tv,
          hasCoffeeMachine: propertyData.has_coffee_machine,
          hasAudioSystem: propertyData.has_audio_system,
          hasHeater: propertyData.has_heater,
          hasElectricOven: propertyData.has_electric_oven,
          hasHairDryer: propertyData.has_hair_dryer,
          hasCinema: propertyData.has_cinema,
          hasRefrigerator: propertyData.has_refrigerator,
          hasVacuumCleaner: propertyData.has_vacuum_cleaner,
          hasDryer: propertyData.has_dryer,
          hasIron: propertyData.has_iron,
          hasCoDetector: propertyData.has_co_detector,
          hasSmokeDetector: propertyData.has_smoke_detector,
          hasEvacuationLadder: propertyData.has_evacuation_ladder,
          hasFireFightingSystem: propertyData.has_fire_fighting_system,
          hasPerimeterCameras: propertyData.has_perimeter_cameras,
          hasAlarm: propertyData.has_alarm,
          hasLiveProtection: propertyData.has_live_protection,
          hasLockedEntrance: propertyData.has_locked_entrance,
          hasLockedYard: propertyData.has_locked_yard,
          nearBusStop: propertyData.near_bus_stop,
          nearBank: propertyData.near_bank,
          nearSubway: propertyData.near_subway,
          nearSupermarket: propertyData.near_supermarket,
          nearKindergarten: propertyData.near_kindergarten,
          nearCityCenter: propertyData.near_city_center,
          nearPharmacy: propertyData.near_pharmacy,
          nearGreenery: propertyData.near_greenery,
          nearPark: propertyData.near_park,
          nearShoppingCentre: propertyData.near_shopping_centre,
          nearSchool: propertyData.near_school,
          nearOldDistrict: propertyData.near_old_district,
          parkingType: propertyData.parking_type,
          allowsPets: propertyData.allows_pets,
          allowsParties: propertyData.allows_parties,
          allowsSmoking: propertyData.allows_smoking,
          hasSatelliteTV: propertyData.has_satellite_tv,
          hasPhoneLine: propertyData.has_phone_line
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
            <p className="text-lg text-estate-neutral-600">Loading property details...</p>
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
            <h2 className="text-2xl font-bold text-estate-800 mb-4">Property not found</h2>
            <p className="text-lg text-estate-neutral-600 mb-6">This property doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate('/properties')}
              className="bg-estate-800 text-white px-6 py-3 rounded-lg hover:bg-estate-700 transition-colors"
            >
              Back to properties list
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
            
            {/* Property Details Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-estate-800 mb-4">Property Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div>
                  <h3 className="font-semibold text-estate-800 mb-3">Basic Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Reference:</span> {property.referenceNumber || 'N/A'}</p>
                    <p><span className="font-medium">Type:</span> {property.propertyType}</p>
                    <p><span className="font-medium">Status:</span> {property.status}</p>
                    <p><span className="font-medium">Condition:</span> {property.condition}</p>
                    <p><span className="font-medium">Year Built:</span> {property.yearBuilt || 'N/A'}</p>
                    <p><span className="font-medium">Total Floors:</span> {property.totalFloors}</p>
                    <p><span className="font-medium">Floor Level:</span> {property.floorLevel}</p>
                  </div>
                </div>

                {/* Dimensions */}
                <div>
                  <h3 className="font-semibold text-estate-800 mb-3">Dimensions</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Total Area:</span> {property.sqft} sqft</p>
                    <p><span className="font-medium">Price per sqm:</span> {property.pricePerSqm ? formatCurrency(property.pricePerSqm) : 'N/A'}</p>
                    <p><span className="font-medium">Rooms:</span> {property.rooms}</p>
                    <p><span className="font-medium">Bedrooms:</span> {property.beds}</p>
                    <p><span className="font-medium">Bathrooms:</span> {property.baths}</p>
                    <p><span className="font-medium">Terrace Area:</span> {property.terraceArea || '0'} sqft</p>
                    <p><span className="font-medium">Ceiling Height:</span> {property.ceilingHeight || 'N/A'} m</p>
                  </div>
                </div>

                {/* Building Features */}
                <div>
                  <h3 className="font-semibold text-estate-800 mb-3">Building Features</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Building Material:</span> {property.buildingMaterial || 'N/A'}</p>
                    <p><span className="font-medium">Kitchen Type:</span> {property.kitchenType}</p>
                    <p><span className="font-medium">Furniture Type:</span> {property.furnitureType || 'N/A'}</p>
                    <p><span className="font-medium">Heating:</span> {property.heatingType || 'N/A'}</p>
                    <p><span className="font-medium">Hot Water:</span> {property.hotWaterType || 'N/A'}</p>
                    <p><span className="font-medium">Parking:</span> {property.parkingType || 'N/A'}</p>
                    <p><span className="font-medium">Storeroom:</span> {property.storeroomType || 'N/A'}</p>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="font-semibold text-estate-800 mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.hasElevator && <Badge variant="outline">Elevator</Badge>}
                    {property.hasVentilation && <Badge variant="outline">Ventilation</Badge>}
                    {property.hasAirConditioning && <Badge variant="outline">Air Conditioning</Badge>}
                    {property.isAccessible && <Badge variant="outline">Accessible</Badge>}
                    {property.hasLoggia && <Badge variant="outline">Loggia</Badge>}
                    {property.hasFireplace && <Badge variant="outline">Fireplace</Badge>}
                    {property.amenities?.map((amenity, index) => (
                      <Badge key={index} variant="outline">{amenity}</Badge>
                    ))}
                  </div>
                </div>

                {/* Equipment */}
                <div>
                  <h3 className="font-semibold text-estate-800 mb-3">Equipment</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {property.hasInternet && <Badge variant="outline">Internet</Badge>}
                    {property.hasCableTV && <Badge variant="outline">Cable TV</Badge>}
                    {property.hasDishwasher && <Badge variant="outline">Dishwasher</Badge>}
                    {property.hasWashingMachine && <Badge variant="outline">Washing Machine</Badge>}
                    {property.hasTV && <Badge variant="outline">TV</Badge>}
                    {property.hasRefrigerator && <Badge variant="outline">Refrigerator</Badge>}
                    {property.equipment?.map((item, index) => (
                      <Badge key={index} variant="outline">{item}</Badge>
                    ))}
                  </div>
                </div>

                {/* Security */}
                <div>
                  <h3 className="font-semibold text-estate-800 mb-3">Security</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {property.hasAlarm && <Badge variant="outline">Alarm</Badge>}
                    {property.hasPerimeterCameras && <Badge variant="outline">Cameras</Badge>}
                    {property.hasFireFightingSystem && <Badge variant="outline">Fire System</Badge>}
                    {property.hasSmokeDetector && <Badge variant="outline">Smoke Detector</Badge>}
                    {property.hasCoDetector && <Badge variant="outline">CO Detector</Badge>}
                    {property.security?.map((feature, index) => (
                      <Badge key={index} variant="outline">{feature}</Badge>
                    ))}
                  </div>
                </div>

                {/* Nearby Places */}
                <div>
                  <h3 className="font-semibold text-estate-800 mb-3">Nearby Places</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {property.nearBusStop && <Badge variant="outline">Bus Stop</Badge>}
                    {property.nearSubway && <Badge variant="outline">Subway</Badge>}
                    {property.nearSupermarket && <Badge variant="outline">Supermarket</Badge>}
                    {property.nearSchool && <Badge variant="outline">School</Badge>}
                    {property.nearPark && <Badge variant="outline">Park</Badge>}
                    {property.nearbyPlaces?.map((place, index) => (
                      <Badge key={index} variant="outline">{place}</Badge>
                    ))}
                  </div>
                </div>

                {/* Rules */}
                <div>
                  <h3 className="font-semibold text-estate-800 mb-3">Property Rules</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Pets:</span> {property.allowsPets ? 'Allowed' : 'Not allowed'}</p>
                    <p><span className="font-medium">Parties:</span> {property.allowsParties ? 'Allowed' : 'Not allowed'}</p>
                    <p><span className="font-medium">Smoking:</span> {property.allowsSmoking ? 'Allowed' : 'Not allowed'}</p>
                  </div>
                </div>
              </div>
            </div>

            <PropertySpecs property={property} />
            <PropertyFeatures property={property} />
            <PropertyAdditionalFeatures property={property} />
          </div>
          
          <div>
            {/* Agent Contact Section - Combined from AgentContact component */}
            <div className="bg-white rounded-lg p-6 shadow border border-estate-neutral-100 mb-6">
              <Button className="w-full bg-teal-500 hover:bg-teal-600">
                Schedule a Tour
              </Button>
              <Button variant="outline" className="w-full mt-3">
                Request Info
              </Button>
            </div>
            
            {property.agentName && (
              <div className="bg-white rounded-lg p-6 shadow border border-estate-neutral-100">
                <h3 className="text-xl font-semibold text-estate-800 mb-4">
                  Listed by
                </h3>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-estate-neutral-200 rounded-full flex items-center justify-center text-estate-neutral-500">
                    <User size={32} />
                  </div>
                  <div>
                    <p className="font-medium text-lg">{property.agentName}</p>
                    <p className="text-estate-neutral-500">Real Estate Agent</p>
                  </div>
                </div>
                
                {property.agentPhone && (
                  <div className="flex items-center gap-3 mb-3">
                    <Phone size={18} className="text-teal-500" />
                    <a 
                      href={`tel:${property.agentPhone}`} 
                      className="text-estate-neutral-700 hover:text-estate-800"
                    >
                      {property.agentPhone}
                    </a>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-teal-500" />
                  <a 
                    href="mailto:agent@househaven.com" 
                    className="text-estate-neutral-700 hover:text-estate-800"
                  >
                    agent@househaven.com
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;