// src/pages/PropertyDetail.tsx
import { useEffect, useState, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getUserProfile, updateUserProfile } from "@/lib/profiles"; // Added imports
import { Property } from "@/types/property";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyHeader from "@/components/property/PropertyHeader";
import PropertyGallery from "@/components/property/PropertyGallery";
import { Loader2, MapPin, Ruler, Building, Home, Layers, Calendar, Key, Heart, Share2, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, User } from "lucide-react";
import { useCurrency } from '@/CurrencyContext';
import { useTranslation } from 'react-i18next';

const PropertyMap = lazy(() => import("@/components/PropertyMap"));

const PropertyDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false); // Replaced isFavorite
  const [isLoadingLike, setIsLoadingLike] = useState(false); // Added
  const [currentUserId, setCurrentUserId] = useState<string | null>(null); // Added
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            setCurrentUserId(user.id);
        } else {
            setCurrentUserId(null); // Explicitly set to null if no user
        }
    };
    fetchUser();
  }, []); // Runs once on mount

  useEffect(() => {
    const fetchInitialLikeStatus = async () => {
      if (property && currentUserId) { // Ensure property and user ID are available
        try {
          const userProfile = await getUserProfile(currentUserId);
          if (userProfile && userProfile.liked_properties) {
            setIsLiked(userProfile.liked_properties.includes(property.id));
          } else {
            setIsLiked(false);
          }
        } catch (error) {
          console.error("Error fetching user profile for like status:", error);
          setIsLiked(false);
        }
      } else if (!currentUserId) { 
          // If no user is logged in, ensure isLiked is false
          setIsLiked(false);
      }
    };

    fetchInitialLikeStatus();
  }, [property, currentUserId]); // Re-run if property or currentUserId changes

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        if (!id) {
          navigate("/properties");
          return;
        }

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
          m2: propertyData.m2, // Changed from sqft to m2
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
          pricePerM2: propertyData.price_per_m2, // Changed from price_per_sqm to price_per_m2
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
          hasPhoneLine: propertyData.has_phone_line,
          currency: propertyData.currency
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

  const handleLikeToggle = async () => {
    if (isLoadingLike || !currentUserId || !property) return; // Ensure property is also available

    setIsLoadingLike(true);
    try {
      const profile = await getUserProfile(currentUserId);
      const liked_properties = profile?.liked_properties || [];
      let updatedLikedProperties: string[];

      if (isLiked) {
        updatedLikedProperties = liked_properties.filter(id => id !== property.id);
      } else {
        // Ensure property.id is not already in the array before adding
        if (!liked_properties.includes(property.id)) {
          updatedLikedProperties = [...liked_properties, property.id];
        } else {
          updatedLikedProperties = [...liked_properties]; // Already there, no change
        }
      }

      await updateUserProfile(currentUserId, { liked_properties: updatedLikedProperties });
      setIsLiked(!isLiked);
      // Optionally, refetch liked properties for other parts of the app or use a global state.
      // For now, just updating local state is fine for the button itself.
    } catch (error) {
      console.error("Error toggling like status on detail page:", error);
      // Optionally, show a toast notification to the user
    } finally {
      setIsLoadingLike(false);
    }
  };

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
            <div className="flex gap-3">
              <Button variant="outline" size="icon" onClick={handleLikeToggle} disabled={isLoadingLike || !currentUserId}>
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-gray-500'}`} />
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
                    <h3 className="text-2xl font-bold text-gray-900">
                      {formatPrice(property.price, property.currency)}
                    </h3>
                    {property.pricePerM2 && (
                      <p className="text-gray-600">
                        {formatPrice(property.pricePerM2, property.currency)} {t('propertyDetail.pricePerM2')}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">
                      {t(`${property.listingType.toLowerCase()}`)}
                    </Badge>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                      {t(`${property.status}`)}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">{t('propertyDetail.type')}</p>
                      <p className="font-medium">{t(`propertyType.${property.propertyType.toLowerCase()}`)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">{t('propertyDetail.area')}</p>
                      <p className="font-medium">{property.m2} m²</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">{t('propertyDetail.rooms')}</p>
                      <p className="font-medium">{property.rooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">{t('propertyDetail.yearBuilt')}</p>
                      <p className="font-medium">{property.yearBuilt || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {property.description && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('propertyDetail.description')}</h3>
                  <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
                </div>
              )}

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('propertyDetail.keyFeatures')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.hasElevator && <FeatureBadge icon="🚪" text={t('propertyDetail.elevator')} />}
                  {property.hasAirConditioning && <FeatureBadge icon="❄️" text={t('propertyDetail.airConditioning')} />}
                  {property.hasInternet && <FeatureBadge icon="🌐" text={t('propertyDetail.highSpeedInternet')} />}
                  {property.parkingType && <FeatureBadge icon="🚗" text={`${t('propertyDetail.parking')}: ${property.parkingType}`} />}
                  {property.hasFireplace && <FeatureBadge icon="🔥" text={t('propertyDetail.fireplace')} />}
                  {property.isAccessible && <FeatureBadge icon="♿" text={t('propertyDetail.wheelchairAccessible')} />}
                  {property.hasLoggia && <FeatureBadge icon="🌿" text={t('propertyDetail.loggia')} />}
                  {property.hasAlarm && <FeatureBadge icon="🚨" text={t('propertyDetail.securityAlarm')} />}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('propertyDetail.detailedSpecifications')}</h3>
                <div className="space-y-6">
                  <SpecSection
                    icon={<Building className="h-5 w-5 text-cyan-600" />}
                    title={t('propertyDetail.buildingDetails')}
                    items={[
                      { label: t('propertyDetail.buildingMaterial'), value: t(`buildingMaterial.${property.buildingMaterial}`) },
                      { label: t('propertyDetail.totalFloors'), value: property.totalFloors },
                      { label: t('propertyDetail.floorLevel'), value: property.floorLevel },
                      { label: t('propertyDetail.condition'), value: t(`condition.${property.condition}`) },
                    ]}
                  />

                  <SpecSection
                    icon={<Home className="h-5 w-5 text-cyan-600" />}
                    title={t('propertyDetail.interiorDetails')}
                    items={[
                      { label: t('propertyDetail.bedrooms'), value: property.beds },
                      { label: t('propertyDetail.bathrooms'), value: property.baths },
                      { label: t('propertyDetail.kitchenType'), value: t(`kitchenType.${property.kitchenType}`) },
                      { label: t('propertyDetail.furniture'), value: t(`furnitureType.${property.furnitureType}`) },
                    ]}
                  />

                  <SpecSection
                    icon={<Layers className="h-5 w-5 text-cyan-600" />}
                    title={t('propertyDetail.utilities')}
                    items={[
                      { label: t('propertyDetail.heating'), value: t(`heatingType.${property.heatingType}`) },
                      { label: t('propertyDetail.hotWater'), value: t(`hotWaterType.${property.hotWaterType}`) },
                      { label: t('propertyDetail.internet'), value: property.hasInternet ? t('yes') : t('no') },
                      { label: t('propertyDetail.cableTV'), value: property.hasCableTV ? t('yes') : t('no') },
                    ]}
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-cyan-600" />
                  {t('propertyDetail.location')}
                </h3>
                <div className="space-y-3">
                  <p className="text-sm line-clamp-1">
                    {t(`${property.address.street}`)}, {t(`${property.address.district}`)}, {t(`cities.${property.address.city}`)}
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
                        address={`${property.address.street}, ${t(`districts.${property.address.district}`)}, ${t(`cities.${property.address.city}`)}`}
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

                  <h4 className="font-medium text-gray-900 mt-4">{t('propertyDetail.nearbyPlaces')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {property.nearBusStop && <Badge variant="outline">🚌 {t('propertyDetail.busStop')}</Badge>}
                    {property.nearSubway && <Badge variant="outline">🚇 {t('propertyDetail.subway')}</Badge>}
                    {property.nearSupermarket && <Badge variant="outline">🛒 {t('propertyDetail.supermarket')}</Badge>}
                    {property.nearPark && <Badge variant="outline">🌳 {t('propertyDetail.park')}</Badge>}
                    {property.nearSchool && <Badge variant="outline">🏫 {t('propertyDetail.school')}</Badge>}
                    {property.nearbyPlaces?.map((place, index) => (
                      <Badge key={index} variant="outline">{place}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('propertyDetail.contactAgent')}</h3>

                {property.agentName && (
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600">
                      <User size={32} />
                    </div>
                    <div>
                      <p className="font-medium text-lg">{property.agentName}</p>
                      <p className="text-gray-500">{t('propertyDetail.realEstateAgent')}</p>
                    </div>
                  </div>
                )}
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
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('propertyDetail.propertyFacts')}</h3>
                <div className="space-y-4">
                  <FactItem label={t('propertyDetail.referenceNumber')} value={property.referenceNumber || 'N/A'} />
                  <FactItem label={t('propertyDetail.cadastralCode')} value={property.cadastralCode || 'N/A'} />
                  <FactItem label={t('propertyDetail.listedOn')} value={new Date(property.createdAt).toLocaleDateString()} />
                  <FactItem label={t('propertyDetail.propertyID')} value={property.id} />
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
