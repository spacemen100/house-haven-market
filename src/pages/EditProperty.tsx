import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPropertyById, updateProperty, CreatePropertyInput } from '@/lib/api/properties';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { Property } from '@/types/property';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PropertyTypeStep from "@/components/property/add/PropertyTypeStep";
import AddPropertyStep1 from "@/components/property/add/AddPropertyStep1";
import AddPropertyStep2 from "@/components/property/add/AddPropertyStep2";
import AddPropertyStep3 from "@/components/property/add/AddPropertyStep3";
import AddPropertyStep4 from "@/components/property/add/AddPropertyStep4";
import StepsIndicator from "@/components/property/add/StepsIndicator";

const EditProperty = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const steps = [
    { number: 1, label: "Type d'annonce" },
    { number: 2, label: "Informations de base" },
    { number: 3, label: "Caractéristiques" },
    { number: 4, label: "Localisation" },
    { number: 5, label: "Enregistrer" }
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CreatePropertyInput>>({});

  // Map DB/domain values to form enums expected by Step 2
  const mapConditionToForm = (value?: string) => {
    switch ((value || '').toLowerCase()) {
      case 'new':
      case 'newly_renovated':
        return 'newly_renovated';
      case 'needs_renovation':
      case 'not_renovated':
        return 'not_renovated';
      case 'white_frame':
      case 'green_frame':
      case 'black_frame':
      case 'old_renovation':
        return value as any;
      case 'good':
      default:
        return 'old_renovation';
    }
  };

  const mapStatusToForm = (value?: string) => {
    switch ((value || '').toLowerCase()) {
      case 'free':
      case 'available':
        return 'available';
      case 'under_caution':
      case 'pending':
        return 'pending';
      case 'under_construction':
      case 'new_building_under_construction':
        return 'new_building_under_construction';
      case 'sold':
      case 'old_building':
        return value as any;
      default:
        return 'available';
    }
  };

  const mapKitchenTypeToForm = (value?: string) => {
    switch ((value || '').toLowerCase()) {
      case 'isolated':
      case 'outside':
      case 'studio':
        return value as any;
      // try to map common values from previous domain
      case 'closed':
        return 'isolated';
      case 'open':
      case 'american':
        return 'studio';
      default:
        return undefined;
    }
  };

  const { 
    data: fetchedProperty, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['property', propertyId],
    queryFn: () => getPropertyById(propertyId!),
    enabled: !!propertyId,
  });

  useEffect(() => {
    if (fetchedProperty) {
      // Transform fetchedProperty to match CreatePropertyInput structure for formData
      setFormData({
        title: fetchedProperty.title,
        description: fetchedProperty.description,
        price: fetchedProperty.price,
        phone_number: fetchedProperty.phone_number,
        cadastral_code: fetchedProperty.cadastralCode,
        propertyType: fetchedProperty.propertyType,
        listingType: fetchedProperty.listingType,
        status: mapStatusToForm(fetchedProperty.status as any),
        condition: mapConditionToForm(fetchedProperty.condition as any),
        plan: fetchedProperty.plan,
        address_street: fetchedProperty.address.street,
        address_city: fetchedProperty.address.city,
        address_district: fetchedProperty.address.district,
        lat: fetchedProperty.address.coordinates.lat,
        lng: fetchedProperty.address.coordinates.lng,
        beds: fetchedProperty.beds,
        baths: fetchedProperty.baths,
        m2: fetchedProperty.m2,
        rooms: fetchedProperty.rooms,
        terrace_area: fetchedProperty.terraceArea,
        kitchen_type: mapKitchenTypeToForm(fetchedProperty.kitchenType as any),
        ceiling_height: fetchedProperty.ceilingHeight,
        floor_level: fetchedProperty.floorLevel,
        total_floors: fetchedProperty.totalFloors,
        year_built: fetchedProperty.yearBuilt,
        featured: fetchedProperty.featured,
        amenities: fetchedProperty.amenities,
        hasElevator: fetchedProperty.hasElevator,
        hasVentilation: fetchedProperty.hasVentilation,
        hasAirConditioning: fetchedProperty.hasAirConditioning,
        equipment: fetchedProperty.equipment,
        internet_tv: fetchedProperty.internetTV,
        storage: fetchedProperty.storage,
        security: fetchedProperty.security,
        isAccessible: fetchedProperty.isAccessible,
        nearby_places: fetchedProperty.nearbyPlaces,
        online_services: fetchedProperty.onlineServices,
        images: Array.isArray(fetchedProperty.images) 
          ? fetchedProperty.images 
          : (fetchedProperty.images ? [fetchedProperty.images as any] : []),
        contactEmail: fetchedProperty.contactEmail,
        instagramHandle: fetchedProperty.instagramHandle,
        facebookUrl: fetchedProperty.facebookUrl,
        twitterHandle: fetchedProperty.twitterHandle,
        
        building_material: fetchedProperty.building_material,
        furniture_type: fetchedProperty.furniture_type,
        
        storeroom_type: fetchedProperty.storeroom_type,
        heating_type: fetchedProperty.heating_type,
        hot_water_type: fetchedProperty.hot_water_type,
        parking_type: fetchedProperty.parking_type,
        
        // Champs pour les étapes du formulaire
        reference_number: fetchedProperty.cadastralCode,
        yearBuilt: fetchedProperty.yearBuilt,
        
        // Mapping des booléens pour les caractéristiques
        has_elevator: fetchedProperty.hasElevator,
        has_ventilation: fetchedProperty.hasVentilation,
        has_air_conditioning: fetchedProperty.hasAirConditioning,
        is_accessible: fetchedProperty.isAccessible,
        
        // Services internet et TV
        has_internet: fetchedProperty.internetTV?.includes("Internet") || false,
        has_cable_tv: fetchedProperty.internetTV?.includes("Télévision par câble") || false,
        has_satellite_tv: fetchedProperty.internetTV?.includes("Télévision par satellite") || false,
        has_phone_line: fetchedProperty.internetTV?.includes("Ligne téléphonique") || false,
        
        // Équipements et commodités
        has_vent: fetchedProperty.amenities?.includes("Ventilation") || false,
        has_cinema: fetchedProperty.amenities?.includes("Home Cinéma") || false,
        has_dishwasher: fetchedProperty.equipment?.includes("Lave-vaisselle") || false,
        has_gas_stove: fetchedProperty.equipment?.includes("Cuisinière à gaz") || false,
        has_electric_kettle: fetchedProperty.equipment?.includes("Bouilloire électrique") || false,
        has_induction_oven: fetchedProperty.equipment?.includes("Four à induction") || false,
        has_microwave: fetchedProperty.equipment?.includes("Micro-ondes") || false,
        has_electric_oven: fetchedProperty.equipment?.includes("Four électrique") || false,
        has_washing_machine: fetchedProperty.equipment?.includes("Lave-linge") || false,
        has_tv: fetchedProperty.equipment?.includes("Télévision") || false,
        has_coffee_machine: fetchedProperty.equipment?.includes("Machine à café") || false,
        has_audio_system: fetchedProperty.equipment?.includes("Système audio") || false,
        has_heater: fetchedProperty.equipment?.includes("Chauffage") || false,
        has_hair_dryer: fetchedProperty.equipment?.includes("Sèche-cheveux") || false,
        has_refrigerator: fetchedProperty.equipment?.includes("Réfrigérateur") || false,
        has_vacuum_cleaner: fetchedProperty.equipment?.includes("Aspirateur") || false,
        has_dryer: fetchedProperty.equipment?.includes("Sèche-linge") || false,
        has_iron: fetchedProperty.equipment?.includes("Fer à repasser") || false,
        
        // Sécurité
        has_co_detector: fetchedProperty.security?.includes("Détecteur de CO") || false,
        has_smoke_detector: fetchedProperty.security?.includes("Détecteur de fumée") || false,
        has_evacuation_ladder: fetchedProperty.security?.includes("Échelle d'évacuation") || false,
        has_fire_fighting_system: fetchedProperty.security?.includes("Système anti-incendie") || false,
        has_perimeter_cameras: fetchedProperty.security?.includes("Caméras périmétriques") || false,
        has_alarm: fetchedProperty.security?.includes("Alarme") || false,
        has_live_protection: fetchedProperty.security?.includes("Protection en direct") || false,
        has_locked_entrance: fetchedProperty.security?.includes("Entrée sécurisée") || false,
        has_locked_yard: fetchedProperty.security?.includes("Cour sécurisée") || false,
        
        // Lieux à proximité
        near_bus_stop: fetchedProperty.nearbyPlaces?.includes("Arrêt de bus") || false,
        near_bank: fetchedProperty.nearbyPlaces?.includes("Banque") || false,
        near_subway: fetchedProperty.nearbyPlaces?.includes("Métro") || false,
        near_supermarket: fetchedProperty.nearbyPlaces?.includes("Supermarché") || false,
        near_kindergarten: fetchedProperty.nearbyPlaces?.includes("Jardin d'enfants") || false,
        near_city_center: fetchedProperty.nearbyPlaces?.includes("Centre-ville") || false,
        near_pharmacy: fetchedProperty.nearbyPlaces?.includes("Pharmacie") || false,
        near_greenery: fetchedProperty.nearbyPlaces?.includes("Espaces verts") || false,
        near_park: fetchedProperty.nearbyPlaces?.includes("Parc") || false,
        near_shopping_centre: fetchedProperty.nearbyPlaces?.includes("Centre commercial") || false,
        near_school: fetchedProperty.nearbyPlaces?.includes("École") || false,
        near_old_district: fetchedProperty.nearbyPlaces?.includes("Vieux quartier") || false,
        
        // Règles
        allows_pets: fetchedProperty.allows_pets || false,
        allows_parties: fetchedProperty.allows_parties || false,
        allows_smoking: fetchedProperty.allows_smoking || false,
      });
    } else if (isError) {
      toast.error("Impossible de charger l'annonce pour édition.");
      console.error("Erreur lors du chargement de l'annonce:", error);
      navigate('/account'); // Redirection si propriété non trouvée ou erreur
    }
  }, [fetchedProperty, isError, error, navigate]);

  const updatePropertyMutation = useMutation({
    mutationFn: (data: { propertyId: string, input: Partial<CreatePropertyInput> }) =>
      updateProperty(data.propertyId, data.input),
    onSuccess: () => {
      toast.success("Annonce immobilière mise à jour avec succès !");
      queryClient.invalidateQueries({ queryKey: ['my-properties'] });
      queryClient.invalidateQueries({ queryKey: ['property', propertyId] });
      navigate('/account');
    },
    onError: (err) => {
      const message = err instanceof Error && err.message 
        ? err.message 
        : "Échec de la mise à jour de l'annonce immobilière.";
      toast.error(message);
      console.error("Erreur lors de la mise à jour de l'annonce:", err);
    },
  });

  const handleNext = (data: Partial<CreatePropertyInput> & { existingImageUrls?: string[], removedImageUrls?: string[] }) => {
    setFormData(prev => ({
      ...prev,
      ...data,
      images: data.images || prev.images, // Préserve les images existantes si non mises à jour
      existingImageUrls: data.existingImageUrls || prev.existingImageUrls,
      removedImageUrls: data.removedImageUrls || prev.removedImageUrls,
    }));
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleFinalSubmit = async (data: Partial<CreatePropertyInput> & { existingImageUrls?: string[], removedImageUrls?: string[] }) => {
    if (!propertyId) {
      toast.error("Identifiant de l'annonce manquant.");
      return;
    }

    const finalFormData = {
      ...formData,
      ...data,
    };

    console.log('Submitting update for propertyId', propertyId, finalFormData);
    updatePropertyMutation.mutate({ propertyId, input: finalFormData });
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="container py-8 text-center">
          <div className="flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <p>Chargement des détails de la propriété...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!fetchedProperty) {
    return (
      <div>
        <Navbar />
        <div className="container py-8 text-center">
          <p>Annonce introuvable ou une erreur s'est produite.</p>
          <Button 
            onClick={() => navigate('/account')} 
            className="mt-4"
          >
            Retour au compte
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Autosave helpers et handlers alternatifs
  const normalizeToApi = (input: any): Partial<CreatePropertyInput> => {
    if (!input) return {};
    const out: any = { ...input };
    out.propertyType = out.propertyType ?? out.property_type;
    out.listingType = out.listingType ?? out.listing_type;
    out.internet_tv = out.internet_tv ?? out.internetTV;
    out.nearby_places = out.nearby_places ?? out.nearbyPlaces;
    out.online_services = out.online_services ?? out.onlineServices;
    out.has_elevator = out.has_elevator ?? out.hasElevator;
    out.has_ventilation = out.has_ventilation ?? out.hasVentilation;
    out.has_air_conditioning = out.has_air_conditioning ?? out.hasAirConditioning;
    out.is_accessible = out.is_accessible ?? out.isAccessible;
    out.terrace_area = out.terrace_area ?? out.terraceArea;
    out.kitchen_type = out.kitchen_type ?? out.kitchenType;
    out.ceiling_height = out.ceiling_height ?? out.ceilingHeight;
    out.floor_level = out.floor_level ?? out.floorLevel;
    out.total_floors = out.total_floors ?? out.totalFloors;
    out.year_built = out.year_built ?? out.yearBuilt;
    return out;
  };
  let autosaveTimer: any;
  const triggerAutosave = (payload: Partial<CreatePropertyInput>) => {
    if (!propertyId) return;
    const normalized = normalizeToApi({ ...payload });
    delete (normalized as any).images;
    delete (normalized as any).existingImageUrls;
    delete (normalized as any).removedImageUrls;
    if (autosaveTimer) clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(async () => {
      try {
        console.log('[Autosave] Saving partial update for', propertyId, normalized);
        await updateProperty(propertyId!, normalized);
      } catch (e) {
        console.warn('[Autosave] Failed:', e);
      }
    }, 400);
  };
  const handleNextAutosave = (data: Partial<CreatePropertyInput> & { existingImageUrls?: string[], removedImageUrls?: string[] }) => {
    setFormData(prev => {
      const merged: Partial<CreatePropertyInput> = {
        ...prev,
        ...data,
        images: (data as any)?.images ?? (prev as any)?.images,
        existingImageUrls: data.existingImageUrls ?? (prev as any)?.existingImageUrls,
        removedImageUrls: data.removedImageUrls ?? (prev as any)?.removedImageUrls,
      };
      triggerAutosave(merged);
      return merged;
    });
    setCurrentStep(prev => prev + 1);
  };
  const handleBackAutosave = () => {
    triggerAutosave(formData);
    setCurrentStep(prev => prev - 1);
  };
  const handleFinalSubmitNormalized = async (data: Partial<CreatePropertyInput> & { existingImageUrls?: string[], removedImageUrls?: string[] }) => {
    if (!propertyId) {
      toast.error("Identifiant de l'annonce manquant.");
      return;
    }
    const finalFormData: Partial<CreatePropertyInput> = {
      ...formData,
      ...data,
      images: (data as any)?.images ?? (formData as any)?.images,
      existingImageUrls: data.existingImageUrls ?? (formData as any)?.existingImageUrls,
      removedImageUrls: data.removedImageUrls ?? (formData as any)?.removedImageUrls,
    };
    const normalized = normalizeToApi(finalFormData);
    console.log('Final data to update:', normalized);
    console.log('Submitting update for propertyId', propertyId);
    updatePropertyMutation.mutate({ propertyId, input: normalized });
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-background">
        <section className="relative py-16 bg-estate-800">
          <div className="container text-center text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
              Modifier l'annonce immobilière
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-slate-200">
              Mettez à jour les informations de votre annonce.
            </p>
          </div>
        </section>

        <section className="py-8 bg-white border-b">
          <div className="container">
            <StepsIndicator currentStep={currentStep} steps={steps} />
          </div>
        </section>

        <section className="py-12 bg-slate-50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <Card className="shadow-md">
                <CardContent className="p-6 md:p-8">
                  {currentStep === 1 && (
                    <PropertyTypeStep
                      key={`${formData.listingType}-${formData.propertyType}`}
                      initialData={formData}
                      onNext={handleNextAutosave}
                    />
                  )}

                  {currentStep === 2 && (
                    <AddPropertyStep1
                      initialData={formData}
                      onBack={handleBackAutosave}
                      onNext={handleNextAutosave}
                    />
                  )}

                  {currentStep === 3 && (
                    <AddPropertyStep2
                      initialData={formData}
                      onBack={handleBackAutosave}
                      onNext={handleNextAutosave}
                    />
                  )}

                  {currentStep === 4 && (
                    <AddPropertyStep3
                      initialData={formData}
                      onBack={handleBackAutosave}
                      onNext={handleNextAutosave}
                    />
                  )}

                  {currentStep === 5 && (
                    <AddPropertyStep4
                      initialData={formData}
                      onBack={handleBackAutosave}
                      isSubmitting={updatePropertyMutation.isPending}
                      onNext={handleFinalSubmitNormalized}
                      submitLabel="Enregistrer les modifications"
                      submittingLabel="Enregistrement..."
                      requireImage={false}
                      requireAddress={false}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-yellow-100 p-4 rounded-lg shadow-lg z-50 max-w-md">
          <h3 className="font-bold mb-2">Debug Info</h3>
          <p>Current Step: {currentStep}</p>
          <p>Form Data Keys: {Object.keys(formData || {}).join(', ')}</p>
          <p>Property ID: {propertyId}</p>
          <button
            onClick={() => console.log('Form Data:', formData)}
            className="bg-blue-500 text-white px-2 py-1 rounded text-sm mt-2"
          >
            Log Form Data
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default EditProperty;
