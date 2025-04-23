
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPropertyById } from "@/data/properties";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyHeader from "@/components/property/PropertyHeader";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertySpecs from "@/components/property/PropertySpecs";
import PropertyFeatures from "@/components/property/PropertyFeatures";
import PropertyAdditionalFeatures from "@/components/property/PropertyAdditionalFeatures";
import AgentContact from "@/components/property/AgentContact";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const property = id ? getPropertyById(id) : undefined;

  useEffect(() => {
    if (!property) {
      navigate("/properties");
    }
    window.scrollTo(0, 0);
  }, [property, navigate]);

  if (!property) {
    return null;
  }

  return (
    <div>
      <Navbar />
      
      <div className="container py-8">
        <PropertyHeader property={property} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PropertyGallery property={property} />
            <PropertySpecs property={property} />
            <PropertyFeatures property={property} />
            <PropertyAdditionalFeatures property={property} />
          </div>
          
          <div>
            <AgentContact property={property} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
