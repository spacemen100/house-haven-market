import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, SlidersHorizontal, X } from "lucide-react";
import { Property, PropertyType, ListingType } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import PropertyCard from "@/components/PropertyCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPropertiesByType } from "@/lib/api/properties";
import { useQuery } from "@tanstack/react-query";

const Properties = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialListingType = (queryParams.get("type") as ListingType) || "sale";
  const initialSearch = queryParams.get("search") || "";

  // State for basic filters
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [listingType, setListingType] = useState<ListingType>(initialListingType);
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [minBeds, setMinBeds] = useState(0);
  const [minBaths, setMinBaths] = useState(0);
  const [minSqft, setMinSqft] = useState(0);
  const [maxSqft, setMaxSqft] = useState(10000);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [minPriceInput, setMinPriceInput] = useState(minPrice.toString());
  const [maxPriceInput, setMaxPriceInput] = useState(maxPrice.toString());

  // State for advanced filters
  const [features, setFeatures] = useState({
    hasElevator: false,
    hasAirConditioning: false,
    isAccessible: false,
    hasFireplace: false,
    hasInternet: false,
    hasCableTV: false,
    allowsPets: false,
    allowsSmoking: false,
    nearSubway: false,
    nearPark: false,
    nearSchool: false,
    hasParking: false,
    hasGas: false,
    hasLoggia: false,
    hasDishwasher: false,
    hasWashingMachine: false,
  });

  const [condition, setCondition] = useState<string[]>([]);
  const [furnitureType, setFurnitureType] = useState<string[]>([]);
  const [heatingType, setHeatingType] = useState<string[]>([]);
  const [parkingType, setParkingType] = useState<string[]>([]);
  const [buildingMaterial, setBuildingMaterial] = useState<string[]>([]);
  const [kitchenType, setKitchenType] = useState<string[]>([]);

  // Fetch properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties', listingType],
    queryFn: () => getPropertiesByType(listingType),
  });

  // Synchronise les valeurs du slider avec les inputs texte
  useEffect(() => {
    setMinPriceInput(minPrice.toString());
    setMaxPriceInput(maxPrice.toString());
  }, [minPrice, maxPrice]);

  // Gestion des changements dans les inputs texte
  const handleMinPriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setMinPriceInput(value);
    if (value) {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {  
        setMinPrice(Math.min(numValue, maxPrice));
      }
    }
  };

  const handleMaxPriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setMaxPriceInput(value);
    if (value) {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        setMaxPrice(Math.max(numValue, minPrice));
      }
    }
  };

  // Validation lorsque l'input perd le focus
  const handlePriceBlur = () => {
    const min = parseInt(minPriceInput) || 0;
    const max = parseInt(maxPriceInput) || 5000000;
    setMinPrice(Math.min(min, max));
    setMaxPrice(Math.max(min, max));
  };

  // Apply all filters
  useEffect(() => {
    let filtered = [...properties];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(query) ||
        property.address_street.toLowerCase().includes(query) ||
        property.address_city.toLowerCase().includes(query) ||
        property.address_state.toLowerCase().includes(query) ||
        property.address_zip.toLowerCase().includes(query)
      );
    }

    // Property type filter
    if (propertyTypes.length > 0) {
      filtered = filtered.filter(property =>
        propertyTypes.includes(property.property_type)
      );
    }

    // Price filter
    filtered = filtered.filter(property =>
      property.price >= minPrice && property.price <= maxPrice
    );

    // Bedrooms filter
    if (minBeds > 0) {
      filtered = filtered.filter(property => property.beds >= minBeds);
    }

    // Bathrooms filter
    if (minBaths > 0) {
      filtered = filtered.filter(property => property.baths >= minBaths);
    }

    // Square footage filter
    filtered = filtered.filter(property =>
      property.sqft >= minSqft && property.sqft <= maxSqft
    );

    // Features filters
    if (features.hasElevator) {
      filtered = filtered.filter(property => property.has_elevator);
    }
    if (features.hasAirConditioning) {
      filtered = filtered.filter(property => property.has_air_conditioning);
    }
    if (features.isAccessible) {
      filtered = filtered.filter(property => property.is_accessible);
    }
    if (features.hasFireplace) {
      filtered = filtered.filter(property => property.has_fireplace);
    }
    if (features.hasInternet) {
      filtered = filtered.filter(property => property.has_internet);
    }
    if (features.hasCableTV) {
      filtered = filtered.filter(property => property.has_cable_tv);
    }
    if (features.allowsPets) {
      filtered = filtered.filter(property => property.allows_pets);
    }
    if (features.allowsSmoking) {
      filtered = filtered.filter(property => property.allows_smoking);
    }
    if (features.nearSubway) {
      filtered = filtered.filter(property => property.near_subway);
    }
    if (features.nearPark) {
      filtered = filtered.filter(property => property.near_park);
    }
    if (features.nearSchool) {
      filtered = filtered.filter(property => property.near_school);
    }
    if (features.hasParking) {
      filtered = filtered.filter(property => property.parking_type && property.parking_type !== 'none');
    }
    if (features.hasGas) {
      filtered = filtered.filter(property => property.has_gas);
    }
    if (features.hasLoggia) {
      filtered = filtered.filter(property => property.has_loggia);
    }
    if (features.hasDishwasher) {
      filtered = filtered.filter(property => property.has_dishwasher);
    }
    if (features.hasWashingMachine) {
      filtered = filtered.filter(property => property.has_washing_machine);
    }

    // Condition filter
    if (condition.length > 0) {
      filtered = filtered.filter(property => condition.includes(property.condition));
    }

    // Furniture type filter
    if (furnitureType.length > 0) {
      filtered = filtered.filter(property =>
        property.furniture_type && furnitureType.includes(property.furniture_type)
      );
    }

    // Heating type filter
    if (heatingType.length > 0) {
      filtered = filtered.filter(property =>
        property.heating_type && heatingType.includes(property.heating_type)
      );
    }

    // Parking type filter
    if (parkingType.length > 0) {
      filtered = filtered.filter(property =>
        property.parking_type && parkingType.includes(property.parking_type)
      );
    }

    // Building material filter
    if (buildingMaterial.length > 0) {
      filtered = filtered.filter(property =>
        property.building_material && buildingMaterial.includes(property.building_material)
      );
    }

    // Kitchen type filter
    if (kitchenType.length > 0) {
      filtered = filtered.filter(property =>
        property.kitchen_type && kitchenType.includes(property.kitchen_type)
      );
    }

    setFilteredProperties(filtered);
  }, [
    searchQuery, listingType, propertyTypes, minPrice, maxPrice,
    minBeds, minBaths, minSqft, maxSqft, features, condition,
    furnitureType, heatingType, parkingType, buildingMaterial,
    kitchenType, properties
  ]);

  // Update URL when listing type or search changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("type", listingType);
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    navigate(`/properties?${params.toString()}`, { replace: true });
  }, [listingType, searchQuery, navigate]);

  // Handler functions
  const handlePropertyTypeChange = (type: PropertyType) => {
    setPropertyTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleFeatureChange = (feature: keyof typeof features) => {
    setFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
  };

  const handleMultiSelectChange = (
    value: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setState(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleClearFilters = () => {
    setPropertyTypes([]);
    setMinPrice(0);
    setMaxPrice(5000000);
    setMinBeds(0);
    setMinBaths(0);
    setMinSqft(0);
    setMaxSqft(10000);
    setFeatures({
      hasElevator: false,
      hasAirConditioning: false,
      isAccessible: false,
      hasFireplace: false,
      hasInternet: false,
      hasCableTV: false,
      allowsPets: false,
      allowsSmoking: false,
      nearSubway: false,
      nearPark: false,
      nearSchool: false,
      hasParking: false,
      hasGas: false,
      hasLoggia: false,
      hasDishwasher: false,
      hasWashingMachine: false,
    });
    setCondition([]);
    setFurnitureType([]);
    setHeatingType([]);
    setParkingType([]);
    setBuildingMaterial([]);
    setKitchenType([]);
  };

  // Filter options data
  const propertyTypeOptions = [
    { id: "house", label: "Houses" },
    { id: "apartment", label: "Apartments" },
    { id: "land", label: "Land" },
    { id: "commercial", label: "Commercial" },
  ];

  const conditionOptions = [
    { id: "new", label: "New" },
    { id: "good", label: "Good" },
    { id: "needs_renovation", label: "Needs Renovation" },
  ];

  const furnitureOptions = [
    { id: "furnished", label: "Furnished" },
    { id: "partially_furnished", label: "Partially Furnished" },
    { id: "unfurnished", label: "Unfurnished" },
  ];

  const heatingOptions = [
    { id: "central", label: "Central" },
    { id: "electric", label: "Electric" },
    { id: "gas", label: "Gas" },
    { id: "wood", label: "Wood" },
  ];

  const parkingOptions = [
    { id: "garage", label: "Garage" },
    { id: "underground", label: "Underground" },
    { id: "street", label: "Street" },
    { id: "carport", label: "Carport" },
  ];

  const buildingMaterialOptions = [
    { id: "brick", label: "Brick" },
    { id: "concrete", label: "Concrete" },
    { id: "wood", label: "Wood" },
    { id: "steel", label: "Steel" },
  ];

  const kitchenTypeOptions = [
    { id: "open", label: "Open" },
    { id: "closed", label: "Closed" },
    { id: "kitchenette", label: "Kitchenette" },
    { id: "american", label: "American" },
  ];

  // Render filter sections
  const renderPropertyTypeFilter = (prefix = "") => (
    <div className="space-y-2">
      {propertyTypeOptions.map((option) => (
        <div key={`${prefix}${option.id}`} className="flex items-center space-x-2">
          <Checkbox
            id={`${prefix}${option.id}`}
            checked={propertyTypes.includes(option.id as PropertyType)}
            onCheckedChange={() => handlePropertyTypeChange(option.id as PropertyType)}
          />
          <label
            htmlFor={`${prefix}${option.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );

  const renderConditionFilter = (prefix = "") => (
    <div className="space-y-2">
      {conditionOptions.map((option) => (
        <div key={`${prefix}${option.id}`} className="flex items-center space-x-2">
          <Checkbox
            id={`${prefix}${option.id}`}
            checked={condition.includes(option.id)}
            onCheckedChange={() => handleMultiSelectChange(option.id, condition, setCondition)}
          />
          <label
            htmlFor={`${prefix}${option.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );

  const renderFeaturesFilter = (prefix = "") => (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}elevator`}
          checked={features.hasElevator}
          onCheckedChange={() => handleFeatureChange("hasElevator")}
        />
        <label htmlFor={`${prefix}elevator`} className="text-sm">Elevator</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}ac`}
          checked={features.hasAirConditioning}
          onCheckedChange={() => handleFeatureChange("hasAirConditioning")}
        />
        <label htmlFor={`${prefix}ac`} className="text-sm">Air Conditioning</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}accessible`}
          checked={features.isAccessible}
          onCheckedChange={() => handleFeatureChange("isAccessible")}
        />
        <label htmlFor={`${prefix}accessible`} className="text-sm">Accessible</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}fireplace`}
          checked={features.hasFireplace}
          onCheckedChange={() => handleFeatureChange("hasFireplace")}
        />
        <label htmlFor={`${prefix}fireplace`} className="text-sm">Fireplace</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}internet`}
          checked={features.hasInternet}
          onCheckedChange={() => handleFeatureChange("hasInternet")}
        />
        <label htmlFor={`${prefix}internet`} className="text-sm">Internet</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}cable-tv`}
          checked={features.hasCableTV}
          onCheckedChange={() => handleFeatureChange("hasCableTV")}
        />
        <label htmlFor={`${prefix}cable-tv`} className="text-sm">Cable TV</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}pets`}
          checked={features.allowsPets}
          onCheckedChange={() => handleFeatureChange("allowsPets")}
        />
        <label htmlFor={`${prefix}pets`} className="text-sm">Pets Allowed</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}smoking`}
          checked={features.allowsSmoking}
          onCheckedChange={() => handleFeatureChange("allowsSmoking")}
        />
        <label htmlFor={`${prefix}smoking`} className="text-sm">Smoking Allowed</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}gas`}
          checked={features.hasGas}
          onCheckedChange={() => handleFeatureChange("hasGas")}
        />
        <label htmlFor={`${prefix}gas`} className="text-sm">Gas</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}loggia`}
          checked={features.hasLoggia}
          onCheckedChange={() => handleFeatureChange("hasLoggia")}
        />
        <label htmlFor={`${prefix}loggia`} className="text-sm">Loggia</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}dishwasher`}
          checked={features.hasDishwasher}
          onCheckedChange={() => handleFeatureChange("hasDishwasher")}
        />
        <label htmlFor={`${prefix}dishwasher`} className="text-sm">Dishwasher</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}washing-machine`}
          checked={features.hasWashingMachine}
          onCheckedChange={() => handleFeatureChange("hasWashingMachine")}
        />
        <label htmlFor={`${prefix}washing-machine`} className="text-sm">Washing Machine</label>
      </div>
    </div>
  );

  const renderNearbyFilter = (prefix = "") => (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}subway`}
          checked={features.nearSubway}
          onCheckedChange={() => handleFeatureChange("nearSubway")}
        />
        <label htmlFor={`${prefix}subway`} className="text-sm">Subway</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}park`}
          checked={features.nearPark}
          onCheckedChange={() => handleFeatureChange("nearPark")}
        />
        <label htmlFor={`${prefix}park`} className="text-sm">Park</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}school`}
          checked={features.nearSchool}
          onCheckedChange={() => handleFeatureChange("nearSchool")}
        />
        <label htmlFor={`${prefix}school`} className="text-sm">School</label>
      </div>
    </div>
  );

  const renderMultiSelectFilter = (
    options: { id: string; label: string }[],
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    title: string,
    prefix = ""
  ) => (
    <div className="space-y-2">
      <h4 className="font-medium">{title}</h4>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={`${prefix}${option.id}`} className="flex items-center space-x-2">
            <Checkbox
              id={`${prefix}${option.id}`}
              checked={selected.includes(option.id)}
              onCheckedChange={() => handleMultiSelectChange(option.id, selected, setSelected)}
            />
            <label
              htmlFor={`${prefix}${option.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  // Mobile filters drawer
  const renderMobileFilters = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden ${isFilterOpen ? 'block' : 'hidden'}`}>
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
            {renderPropertyTypeFilter("mobile-")}
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <h4 className="font-medium">Price Range</h4>
            <div className="px-2">
              <Slider
                value={[minPrice, maxPrice]}
                max={5000000}
                step={100000}
                onValueChange={(values) => {
                  setMinPrice(values[0]);
                  setMaxPrice(values[1]);
                }}
              />
            </div>
            <div className="flex justify-between gap-2 mt-2">
              <div className="flex items-center gap-1">
                <span className="text-sm">$</span>
                <input
                  type="text"
                  value={minPriceInput}
                  onChange={handleMinPriceInputChange}
                  onBlur={handlePriceBlur}
                  className="w-20 border rounded px-2 py-1 text-sm"
                />
              </div>
              <span className="text-sm">to</span>
              <div className="flex items-center gap-1">
                <span className="text-sm">$</span>
                <input
                  type="text"
                  value={maxPriceInput}
                  onChange={handleMaxPriceInputChange}
                  onBlur={handlePriceBlur}
                  className="w-20 border rounded px-2 py-1 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Square Footage */}
          <div className="space-y-3">
            <h3 className="font-medium">Square Footage</h3>
            <div className="px-2">
              <Slider
                defaultValue={[minSqft, maxSqft]}
                max={10000}
                step={100}
                onValueChange={(values) => {
                  setMinSqft(values[0]);
                  setMaxSqft(values[1]);
                }}
              />
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>{minSqft.toLocaleString()} sqft</span>
              <span>{maxSqft.toLocaleString()} sqft</span>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="space-y-3">
            <h3 className="font-medium">Bedrooms</h3>
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3, 4].map(num => (
                <Button
                  key={`mobile-beds-${num}`}
                  variant={minBeds === num ? "default" : "outline"}
                  className={minBeds === num ? "bg-teal-500 hover:bg-teal-600" : ""}
                  size="sm"
                  onClick={() => setMinBeds(num)}
                >
                  {num === 0 ? "Any" : `${num}+`}
                </Button>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div className="space-y-3">
            <h3 className="font-medium">Bathrooms</h3>
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3].map(num => (
                <Button
                  key={`mobile-baths-${num}`}
                  variant={minBaths === num ? "default" : "outline"}
                  className={minBaths === num ? "bg-teal-500 hover:bg-teal-600" : ""}
                  size="sm"
                  onClick={() => setMinBaths(num)}
                >
                  {num === 0 ? "Any" : `${num}+`}
                </Button>
              ))}
            </div>
          </div>

          {/* Property Condition */}
          <div className="space-y-3">
            <h3 className="font-medium">Property Condition</h3>
            {renderConditionFilter("mobile-")}
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="font-medium">Features</h3>
            {renderFeaturesFilter("mobile-")}
          </div>

          {/* Nearby */}
          <div className="space-y-3">
            <h3 className="font-medium">Nearby</h3>
            {renderNearbyFilter("mobile-")}
          </div>

          {/* Furniture Type */}
          {renderMultiSelectFilter(
            furnitureOptions,
            furnitureType,
            setFurnitureType,
            "Furniture Type",
            "mobile-"
          )}

          {/* Heating Type */}
          {renderMultiSelectFilter(
            heatingOptions,
            heatingType,
            setHeatingType,
            "Heating Type",
            "mobile-"
          )}

          {/* Parking Type */}
          {renderMultiSelectFilter(
            parkingOptions,
            parkingType,
            setParkingType,
            "Parking Type",
            "mobile-"
          )}

          {/* Building Material */}
          {renderMultiSelectFilter(
            buildingMaterialOptions,
            buildingMaterial,
            setBuildingMaterial,
            "Building Material",
            "mobile-"
          )}

          {/* Kitchen Type */}
          {renderMultiSelectFilter(
            kitchenTypeOptions,
            kitchenType,
            setKitchenType,
            "Kitchen Type",
            "mobile-"
          )}

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
  );

  // Desktop filters sidebar
  const renderDesktopFilters = () => (
    <div className="hidden lg:block w-80 h-fit bg-white rounded-lg p-6 shadow-sm border border-estate-neutral-100 space-y-6 sticky top-4">
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
        {renderPropertyTypeFilter()}
      </div>

      <hr />

      {/* Price Range */}
      <div className="space-y-3">
        <h3 className="font-medium">Price Range</h3>
        <div className="px-2">
          <Slider
            value={[minPrice, maxPrice]}
            max={5000000}
            step={100000}
            onValueChange={(values) => {
              setMinPrice(values[0]);
              setMaxPrice(values[1]);
            }}
          />
        </div>
        <div className="flex justify-between gap-2 mt-2">
          <div className="flex items-center gap-1">
            <span className="text-sm">$</span>
            <input
              type="text"
              value={minPriceInput}
              onChange={handleMinPriceInputChange}
              onBlur={handlePriceBlur}
              className="w-20 border rounded px-2 py-1 text-sm"
            />
          </div>
          <span className="text-sm">to</span>
          <div className="flex items-center gap-1">
            <span className="text-sm">$</span>
            <input
              type="text"
              value={maxPriceInput}
              onChange={handleMaxPriceInputChange}
              onBlur={handlePriceBlur}
              className="w-20 border rounded px-2 py-1 text-sm"
            />
          </div>
        </div>
      </div>

      <hr />

      {/* Square Footage */}
      <div className="space-y-3">
        <h4 className="font-medium">Square Footage</h4>
        <div className="px-2">
          <Slider
            defaultValue={[minSqft, maxSqft]}
            max={10000}
            step={100}
            onValueChange={(values) => {
              setMinSqft(values[0]);
              setMaxSqft(values[1]);
            }}
          />
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span>{minSqft.toLocaleString()} sqft</span>
          <span>{maxSqft.toLocaleString()} sqft</span>
        </div>
      </div>

      <hr />

      {/* Bedrooms */}
      <div className="space-y-3">
        <h4 className="font-medium">Bedrooms</h4>
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2, 3, 4].map(num => (
            <Button
              key={`beds-${num}`}
              variant={minBeds === num ? "default" : "outline"}
              className={minBeds === num ? "bg-teal-500 hover:bg-teal-600" : ""}
              size="sm"
              onClick={() => setMinBeds(num)}
            >
              {num === 0 ? "Any" : `${num}+`}
            </Button>
          ))}
        </div>
      </div>

      <hr />

      {/* Bathrooms */}
      <div className="space-y-3">
        <h4 className="font-medium">Bathrooms</h4>
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2, 3].map(num => (
            <Button
              key={`baths-${num}`}
              variant={minBaths === num ? "default" : "outline"}
              className={minBaths === num ? "bg-teal-500 hover:bg-teal-600" : ""}
              size="sm"
              onClick={() => setMinBaths(num)}
            >
              {num === 0 ? "Any" : `${num}+`}
            </Button>
          ))}
        </div>
      </div>

      <hr />

      {/* Property Condition */}
      <div className="space-y-3">
        <h4 className="font-medium">Property Condition</h4>
        {renderConditionFilter()}
      </div>

      <hr />

      {/* Features */}
      <div className="space-y-3">
        <h4 className="font-medium">Features</h4>
        {renderFeaturesFilter()}
      </div>

      <hr />

      {/* Nearby */}
      <div className="space-y-3">
        <h4 className="font-medium">Nearby</h4>
        {renderNearbyFilter()}
      </div>

      <hr />

      {/* Furniture Type */}
      {renderMultiSelectFilter(
        furnitureOptions,
        furnitureType,
        setFurnitureType,
        "Furniture Type"
      )}

      <hr />

      {/* Heating Type */}
      {renderMultiSelectFilter(
        heatingOptions,
        heatingType,
        setHeatingType,
        "Heating Type"
      )}

      <hr />

      {/* Parking Type */}
      {renderMultiSelectFilter(
        parkingOptions,
        parkingType,
        setParkingType,
        "Parking Type"
      )}

      <hr />

      {/* Building Material */}
      {renderMultiSelectFilter(
        buildingMaterialOptions,
        buildingMaterial,
        setBuildingMaterial,
        "Building Material"
      )}

      <hr />

      {/* Kitchen Type */}
      {renderMultiSelectFilter(
        kitchenTypeOptions,
        kitchenType,
        setKitchenType,
        "Kitchen Type"
      )}

      <hr />

      <Button
        variant="outline"
        className="w-full"
        onClick={handleClearFilters}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div>
      <Navbar />

      {/* Hero Search Section */}
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

      {/* Main Content */}
      <div className="container py-8">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Mobile filter toggle */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">
              {filteredProperties.length} Properties Found
            </div>
            <Button
              variant="outline"
              className="flex gap-2 items-center"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter size={18} />
              <span>Filters</span>
            </Button>
          </div>

          {/* Mobile Filters */}
          {renderMobileFilters()}

          {/* Desktop Filters */}
          {renderDesktopFilters()}

          {/* Properties Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {isLoading ? "Loading..." : `${filteredProperties.length} Properties Found`}
              </h2>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="animate-pulse">
                    <div className="bg-gray-200 h-56 rounded-lg mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProperties.length > 0 ? (
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
                <Button variant="outline" onClick={handleClearFilters}>
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
