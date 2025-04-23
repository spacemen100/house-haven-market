
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Calendar, 
  SquareFoot, 
  Check, 
  Phone, 
  Mail, 
  ChevronLeft,
  Heart
} from "lucide-react";
import { getPropertyById } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const property = id ? getPropertyById(id) : undefined;

  useEffect(() => {
    if (!property) {
      navigate("/properties");
    }
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [property, navigate]);

  if (!property) {
    return null;
  }

  return (
    <div>
      <Navbar />
      
      <div className="container py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link 
            to="/properties" 
            className="flex items-center text-estate-neutral-600 hover:text-estate-800 transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Back to Properties</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Title & Location */}
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
              
              <div className="flex items-center text-estate-neutral-600 mb-4">
                <MapPin size={18} className="mr-2" />
                <p className="text-lg">
                  {property.address.street}, {property.address.city}, {property.address.state} {property.address.zip}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-teal-500 hover:bg-teal-500">
                  {property.listingType === "sale" ? "For Sale" : "For Rent"}
                </Badge>
                <Badge className="bg-estate-neutral-700 hover:bg-estate-neutral-700">
                  {property.propertyType === "house" && "House"}
                  {property.propertyType === "apartment" && "Apartment"}
                  {property.propertyType === "land" && "Land"}
                  {property.propertyType === "commercial" && "Commercial"}
                </Badge>
              </div>
            </div>
            
            {/* Property Images */}
            <div className="mb-8">
              {property.images.length > 0 && (
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={property.images[0]} 
                    alt={property.title}
                    className="w-full h-[500px] object-cover"
                  />
                </div>
              )}
              
              {property.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {property.images.slice(1).map((img, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                      <img 
                        src={img} 
                        alt={`${property.title} ${index + 2}`}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Property Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-estate-800 mb-4">Property Details</h2>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-estate-neutral-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {property.beds > 0 && (
                    <div className="flex flex-col items-center p-4 border rounded-lg">
                      <Bed size={24} className="text-teal-500 mb-2" />
                      <p className="text-lg font-semibold">{property.beds}</p>
                      <p className="text-estate-neutral-500">Bedrooms</p>
                    </div>
                  )}
                  
                  {property.baths > 0 && (
                    <div className="flex flex-col items-center p-4 border rounded-lg">
                      <Bath size={24} className="text-teal-500 mb-2" />
                      <p className="text-lg font-semibold">{property.baths}</p>
                      <p className="text-estate-neutral-500">Bathrooms</p>
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <SquareFoot size={24} className="text-teal-500 mb-2" />
                    <p className="text-lg font-semibold">
                      {property.propertyType === "land" 
                        ? `${(property.sqft / 43560).toFixed(2)} acres`
                        : `${property.sqft.toLocaleString()}`}
                    </p>
                    <p className="text-estate-neutral-500">
                      {property.propertyType === "land" ? "Lot Size" : "Square Feet"}
                    </p>
                  </div>
                  
                  {property.yearBuilt > 0 && (
                    <div className="flex flex-col items-center p-4 border rounded-lg">
                      <Calendar size={24} className="text-teal-500 mb-2" />
                      <p className="text-lg font-semibold">{property.yearBuilt}</p>
                      <p className="text-estate-neutral-500">Year Built</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Property Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-estate-800 mb-4">Description</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-estate-neutral-100">
                <p className="text-estate-neutral-700 leading-relaxed">
                  {property.description}
                </p>
              </div>
            </div>
            
            {/* Property Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-estate-800 mb-4">Amenities</h2>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-estate-neutral-100">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check size={18} className="text-teal-500" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Price Card */}
            <div className="bg-white rounded-lg p-6 shadow border border-estate-neutral-100 mb-6">
              <h3 className="text-2xl font-bold text-estate-800 mb-1">
                {property.listingType === "rent"
                  ? `${formatCurrency(property.price)}/month`
                  : formatCurrency(property.price)}
              </h3>
              
              {property.propertyType !== "land" && property.beds > 0 && property.baths > 0 && (
                <p className="text-estate-neutral-500 mb-4">
                  {property.beds} bd | {property.baths} ba | {property.sqft.toLocaleString()} sqft
                </p>
              )}
              
              <div className="flex flex-col gap-3 mt-4">
                <Button className="w-full bg-teal-500 hover:bg-teal-600">
                  Schedule a Tour
                </Button>
                <Button variant="outline" className="w-full">
                  Request Info
                </Button>
              </div>
            </div>
            
            {/* Agent Card */}
            {property.agentName && (
              <div className="bg-white rounded-lg p-6 shadow border border-estate-neutral-100">
                <h3 className="text-xl font-semibold text-estate-800 mb-4">
                  Listed by
                </h3>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-estate-neutral-200 rounded-full flex items-center justify-center text-estate-neutral-500">
                    <User size={32} />
                  </div>
                  <div>
                    <p className="font-medium text-lg">{property.agentName}</p>
                    <p className="text-estate-neutral-500">Real Estate Agent</p>
                  </div>
                </div>
                
                {property.agentPhone && (
                  <div className="flex items-center gap-3 mb-3">
                    <Phone size={18} className="text-teal-500" />
                    <a 
                      href={`tel:${property.agentPhone}`} 
                      className="text-estate-neutral-700 hover:text-estate-800"
                    >
                      {property.agentPhone}
                    </a>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-teal-500" />
                  <a 
                    href="mailto:agent@househaven.com" 
                    className="text-estate-neutral-700 hover:text-estate-800"
                  >
                    agent@househaven.com
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
