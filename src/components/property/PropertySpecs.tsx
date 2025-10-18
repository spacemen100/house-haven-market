
import { Property } from "@/types/property";
import { MapPin, Bed, Bath, Square, Calendar, Building, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertySpecsProps {
  property: Property;
}

const PropertySpecs = ({ property }: PropertySpecsProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center text-estate-neutral-600 mb-4">
        <MapPin size={18} className="mr-2" />
        <p className="text-lg">
          {property.address.street}, {property.address.district && `${property.address.district}, `}
          {property.address.city}, {property.address.state} {property.address.zip}
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-estate-neutral-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {property.beds > 0 && (
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <Bed size={24} className="text-teal-500 mb-2" />
              <p className="text-lg font-semibold">{property.beds}</p>
              <p className="text-estate-neutral-500">Chambres</p>
            </div>
          )}
          
          {property.baths > 0 && (
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <Bath size={24} className="text-teal-500 mb-2" />
              <p className="text-lg font-semibold">{property.baths}</p>
              <p className="text-estate-neutral-500">Salles de bain</p>
            </div>
          )}
          
          <div className="flex flex-col items-center p-4 border rounded-lg">
            <Square size={24} className="text-teal-500 mb-2" />
            <p className="text-lg font-semibold">
              {property.propertyType === "land" 
                ? `${(property.m2 / 4046.86).toFixed(2)} acres`
                : `${property.m2.toLocaleString()}`}
            </p>
            <p className="text-estate-neutral-500">
              {property.propertyType === "land" ? "Taille du terrain" : "Mètres carrés"}
            </p>
          </div>
          
          {property.yearBuilt > 0 && (
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <Calendar size={24} className="text-teal-500 mb-2" />
              <p className="text-lg font-semibold">{property.yearBuilt}</p>
              <p className="text-estate-neutral-500">Année de construction</p>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {property.condition && (
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">État</h3>
              <Badge variant="secondary">
                {property.condition.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          )}

          {property.status && (
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Statut</h3>
              <Badge variant="secondary">
                {property.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          )}

          {property.kitchenType && (
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Type de cuisine</h3>
              <Badge variant="secondary">
                {property.kitchenType.toUpperCase()}
              </Badge>
            </div>
          )}

          {(property.floorLevel !== undefined || property.totalFloors !== undefined) && (
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Informations sur l'étage</h3>
              <div className="flex items-center gap-2">
                <Building size={18} className="text-teal-500" />
                <span>
                  {property.floorLevel !== undefined && `Étage ${property.floorLevel}`}
                  {property.totalFloors !== undefined && ` de ${property.totalFloors}`}
                </span>
              </div>
            </div>
          )}

          {property.ceilingHeight && (
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Hauteur sous plafond</h3>
              <div className="flex items-center gap-2">
                <ArrowUp size={18} className="text-teal-500" />
                <span>{property.ceilingHeight}m</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertySpecs;
