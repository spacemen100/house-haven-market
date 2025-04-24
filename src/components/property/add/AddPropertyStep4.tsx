
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { CreatePropertyInput } from "@/lib/api/properties";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AddPropertyStep4Props {
  onBack: () => void;
  formData: Partial<CreatePropertyInput>;
  isSubmitting: boolean;
  onSubmit: () => void;
}

const AddPropertyStep4 = ({ onBack, formData, isSubmitting, onSubmit }: AddPropertyStep4Props) => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      // Store the files for submission
      setImages([...images, ...filesArray]);
      
      // Create preview URLs
      const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    // Remove from preview
    URL.revokeObjectURL(previewUrls[index]);
    const newPreviewUrls = [...previewUrls];
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
    
    // Remove from files array
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = () => {
    // Add the images to the form data before submitting
    if (images.length > 0) {
      // In a real implementation, we would need to handle the file uploads
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
        <h2 className="text-2xl font-bold">Final Steps</h2>
        <p className="text-muted-foreground mt-2">
          Upload photos and review your listing
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium">Upload Photos</h3>
        <div className="space-y-4">
          <Label htmlFor="images">Property Images</Label>
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          
          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Property image ${index + 1}`}
                    className="h-24 w-full object-cover rounded-md cursor-pointer"
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
            <DialogTitle>Property Image</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <img src={previewImage} alt="Property preview" className="max-h-[70vh] object-contain" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPropertyStep4;
