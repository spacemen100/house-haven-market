
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Search, 
  Filter, 
  MapPin, 
  SlidersHorizontal, 
  X,
  ChevronDown
} from "lucide-react";
import { properties } from "@/data/properties";
import { Property, PropertyType, ListingType } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import PropertyCard from "@/components/PropertyCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Properties = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialListingType = (queryParams.get("type") as ListingType) || "sale";
  const initialSearch = queryParams.get("search") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [listingType, setListingType] = useState<ListingType>(initialListingType);
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [minBeds, setMinBeds] = useState(0);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter properties based on criteria
  useEffect(() => {
    let filtered = [...properties];
    
    // Filter by listing type
    filtered = filtered.filter(property => property.listingType === listingType);
    
    // Filter by search query (address or title)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(query) ||
        property.address.street.toLowerCase().includes(query) ||
        property.address.city.toLowerCase().includes(query) ||
        property.address.state.toLowerCase().includes(query) ||
        property.address.zip.toLowerCase().includes(query)
      );
    }
    
    // Filter by property types
    if (propertyTypes.length > 0) {
      filtered = filtered.filter(property => 
        propertyTypes.includes(property.propertyType)
      );
    }
    
    // Filter by price
    filtered = filtered.filter(property => 
      property.price >= minPrice && property.price <= maxPrice
    );
    
    // Filter by beds
    if (minBeds > 0) {
      filtered = filtered.filter(property => property.beds >= minBeds);
    }
    
    setFilteredProperties(filtered);
  }, [searchQuery, listingType, propertyTypes, minPrice, maxPrice, minBeds]);
  
  // Update URL when listing type changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("type", listingType);
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    navigate(`/properties?${params.toString()}`, { replace: true });
  }, [listingType, searchQuery, navigate]);
  
  const handlePropertyTypeChange = (type: PropertyType) => {
    if (propertyTypes.includes(type)) {
      setPropertyTypes(propertyTypes.filter(t => t !== type));
    } else {
      setPropertyTypes([...propertyTypes, type]);
    }
  };
  
  const handleClearFilters = () => {
    setPropertyTypes([]);
    setMinPrice(0);
    setMaxPrice(5000000);
    setMinBeds(0);
  };
  
  return (
    <div>
      <Navbar />
      
      <div className="bg-estate-800 py-8">
        <div className="container">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
            {listingType === "sale" ? "Properties for Sale" : "Properties for Rent"}
          </h1>
          <div className="flex bg-white rounded-lg p-3">
            <div className="flex items-center pl-3 text-estate-neutral-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Enter location, city, zip or address"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 py-2 px-3 outline-none"
            />
          </div>
        </div>
      </div>
      
      <div className="container py-8">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Filters - Mobile */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">
              {filteredProperties.length} Properties Found
            </div>
            <Button 
              variant="outline" 
              className="flex gap-2 items-center"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={18} />
              <span>Filters</span>
            </Button>
          </div>
          
          {/* Filters - Mobile Drawer */}
          {isFilterOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
              <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white p-6 overflow-y-auto animate-slide-up">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-estate-neutral-500"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <X size={24} />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* Same filter contents as desktop but mobile optimized */}
                  {/* Listing Type */}
                  <div className="space-y-3">
                    <h3 className="font-medium">Listing Type</h3>
                    <div className="flex gap-3">
                      <Button 
                        variant={listingType === "sale" ? "default" : "outline"}
                        className={listingType === "sale" ? "bg-teal-500 hover:bg-teal-600" : ""}
                        onClick={() => setListingType("sale")}
                      >
                        For Sale
                      </Button>
                      <Button 
                        variant={listingType === "rent" ? "default" : "outline"}
                        className={listingType === "rent" ? "bg-teal-500 hover:bg-teal-600" : ""}
                        onClick={() => setListingType("rent")}
                      >
                        For Rent
                      </Button>
                    </div>
                  </div>
                  
                  {/* Property Type */}
                  <div className="space-y-3">
                    <h3 className="font-medium">Property Type</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="house-mobile" 
                          checked={propertyTypes.includes("house")}
                          onCheckedChange={() => handlePropertyTypeChange("house")}
                        />
                        <label htmlFor="house-mobile" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Houses
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="apartment-mobile" 
                          checked={propertyTypes.includes("apartment")}
                          onCheckedChange={() => handlePropertyTypeChange("apartment")}
                        />
                        <label htmlFor="apartment-mobile" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Apartments
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="land-mobile" 
                          checked={propertyTypes.includes("land")}
                          onCheckedChange={() => handlePropertyTypeChange("land")}
                        />
                        <label htmlFor="land-mobile" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Land
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="commercial-mobile" 
                          checked={propertyTypes.includes("commercial")}
                          onCheckedChange={() => handlePropertyTypeChange("commercial")}
                        />
                        <label htmlFor="commercial-mobile" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Commercial
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div className="space-y-3">
                    <h3 className="font-medium">Price Range</h3>
                    <div className="px-2">
                      <Slider 
                        defaultValue={[minPrice, maxPrice]}
                        max={5000000}
                        step={100000}
                        onValueChange={(values) => {
                          setMinPrice(values[0]);
                          setMaxPrice(values[1]);
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>${(minPrice/1000).toLocaleString()}k</span>
                      <span>${(maxPrice/1000).toLocaleString()}k</span>
                    </div>
                  </div>
                  
                  {/* Bedrooms */}
                  <div className="space-y-3">
                    <h3 className="font-medium">Bedrooms</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={minBeds === 0 ? "default" : "outline"}
                        className={minBeds === 0 ? "bg-teal-500 hover:bg-teal-600" : ""}
                        size="sm"
                        onClick={() => setMinBeds(0)}
                      >
                        Any
                      </Button>
                      <Button 
                        variant={minBeds === 1 ? "default" : "outline"}
                        className={minBeds === 1 ? "bg-teal-500 hover:bg-teal-600" : ""}
                        size="sm"
                        onClick={() => setMinBeds(1)}
                      >
                        1+
                      </Button>
                      <Button 
                        variant={minBeds === 2 ? "default" : "outline"}
                        className={minBeds === 2 ? "bg-teal-500 hover:bg-teal-600" : ""}
                        size="sm"
                        onClick={() => setMinBeds(2)}
                      >
                        2+
                      </Button>
                      <Button 
                        variant={minBeds === 3 ? "default" : "outline"}
                        className={minBeds === 3 ? "bg-teal-500 hover:bg-teal-600" : ""}
                        size="sm"
                        onClick={() => setMinBeds(3)}
                      >
                        3+
                      </Button>
                      <Button 
                        variant={minBeds === 4 ? "default" : "outline"}
                        className={minBeds === 4 ? "bg-teal-500 hover:bg-teal-600" : ""}
                        size="sm"
                        onClick={() => setMinBeds(4)}
                      >
                        4+
                      </Button>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={handleClearFilters}
                    >
                      Clear All
                    </Button>
                    <Button 
                      className="flex-1 bg-teal-500 hover:bg-teal-600"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Show Results
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-72 h-fit bg-white rounded-lg p-6 shadow-sm border border-estate-neutral-100 space-y-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Filter size={20} />
              <span>Filters</span>
            </h3>
            
            {/* Listing Type */}
            <div className="space-y-3">
              <h4 className="font-medium">Listing Type</h4>
              <div className="flex gap-3">
                <Button 
                  variant={listingType === "sale" ? "default" : "outline"}
                  className={listingType === "sale" ? "bg-teal-500 hover:bg-teal-600" : ""}
                  onClick={() => setListingType("sale")}
                >
                  For Sale
                </Button>
                <Button 
                  variant={listingType === "rent" ? "default" : "outline"}
                  className={listingType === "rent" ? "bg-teal-500 hover:bg-teal-600" : ""}
                  onClick={() => setListingType("rent")}
                >
                  For Rent
                </Button>
              </div>
            </div>
            
            <hr />
            
            {/* Property Type */}
            <div className="space-y-3">
              <h4 className="font-medium">Property Type</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="house" 
                    checked={propertyTypes.includes("house")}
                    onCheckedChange={() => handlePropertyTypeChange("house")}
                  />
                  <label htmlFor="house" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Houses
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="apartment" 
                    checked={propertyTypes.includes("apartment")}
                    onCheckedChange={() => handlePropertyTypeChange("apartment")}
                  />
                  <label htmlFor="apartment" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Apartments
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="land" 
                    checked={propertyTypes.includes("land")}
                    onCheckedChange={() => handlePropertyTypeChange("land")}
                  />
                  <label htmlFor="land" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Land
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="commercial" 
                    checked={propertyTypes.includes("commercial")}
                    onCheckedChange={() => handlePropertyTypeChange("commercial")}
                  />
                  <label htmlFor="commercial" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Commercial
                  </label>
                </div>
              </div>
            </div>
            
            <hr />
            
            {/* Price Range */}
            <div className="space-y-3">
              <h4 className="font-medium">Price Range</h4>
              <div className="px-2">
                <Slider 
                  defaultValue={[minPrice, maxPrice]}
                  max={5000000}
                  step={100000}
                  onValueChange={(values) => {
                    setMinPrice(values[0]);
                    setMaxPrice(values[1]);
                  }}
                />
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>${(minPrice/1000).toLocaleString()}k</span>
                <span>${(maxPrice/1000).toLocaleString()}k</span>
              </div>
            </div>
            
            <hr />
            
            {/* Bedrooms */}
            <div className="space-y-3">
              <h4 className="font-medium">Bedrooms</h4>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={minBeds === 0 ? "default" : "outline"}
                  className={minBeds === 0 ? "bg-teal-500 hover:bg-teal-600" : ""}
                  size="sm"
                  onClick={() => setMinBeds(0)}
                >
                  Any
                </Button>
                <Button 
                  variant={minBeds === 1 ? "default" : "outline"}
                  className={minBeds === 1 ? "bg-teal-500 hover:bg-teal-600" : ""}
                  size="sm"
                  onClick={() => setMinBeds(1)}
                >
                  1+
                </Button>
                <Button 
                  variant={minBeds === 2 ? "default" : "outline"}
                  className={minBeds === 2 ? "bg-teal-500 hover:bg-teal-600" : ""}
                  size="sm"
                  onClick={() => setMinBeds(2)}
                >
                  2+
                </Button>
                <Button 
                  variant={minBeds === 3 ? "default" : "outline"}
                  className={minBeds === 3 ? "bg-teal-500 hover:bg-teal-600" : ""}
                  size="sm"
                  onClick={() => setMinBeds(3)}
                >
                  3+
                </Button>
                <Button 
                  variant={minBeds === 4 ? "default" : "outline"}
                  className={minBeds === 4 ? "bg-teal-500 hover:bg-teal-600" : ""}
                  size="sm"
                  onClick={() => setMinBeds(4)}
                >
                  4+
                </Button>
              </div>
            </div>
            
            <hr />
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleClearFilters}
            >
              Clear All Filters
            </Button>
          </div>
          
          {/* Property Results */}
          <div className="flex-1">
            {/* Results Summary */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {filteredProperties.length} Properties Found
              </h2>
            </div>
            
            {/* Properties Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center border border-estate-neutral-200">
                <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                <p className="text-estate-neutral-600 mb-4">
                  Try adjusting your search criteria to find more properties.
                </p>
                <Button 
                  variant="outline" 
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Properties;
