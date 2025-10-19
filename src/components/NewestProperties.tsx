import { useEffect, useState } from "react";
import { Property } from "@/types/property";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getNewestProperties } from "@/lib/api/properties";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const NewestProperties = () => {
  const navigate = useNavigate();
  const [visiblePropertiesCount, setVisiblePropertiesCount] = useState(6);

  const { data: properties = [], isLoading, error } = useQuery({
    queryKey: ['newest-properties'],
    queryFn: getNewestProperties,
  });

  // Debug logs
  useEffect(() => {}, [properties, isLoading, error]);

  return (
    <section className="py-12 bg-estate-neutral-50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-estate-800">
            Les nouveautés
          </h2>
          <Button
            variant="link"
            className="text-estate-800 hover:no-underline p-0"
            onClick={() => navigate("/properties")}
          >
            Voir tout <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
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
            <p className="text-red-500">Erreur: {error.message}</p>
          </div>
        ) : properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.slice(0, visiblePropertiesCount).map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  // showListingType prop removed as it's not a valid prop for PropertyCard
                />
              ))}
            </div>
            {visiblePropertiesCount < properties.length && (
              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  onClick={() => setVisiblePropertiesCount(prevCount => prevCount + 6)}
                >
                  Voir plus
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p>Aucune propriété trouvée.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewestProperties;
