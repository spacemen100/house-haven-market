
import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const { t } = useTranslation();
  
  return (
    <Link to={`/property/${property.id}`} className="block">
      <div className="property-card bg-white rounded-lg overflow-hidden shadow-md">
        {/* Property Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-3 left-3 bg-teal-500 hover:bg-teal-500">
            {property.listingType === "sale" ? t("forSale") : t("forRent")}
          </Badge>
          {property.featured && (
            <Badge className="absolute top-3 right-3 bg-estate-800 hover:bg-estate-800">
              {t("featured")}
            </Badge>
          )}
        </div>

        {/* Property Details */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <p className="text-xl font-semibold text-estate-800 line-clamp-1">
              {property.title}
            </p>
          </div>

          <div className="flex items-center text-estate-neutral-600 mb-3">
            <MapPin size={14} className="mr-1" />
            <p className="text-sm line-clamp-1">
              {property.address.street}, {property.address.city}, {property.address.state}
            </p>
          </div>

          <p className="text-lg font-bold text-estate-800 mb-4">
            {property.listingType === "rent"
              ? `${formatCurrency(property.price)}/month`
              : formatCurrency(property.price)}
          </p>

          <div className="flex justify-between border-t border-estate-neutral-100 pt-3">
            {property.beds > 0 && (
              <div className="flex items-center">
                <Bed size={18} className="mr-1 text-estate-neutral-500" />
                <span className="text-sm">{property.beds} {property.beds === 1 ? t("bed") : t("beds")}</span>
              </div>
            )}
            {property.baths > 0 && (
              <div className="flex items-center">
                <Bath size={18} className="mr-1 text-estate-neutral-500" />
                <span className="text-sm">
                  {property.baths} {property.baths === 1 ? t("bath") : t("baths")}
                </span>
              </div>
            )}
            <div className="flex items-center">
              <Square size={18} className="mr-1 text-estate-neutral-500" />
              <span className="text-sm">
                {property.propertyType === "land" 
                  ? `${(property.sqft / 43560).toFixed(2)} ${t("acres")}` 
                  : `${property.sqft} ${t("sqft")}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
