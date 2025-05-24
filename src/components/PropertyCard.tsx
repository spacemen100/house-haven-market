// src/components/PropertyCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Square, Calendar, Heart } from "lucide-react";
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/CurrencyContext";
import { useTranslation } from "react-i18next";
import { format, parseISO } from "date-fns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { likeProperty, unlikeProperty, checkIfLiked } from "@/lib/api/properties";
import { toast } from "sonner";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const queryClient = useQueryClient();

  const { data: isLiked, isLoading: isLoadingLikedStatus } = useQuery({
    queryKey: ['likedStatus', property.id],
    queryFn: () => checkIfLiked(property.id),
    enabled: !!property.id,
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const likeMutation = useMutation({
    mutationFn: likeProperty,
    onSuccess: (data) => {
      if (data && data.success) {
        toast.success("Property added to favorites!");
        queryClient.invalidateQueries({ queryKey: ['likedStatus', property.id] });
        queryClient.invalidateQueries({ queryKey: ['liked-properties'] });
      } else {
        toast.error(data?.error || "Failed to like property.");
      }
    },
    onError: (error: any) => {
      console.error("Error liking property:", error);
      toast.error(error.message || "An unexpected error occurred while liking.");
    }
  });

  const unlikeMutation = useMutation({
    mutationFn: unlikeProperty,
    onSuccess: (data) => {
      if (data && data.success) {
        toast.success("Property removed from favorites!");
        queryClient.invalidateQueries({ queryKey: ['likedStatus', property.id] });
        queryClient.invalidateQueries({ queryKey: ['liked-properties'] });
      } else {
        toast.error(data?.error || "Failed to unlike property.");
      }
    },
    onError: (error: any) => {
      console.error("Error unliking property:", error);
      toast.error(error.message || "An unexpected error occurred while unliking.");
    }
  });

  const handleLikeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent Link navigation
    event.stopPropagation(); // Stop event bubbling

    if (isLoadingLikedStatus || likeMutation.isPending || unlikeMutation.isPending) {
      return; // Do nothing if still loading or a mutation is in progress
    }

    if (isLiked) {
      unlikeMutation.mutate(property.id);
    } else {
      likeMutation.mutate(property.id);
    }
  };

  const getFormattedDate = () => {
    try {
      if (typeof property.createdAt === 'string') {
        return format(parseISO(property.createdAt), 'MMM d, yyyy');
      }
      if (property.createdAt instanceof Date) {
        return format(property.createdAt, 'MMM d, yyyy');
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
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          <Badge className="absolute top-3 left-3 bg-teal-500 hover:bg-teal-500 z-10">
            {property.listingType === "sale" ? t('forSale') : t('forRent')}
          </Badge>
          
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white rounded-full p-2"
            onClick={handleLikeToggle}
            disabled={isLoadingLikedStatus || likeMutation.isPending || unlikeMutation.isPending}
            title={isLiked ? t('unlike') : t('like')}
          >
            <Heart
              size={20}
              className={`transition-colors ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-700"
              }`}
            />
          </Button>

          {property.featured && (
            <Badge className="absolute top-12 right-3 bg-estate-800 hover:bg-estate-800 z-10">
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
              {property.address.street}, {property.address.city}, {property.address.state}
            </p>
          </div>

          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-bold text-estate-800">
              {property.listingType === "rent"
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
                <span className="text-sm">{property.beds} Beds</span>
              </div>
            )}
            {property.baths > 0 && (
              <div className="flex items-center">
                <Bath size={18} className="mr-1 text-estate-neutral-500" />
                <span className="text-sm">
                  {property.baths} {property.baths === 1 ? "Bath" : "Baths"}
                </span>
              </div>
            )}
            <div className="flex items-center">
              <Square size={18} className="mr-1 text-estate-neutral-500" />
              <span className="text-sm">
                {property.propertyType === "land"
                  ? `${(property.m2 / 4046.86).toFixed(2)} acres`
                  : `${property.m2} m²`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
