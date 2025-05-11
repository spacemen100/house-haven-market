import React from "react";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

const formSchema = z.object({
  listing_type: z.enum(["sale", "rent", "rent_by_day", "lease"], {
    required_error: "You must select an ad type",
  }),
  property_type: z.enum(["house", "apartment", "land", "commercial"], {
    required_error: "You must select a property type",
  }),
});

interface PropertyTypeStepProps {
  onNext: (data: z.infer<typeof formSchema>) => void;
  onBack?: () => void;
}

const PropertyTypeStep: React.FC<PropertyTypeStepProps> = ({ onNext, onBack }) => {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const mappedData = {
      listingType: data.listing_type,
      propertyType: data.property_type,
    };
    onNext(mappedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">{t("listingType")}</h2>
            <p className="text-muted-foreground mt-2">
              {t("selectTransactionType")}
            </p>
          </div>

          <FormField
            control={form.control}
            name="listing_type"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel>{t("listingType")}*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="sale" id="sale" className="peer sr-only" />
                      <Label
                        htmlFor="sale"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">{t("forSale")}</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="rent" id="rent" className="peer sr-only" />
                      <Label
                        htmlFor="rent"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">{t("forRent")}</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="rent_by_day" id="rent_by_day" className="peer sr-only" />
                      <Label
                        htmlFor="rent_by_day"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">{t("dailyRent")}</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="lease" id="lease" className="peer sr-only" />
                      <Label
                        htmlFor="lease"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">{t("commercialLease")}</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="property_type"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel>{t("propertyType")}*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="house" id="house" className="peer sr-only" />
                      <Label
                        htmlFor="house"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">{t("house")}</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="apartment" id="apartment" className="peer sr-only" />
                      <Label
                        htmlFor="apartment"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">{t("apartment")}</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="land" id="land" className="peer sr-only" />
                      <Label
                        htmlFor="land"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">{t("land")}</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="commercial" id="commercial" className="peer sr-only" />
                      <Label
                        htmlFor="commercial"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">{t("commercialProperty")}</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between">
          {onBack && (
            <Button type="button" variant="outline" onClick={onBack}>
              {t("back")}
            </Button>
          )}
          <Button type="submit">{t("next")}</Button>
        </div>
      </form>
    </Form>
  );
};

export default PropertyTypeStep;
