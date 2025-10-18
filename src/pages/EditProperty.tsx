import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPropertyById } from '@/lib/api/properties';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { Property } from '@/types/property';

const EditProperty = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState<Property | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['property', propertyId],
    queryFn: () => getPropertyById(propertyId!),
    enabled: !!propertyId,
  });

  useEffect(() => {
    if (data) {
      setPropertyData(data);
    } else if (isError) {
      toast.error("Failed to load property for editing.");
      console.error("Error fetching property:", error);
      navigate('/account'); // Redirect if property not found or error
    }
  }, [data, isError, error, navigate]);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="container py-8 text-center">
          <p>Loading property details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!propertyData) {
    return (
      <div>
        <Navbar />
        <div className="container py-8 text-center">
          <p>Property not found or an error occurred.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-estate-800 mb-8">Edit Property: {propertyData.title}</h1>
        {/* Here we will integrate the AddPropertyStep components for editing */}
        <p>Editing functionality will be implemented here.</p>
      </div>
      <Footer />
    </div>
  );
};

export default EditProperty;
