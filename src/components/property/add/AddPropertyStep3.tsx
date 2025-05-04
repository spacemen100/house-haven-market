import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const amenities = [
  { id: "has_elevator", label: "Ascenseur" },
  { id: "has_ventilation", label: "Ventilation" },
  { id: "has_air_conditioning", label: "Climatisation" },
  { id: "is_accessible", label: "Accès handicapé" },
  { id: "has_gas", label: "Gaz" },
  { id: "has_loggia", label: "Loggia" },
  { id: "has_fireplace", label: "Cheminée" },
  { id: "has_internet", label: "Internet" },
  { id: "has_cable_tv", label: "Câble TV" },
];

const kitchenAppliances = [
  { id: "has_dishwasher", label: "Lave-vaisselle" },
  { id: "has_gas_stove", label: "Cuisinière à gaz" },
  { id: "has_electric_kettle", label: "Bouilloire électrique" },
  { id: "has_induction_oven", label: "Four à induction" },
  { id: "has_microwave", label: "Micro-ondes" },
  { id: "has_electric_oven", label: "Four électrique" },
];

const otherAppliances = [
  { id: "has_washing_machine", label: "Lave-linge" },
  { id: "has_tv", label: "Télévision" },
  { id: "has_coffee_machine", label: "Machine à café" },
  { id: "has_audio_system", label: "Système audio" },
  { id: "has_heater", label: "Chauffage" },
  { id: "has_hair_dryer", label: "Sèche-cheveux" },
  { id: "has_refrigerator", label: "Réfrigérateur" },
  { id: "has_vacuum_cleaner", label: "Aspirateur" },
  { id: "has_dryer", label: "Sèche-linge" },
  { id: "has_iron", label: "Fer à repasser" },
];

const securityFeatures = [
  { id: "has_co_detector", label: "Détecteur CO" },
  { id: "has_smoke_detector", label: "Détecteur fumée" },
  { id: "has_evacuation_ladder", label: "Échelle évacuation" },
  { id: "has_fire_fighting_system", label: "Système incendie" },
  { id: "has_perimeter_cameras", label: "Caméras périmètre" },
  { id: "has_alarm", label: "Alarme" },
  { id: "has_live_protection", label: "Protection 24/7" },
  { id: "has_locked_entrance", label: "Entrée sécurisée" },
  { id: "has_locked_yard", label: "Cour fermée" },
];

const nearbyFacilities = [
  { id: "near_bus_stop", label: "Arrêt de bus" },
  { id: "near_bank", label: "Banque" },
  { id: "near_subway", label: "Métro" },
  { id: "near_supermarket", label: "Supermarché" },
  { id: "near_kindergarten", label: "École maternelle" },
  { id: "near_city_center", label: "Centre ville" },
  { id: "near_pharmacy", label: "Pharmacie" },
  { id: "near_greenery", label: "Espaces verts" },
  { id: "near_park", label: "Parc" },
  { id: "near_shopping_centre", label: "Centre commercial" },
  { id: "near_school", label: "École" },
  { id: "near_old_district", label: "Quartier historique" },
];

const rules = [
  { id: "allows_pets", label: "Animaux autorisés" },
  { id: "allows_parties", label: "Fêtes autorisées" },
  { id: "allows_smoking", label: "Fumer autorisé" },
];

const formSchema = z.object({
  // Amenities
  has_elevator: z.boolean().default(false),
  has_ventilation: z.boolean().default(false),
  has_air_conditioning: z.boolean().default(false),
  is_accessible: z.boolean().default(false),
  has_gas: z.boolean().default(false),
  has_loggia: z.boolean().default(false),
  has_fireplace: z.boolean().default(false),
  has_internet: z.boolean().default(false),
  has_cable_tv: z.boolean().default(false),
  
  // Kitchen
  has_dishwasher: z.boolean().default(false),
  has_gas_stove: z.boolean().default(false),
  has_electric_kettle: z.boolean().default(false),
  has_induction_oven: z.boolean().default(false),
  has_microwave: z.boolean().default(false),
  has_electric_oven: z.boolean().default(false),
  
  // Appliances
  has_washing_machine: z.boolean().default(false),
  has_tv: z.boolean().default(false),
  has_coffee_machine: z.boolean().default(false),
  has_audio_system: z.boolean().default(false),
  has_heater: z.boolean().default(false),
  has_hair_dryer: z.boolean().default(false),
  has_refrigerator: z.boolean().default(false),
  has_vacuum_cleaner: z.boolean().default(false),
  has_dryer: z.boolean().default(false),
  has_iron: z.boolean().default(false),
  
  // Security
  has_co_detector: z.boolean().default(false),
  has_smoke_detector: z.boolean().default(false),
  has_evacuation_ladder: z.boolean().default(false),
  has_fire_fighting_system: z.boolean().default(false),
  has_perimeter_cameras: z.boolean().default(false),
  has_alarm: z.boolean().default(false),
  has_live_protection: z.boolean().default(false),
  has_locked_entrance: z.boolean().default(false),
  has_locked_yard: z.boolean().default(false),
  
  // Nearby
  near_bus_stop: z.boolean().default(false),
  near_bank: z.boolean().default(false),
  near_subway: z.boolean().default(false),
  near_supermarket: z.boolean().default(false),
  near_kindergarten: z.boolean().default(false),
  near_city_center: z.boolean().default(false),
  near_pharmacy: z.boolean().default(false),
  near_greenery: z.boolean().default(false),
  near_park: z.boolean().default(false),
  near_shopping_centre: z.boolean().default(false),
  near_school: z.boolean().default(false),
  near_old_district: z.boolean().default(false),
  
  // Rules
  allows_pets: z.boolean().default(false),
  allows_parties: z.boolean().default(false),
  allows_smoking: z.boolean().default(false),
  
  // Systems
  heating_type: z.enum(["central", "electric", "gas", "wood", "solar", "none"]).optional(),
  hot_water_type: z.enum(["central", "electric", "gas", "solar", "none"]).optional(),
  parking_type: z.enum(["street", "garage", "underground", "none"]).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddPropertyStep3Props {
  onBack: () => void;
  onNext: (data: FormValues) => void;
}

const AddPropertyStep3 = ({ onBack, onNext }: AddPropertyStep3Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      has_elevator: false,
      has_ventilation: false,
      // ... (tous les autres champs booléens initialisés à false)
    },
  });

  const onSubmit = (data: FormValues) => {
    onNext(data);
  };

  const renderCheckboxGroup = (title: string, items: {id: string, label: string}[]) => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <FormField
            key={item.id}
            control={form.control}
            name={item.id as keyof FormValues}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{item.label}</FormLabel>
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">Équipements et services</h2>
            <p className="text-muted-foreground mt-2">
              Sélectionnez les équipements disponibles et les services à proximité
            </p>
          </div>

          {renderCheckboxGroup("Équipements principaux", amenities)}
          
          {renderCheckboxGroup("Équipements cuisine", kitchenAppliances)}
          
          {renderCheckboxGroup("Autres équipements", otherAppliances)}
          
          {renderCheckboxGroup("Sécurité", securityFeatures)}
          
          {renderCheckboxGroup("À proximité", nearbyFacilities)}
          
          {renderCheckboxGroup("Règles", rules)}

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Systèmes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="heating_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de chauffage</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="central">Central</option>
                        <option value="electric">Électrique</option>
                        <option value="gas">Gaz</option>
                        <option value="wood">Bois</option>
                        <option value="solar">Solaire</option>
                        <option value="none">Aucun</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hot_water_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eau chaude</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="central">Central</option>
                        <option value="electric">Électrique</option>
                        <option value="gas">Gaz</option>
                        <option value="solar">Solaire</option>
                        <option value="none">Aucun</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parking_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parking</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="street">Rue</option>
                        <option value="garage">Garage</option>
                        <option value="underground">Souterrain</option>
                        <option value="none">Aucun</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Retour
          </Button>
          <Button type="submit">Suivant</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPropertyStep3;