// src/components/PropertyCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Square, Calendar } from "lucide-react";
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "@/CurrencyContext";
import { useTranslation } from 'react-i18next';
import { format, parseISO } from "date-fns";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();

  const getFormattedDate = () => {
    try {
      if (typeof property.created_at === 'string') {
        return format(parseISO(property.created_at), 'MMM d, yyyy');
      }
      if (property.created_at instanceof Date) {
        return format(property.created_at, 'MMM d, yyyy');
      }
      return t('dateNotAvailable');
    } catch (error) {
      console.error('Error formatting date:', error);
      return t('dateNotAvailable');
    }
  };

  return (
    <Link to={`/property/${property.id}`} className="block">
      <div className="property-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        {/* Property Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={property.images?.[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          <Badge className="absolute top-3 left-3 bg-teal-500 hover:bg-teal-500">
            {property.listing_type === "sale" ? t('forSale') : t('forRent')}
          </Badge>
          {property.featured && (
            <Badge className="absolute top-3 right-3 bg-estate-800 hover:bg-estate-800">
              {t('featured')}
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
              {property.address.street}, {t(`cities.${property.address.city}`)}, {property.address.state}
            </p>
          </div>

          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-bold text-estate-800">
              {property.listing_type === "rent"
                ? `${formatPrice(property.price, property.currency)}/month`
                : formatPrice(property.price, property.currency)}
            </p>
            <div className="flex items-center text-sm text-estate-neutral-500">
              <Calendar size={14} className="mr-1" />
              {getFormattedDate()}
            </div>
          </div>

          <div className="flex justify-between border-t border-estate-neutral-100 pt-3">
            {property.beds > 0 && (
              <div className="flex items-center">
                <Bed size={18} className="mr-1 text-estate-neutral-500" />
                <span className="text-sm">{property.beds} {t('Beds')}</span>
              </div>
            )}
            {property.baths > 0 && (
              <div className="flex items-center">
                <Bath size={18} className="mr-1 text-estate-neutral-500" />
                <span className="text-sm">
                  {property.baths} {property.baths === 1 ? t('Bath') : t('Baths')}
                </span>
              </div>
            )}
            <div className="flex items-center">
              <Square size={18} className="mr-1 text-estate-neutral-500" />
              <span className="text-sm">
                {property.property_type === "land"
                  ? `${(property.m2 / 4046.86).toFixed(2)} ${t('acres')}`
                  : `${property.m2} ${t('m²')}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
