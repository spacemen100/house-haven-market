// src/components/PropertyCard.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Square, Calendar, Heart } from "lucide-react";
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "@/CurrencyContext";
import { useTranslation } from 'react-i18next';
import { format, parseISO } from "date-fns";
import { supabase } from "@/integrations/supabase/client"; // Path alias updated
import { getUserProfile, updateUserProfile } from "@/lib/profiles"; // Path alias updated

interface PropertyCardProps {
  property: Property;
  userLikedProperties?: string[];
}

const PropertyCard = ({ property, userLikedProperties }: PropertyCardProps) => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoadingLike, setIsLoadingLike] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAndLikedStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setCurrentUserId(user.id);
          if (userLikedProperties) {
            setIsLiked(userLikedProperties.includes(property.id));
          } else {
            // Fallback to fetching profile if userLikedProperties is not provided
            const profile = await getUserProfile(user.id);
            if (profile && profile.liked_properties) {
              setIsLiked(profile.liked_properties.includes(property.id));
            }
          }
        } else {
          // No user logged in, reset liked state
          setCurrentUserId(null);
          setIsLiked(false);
        }
      } catch (error) {
        console.error("Error fetching user or liked status:", error);
        // Ensure state is reset on error too
        setCurrentUserId(null);
        setIsLiked(false);
      }
    };

    fetchUserAndLikedStatus();
  }, [property.id, userLikedProperties]);

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isLoadingLike || !currentUserId) return;

    setIsLoadingLike(true);
    try {
      const profile = await getUserProfile(currentUserId);
      const liked_properties = profile?.liked_properties || [];
      let updatedLikedProperties: string[];

      if (isLiked) {
        updatedLikedProperties = liked_properties.filter(id => id !== property.id);
      } else {
        updatedLikedProperties = [...liked_properties, property.id];
      }

      await updateUserProfile(currentUserId, { liked_properties: updatedLikedProperties });
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error toggling like status:", error);
      // Optionally, show a toast notification to the user
    } finally {
      setIsLoadingLike(false);
    }
  };

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
          <button
            onClick={handleLikeToggle}
            disabled={isLoadingLike}
            className="absolute top-2 right-2 m-1 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50 z-10"
            aria-label={isLiked ? t('unlikeProperty') : t('likeProperty')}
          >
            <Heart
              size={20}
              className={`text-red-500 ${isLiked ? "fill-red-500" : "fill-none"}`}
              stroke="red" // Keep consistent stroke color or adjust as needed
            />
          </button>
          {property.featured && !currentUserId && ( // Hide featured badge if like button is shown for logged in users for spacing
            <Badge className="absolute top-3 right-3 bg-estate-800 hover:bg-estate-800">
              {t('featured')}
            </Badge>
          )}
           {property.featured && currentUserId && ( // Show featured badge differently if user is logged in
            <Badge className="absolute top-12 right-3 bg-estate-800 hover:bg-estate-800">
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
              {t(`${property.address.street}`)}, {t(`${property.address.district}`)}, {t(`cities.${property.address.city}`)}
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
