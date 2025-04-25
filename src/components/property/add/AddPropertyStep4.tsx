
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Gallery } from "lucide-react";
import { CreatePropertyInput } from "@/lib/api/properties";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface AddPropertyStep4Props {
  onBack: () => void;
  formData: Partial<CreatePropertyInput>;
  isSubmitting: boolean;
  onSubmit: () => void;
}

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const AddPropertyStep4 = ({ onBack, formData, isSubmitting, onSubmit }: AddPropertyStep4Props) => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

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

      // Validate each file
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

  const handleSubmit = () => {
    if (images.length > 0) {
      Object.assign(formData, { images });
    }
    onSubmit();
  };

  const openPreview = (imageUrl: string) => {
    setPreviewImage(imageUrl);
    setPreviewDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold">Dernières étapes</h2>
        <p className="text-muted-foreground mt-2">
          Téléchargez jusqu'à 5 photos et vérifiez votre annonce
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
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
              <Gallery className="mr-2 h-4 w-4" />
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
                    onClick={() => openPreview(url)}
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

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Review Your Listing</h3>
        
        <div className="bg-slate-100 rounded-md p-4 space-y-4">
          <div>
            <h4 className="font-medium">Property Type</h4>
            <p className="capitalize">{formData.propertyType}</p>
          </div>
          
          <div>
            <h4 className="font-medium">Listing Type</h4>
            <p className="capitalize">{formData.listingType === 'rent_by_day' ? 'Rent by Day' : formData.listingType}</p>
          </div>
          
          {formData.title && (
            <div>
              <h4 className="font-medium">Title</h4>
              <p>{formData.title}</p>
            </div>
          )}
          
          {formData.price !== undefined && (
            <div>
              <h4 className="font-medium">Price</h4>
              <p>${formData.price.toLocaleString()}</p>
            </div>
          )}
          
          <div className="grid grid-cols-3 gap-4">
            {formData.beds !== undefined && (
              <div>
                <h4 className="font-medium">Beds</h4>
                <p>{formData.beds}</p>
              </div>
            )}
            
            {formData.baths !== undefined && (
              <div>
                <h4 className="font-medium">Baths</h4>
                <p>{formData.baths}</p>
              </div>
            )}
            
            {formData.sqft !== undefined && (
              <div>
                <h4 className="font-medium">Area</h4>
                <p>{formData.sqft} sqft</p>
              </div>
            )}
          </div>
          
          {formData.addressCity && (
            <div>
              <h4 className="font-medium">Location</h4>
              <p>{[formData.addressStreet, formData.addressCity, formData.addressDistrict].filter(Boolean).join(", ")}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          type="button" 
          onClick={handleSubmit} 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing...
            </>
          ) : (
            "Publish Listing"
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
    </div>
  );
};

export default AddPropertyStep4;
