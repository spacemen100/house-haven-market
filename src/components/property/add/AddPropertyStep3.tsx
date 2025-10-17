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
import { useTranslation } from "react-i18next";

const amenities = [
  { id: "has_elevator", label: "Elevator" },
  { id: "has_ventilation", label: "Ventilation" },
  { id: "has_air_conditioning", label: "Air Conditioning" },
  { id: "is_accessible", label: "Accessible" },
  { id: "has_gas", label: "Gas" },
  { id: "has_loggia", label: "Loggia" },
  { id: "has_fireplace", label: "Fireplace" },
  { id: "has_internet", label: "Internet" },
  { id: "has_cable_tv", label: "Cable TV" },
  { id: "has_satellite_tv", label: "Satellite TV" },
  { id: "has_phone_line", label: "Phone Line" },
  { id: "has_vent", label: "Ventilation" },
  { id: "has_cinema", label: "Home Cinema" },
];

const kitchenAppliances = [
  { id: "has_dishwasher", label: "Dishwasher" },
  { id: "has_gas_stove", label: "Gas Stove" },
  { id: "has_electric_kettle", label: "Electric Kettle" },
  { id: "has_induction_oven", label: "Induction Oven" },
  { id: "has_microwave", label: "Microwave" },
  { id: "has_electric_oven", label: "Electric Oven" },
];

const otherAppliances = [
  { id: "has_washing_machine", label: "Washing Machine" },
  { id: "has_tv", label: "TV" },
  { id: "has_coffee_machine", label: "Coffee Machine" },
  { id: "has_audio_system", label: "Audio System" },
  { id: "has_heater", label: "Heater" },
  { id: "has_hair_dryer", label: "Hair Dryer" },
  { id: "has_refrigerator", label: "Refrigerator" },
  { id: "has_vacuum_cleaner", label: "Vacuum Cleaner" },
  { id: "has_dryer", label: "Dryer" },
  { id: "has_iron", label: "Iron" },
];

const securityFeatures = [
  { id: "has_co_detector", label: "CO Detector" },
  { id: "has_smoke_detector", label: "Smoke Detector" },
  { id: "has_evacuation_ladder", label: "Evacuation Ladder" },
  { id: "has_fire_fighting_system", label: "Fire Fighting System" },
  { id: "has_perimeter_cameras", label: "Perimeter Cameras" },
  { id: "has_alarm", label: "Alarm" },
  { id: "has_live_protection", label: "Live Protection" },
  { id: "has_locked_entrance", label: "Locked Entrance" },
  { id: "has_locked_yard", label: "Locked Yard" },
];

const nearbyFacilities = [
  { id: "near_bus_stop", label: "Bus Stop" },
  { id: "near_bank", label: "Bank" },
  { id: "near_subway", label: "Subway" },
  { id: "near_supermarket", label: "Supermarket" },
  { id: "near_kindergarten", label: "Kindergarten" },
  { id: "near_city_center", label: "City Center" },
  { id: "near_pharmacy", label: "Pharmacy" },
  { id: "near_greenery", label: "Greenery" },
  { id: "near_park", label: "Park" },
  { id: "near_shopping_centre", label: "Shopping Centre" },
  { id: "near_school", label: "School" },
  { id: "near_old_district", label: "Old District" },
];

const rules = [
  { id: "allows_pets", label: "Pets Allowed" },
  { id: "allows_parties", label: "Parties Allowed" },
  { id: "allows_smoking", label: "Smoking Allowed" },
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
  const { t } = useTranslation();
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
      <h3 className="text-lg font-medium">{t(title)}</h3>
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
                <FormLabel>{t(item.label)}</FormLabel>
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
            <h2 className="text-2xl font-bold">{t("amenitiesAndServices")}</h2>
            <p className="text-muted-foreground mt-2">
              {t("selectAmenities")}
            </p>
          </div>

          {renderCheckboxGroup("mainAmenities", amenities)}

          {renderCheckboxGroup("kitchenAppliances", kitchenAppliances)}

          {renderCheckboxGroup("otherAppliances", otherAppliances)}

          {renderCheckboxGroup("security", securityFeatures)}

          {renderCheckboxGroup("nearbyFacilities", nearbyFacilities)}

          {renderCheckboxGroup("rules", rules)}

          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t("systems")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="heating_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("heatingType")}</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">{t("select")}</option>
                        <option value="central">{t("central")}</option>
                        <option value="electric">{t("electric")}</option>
                        <option value="gas">{t("gas")}</option>
                        <option value="wood">{t("wood")}</option>
                        <option value="solar">{t("solar")}</option>
                        <option value="none">{t("none")}</option>
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
                    <FormLabel>{t("hotWaterType")}</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">{t("select")}</option>
                        <option value="central">{t("central")}</option>
                        <option value="electric">{t("electric")}</option>
                        <option value="gas">{t("gas")}</option>
                        <option value="solar">{t("solar")}</option>
                        <option value="none">{t("none")}</option>
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
                    <FormLabel>{t("parkingType")}</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">{t("select")}</option>
                        <option value="street">{t("street")}</option>
                        <option value="garage">{t("garage")}</option>
                        <option value="underground">{t("underground")}</option>
                        <option value="none">{t("none")}</option>
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
                    <FormLabel>{t("buildingMaterial")}</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">{t("select")}</option>
                        <option value="brick">{t("brick")}</option>
                        <option value="concrete">{t("concrete")}</option>
                        <option value="wood">{t("wood")}</option>
                        <option value="combined">{t("combined")}</option>
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
                    <FormLabel>{t("furnitureType")}</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">{t("select")}</option>
                        <option value="furnished">{t("furnished")}</option>
                        <option value="semi_furnished">{t("semiFurnished")}</option>
                        <option value="unfurnished">{t("unfurnished")}</option>
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
                    <FormLabel>{t("storeroomType")}</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">{t("select")}</option>
                        <option value="internal">{t("internal")}</option>
                        <option value="external">{t("external")}</option>
                        <option value="none">{t("none")}</option>
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
            {t("back")}
          </Button>
          <Button type="submit">{t("nextStep")}</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPropertyStep3;
