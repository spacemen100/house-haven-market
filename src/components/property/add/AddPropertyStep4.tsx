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
import { FRENCH_CITIES, FrenchCity } from "@/data/FrenchCities";
import { getDistrictsForCity } from "@/data/FrenchDistricts";
import { getStreetsForDistrict } from "@/data/georgianStreets";
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/LanguageContext';

const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const addressSchema = z.object({
  addressStreet: z.string().optional(),
  addressCity: z.string().min(1, "City is required"),
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
  const { t } = useTranslation();
  const { language } = useLanguage();

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

  // Helper function to get translated city name
  const getTranslatedCityName = (city: string) => {
    return t(`cities.${city}`, { defaultValue: city });
  };

  // Helper function to get translated district name
  const getTranslatedDistrictName = (district: string) => {
    return t(`districts.${district}`, { defaultValue: district });
  };

  // Helper function to get translated street name
  const getTranslatedStreetName = (street: string) => {
    return t(`streets.${street}`, { defaultValue: street });
  };

  useEffect(() => {
    if (selectedCity) {
      const districts = getDistrictsForCity(selectedCity as FrenchCity);
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
        selectedCity as FrenchCity,
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
      return t('errors.unsupportedFileType');
    }
    if (file.size > MAX_FILE_SIZE) {
      return t('errors.fileSizeExceeded');
    }
    return null;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      if (images.length + filesArray.length > MAX_IMAGES) {
        toast.error(t('errors.maxImagesExceeded', { max: MAX_IMAGES }));
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
          <h2 className="text-2xl font-bold">{t('propertyWizard.step4.title')}</h2>
          <p className="text-muted-foreground mt-2">
            {t('propertyWizard.step4.subtitle')}
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{t('propertyWizard.step4.locationTitle')}</h3>

            <div className="mb-6">
              <FormLabel>{t('propertyWizard.step4.propertyLocation')}</FormLabel>
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
                    <FormLabel>{t('propertyWizard.step4.city')}*</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">{t('propertyWizard.step4.selectCity')}</option>
                        {FRENCH_CITIES.map((city) => (
                          <option key={city} value={city}>
                            {getTranslatedCityName(city)}
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
                    <FormLabel>{t('propertyWizard.step4.district')}</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={!selectedCity}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">{t('propertyWizard.step4.selectDistrict')}</option>
                        {availableDistricts.map((district) => (
                          <option key={district} value={district}>
                            {getTranslatedDistrictName(district)}
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
                    <FormLabel>{t('propertyWizard.step4.street')}</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={!selectedDistrict}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">{t('propertyWizard.step4.selectStreet')}</option>
                        {availableStreets.map((street) => (
                          <option key={street} value={street}>
                            {getTranslatedStreetName(street)}
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
              <Label>{t('propertyWizard.step4.locationNotes')}</Label>
              <Textarea
                placeholder={t('propertyWizard.step4.locationNotesPlaceholder')}
                className="min-h-24"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">{t('propertyWizard.step4.photosTitle')}</h3>
              <span className="text-sm text-muted-foreground">
                {images.length}/{MAX_IMAGES} {t('propertyWizard.step4.images')}
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
                  {t('propertyWizard.step4.addPhotos')}
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
                        alt={t('propertyWizard.step4.propertyPhotoAlt', { index: index + 1 })}
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
            {t('common.back')}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || images.length === 0}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('propertyWizard.step4.publishing')}
              </>
            ) : (
              t('propertyWizard.step4.publishListing')
            )}
          </Button>
        </div>

        <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>{t('propertyWizard.step4.imagePreview')}</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
              <img src={previewImage} alt={t('propertyWizard.step4.previewAlt')} className="max-h-[70vh] object-contain" />
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};

export default AddPropertyStep4;