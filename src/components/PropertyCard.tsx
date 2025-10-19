// src/components/PropertyCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Square, Calendar } from "lucide-react";
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import MissingImagePlaceholder from "@/components/ui/MissingImagePlaceholder";
import { useCurrency } from "@/CurrencyContext";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  property: Property;
  isEditable?: boolean;
  onEdit?: (propertyId: string) => void;
  onDelete?: (propertyId: string) => void;
  userLikedProperties?: string[];
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, isEditable, onEdit, onDelete }) => {
  const { formatPrice } = useCurrency();

  const getFormattedDate = () => {
    try {
      if (typeof property.created_at === "string") {
        return format(parseISO(property.created_at), "d MMM yyyy", { locale: fr });
      }
      if (property.created_at instanceof Date) {
        return format(property.created_at, "d MMM yyyy", { locale: fr });
      }
      return "Date non disponible";
    } catch {
      return "Date non disponible";
    }
  };

  const mainImage = property.images && property.images.length > 0 ? property.images[0] : undefined;

  return (
    <Link to={`/property/${property.id}`} className="block">
      <div className="property-card overflow-hidden">
        {/* Property Image */}
        <div className="relative h-56 md:h-60 overflow-hidden">
          {!mainImage ? (
            <MissingImagePlaceholder className="w-full h-full object-cover" />
          ) : (
            <img
              src={mainImage}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          )}
          {/* Overlay & Price pill */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-3 left-3 pill bg-white/90 backdrop-blur text-estate-800 shadow-sm">
            {property.listing_type === "rent"
              ? `${formatPrice(property.price)}/mois`
              : formatPrice(property.price)}
          </div>
          <Badge className="absolute top-3 left-3 bg-teal-500 hover:bg-teal-500">
            {property.listing_type === "sale" ? "À vendre" : "À louer"}
          </Badge>
          {property.featured && (
            <Badge className="absolute top-3 right-3 bg-estate-800 hover:bg-estate-800">En vedette</Badge>
          )}
        </div>

        {/* Property Details */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <p className="text-xl font-semibold text-estate-800 line-clamp-1">{property.title}</p>
          </div>

          <div className="flex items-center text-estate-neutral-600 mb-3">
            <MapPin size={14} className="mr-1" />
            <p className="text-sm line-clamp-1">
              {property.address?.street}, {property.address?.district}, {property.address?.city}
            </p>
          </div>

          <div className="flex justify-end items-center mb-2">
            <div className="flex items-center text-sm text-estate-neutral-500">
              <Calendar size={14} className="mr-1" />
              {getFormattedDate()}
            </div>
          </div>

          <div className="flex justify-between border-t border-estate-neutral-100 pt-3">
            {property.beds && property.beds > 0 && (
              <div className="flex items-center">
                <Bed size={18} className="mr-1 text-estate-neutral-500" />
                <span className="text-sm">{property.beds} Chambres</span>
              </div>
            )}
            {property.baths && property.baths > 0 && (
              <div className="flex items-center">
                <Bath size={18} className="mr-1 text-estate-neutral-500" />
                <span className="text-sm">
                  {property.baths} {property.baths === 1 ? "Salle de bain" : "Salles de bain"}
                </span>
              </div>
            )}
            <div className="flex items-center">
              <Square size={18} className="mr-1 text-estate-neutral-500" />
              <span className="text-sm">
                {property.property_type === "land"
                  ? `${((property.m2 || 0) / 4046.86).toFixed(2)} acres`
                  : `${property.m2} m²`}
              </span>
            </div>
          </div>
        </div>

        {isEditable && (
          <div className="p-4 flex justify-end gap-2 border-t border-estate-neutral-100">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit?.(property.id);
              }}
            >
              Modifier
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete?.(property.id);
              }}
            >
              Supprimer
            </Button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default PropertyCard;

