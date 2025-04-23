
import { Property } from "@/types/property";
import { MapPin, Bed, Bath, Square, Calendar } from "lucide-react";

interface PropertySpecsProps {
  property: Property;
}

const PropertySpecs = ({ property }: PropertySpecsProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center text-estate-neutral-600 mb-4">
        <MapPin size={18} className="mr-2" />
        <p className="text-lg">
          {property.address.street}, {property.address.city}, {property.address.state} {property.address.zip}
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-estate-neutral-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {property.beds > 0 && (
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <Bed size={24} className="text-teal-500 mb-2" />
              <p className="text-lg font-semibold">{property.beds}</p>
              <p className="text-estate-neutral-500">Bedrooms</p>
            </div>
          )}
          
          {property.baths > 0 && (
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <Bath size={24} className="text-teal-500 mb-2" />
              <p className="text-lg font-semibold">{property.baths}</p>
              <p className="text-estate-neutral-500">Bathrooms</p>
            </div>
          )}
          
          <div className="flex flex-col items-center p-4 border rounded-lg">
            <Square size={24} className="text-teal-500 mb-2" />
            <p className="text-lg font-semibold">
              {property.propertyType === "land" 
                ? `${(property.sqft / 43560).toFixed(2)} acres`
                : `${property.sqft.toLocaleString()}`}
            </p>
            <p className="text-estate-neutral-500">
              {property.propertyType === "land" ? "Lot Size" : "Square Feet"}
            </p>
          </div>
          
          {property.yearBuilt > 0 && (
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <Calendar size={24} className="text-teal-500 mb-2" />
              <p className="text-lg font-semibold">{property.yearBuilt}</p>
              <p className="text-estate-neutral-500">Year Built</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertySpecs;
