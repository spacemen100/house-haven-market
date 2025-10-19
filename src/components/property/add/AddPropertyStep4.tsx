import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Images } from "lucide-react";
import { CreatePropertyInput } from "@/lib/api/properties";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import LocationMap from "./LocationMap";
import { Textarea } from "@/components/ui/textarea";
import Autocomplete from "@/components/Autocomplete";
import { Form, FormLabel } from "@/components/ui/form";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGES = 10;

const addressSchema = z.object({
  address: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface AddPropertyStep4Props {
  onBack: () => void;
  initialData: Partial<CreatePropertyInput>;
  isSubmitting: boolean;
  onNext: (data: Partial<CreatePropertyInput> & { existingImageUrls: string[]; removedImageUrls: string[] }) => void;
  submitLabel?: string;
  submittingLabel?: string;
  requireImage?: boolean;
  requireAddress?: boolean;
}

const AddPropertyStep4 = ({
  onBack,
  initialData,
  isSubmitting,
  onNext,
  submitLabel = "Publier l'annonce",
  submittingLabel = "Publication...",
  requireImage = true,
  requireAddress = true,
}: AddPropertyStep4Props) => {
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [removedImageUrls, setRemovedImageUrls] = useState<string[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [locationNotes, setLocationNotes] = useState<string>((initialData as any).address_state || "");
  const [isDragging, setIsDragging] = useState(false);
  const [showLongPressHint, setShowLongPressHint] = useState(true);

  const totalImages = existingImageUrls.length + newImageFiles.length;

  useEffect(() => {
    const imgs = (initialData?.images as any) || null;
    if (imgs) {
      const urls = Array.isArray(imgs) ? imgs : typeof imgs === "string" ? [imgs] : [];
      if (urls.length > 0) {
        setExistingImageUrls(urls as string[]);
        setPreviewUrls(urls as string[]);
      }
    }
  }, [initialData]);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: initialData.address_street
        ? `${initialData.address_street}, ${initialData.address_district || ""}, ${initialData.address_city || ""}`
        : "",
      lat: initialData.lat || 45.764043,
      lng: initialData.lng || 4.835659,
    },
  });

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (place.geometry && place.geometry.location) {
      form.setValue("lat", place.geometry.location.lat());
      form.setValue("lng", place.geometry.location.lng());
    }
    if (place.address_components) {
      const address = {
        street: "",
        city: "",
        district: "",
      } as any;
      place.address_components.forEach((component) => {
        if ((component.types || []).includes("route")) address.street = component.long_name;
        if ((component.types || []).includes("locality")) address.city = component.long_name;
        if ((component.types || []).includes("sublocality_level_1")) address.district = component.long_name;
      });
      form.setValue("address", `${address.street}, ${address.district}, ${address.city}`);
      Object.assign(initialData, {
        address_street: address.street,
        address_city: address.city,
        address_district: address.district,
      });
    }
  };

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Type de fichier non pris en charge.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "La taille du fichier dÃ©passe la limite de 5 Mo.";
    }
    return null;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (existingImageUrls.length + newImageFiles.length + filesArray.length > MAX_IMAGES) {
        toast.error(`Vous ne pouvez pas tÃ©lÃ©charger plus de ${MAX_IMAGES} images.`);
        return;
      }
      const validFiles: File[] = [];
      const newPreviews: string[] = [];
      filesArray.forEach((file) => {
        const err = validateFile(file);
        if (err) toast.error(err);
        else {
          validFiles.push(file);
          newPreviews.push(URL.createObjectURL(file));
        }
      });
      setNewImageFiles((prev) => [...prev, ...validFiles]);
      setPreviewUrls((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    if (index < existingImageUrls.length) {
      const toRemove = existingImageUrls[index];
      setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
      setRemovedImageUrls((prev) => [...prev, toRemove]);
      setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingImageUrls.length;
      setNewImageFiles((prev) => prev.filter((_, i) => i !== newIndex));
      setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleLocationSelect = (coords: { lat: number; lng: number }) => {
    form.setValue("lat", coords.lat);
    form.setValue("lng", coords.lng);
  };

  const handleSubmit = (data: AddressFormValues) => {
    const updatedData = {
      lat: data.lat,
      lng: data.lng,
      address_street: initialData.address_street,
      address_city: initialData.address_city,
      address_district: initialData.address_district,
      address_state: locationNotes,
      images: newImageFiles,
      existingImageUrls: existingImageUrls,
      removedImageUrls: removedImageUrls,
    } as Partial<CreatePropertyInput> & { existingImageUrls: string[]; removedImageUrls: string[] };
    onNext(updatedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">{"Localisation et Photos"}</h2>
          <p className="text-muted-foreground mt-2">
            {"DerniÃ¨re Ã©tape ! Ajoutez la localisation de votre propriÃ©tÃ© et quelques photos."}
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{"Localisation de la propriÃ©tÃ©"}</h3>

            <div className="mb-6">
              <FormLabel>{"Localisation sur la carte"}</FormLabel>
              <div className="relative">
                <LocationMap
                  initialLat={form.getValues("lat")}
                  initialLng={form.getValues("lng")}
                  onLocationSelect={handleLocationSelect}
                  onReverseGeocode={(info) => {
                    if (info?.address) {
                      const a = info.address as any;
                      form.setValue('address', a.formatted || [a.street, a.district, a.city].filter(Boolean).join(', '));
                      Object.assign(initialData, {
                        address_street: a.street,
                        address_city: a.city,
                        address_district: a.district,
                        address_state: (initialData as any).address_state || locationNotes,
                        address_zip: a.zip,
                      });
                    }
                  }}
                  onDragStateChange={(d) => setIsDragging(d)}
                  onLongPress={() => setShowLongPressHint(false)}
                />
                {isDragging && (
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
                    {form.watch('address') || 'Déplacement...'}
                  </div>
                )}
                {showLongPressHint && (
                  <div className="absolute bottom-2 left-2 bg-white/90 text-estate-800 text-xs px-2 py-1 rounded shadow z-10">
                    Astuce mobile: appui long pour déplacer le marqueur
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4">
              <Autocomplete
                label={"Adresse"}
                placeholder={"Entrez l'adresse de la propriÃ©tÃ©"}
                value={form.watch("address") || ""}
                onChange={(value) => form.setValue("address", value)}
                onPlaceChanged={(place) => {
                  const description = place?.formatted_address || place?.formattedAddress || place?.displayName || "";
                  if (description) form.setValue("address", description);
                  handlePlaceSelect(place);
                }}
              />
            </div>

            <div className="mt-4">
              <Label>{"Notes de localisation"}</Label>
              <Textarea
                value={locationNotes}
                onChange={(e) => setLocationNotes(e.target.value)}
                placeholder={"Notes sur la localisation (repÃ¨res, accÃ¨s, etc.)"}
                className="min-h-24"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">{"Photos de la propriÃ©tÃ©"}</h3>
              <span className="text-sm text-muted-foreground">{totalImages}/{MAX_IMAGES} {"images"}</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button type="button" variant="outline" className="w-full" onClick={() => document.getElementById("images")?.click()} disabled={totalImages >= MAX_IMAGES}>
                  <Images className="mr-2 h-4 w-4" /> {"Ajouter des photos"}
                </Button>
                <Input id="images" type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={handleImageChange} disabled={totalImages >= MAX_IMAGES} />
              </div>

              {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img src={url} alt={`Photo de la propriÃ©tÃ© ${index + 1}`} className="h-full w-full object-cover rounded-md cursor-pointer" onClick={() => { setPreviewImage(url); setPreviewDialogOpen(true); }} />
                      <Button type="button" variant="destructive" size="sm" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeImage(index)}>
                        âœ•
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>{"Retour"}</Button>
          <Button type="submit" disabled={isSubmitting || (requireImage && totalImages === 0)}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {submittingLabel}
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </div>

        <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>{"AperÃ§u de l'image"}</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
              <img src={previewImage} alt={"AperÃ§u de l'image"} className="max-h-[70vh] object-contain" />
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};

export default AddPropertyStep4;
