import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useCurrency } from '@/CurrencyContext';
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getUserProfile, updateUserProfile } from "@/lib/profiles";

interface PropertyHeaderProps {
  property: Property;
}

const PropertyHeader = ({ property }: PropertyHeaderProps) => {
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
          const profile = await getUserProfile(user.id);
          if (profile && profile.liked_properties) {
            setIsLiked(profile.liked_properties.includes(property.id));
          }
        } else {
          setCurrentUserId(null);
          setIsLiked(false);
        }
      } catch (error) {
        console.error("Error fetching user or liked status:", error);
        setCurrentUserId(null);
        setIsLiked(false);
      }
    };

    fetchUserAndLikedStatus();
  }, [property.id]);

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

  const listingTypes: { [key: string]: string } = {
    sale: "Vente",
    rent: "Location",
  };

  const propertyTypes: { [key: string]: string } = {
    apartment: "Appartement",
    house: "Maison",
  };

  return (
    <>
      <div className="mb-6">
        <Link
          to="/properties"
          className="flex items-center text-estate-neutral-600 hover:text-estate-800 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Retour aux propriétés</span>
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-estate-800">{property.title}</h1>
          <Button
            variant="outline"
            size="icon"
            className="border-estate-neutral-200 text-estate-neutral-500 hover:text-red-500 hover:border-red-500"
            onClick={handleLikeToggle}
            disabled={isLoadingLike}
          >
            <Heart size={20} className={`text-red-500 ${isLiked ? "fill-red-500" : "fill-none"}`} stroke="red" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-teal-500 hover:bg-teal-500">
            {listingTypes[property.listingType.toLowerCase()]}
          </Badge>
          <Badge className="bg-estate-neutral-700 hover:bg-estate-neutral-700">
            {propertyTypes[property.propertyType.toLowerCase()]}
          </Badge>
          <span className="text-2xl font-bold text-estate-800 ml-auto">
            {property.listingType === "rent"
              ? `${formatPrice(property.price, property.currency)}/mois`
              : formatPrice(property.price, property.currency)}
          </span>
        </div>
      </div>
    </>
  );
};

export default PropertyHeader;