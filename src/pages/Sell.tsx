
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Building, DollarSign, HousePlus, Tag, Camera, MapPin, ChevronRight, ChevronLeft, Map, Check, Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

// Define types for the form steps
type ListingType = "sale" | "rent" | "rentByDay";
type PropertyType = "apartment" | "house" | "land" | "commercial";

// Define form schemas for each step
const stepOneSchema = z.object({
  listingType: z.enum(["sale", "rent", "rentByDay"]),
  propertyType: z.enum(["apartment", "house", "land", "commercial"]),
  plan: z.string().optional(),
});

const stepTwoSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Price must be a number",
  }),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
  cadastralCode: z.string().optional(),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  street: z.string().optional(),
  description: z.string().max(3000, "Description must be less than 3000 characters"),
});

const stepThreeSchema = z.object({
  status: z.string().optional(),
  condition: z.string().optional(),
  surfaceArea: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Surface area must be a number",
  }),
  rooms: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Number of rooms must be a number",
  }),
  bedrooms: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Number of bedrooms must be a number",
  }),
  bathrooms: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Number of bathrooms must be a number",
  }),
  hasElevator: z.boolean().optional(),
  hasVentilation: z.boolean().optional(),
  hasAirConditioning: z.boolean().optional(),
  hasInternet: z.boolean().optional(),
  hasCableTV: z.boolean().optional(),
  hasStorage: z.boolean().optional(),
  hasSecurity: z.boolean().optional(),
  isAccessible: z.boolean().optional(),
});

const Sell = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Setup React Hook Form for each step
  const stepOneForm = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      listingType: "sale",
      propertyType: "apartment",
    },
  });

  const stepTwoForm = useForm<z.infer<typeof stepTwoSchema>>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      title: "",
      price: "",
      phoneNumber: "",
      cadastralCode: "",
      city: "",
      district: "",
      street: "",
      description: "",
    },
  });

  const stepThreeForm = useForm<z.infer<typeof stepThreeSchema>>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: {
      status: "",
      condition: "",
      surfaceArea: "",
      rooms: "",
      bedrooms: "",
      bathrooms: "",
      hasElevator: false,
      hasVentilation: false,
      hasAirConditioning: false,
      hasInternet: false,
      hasCableTV: false,
      hasStorage: false,
      hasSecurity: false,
      isAccessible: false,
    },
  });

  // Handle form submissions for each step
  const onStepOneSubmit = (data: z.infer<typeof stepOneSchema>) => {
    setFormData({ ...formData, ...data });
    setStep(2);
  };

  const onStepTwoSubmit = (data: z.infer<typeof stepTwoSchema>) => {
    setFormData({ ...formData, ...data });
    setStep(3);
  };

  const onStepThreeSubmit = (data: z.infer<typeof stepThreeSchema>) => {
    setFormData({ ...formData, ...data });
    setStep(4);
  };

  const onFinalSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Form submitted with data:", formData);
    toast.success("Your listing has been successfully published!");
    
    // Reset the form and go back to step 1
    setFormData({});
    setStep(1);
    stepOneForm.reset();
    stepTwoForm.reset();
    stepThreeForm.reset();
  };

  // Login/Register handler
  const handleAuthentication = (type: 'login' | 'register', e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    toast.success(type === 'login' ? "Successfully logged in!" : "Successfully registered!");
  };

  // Get category text based on property and listing type
  const getCategoryText = () => {
    const propertyType = stepOneForm.watch("propertyType");
    const listingType = stepOneForm.watch("listingType");
    
    let listingText = "";
    switch (listingType) {
      case "sale": listingText = "for sale"; break;
      case "rent": listingText = "for rent"; break;
      case "rentByDay": listingText = "for rent by day"; break;
    }
    
    let propertyText = "";
    switch (propertyType) {
      case "apartment": propertyText = "Apartment"; break;
      case "house": propertyText = "House"; break;
      case "land": propertyText = "Land"; break;
      case "commercial": propertyText = "Commercial building"; break;
    }
    
    return `${propertyText} ${listingText}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="relative py-16 bg-estate-800">
        <div className="container text-center text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
            Post Your Property Listing
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-slate-200">
            Fill out the information below to create your property listing on HouseHaven
          </p>
        </div>
      </section>

      {/* Form Steps Indicator */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <div className="flex justify-between items-center max-w-3xl mx-auto">
            <div className={`flex flex-col items-center ${step >= 1 ? "text-teal-500" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? "bg-teal-500 text-white" : "bg-gray-200"}`}>
                1
              </div>
              <span className="text-sm hidden sm:block">Property Type</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-gray-200">
              <div className={`h-full ${step >= 2 ? "bg-teal-500" : "bg-gray-200"}`} style={{width: step >= 2 ? "100%" : "0%"}}></div>
            </div>
            <div className={`flex flex-col items-center ${step >= 2 ? "text-teal-500" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? "bg-teal-500 text-white" : "bg-gray-200"}`}>
                2
              </div>
              <span className="text-sm hidden sm:block">Basic Info</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-gray-200">
              <div className={`h-full ${step >= 3 ? "bg-teal-500" : "bg-gray-200"}`} style={{width: step >= 3 ? "100%" : "0%"}}></div>
            </div>
            <div className={`flex flex-col items-center ${step >= 3 ? "text-teal-500" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? "bg-teal-500 text-white" : "bg-gray-200"}`}>
                3
              </div>
              <span className="text-sm hidden sm:block">Features</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-gray-200">
              <div className={`h-full ${step >= 4 ? "bg-teal-500" : "bg-gray-200"}`} style={{width: step >= 4 ? "100%" : "0%"}}></div>
            </div>
            <div className={`flex flex-col items-center ${step >= 4 ? "text-teal-500" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 4 ? "bg-teal-500 text-white" : "bg-gray-200"}`}>
                4
              </div>
              <span className="text-sm hidden sm:block">Publish</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-slate-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-md">
              <CardContent className="p-6 md:p-8">
                {step === 1 && (
                  <Form {...stepOneForm}>
                    <form onSubmit={stepOneForm.handleSubmit(onStepOneSubmit)} className="space-y-6">
                      <h2 className="text-2xl font-semibold mb-6">Select Listing Type</h2>

                      <FormField
                        control={stepOneForm.control}
                        name="listingType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Type of Operation</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="sale" id="sale" />
                                  <Label htmlFor="sale">Sell</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="rent" id="rent" />
                                  <Label htmlFor="rent">Rent</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="rentByDay" id="rentByDay" />
                                  <Label htmlFor="rentByDay">Rent by day</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={stepOneForm.control}
                        name="propertyType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Type of Property</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 gap-4"
                              >
                                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-teal-500 transition-colors">
                                  <RadioGroupItem value="apartment" id="apartment" />
                                  <Label htmlFor="apartment" className="flex items-center cursor-pointer">
                                    <Building className="mr-2 h-4 w-4" />
                                    Apartment
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-teal-500 transition-colors">
                                  <RadioGroupItem value="house" id="house" />
                                  <Label htmlFor="house" className="flex items-center cursor-pointer">
                                    <HousePlus className="mr-2 h-4 w-4" />
                                    House
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-teal-500 transition-colors">
                                  <RadioGroupItem value="land" id="land" />
                                  <Label htmlFor="land" className="flex items-center cursor-pointer">
                                    <Map className="mr-2 h-4 w-4" />
                                    Land
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-teal-500 transition-colors">
                                  <RadioGroupItem value="commercial" id="commercial" />
                                  <Label htmlFor="commercial" className="flex items-center cursor-pointer">
                                    <Building className="mr-2 h-4 w-4" />
                                    Commercial building
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={stepOneForm.control}
                        name="plan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Plan (Optional)</FormLabel>
                            <FormControl>
                              <div className="flex flex-col space-y-3">
                                <Input
                                  type="file"
                                  className="cursor-pointer"
                                  accept="application/pdf"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      field.onChange(file.name);
                                    }
                                  }}
                                />
                                <div>
                                  <a href="#" className="text-teal-500 hover:underline text-sm flex items-center">
                                    <Tag className="w-4 h-4 mr-1" />
                                    View Plans Chart
                                  </a>
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-sm font-medium">
                          Category: <span className="text-teal-600">{getCategoryText()}</span>
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <Button type="submit" className="bg-teal-500 hover:bg-teal-600">
                          Continue
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}

                {step === 2 && (
                  <Form {...stepTwoForm}>
                    <form onSubmit={stepTwoForm.handleSubmit(onStepTwoSubmit)} className="space-y-6">
                      <h2 className="text-2xl font-semibold mb-6">Basic Information & Location</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={stepTwoForm.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title*</FormLabel>
                              <FormControl>
                                <Input placeholder="Modern apartment in the heart of the city" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={stepTwoForm.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price*</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input type="number" className="pl-10" placeholder="250000" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={stepTwoForm.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number*</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+1 (555) 000-0000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={stepTwoForm.control}
                          name="cadastralCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cadastral Code (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="123-456-789" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-6 pt-2">
                        <h3 className="text-lg font-medium">Location</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <FormField
                            control={stepTwoForm.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City/Region*</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select city" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="newyork">New York</SelectItem>
                                    <SelectItem value="losangeles">Los Angeles</SelectItem>
                                    <SelectItem value="chicago">Chicago</SelectItem>
                                    <SelectItem value="miami">Miami</SelectItem>
                                    <SelectItem value="seattle">Seattle</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={stepTwoForm.control}
                            name="district"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>District/Village*</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select district" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="downtown">Downtown</SelectItem>
                                    <SelectItem value="uptown">Uptown</SelectItem>
                                    <SelectItem value="midtown">Midtown</SelectItem>
                                    <SelectItem value="westside">Westside</SelectItem>
                                    <SelectItem value="eastside">Eastside</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={stepTwoForm.control}
                            name="street"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Street (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="123 Main St" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="bg-slate-200 rounded-lg p-4 h-64 flex items-center justify-center">
                          <div className="text-center">
                            <MapPin className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Interactive Map</p>
                            <p className="text-xs text-gray-400 mt-1">Move the marker to show exact location</p>
                          </div>
                        </div>

                        <FormField
                          control={stepTwoForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe your property in detail..." 
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <div className="text-xs text-gray-500 mt-1 text-right">
                                {field.value?.length || 0}/3000
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setStep(1)}
                        >
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                        <Button type="submit" className="bg-teal-500 hover:bg-teal-600">
                          Continue
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}

                {step === 3 && (
                  <Form {...stepThreeForm}>
                    <form onSubmit={stepThreeForm.handleSubmit(onStepThreeSubmit)} className="space-y-8">
                      <h2 className="text-2xl font-semibold mb-6">Technical & Additional Features</h2>

                      <div className="space-y-6">
                        <h3 className="text-lg font-medium">General Features</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                          <FormField
                            control={stepThreeForm.control}
                            name="status"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="free">Free</SelectItem>
                                    <SelectItem value="underCaution">Under Caution</SelectItem>
                                    <SelectItem value="underConstruction">Under Construction</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={stepThreeForm.control}
                            name="condition"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Condition</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select condition" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="good">Good Condition</SelectItem>
                                    <SelectItem value="needsRenovation">Needs Renovation</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={stepThreeForm.control}
                            name="surfaceArea"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Surface Area (m²)</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={stepThreeForm.control}
                            name="rooms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Rooms</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={stepThreeForm.control}
                            name="bedrooms"
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
                            control={stepThreeForm.control}
                            name="bathrooms"
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
                        </div>

                        <div className="mt-8 space-y-6">
                          <h3 className="text-lg font-medium">Equipment & Services</h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <FormField
                              control={stepThreeForm.control}
                              name="hasElevator"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
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
                              control={stepThreeForm.control}
                              name="hasVentilation"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                  <FormControl>
                                    <Checkbox 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange} 
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Ventilation</FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={stepThreeForm.control}
                              name="hasAirConditioning"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
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
                              control={stepThreeForm.control}
                              name="hasInternet"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                  <FormControl>
                                    <Checkbox 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange} 
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Internet</FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={stepThreeForm.control}
                              name="hasCableTV"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                  <FormControl>
                                    <Checkbox 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange} 
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Cable TV</FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={stepThreeForm.control}
                              name="hasStorage"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                  <FormControl>
                                    <Checkbox 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange} 
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Storage</FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={stepThreeForm.control}
                              name="hasSecurity"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                  <FormControl>
                                    <Checkbox 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange} 
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Security System</FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={stepThreeForm.control}
                              name="isAccessible"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                  <FormControl>
                                    <Checkbox 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange} 
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Accessible</FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <div className="mt-8">
                          <h3 className="text-lg font-medium mb-4">Media Upload</h3>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                            <div className="flex flex-col items-center justify-center text-center">
                              <Upload className="h-10 w-10 text-gray-400 mb-4" />
                              <p className="text-sm font-medium mb-1">Drag & Drop Files Here or Browse Media</p>
                              <p className="text-xs text-gray-500 mb-4">Please select a Plan at the top of the form to Upload the Media</p>
                              <Button type="button" variant="outline" size="sm">
                                <Camera className="mr-2 h-4 w-4" />
                                Browse Files
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setStep(2)}
                        >
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                        <Button type="submit" className="bg-teal-500 hover:bg-teal-600">
                          Continue
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}

                {step === 4 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-semibold mb-6">Publish Your Listing</h2>
                    
                    {!isAuthenticated ? (
                      <div className="space-y-6">
                        <p className="text-sm text-gray-500">You need to sign in or create an account to publish your listing</p>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Sign In</h3>
                            <form onSubmit={(e) => handleAuthentication('login', e)} className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="your@email.com" required />
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label htmlFor="password">Password</Label>
                                  <a href="#" className="text-sm text-teal-600 hover:underline">
                                    Forgot password?
                                  </a>
                                </div>
                                <Input id="password" type="password" required />
                              </div>
                              <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">
                                <User className="mr-2 h-4 w-4" />
                                Sign In
                              </Button>
                            </form>
                          </div>
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Quick Registration</h3>
                            <form onSubmit={(e) => handleAuthentication('register', e)} className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="regEmail">Email</Label>
                                <Input id="regEmail" type="email" placeholder="your@email.com" required />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="accountType">Account Type</Label>
                                <Select defaultValue="individual">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select account type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="individual">Individual</SelectItem>
                                    <SelectItem value="professional">Professional</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button type="submit" variant="outline" className="w-full">
                                <User className="mr-2 h-4 w-4" />
                                Create Account
                              </Button>
                            </form>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <Check className="h-5 w-5 text-green-500" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-green-800">You're signed in and ready to publish</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-6">
                          <h3 className="text-lg font-medium mb-4">Listing Summary</h3>
                          
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="font-medium">Category:</div>
                              <div>{getCategoryText()}</div>
                              
                              <div className="font-medium">Title:</div>
                              <div>{stepTwoForm.getValues("title")}</div>
                              
                              <div className="font-medium">Price:</div>
                              <div>${stepTwoForm.getValues("price")}</div>
                              
                              <div className="font-medium">Location:</div>
                              <div>{`${stepTwoForm.getValues("city")}, ${stepTwoForm.getValues("district")}`}</div>
                              
                              <div className="font-medium">Size:</div>
                              <div>{`${stepThreeForm.getValues("surfaceArea")} m² | ${stepThreeForm.getValues("rooms")} rooms | ${stepThreeForm.getValues("bedrooms")} bedrooms`}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                          <p className="text-yellow-800">
                            By clicking "Post Ad", you agree to our Terms of Service and confirm that your listing complies with our policies.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setStep(3)}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button 
                        type="button" 
                        className="bg-teal-500 hover:bg-teal-600"
                        disabled={!isAuthenticated}
                        onClick={onFinalSubmit}
                      >
                        POST AN AD
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sell;
