// src/components/property/PropertyHeader.tsx
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useCurrency } from '@/CurrencyContext';
import { useTranslation } from 'react-i18next';

interface PropertyHeaderProps {
  property: Property;
}

const PropertyHeader = ({ property }: PropertyHeaderProps) => {
  const { formatPrice } = useCurrency();
  const { t } = useTranslation();

  return (
    <>
      <div className="mb-6">
        <Link
          to="/properties"
          className="flex items-center text-estate-neutral-600 hover:text-estate-800 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>{t('propertyHeader.backToProperties')}</span>
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-estate-800">{property.title}</h1>
          <Button
            variant="outline"
            size="icon"
            className="border-estate-neutral-200 text-estate-neutral-500 hover:text-red-500 hover:border-red-500"
          >
            <Heart size={20} />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-teal-500 hover:bg-teal-500">
            {t(`listingType.${property.listingType.toLowerCase()}`)}
          </Badge>
          <Badge className="bg-estate-neutral-700 hover:bg-estate-neutral-700">
            {t(`propertyType.${property.propertyType.toLowerCase()}`)}
          </Badge>
          <span className="text-2xl font-bold text-estate-800 ml-auto">
            {property.listingType === "rent"
              ? `${formatPrice(property.price, property.currency)}/${t('propertyHeader.month')}`
              : formatPrice(property.price, property.currency)}
          </span>
        </div>
      </div>
    </>
  );
};

export default PropertyHeader;