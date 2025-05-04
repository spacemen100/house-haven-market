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
  
  console.log("Initializing NewestProperties component"); // Debug 1
  
  const { data: properties = [], isLoading, error } = useQuery({
    queryKey: ['newest-properties'],
    queryFn: getNewestProperties,
  });

  // Debug logs
  console.log("Query state:", { isLoading, error }); // Debug 2
  console.log("Properties data received:", properties); // Debug 3
  console.log("First 3 properties:", properties.slice(0, 3)); // Debug 4

  return (
    <section className="py-12 bg-estate-neutral-50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-estate-800">
            Newest Properties
          </h2>
          <Button 
            variant="link" 
            className="text-estate-800 hover:no-underline p-0"
            onClick={() => navigate("/properties")}
          >
            View all properties <ArrowRight className="ml-2" size={18} />
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
            <p className="text-red-500">Error loading properties: {error.message}</p>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.slice(0, 3).map((property) => {
              console.log("Rendering property:", property.id, property.title); // Debug 5
              return (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  showListingType
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p>No properties found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewestProperties;