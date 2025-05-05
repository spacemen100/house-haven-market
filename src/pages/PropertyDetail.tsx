import { useEffect, useState, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types/property";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyHeader from "@/components/property/PropertyHeader";
import PropertyGallery from "@/components/property/PropertyGallery";
import { Loader2, MapPin, Ruler, Building, Home, Layers, Calendar, Key, Heart, Share2, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Phone, Mail, User } from "lucide-react";

// Chargement différé du composant de carte
const PropertyMap = lazy(() => import("@/components/PropertyMap"));

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

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

        // Transform the data to match the Property type
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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-cyan-600 mx-auto mb-4" />
            <p className="text-lg text-gray-600">Loading property details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Property not found</h2>
            <p className="text-gray-600 mb-6">This property doesn't exist or has been removed.</p>
            <Button 
              onClick={() => navigate('/properties')}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              Back to properties list
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container py-8">
          <div className="flex justify-between items-start mb-6">
            <PropertyHeader property={property} />
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <PropertyGallery property={property} />
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(property.price)}</h3>
                    {property.pricePerSqm && (
                      <p className="text-gray-600">{formatCurrency(property.pricePerSqm)} per sqm</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">
                      {property.listingType}
                    </Badge>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                      {property.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-medium">{property.propertyType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Area</p>
                      <p className="font-medium">{property.sqft} sqft</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Rooms</p>
                      <p className="font-medium">{property.rooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Year Built</p>
                      <p className="font-medium">{property.yearBuilt || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {property.description && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
                </div>
              )}
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.hasElevator && <FeatureBadge icon="🚪" text="Elevator" />}
                  {property.hasAirConditioning && <FeatureBadge icon="❄️" text="Air Conditioning" />}
                  {property.hasInternet && <FeatureBadge icon="🌐" text="High-speed Internet" />}
                  {property.parkingType && <FeatureBadge icon="🚗" text={`Parking: ${property.parkingType}`} />}
                  {property.hasFireplace && <FeatureBadge icon="🔥" text="Fireplace" />}
                  {property.isAccessible && <FeatureBadge icon="♿" text="Wheelchair Accessible" />}
                  {property.hasLoggia && <FeatureBadge icon="🌿" text="Loggia" />}
                  {property.hasAlarm && <FeatureBadge icon="🚨" text="Security Alarm" />}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed Specifications</h3>
                <div className="space-y-6">
                  <SpecSection 
                    icon={<Building className="h-5 w-5 text-cyan-600" />} 
                    title="Building Details"
                    items={[
                      { label: "Building Material", value: property.buildingMaterial || 'N/A' },
                      { label: "Total Floors", value: property.totalFloors },
                      { label: "Floor Level", value: property.floorLevel },
                      { label: "Condition", value: property.condition },
                    ]}
                  />
                  
                  <SpecSection 
                    icon={<Home className="h-5 w-5 text-cyan-600" />} 
                    title="Interior Details"
                    items={[
                      { label: "Bedrooms", value: property.beds },
                      { label: "Bathrooms", value: property.baths },
                      { label: "Kitchen Type", value: property.kitchenType },
                      { label: "Furniture", value: property.furnitureType || 'N/A' },
                    ]}
                  />
                  
                  <SpecSection 
                    icon={<Layers className="h-5 w-5 text-cyan-600" />} 
                    title="Utilities"
                    items={[
                      { label: "Heating", value: property.heatingType || 'N/A' },
                      { label: "Hot Water", value: property.hotWaterType || 'N/A' },
                      { label: "Internet", value: property.hasInternet ? "Yes" : "No" },
                      { label: "Cable TV", value: property.hasCableTV ? "Yes" : "No" },
                    ]}
                  />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-cyan-600" />
                  Location
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    {property.address.street}, {property.address.city}, {property.address.zip}
                  </p>
                  
                  <Suspense fallback={
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Loading map...</p>
                      </div>
                    </div>
                  }>
                    {property.address.coordinates?.lat && property.address.coordinates?.lng ? (
                      <PropertyMap 
                        lat={property.address.coordinates.lat} 
                        lng={property.address.coordinates.lng}
                        address={`${property.address.street}, ${property.address.city}`}
                      />
                    ) : (
                      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">Location map not available</p>
                        </div>
                      </div>
                    )}
                  </Suspense>
                  
                  <h4 className="font-medium text-gray-900 mt-4">Nearby Places</h4>
                  <div className="flex flex-wrap gap-2">
                    {property.nearBusStop && <Badge variant="outline">🚌 Bus Stop</Badge>}
                    {property.nearSubway && <Badge variant="outline">🚇 Subway</Badge>}
                    {property.nearSupermarket && <Badge variant="outline">🛒 Supermarket</Badge>}
                    {property.nearPark && <Badge variant="outline">🌳 Park</Badge>}
                    {property.nearSchool && <Badge variant="outline">🏫 School</Badge>}
                    {property.nearbyPlaces?.map((place, index) => (
                      <Badge key={index} variant="outline">{place}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Agent</h3>
                
                {property.agentName && (
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600">
                      <User size={32} />
                    </div>
                    <div>
                      <p className="font-medium text-lg">{property.agentName}</p>
                      <p className="text-gray-500">Real Estate Agent</p>
                    </div>
                  </div>
                )}
                
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700 mb-3">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Agent
                </Button>
                
                <Button variant="outline" className="w-full mb-6">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Agent
                </Button>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-cyan-600" />
                    <a 
                      href={`tel:${property.agentPhone || property.phoneNumber}`} 
                      className="text-gray-700 hover:text-cyan-600"
                    >
                      {property.agentPhone || property.phoneNumber}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-cyan-600" />
                    <a 
                      href={`mailto:${property.contactEmail || 'contact@example.com'}`} 
                      className="text-gray-700 hover:text-cyan-600"
                    >
                      {property.contactEmail || 'contact@example.com'}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Schedule a Tour</h3>
                <p className="text-gray-600 mb-4">Arrange a viewing at your convenience</p>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Book Viewing
                </Button>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Property Facts</h3>
                <div className="space-y-4">
                  <FactItem label="Reference #" value={property.referenceNumber || 'N/A'} />
                  <FactItem label="Cadastral Code" value={property.cadastralCode || 'N/A'} />
                  <FactItem label="Listed on" value={new Date(property.createdAt).toLocaleDateString()} />
                  <FactItem label="Property ID" value={property.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper components
const FeatureBadge = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
    <span className="text-lg">{icon}</span>
    <span className="font-medium text-gray-700">{text}</span>
  </div>
);

const SpecSection = ({ 
  icon, 
  title, 
  items 
}: { 
  icon: React.ReactNode;
  title: string;
  items: { label: string; value: string | number }[];
}) => (
  <div>
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h4 className="font-medium text-gray-900">{title}</h4>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-gray-500">{item.label}</span>
          <span className="font-medium text-gray-700">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const FactItem = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-700">{value}</span>
  </div>
);

export default PropertyDetail;