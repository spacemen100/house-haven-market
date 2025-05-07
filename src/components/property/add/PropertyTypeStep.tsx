import React from "react";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  listing_type: z.enum(["sell", "rent", "rent_by_day", "leasing"], {
    required_error: "You must select a listing type",
  }),
  property_type: z.enum([
    "house_construction",
    "apartment",
    "house_cottage",
    "commercial",
    "land"
  ], {
    required_error: "You must select a property type",
  }),
});

interface PropertyTypeStepProps {
  onNext: (data: z.infer<typeof formSchema>) => void;
  onBack?: () => void;
}

const PropertyTypeStep: React.FC<PropertyTypeStepProps> = ({ onNext, onBack }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">Listing Type</h2>
            <p className="text-muted-foreground mt-2">
              Select the transaction type and property type
            </p>
          </div>

          <FormField
            control={form.control}
            name="listing_type"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel>Listing Type*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="sell" id="sell" className="peer sr-only" />
                      <Label
                        htmlFor="sell"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">Sell</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="rent" id="rent" className="peer sr-only" />
                      <Label
                        htmlFor="rent"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">Rent</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="rent_by_day" id="rent_by_day" className="peer sr-only" />
                      <Label
                        htmlFor="rent_by_day"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">Daily Rent</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="leasing" id="leasing" className="peer sr-only" />
                      <Label
                        htmlFor="leasing"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">Leasing</span>
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
                <FormLabel>Property Type*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="house_construction" id="house_construction" className="peer sr-only" />
                      <Label
                        htmlFor="house_construction"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">House, Construction and Renovation</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="apartment" id="apartment" className="peer sr-only" />
                      <Label
                        htmlFor="apartment"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">Apartment</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="house_cottage" id="house_cottage" className="peer sr-only" />
                      <Label
                        htmlFor="house_cottage"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">House and Cottage</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="commercial" id="commercial" className="peer sr-only" />
                      <Label
                        htmlFor="commercial"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">Commercial Real Estate</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="land" id="land" className="peer sr-only" />
                      <Label
                        htmlFor="land"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">Land</span>
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
              Back
            </Button>
          )}
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
};

export default PropertyTypeStep;