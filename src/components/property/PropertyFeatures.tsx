
import { Property } from "@/types/property";
import { Check } from "lucide-react";

interface PropertyFeaturesProps {
  property: Property;
}

const PropertyFeatures = ({ property }: PropertyFeaturesProps) => {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-estate-800 mb-4">Description</h2>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-estate-neutral-100">
          <p className="text-estate-neutral-700 leading-relaxed">
            {property.description}
          </p>
        </div>
      </div>
      
      {property.amenities && property.amenities.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-estate-800 mb-4">Amenities</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-estate-neutral-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check size={18} className="text-teal-500" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyFeatures;
