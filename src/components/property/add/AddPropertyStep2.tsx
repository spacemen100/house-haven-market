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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  currency: z.enum(["GEL", "USD", "EUR"], {
    required_error: "Please select a currency",
  }),
  beds: z.coerce.number().int().min(0, "Beds must be 0 or more"),
  baths: z.coerce.number().int().min(0, "Baths must be 0 or more"),
  sqft: z.coerce.number().positive("Area must be a positive number"),
  yearBuilt: z.coerce.number().int().min(1800, "Year must be 1800 or later").max(new Date().getFullYear(), "Year cannot be in the future"),
  cadastral_code: z.string().optional(),
  condition: z.enum(["newly_renovated", "under_renovation", "white_frame", "green_frame", "not_renovated", "black_frame", "old_renovation"]),
  status: z.enum(["available", "pending", "sold", "new_building_under_construction", "old_building"]).default("available"),
  kitchen_type: z.enum(["isolated", "outside", "studio"]).optional(),
  ceiling_height: z.coerce.number().min(2, "Ceiling height must be at least 2 meters").max(7, "Ceiling height must be at most 7 meters").optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddPropertyStep2Props {
  onBack: () => void;
  onNext: (data: FormValues) => void;
  initialValues?: Partial<FormValues>;
}

const AddPropertyStep2 = ({ onBack, onNext, initialValues }: AddPropertyStep2Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      currency: "GEL",
      beds: 0,
      baths: 0,
      sqft: 0,
      yearBuilt: new Date().getFullYear(),
      cadastral_code: "",
      condition: "newly_renovated",
      status: "available",
      kitchen_type: undefined,
      ceiling_height: undefined,
      ...initialValues,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      console.log('Data before submit:', data);
      
      // Correction ici - envoyer toutes les données du formulaire
      onNext(data);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">Basic Information</h2>
            <p className="text-muted-foreground mt-2">
              Provide essential details about your property
            </p>
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Title*</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Modern 3 Bedroom House with Garden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Description*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your property in detail..."
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price*</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        {...field}
                      />
                    </FormControl>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                      {form.watch("currency")}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GEL">Georgian Lari (₾)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="yearBuilt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Built*</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cadastral_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cadastral Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Cadastral code (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="beds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bedrooms</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="baths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bathrooms</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sqft"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area (m²)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Condition*</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="newly_renovated">Newly Renovated</SelectItem>
                      <SelectItem value="under_renovation">Under Renovation</SelectItem>
                      <SelectItem value="white_frame">White Frame</SelectItem>
                      <SelectItem value="green_frame">Green Frame</SelectItem>
                      <SelectItem value="not_renovated">Not Renovated</SelectItem>
                      <SelectItem value="black_frame">Black Frame</SelectItem>
                      <SelectItem value="old_renovation">Old Renovation</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Status*</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="sold">Sold/Rented</SelectItem>
                      <SelectItem value="new_building_under_construction">New Building Under Construction</SelectItem>
                      <SelectItem value="old_building">Old Building</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kitchen_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kitchen Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select kitchen type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="isolated">Isolated</SelectItem>
                      <SelectItem value="outside">Outside</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ceiling_height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ceiling Height (m)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.05"
                      min="2"
                      max="7"
                      placeholder="e.g. 2.75"
                      {...field}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value < 2 || value > 7) {
                          form.setError("ceiling_height", {
                            type: "manual",
                            message: "Ceiling height must be between 2 and 7 meters.",
                          });
                        } else {
                          form.clearErrors("ceiling_height");
                        }
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
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

export default AddPropertyStep2;