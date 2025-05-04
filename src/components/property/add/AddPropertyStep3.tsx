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
  { id: "has_elevator", label: "Elevator" },
  { id: "has_ventilation", label: "Ventilation" },
  { id: "has_air_conditioning", label: "Air Conditioning" },
  { id: "is_accessible", label: "Accessible" },
  { id: "has_gas", label: "Gas" },
  { id: "has_loggia", label: "Loggia" },
  { id: "has_fireplace", label: "Fireplace" },
  { id: "has_internet", label: "Internet" },
  { id: "has_cable_tv", label: "Cable TV" },
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
  building_material: z.enum(["brick", "concrete", "wood", "combined"]).optional(),
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
      has_dishwasher: false,
      has_gas_stove: false,
      has_electric_kettle: false,
      has_induction_oven: false,
      has_microwave: false,
      has_electric_oven: false,
      has_washing_machine: false,
      has_tv: false,
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
      heating_type: undefined,
      hot_water_type: undefined,
      parking_type: undefined,
      building_material: undefined,
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
            <h2 className="text-2xl font-bold">Amenities and Services</h2>
            <p className="text-muted-foreground mt-2">
              Select the available amenities and nearby facilities
            </p>
          </div>

          {renderCheckboxGroup("Main Amenities", amenities)}

          {renderCheckboxGroup("Kitchen Appliances", kitchenAppliances)}

          {renderCheckboxGroup("Other Appliances", otherAppliances)}

          {renderCheckboxGroup("Security", securityFeatures)}

          {renderCheckboxGroup("Nearby Facilities", nearbyFacilities)}

          {renderCheckboxGroup("Rules", rules)}

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Systems</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="heating_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heating Type</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        value={field.value || ""}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select...</option>
                        <option value="central">Central</option>
                        <option value="electric">Electric</option>
                        <option value="gas">Gas</option>
                        <option value="wood">Wood</option>
                        <option value="solar">Solar</option>
                        <option value="none">None</option>
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
                    <FormLabel>Hot Water Type</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        value={field.value || ""}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select...</option>
                        <option value="central">Central</option>
                        <option value="electric">Electric</option>
                        <option value="gas">Gas</option>
                        <option value="solar">Solar</option>
                        <option value="none">None</option>
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
                    <FormLabel>Parking Type</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        value={field.value || ""}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select...</option>
                        <option value="street">Street</option>
                        <option value="garage">Garage</option>
                        <option value="underground">Underground</option>
                        <option value="none">None</option>
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
                    <FormLabel>Building Material</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        value={field.value || ""}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select...</option>
                        <option value="brick">Brick</option>
                        <option value="concrete">Concrete</option>
                        <option value="wood">Wood</option>
                        <option value="combined">Combined</option>
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
            Back
          </Button>
          <Button type="submit">Next Step</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPropertyStep3;
