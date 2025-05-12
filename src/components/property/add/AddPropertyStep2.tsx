import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useTranslation } from "react-i18next";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  currency: z.enum(["GEL", "USD", "EUR"], {
    required_error: "Please select a currency",
  }),
  beds: z.coerce.number().int().min(0, "Beds must be 0 or more"),
  baths: z.coerce.number().int().min(0, "Baths must be 0 or more"),
  m2: z.coerce.number().positive("Area must be a positive number"),
  yearBuilt: z.coerce.number().int().min(1800, "Year must be 1800 or later").max(new Date().getFullYear(), "Year cannot be in the future"),
  cadastral_code: z.string().optional(),
  condition: z.enum(["newly_renovated", "under_renovation", "white_frame", "green_frame", "not_renovated", "black_frame", "old_renovation"]),
  status: z.enum(["available", "pending", "sold", "new_building_under_construction", "old_building"]).default("available"),
  kitchen_type: z.enum(["isolated", "outside", "studio"]).optional(),
  ceiling_height: z.coerce.number().min(2, "Ceiling height must be at least 2 meters").max(7, "Ceiling height must be at most 7 meters").optional(),
  terrace_area: z.coerce.number().optional(),
  floor_level: z.coerce.number().optional(),
  total_floors: z.coerce.number().optional(),
  featured: z.boolean().default(false),
  rooms: z.coerce.number().int().min(0, "Rooms must be 0 or more"),
});

type FormValues = z.infer<typeof formSchema>;

interface AddPropertyStep2Props {
  onBack: () => void;
  onNext: (data: FormValues) => void;
  initialValues?: Partial<FormValues>;
}

const AddPropertyStep2 = ({ onBack, onNext, initialValues }: AddPropertyStep2Props) => {
  const { t } = useTranslation();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      currency: "GEL",
      beds: 0,
      baths: 0,
      m2: 0,
      yearBuilt: new Date().getFullYear(),
      cadastral_code: "",
      condition: "newly_renovated",
      status: "available",
      kitchen_type: undefined,
      ceiling_height: undefined,
      terrace_area: undefined,
      floor_level: undefined,
      total_floors: undefined,
      featured: false,
      rooms: 0,
      ...initialValues,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      console.log('Form data submitted:', data);
      const mappedData = {
        title: data.title,
        description: data.description,
        price: data.price,
        currency: data.currency,
        beds: data.beds,
        baths: data.baths,
        m2: data.m2,
        year_built: data.yearBuilt,
        cadastral_code: data.cadastral_code,
        condition: data.condition,
        status: data.status,
        kitchen_type: data.kitchen_type,
        ceiling_height: data.ceiling_height,
        terrace_area: data.terrace_area,
        floor_level: data.floor_level,
        total_floors: data.total_floors,
        featured: data.featured,
        rooms: data.rooms,
      };
      console.log('Mapped data:', mappedData);
      onNext(mappedData);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">{t("basicInformation")}</h2>
            <p className="text-muted-foreground mt-2">
              {t("provideEssentialDetails")}
            </p>
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("propertyTitle")}*</FormLabel>
                <FormControl>
                  <Input placeholder={t("propertyTitlePlaceholder")} {...field} />
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
                <FormLabel>{t("propertyDescription")}*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("describeYourProperty")}
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
                  <FormLabel>{t("price")}*</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t("enterPrice")}
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
                  <FormLabel>{t("currency")}*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectCurrency")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GEL">{t("georgianLari")}</SelectItem>
                      <SelectItem value="USD">{t("usDollar")}</SelectItem>
                      <SelectItem value="EUR">{t("euro")}</SelectItem>
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
                  <FormLabel>{t("yearBuilt")}*</FormLabel>
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
                  <FormLabel>{t("cadastralCode")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("cadastralCodeOptional")} {...field} />
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
                  <FormLabel>{t("bedrooms")}</FormLabel>
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
                  <FormLabel>{t("bathrooms")}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="m2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("area")}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("numberOfRooms")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={t("enterNumberOfRooms")}
                      {...field}
                    />
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
                  <FormLabel>{t("propertyCondition")}*</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectCondition")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="newly_renovated">{t("newlyRenovated")}</SelectItem>
                      <SelectItem value="under_renovation">{t("underRenovation")}</SelectItem>
                      <SelectItem value="white_frame">{t("whiteFrame")}</SelectItem>
                      <SelectItem value="green_frame">{t("greenFrame")}</SelectItem>
                      <SelectItem value="not_renovated">{t("notRenovated")}</SelectItem>
                      <SelectItem value="black_frame">{t("blackFrame")}</SelectItem>
                      <SelectItem value="old_renovation">{t("oldRenovation")}</SelectItem>
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
                  <FormLabel>{t("propertyStatus")}*</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectStatus")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="available">{t("available")}</SelectItem>
                      <SelectItem value="pending">{t("pending")}</SelectItem>
                      <SelectItem value="sold">{t("sold")}</SelectItem>
                      <SelectItem value="new_building_under_construction">{t("newBuildingUnderConstruction")}</SelectItem>
                      <SelectItem value="old_building">{t("oldBuilding")}</SelectItem>
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
                  <FormLabel>{t("kitchenType")}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectKitchenType")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="isolated">{t("isolated")}</SelectItem>
                      <SelectItem value="outside">{t("outside")}</SelectItem>
                      <SelectItem value="studio">{t("studio")}</SelectItem>
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
                  <FormLabel>{t("ceilingHeight")}</FormLabel>
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
                            message: t("ceilingHeightError"),
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

            <FormField
              control={form.control}
              name="terrace_area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("terraceArea")}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="floor_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("floorLevel")}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="total_floors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("totalFloors")}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>{t("featured")}</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default AddPropertyStep2;
