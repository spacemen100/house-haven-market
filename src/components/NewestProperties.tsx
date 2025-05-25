import { useEffect, useState } from "react"; // Added useState
import { Property } from "@/types/property";
import PropertyCard from "@/components/PropertyCard";
import { supabase } from "../integrations/supabase/client"; // Added supabase import
import { getUserProfile } from "../lib/profiles"; // Added getUserProfile import
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getNewestProperties } from "@/lib/api/properties";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

const NewestProperties = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [userLikedProperties, setUserLikedProperties] = useState<string[] | null>(null); // Added state

  console.log("Initializing NewestProperties component");

  const { data: properties = [], isLoading, error } = useQuery({
    queryKey: ['newest-properties'],
    queryFn: getNewestProperties,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const profile = await getUserProfile(user.id);
          setUserLikedProperties(profile?.liked_properties || []);
        } else {
          setUserLikedProperties([]);
        }
      } catch (error) {
        console.error("Error fetching user profile for newest properties likes:", error);
        setUserLikedProperties([]);
      }
    };
    fetchProfile();
  }, []);

  // Debug logs
  useEffect(() => {
    console.log("Query state:", { isLoading, error });
    console.log("Properties data received:", properties);
    if (properties.length > 0) {
      console.log("First property details:", {
        beds: properties[0]?.beds,
        baths: properties[0]?.baths,
        m2: properties[0]?.m2 // Changé de sqft à m2
      });
    }
  }, [properties, isLoading, error]);

  return (
    <section className="py-12 bg-estate-neutral-50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-estate-800">
            {t('newestProperties.title')}
          </h2>
          <Button
            variant="link"
            className="text-estate-800 hover:no-underline p-0"
            onClick={() => navigate("/properties")}
          >
            {t('newestProperties.viewAll')} <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{t('newestProperties.error')}: {error.message}</p>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userLikedProperties !== null && properties.slice(0, 3).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                userLikedProperties={userLikedProperties}
                // showListingType prop removed as it's not a valid prop for PropertyCard
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p>{t('newestProperties.noProperties')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewestProperties;
