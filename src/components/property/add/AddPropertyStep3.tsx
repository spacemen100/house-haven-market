import React, { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import LocationMap from "./LocationMap";
import { GEORGIAN_CITIES, GeorgianCity } from "@/data/georgianCities";
import { getDistrictsForCity } from "@/data/georgianDistricts";
import { getStreetsForDistrict } from "@/data/georgianStreets";

const formSchema = z.object({
  addressStreet: z.string().optional(),
  addressCity: z.string().min(2, "City is required"),
  addressDistrict: z.string().optional(),
  lat: z.number().default(41.7151),
  lng: z.number().default(44.8271),
  hasElevator: z.boolean().default(false),
  hasVentilation: z.boolean().default(false),
  hasAirConditioning: z.boolean().default(false),
  isAccessible: z.boolean().default(false),
  amenities: z.array(z.string()).default([]),
});

type FormValues = z.infer<typeof formSchema>;

interface AddPropertyStep3Props {
  onBack: () => void;
  onNext: (data: FormValues) => void;
}

const AddPropertyStep3 = ({ onBack, onNext }: AddPropertyStep3Props) => {
  const amenitiesOptions = [
    { id: "swimming_pool", label: "Swimming Pool" },
    { id: "garden", label: "Garden" },
    { id: "gym", label: "Gym" },
    { id: "parking", label: "Parking" },
    { id: "security", label: "Security System" },
    { id: "balcony", label: "Balcony" },
    { id: "terrace", label: "Terrace" },
    { id: "storage", label: "Storage" },
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addressStreet: "",
      addressCity: "",
      addressDistrict: "",
      lat: 41.7151,
      lng: 44.8271,
      hasElevator: false,
      hasVentilation: false,
      hasAirConditioning: false,
      isAccessible: false,
      amenities: [],
    },
  });

  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [availableStreets, setAvailableStreets] = useState<string[]>([]);
  
  const selectedCity = form.watch("addressCity");
  const selectedDistrict = form.watch("addressDistrict");

  useEffect(() => {
    if (selectedCity) {
      const districts = getDistrictsForCity(selectedCity as GeorgianCity);
      setAvailableDistricts(districts);
      if (!districts.includes(form.getValues("addressDistrict"))) {
        form.setValue("addressDistrict", "");
        form.setValue("addressStreet", "");
      }
    } else {
      setAvailableDistricts([]);
      form.setValue("addressDistrict", "");
      form.setValue("addressStreet", "");
    }
  }, [selectedCity, form]);

  useEffect(() => {
    if (selectedCity && selectedDistrict) {
      const streets = getStreetsForDistrict(
        selectedCity as GeorgianCity,
        selectedDistrict
      );
      setAvailableStreets(streets);
      if (!streets.includes(form.getValues("addressStreet"))) {
        form.setValue("addressStreet", "");
      }
    } else {
      setAvailableStreets([]);
      form.setValue("addressStreet", "");
    }
  }, [selectedCity, selectedDistrict, form]);

  const onSubmit = (data: FormValues) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">Features & Location</h2>
            <p className="text-muted-foreground mt-2">
              Add additional details about your property
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Location</h3>
            
            <div className="mb-6">
              <FormLabel>Property Location</FormLabel>
              <LocationMap
                initialLat={form.getValues("lat")}
                initialLng={form.getValues("lng")}
                onLocationSelect={(lat, lng) => {
                  form.setValue("lat", lat);
                  form.setValue("lng", lng);
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="addressCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City*</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select a city</option>
                        {GEORGIAN_CITIES.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="addressDistrict"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District/Neighborhood</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={!selectedCity}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select a district</option>
                        {availableDistricts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="addressStreet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={!selectedDistrict}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select a street</option>
                        {availableStreets.map((street) => (
                          <option key={street} value={street}>
                            {street}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Features</h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hasElevator"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Elevator</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasVentilation"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Ventilation System</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasAirConditioning"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Air Conditioning</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isAccessible"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Wheelchair Accessible</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Amenities</h3>
            <FormField
              control={form.control}
              name="amenities"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-2 gap-4">
                    {amenitiesOptions.map((amenity) => (
                      <FormField
                        key={amenity.id}
                        control={form.control}
                        name="amenities"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={amenity.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(amenity.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, amenity.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== amenity.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {amenity.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
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