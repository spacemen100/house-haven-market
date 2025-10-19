import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import PropertyHeader from "@/components/property/PropertyHeader";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertySpecs from "@/components/property/PropertySpecs";
import PropertyFeatures from "@/components/property/PropertyFeatures";
import PropertyAdditionalFeatures from "@/components/property/PropertyAdditionalFeatures";
import AgentContact from "@/components/property/AgentContact";

import { getPropertyById } from "@/lib/api/properties";

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: property, isLoading, isError } = useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id!),
    enabled: !!id,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        {isLoading && (
          <div className="text-center text-estate-neutral-600">Chargement du bien...</div>
        )}

        {(isError || (!isLoading && !property)) && (
          <div className="text-center text-red-600">Impossible de charger ce bien.</div>
        )}

        {property && (
          <>
            <PropertyHeader property={property} />
            <PropertyGallery images={property.images} title={property.title} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <PropertySpecs property={property} />
                <PropertyFeatures property={property} />
                <PropertyAdditionalFeatures property={property} />
              </div>
              <div className="lg:col-span-1">
                <AgentContact property={property} />
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetail;

