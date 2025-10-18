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


const amenities = [
  { id: "has_elevator", label: "Ascenseur" },
  { id: "has_ventilation", label: "Ventilation" },
  { id: "has_air_conditioning", label: "Climatisation" },
  { id: "is_accessible", label: "Accessible" },
  { id: "has_gas", label: "Gaz" },
  { id: "has_loggia", label: "Loggia" },
  { id: "has_fireplace", label: "Cheminée" },
  { id: "has_internet", label: "Internet" },
  { id: "has_cable_tv", label: "Télévision par câble" },
  { id: "has_satellite_tv", label: "Télévision par satellite" },
  { id: "has_phone_line", label: "Ligne téléphonique" },
  { id: "has_vent", label: "Ventilation" },
  { id: "has_cinema", label: "Home Cinéma" },
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
  { id: "has_co_detector", label: "Détecteur de CO" },
  { id: "has_smoke_detector", label: "Détecteur de fumée" },
  { id: "has_evacuation_ladder", label: "Échelle d'évacuation" },
  { id: "has_fire_fighting_system", label: "Système anti-incendie" },
  { id: "has_perimeter_cameras", label: "Caméras périmétriques" },
  { id: "has_alarm", label: "Alarme" },
  { id: "has_live_protection", label: "Protection en direct" },
  { id: "has_locked_entrance", label: "Entrée sécurisée" },
  { id: "has_locked_yard", label: "Cour sécurisée" },
];

const nearbyFacilities = [
  { id: "near_bus_stop", label: "Arrêt de bus" },
  { id: "near_bank", label: "Banque" },
  { id: "near_subway", label: "Métro" },
  { id: "near_supermarket", label: "Supermarché" },
  { id: "near_kindergarten", label: "Jardin d'enfants" },
  { id: "near_city_center", label: "Centre-ville" },
  { id: "near_pharmacy", label: "Pharmacie" },
  { id: "near_greenery", label: "Espaces verts" },
  { id: "near_park", label: "Parc" },
  { id: "near_shopping_centre", label: "Centre commercial" },
  { id: "near_school", label: "École" },
  { id: "near_old_district", label: "Vieux quartier" },
];

const rules = [
  { id: "allows_pets", label: "Animaux autorisés" },
  { id: "allows_parties", label: "Fêtes autorisées" },
  { id: "allows_smoking", label: "Fumeurs autorisés" },
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
  has_satellite_tv: z.boolean().default(false),
  has_phone_line: z.boolean().default(false),
  has_vent: z.boolean().default(false),
  has_cinema: z.boolean().default(false),

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

  // New Fields
  building_material: z.enum(["brick", "concrete", "wood", "combined"]).optional(),
  furniture_type: z.enum(["furnished", "semi_furnished", "unfurnished"]).optional(),
  storeroom_type: z.enum(["internal", "external", "none"]).optional(),
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
      has_air_conditioning: false,
      is_accessible: false,
      has_gas: false,
      has_loggia: false,
      has_fireplace: false,
      has_internet: false,
      has_cable_tv: false,
      has_satellite_tv: false,
      has_phone_line: false,
      has_vent: false,
      has_cinema: false,
      has_dishwasher: false,
      has_gas_stove: false,
      has_electric_kettle: false,
      has_coffee_machine: false,
      has_audio_system: false,
      has_heater: false,
      has_hair_dryer: false,
      has_refrigerator: false,
      has_vacuum_cleaner: false,
      has_dryer: false,
      has_iron: false,
      has_co_detector: false,
      has_smoke_detector: false,
      has_evacuation_ladder: false,
      has_fire_fighting_system: false,
      has_perimeter_cameras: false,
      has_alarm: false,
      has_live_protection: false,
      has_locked_entrance: false,
      has_locked_yard: false,
      has_induction_oven: false,
      has_microwave: false,
      has_electric_oven: false,
      has_washing_machine: false,
      has_tv: false,
      near_bus_stop: false,
      near_bank: false,
      near_subway: false,
      near_supermarket: false,
      near_kindergarten: false,
      near_city_center: false,
      near_pharmacy: false,
      near_greenery: false,
      near_park: false,
      near_shopping_centre: false,
      near_school: false,
      near_old_district: false,
      allows_pets: false,
      allows_parties: false,
      allows_smoking: false,
      building_material: undefined,
      furniture_type: undefined,
      storeroom_type: undefined,
    },
  });

  const onSubmit = (data: FormValues) => {
    const mappedData = {
      has_elevator: data.has_elevator,
      has_ventilation: data.has_ventilation,
      has_air_conditioning: data.has_air_conditioning,
      is_accessible: data.is_accessible,
      has_gas: data.has_gas,
      has_loggia: data.has_loggia,
      has_fireplace: data.has_fireplace,
      has_internet: data.has_internet,
      has_cable_tv: data.has_cable_tv,
      has_satellite_tv: data.has_satellite_tv,
      has_phone_line: data.has_phone_line,
      has_vent: data.has_vent,
      has_cinema: data.has_cinema,
      has_dishwasher: data.has_dishwasher,
      has_coffee_machine: data.has_coffee_machine,
      has_audio_system: data.has_audio_system,
      has_heater: data.has_heater,
      has_hair_dryer: data.has_hair_dryer,
      has_refrigerator: data.has_refrigerator,
      has_vacuum_cleaner: data.has_vacuum_cleaner,
      has_dryer: data.has_dryer,
      has_iron: data.has_iron,
      has_co_detector: data.has_co_detector,
      has_smoke_detector: data.has_smoke_detector,
      has_evacuation_ladder: data.has_evacuation_ladder,
      has_fire_fighting_system: data.has_fire_fighting_system,
      has_perimeter_cameras: data.has_perimeter_cameras,
      has_alarm: data.has_alarm,
      has_live_protection: data.has_live_protection,
      has_locked_entrance: data.has_locked_entrance,
      has_locked_yard: data.has_locked_yard,
      near_bus_stop: data.near_bus_stop,
      near_bank: data.near_bank,
      near_subway: data.near_subway,
      near_supermarket: data.near_supermarket,
      near_kindergarten: data.near_kindergarten,
      near_city_center: data.near_city_center,
      near_pharmacy: data.near_pharmacy,
      near_greenery: data.near_greenery,
      near_park: data.near_park,
      near_shopping_centre: data.near_shopping_centre,
      near_school: data.near_school,
      near_old_district: data.near_old_district,
      allows_pets: data.allows_pets,
      allows_parties: data.allows_parties,
      allows_smoking: data.allows_smoking,
      heating_type: data.heating_type,
      hot_water_type: data.hot_water_type,
      parking_type: data.parking_type,
      building_material: data.building_material,
      furniture_type: data.furniture_type,
      storeroom_type: data.storeroom_type,
    };
    onNext(mappedData);
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
            <h2 className="text-2xl font-bold">{"Commodités et Services"}</h2>
            <p className="text-muted-foreground mt-2">
              {"Sélectionnez les commodités et services disponibles dans votre propriété."}
            </p>
          </div>

          {renderCheckboxGroup("Principales commodités", amenities)}

          {renderCheckboxGroup("Appareils de cuisine", kitchenAppliances)}

          {renderCheckboxGroup("Autres appareils", otherAppliances)}

          {renderCheckboxGroup("Sécurité", securityFeatures)}

          {renderCheckboxGroup("Installations à proximité", nearbyFacilities)}

          {renderCheckboxGroup("Règles", rules)}

          <div className="space-y-4">
            <h3 className="text-lg font-medium">{"Systèmes"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="heating_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"Type de chauffage"}</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">{"Sélectionner"}</option>
                        <option value="central">{"Central"}</option>
                        <option value="electric">{"Électrique"}</option>
                        <option value="gas">{"Gaz"}</option>
                        <option value="wood">{"Bois"}</option>
                        <option value="solar">{"Solaire"}</option>
                        <option value="none">{"Aucun"}</option>
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
                    <FormLabel>{"Type d'eau chaude"}</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">{"Sélectionner"}</option>
                        <option value="central">{"Central"}</option>
                        <option value="electric">{"Électrique"}</option>
                        <option value="gas">{"Gaz"}</option>
                        <option value="solar">{"Solaire"}</option>
                        <option value="none">{"Aucun"}</option>
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
                    <FormLabel>{"Type de parking"}</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">{"Sélectionner"}</option>
                        <option value="street">{"Rue"}</option>
                        <option value="garage">{"Garage"}</option>
                        <option value="underground">{"Souterrain"}</option>
                        <option value="none">{"Aucun"}</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="building_material"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"Matériau de construction"}</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">{"Sélectionner"}</option>
                        <option value="brick">{"Brique"}</option>
                        <option value="concrete">{"Béton"}</option>
                        <option value="wood">{"Bois"}</option>
                        <option value="combined">{"Combiné"}</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="furniture_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"Type de mobilier"}</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">{"Sélectionner"}</option>
                        <option value="furnished">{"Meublé"}</option>
                        <option value="semi_furnished">{"Semi-meublé"}</option>
                        <option value="unfurnished">{"Non meublé"}</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storeroom_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"Type de débarras"}</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">{"Sélectionner"}</option>
                        <option value="internal">{"Interne"}</option>
                        <option value="external">{"Externe"}</option>
                        <option value="none">{"Aucun"}</option>
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
            {"Retour"}
          </Button>
          <Button type="submit">{"Étape suivante"}</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPropertyStep3;
