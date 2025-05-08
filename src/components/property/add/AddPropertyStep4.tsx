import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Images, MapPin } from "lucide-react";
import { CreatePropertyInput } from "@/lib/api/properties";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import LocationMap from "./LocationMap";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { GEORGIAN_CITIES, GeorgianCity } from "@/data/georgianCities";
import { getDistrictsForCity } from "@/data/georgianDistricts";
import { getStreetsForDistrict } from "@/data/georgianStreets";

const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const addressSchema = z.object({
  addressStreet: z.string().optional(),
  addressCity: z.string().min(1, "La ville est requise"),
  addressDistrict: z.string().optional(),
  lat: z.number().default(41.7151),
  lng: z.number().default(44.8271),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface AddPropertyStep4Props {
  onBack: () => void;
  formData: Partial<CreatePropertyInput>;
  isSubmitting: boolean;
  onSubmit: () => void;
}

const AddPropertyStep4 = ({
  onBack,
  formData,
  isSubmitting,
  onSubmit
}: AddPropertyStep4Props) => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [availableStreets, setAvailableStreets] = useState<string[]>([]);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressStreet: formData.address_street || "",
      addressCity: formData.address_city || "",
      addressDistrict: formData.address_district || "",
      lat: formData.lat || 41.7151,
      lng: formData.lng || 44.8271,
    },
  });

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

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Type de fichier non supporté. Utilisez JPG, PNG ou WebP.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "L'image ne doit pas dépasser 5MB.";
    }
    return null;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      if (images.length + filesArray.length > MAX_IMAGES) {
        toast.error(`Vous ne pouvez pas ajouter plus de ${MAX_IMAGES} images.`);
        return;
      }

      const validFiles: File[] = [];
      const validPreviewUrls: string[] = [];

      filesArray.forEach(file => {
        const error = validateFile(file);
        if (error) {
          toast.error(error);
        } else {
          validFiles.push(file);
          validPreviewUrls.push(URL.createObjectURL(file));
        }
      });

      setImages([...images, ...validFiles]);
      setPreviewUrls([...previewUrls, ...validPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    const newPreviewUrls = [...previewUrls];
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);

    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    form.setValue("lat", lat);
    form.setValue("lng", lng);
  };

  const handleSubmit = (data: AddressFormValues) => {
    Object.assign(formData, {
      images,
      address_street: data.addressStreet,
      address_city: data.addressCity,
      address_district: data.addressDistrict,
      lat: data.lat,
      lng: data.lng
    });

    onSubmit();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">Localisation et photos</h2>
          <p className="text-muted-foreground mt-2">
            Ajoutez la localisation exacte et les photos de votre propriété
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Localisation</h3>

            <div className="mb-6">
              <FormLabel>Property Location</FormLabel>
              <LocationMap
                initialLat={form.getValues("lat")}
                initialLng={form.getValues("lng")}
                onLocationSelect={handleLocationSelect}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="addressCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ville*</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Sélectionnez une ville</option>
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
                    <FormLabel>Quartier</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={!selectedCity}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Sélectionnez un quartier</option>
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
                    <FormLabel>Rue</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={!selectedDistrict}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Sélectionnez une rue</option>
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

            <div className="mt-4">
              <Label>Notes sur la localisation</Label>
              <Textarea
                placeholder="Instructions pour trouver la propriété, points de repère..."
                className="min-h-24"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Photos de la propriété</h3>
              <span className="text-sm text-muted-foreground">
                {images.length}/{MAX_IMAGES} images
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById('images')?.click()}
                  disabled={images.length >= MAX_IMAGES}
                >
                  <Images className="mr-2 h-4 w-4" />
                  Ajouter des photos
                </Button>
                <Input
                  id="images"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={images.length >= MAX_IMAGES}
                />
              </div>

              {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={url}
                        alt={`Photo de la propriété ${index + 1}`}
                        className="h-full w-full object-cover rounded-md cursor-pointer"
                        onClick={() => {
                          setPreviewImage(url);
                          setPreviewDialogOpen(true);
                        }}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Retour
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || images.length === 0}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publication...
              </>
            ) : (
              "Publier l'annonce"
            )}
          </Button>
        </div>

        <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Aperçu de l'image</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
              <img src={previewImage} alt="Aperçu" className="max-h-[70vh] object-contain" />
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};

export default AddPropertyStep4;
