import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, SlidersHorizontal, X } from "lucide-react";
import { Property, PropertyType, ListingType } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
  const [listingType, setListingType] = useState<"sale" | "rent" | "rent_by_day" | "lease">(initialListingType as "sale" | "rent" | "rent_by_day");
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [minBeds, setMinBeds] = useState(0);
  const [minBaths, setMinBaths] = useState(0);
  const [minM2, setMinM2] = useState(0);
  const [maxM2, setMaxM2] = useState(500);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [minPriceInput, setMinPriceInput] = useState(minPrice.toString());
  const [maxPriceInput, setMaxPriceInput] = useState(maxPrice.toString());
  const [minM2Input, setMinM2Input] = useState(minM2.toString());
  const [maxM2Input, setMaxM2Input] = useState(maxM2.toString());
  const [sortOption, setSortOption] = useState<string>("recent");
  const [currency, setCurrency] = useState<string>('USD');

  const currencyOptions = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GEL', label: 'Georgian Lari (₾)' },
  ];

  const formatPrice = (price: number, currency: string) => {
    let locale = 'en-US';
    if (currency === 'EUR') locale = 'fr-FR';
    if (currency === 'GEL') locale = 'ka-GE';

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: currency === 'GEL' ? 2 : 0
    }).format(price);
  };

  // Buttons de type de listing
  const listingTypeButtons = [
    { value: "sale", label: "For Sale" },
    { value: "rent", label: "For Rent" },
    { value: "rent_by_day", label: "Daily Rent" },
    { value: "lease", label: "Commercial Lease" }
  ];

  const handleListingTypeChange = (value: "sale" | "rent" | "rent_by_day" | "lease") => {
    setListingType(value);
  };

  const renderListingTypeFilter = () => (
    <RadioGroup
      value={listingType}
      onValueChange={(value: "sale" | "rent" | "rent_by_day") => handleListingTypeChange(value)}
      className="flex flex-col space-y-1"
    >
      {listingTypeButtons.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={`listing-type-${option.value}`} />
          <Label htmlFor={`listing-type-${option.value}`}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );

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
    hasGasStove: false,
    hasVent: false,
    hasElectricKettle: false,
    hasInductionOven: false,
    hasMicrowave: false,
    hasTv: false,
    hasCoffeeMachine: false,
    hasAudioSystem: false,
    hasHeater: false,
    hasElectricOven: false,
    hasHairDryer: false,
    hasCinema: false,
    hasRefrigerator: false,
    hasVacuumCleaner: false,
    hasDryer: false,
    hasIron: false,
    hasCoDetector: false,
    hasSmokeDetector: false,
    hasEvacuationLadder: false,
    hasFireFightingSystem: false,
    hasPerimeterCameras: false,
    hasAlarm: false,
    hasLiveProtection: false,
    hasLockedEntrance: false,
    hasLockedYard: false,
    nearBusStop: false,
    nearBank: false,
    nearSupermarket: false,
    nearKindergarten: false,
    nearCityCenter: false,
    nearPharmacy: false,
    nearGreenery: false,
    nearOldDistrict: false,
    hasSatelliteTv: false,
    hasPhoneLine: false,
  });

  const [condition, setCondition] = useState<string[]>([]);
  const [furnitureType, setFurnitureType] = useState<string[]>([]);
  const [heatingType, setHeatingType] = useState<string[]>([]);
  const [parkingType, setParkingType] = useState<string[]>([]);
  const [buildingMaterial, setBuildingMaterial] = useState<string[]>([]);
  const [kitchenType, setKitchenType] = useState<string[]>([]);

  const sortOptions = [
    { value: "recent", label: "Most Recent" },
    { value: "oldest", label: "Oldest" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "m2-asc", label: "Surface: Small to Large" },
    { value: "m2-desc", label: "Surface: Large to Small" },
  ];

  const sortProperties = (properties: Property[]) => {
    const sorted = [...properties];

    const parseDate = (dateStr: string | undefined): number => {
      if (!dateStr) return 0;
      if (/^\d+$/.test(dateStr)) {
        return parseInt(dateStr);
      }
      try {
        return new Date(dateStr).getTime();
      } catch (e) {
        return 0;
      }
    };

    switch (sortOption) {
      case "recent":
        return sorted.sort((a, b) => parseDate(b.created_at) - parseDate(a.created_at));
      case "oldest":
        return sorted.sort((a, b) => parseDate(a.created_at) - parseDate(b.created_at));
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "m2-asc":
        return sorted.sort((a, b) => (a.m2 || 0) - (b.m2 || 0));
      case "m2-desc":
        return sorted.sort((a, b) => (b.m2 || 0) - (a.m2 || 0));
      default:
        return sorted;
    }
  };

  // Fetch properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties', listingType],
    queryFn: () => getPropertiesByType(listingType),
  });

  useEffect(() => {
    setMinPriceInput(minPrice.toString());
    setMaxPriceInput(maxPrice.toString());
  }, [minPrice, maxPrice]);

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

  const handlePriceBlur = () => {
    const min = parseInt(minPriceInput) || 0;
    const max = parseInt(maxPriceInput) || 5000000;
    setMinPrice(Math.min(min, max));
    setMaxPrice(Math.max(min, max));
  };

  useEffect(() => {
    setMinM2Input(minM2.toString());
    setMaxM2Input(maxM2.toString());
  }, [minM2, maxM2]);

  const handleMinM2InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setMinM2Input(value);
    if (value) {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        setMinM2(Math.min(numValue, maxM2));
      }
    }
  };

  const handleMaxM2InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setMaxM2Input(value);
    if (value) {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        setMaxM2(Math.max(numValue, minM2));
      }
    }
  };

  const handleM2Blur = () => {
    const min = parseInt(minM2Input) || 0;
    const max = parseInt(maxM2Input) || 500;
    setMinM2(Math.min(min, max));
    setMaxM2(Math.max(min, max));
  };

// Apply all filters
useEffect(() => {
  let filtered = [...properties];

  // Search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(property => {
      const title = property.title || '';
      const addressStreet = property.address_street || '';
      const addressCity = property.address_city || '';
      const addressState = property.address_state || '';
      const addressZip = property.address_zip || '';

      return (
        title.toLowerCase().includes(query) ||
        addressStreet.toLowerCase().includes(query) ||
        addressCity.toLowerCase().includes(query) ||
        addressState.toLowerCase().includes(query) ||
        addressZip.toLowerCase().includes(query)
      );
    });
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

  filtered = filtered.filter(property =>
    property.m2 >= minM2 && property.m2 <= maxM2
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
  if (features.hasGasStove) {
    filtered = filtered.filter(property => property.has_gas_stove);
  }
  if (features.hasVent) {
    filtered = filtered.filter(property => property.has_vent);
  }
  if (features.hasElectricKettle) {
    filtered = filtered.filter(property => property.has_electric_kettle);
  }
  if (features.hasInductionOven) {
    filtered = filtered.filter(property => property.has_induction_oven);
  }
  if (features.hasMicrowave) {
    filtered = filtered.filter(property => property.has_microwave);
  }
  if (features.hasTv) {
    filtered = filtered.filter(property => property.has_tv);
  }
  if (features.hasCoffeeMachine) {
    filtered = filtered.filter(property => property.has_coffee_machine);
  }
  if (features.hasAudioSystem) {
    filtered = filtered.filter(property => property.has_audio_system);
  }
  if (features.hasHeater) {
    filtered = filtered.filter(property => property.has_heater);
  }
  if (features.hasElectricOven) {
    filtered = filtered.filter(property => property.has_electric_oven);
  }
  if (features.hasHairDryer) {
    filtered = filtered.filter(property => property.has_hair_dryer);
  }
  if (features.hasCinema) {
    filtered = filtered.filter(property => property.has_cinema);
  }
  if (features.hasRefrigerator) {
    filtered = filtered.filter(property => property.has_refrigerator);
  }
  if (features.hasVacuumCleaner) {
    filtered = filtered.filter(property => property.has_vacuum_cleaner);
  }
  if (features.hasDryer) {
    filtered = filtered.filter(property => property.has_dryer);
  }
  if (features.hasIron) {
    filtered = filtered.filter(property => property.has_iron);
  }
  if (features.hasCoDetector) {
    filtered = filtered.filter(property => property.has_co_detector);
  }
  if (features.hasSmokeDetector) {
    filtered = filtered.filter(property => property.has_smoke_detector);
  }
  if (features.hasEvacuationLadder) {
    filtered = filtered.filter(property => property.has_evacuation_ladder);
  }
  if (features.hasFireFightingSystem) {
    filtered = filtered.filter(property => property.has_fire_fighting_system);
  }
  if (features.hasPerimeterCameras) {
    filtered = filtered.filter(property => property.has_perimeter_cameras);
  }
  if (features.hasAlarm) {
    filtered = filtered.filter(property => property.has_alarm);
  }
  if (features.hasLiveProtection) {
    filtered = filtered.filter(property => property.has_live_protection);
  }
  if (features.hasLockedEntrance) {
    filtered = filtered.filter(property => property.has_locked_entrance);
  }
  if (features.hasLockedYard) {
    filtered = filtered.filter(property => property.has_locked_yard);
  }
  if (features.nearBusStop) {
    filtered = filtered.filter(property => property.near_bus_stop);
  }
  if (features.nearBank) {
    filtered = filtered.filter(property => property.near_bank);
  }
  if (features.nearSupermarket) {
    filtered = filtered.filter(property => property.near_supermarket);
  }
  if (features.nearKindergarten) {
    filtered = filtered.filter(property => property.near_kindergarten);
  }
  if (features.nearCityCenter) {
    filtered = filtered.filter(property => property.near_city_center);
  }
  if (features.nearPharmacy) {
    filtered = filtered.filter(property => property.near_pharmacy);
  }
  if (features.nearGreenery) {
    filtered = filtered.filter(property => property.near_greenery);
  }
  if (features.nearOldDistrict) {
    filtered = filtered.filter(property => property.near_old_district);
  }
  if (features.hasSatelliteTv) {
    filtered = filtered.filter(property => property.has_satellite_tv);
  }
  if (features.hasPhoneLine) {
    filtered = filtered.filter(property => property.has_phone_line);
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

  // Appliquer le tri final avant de mettre à jour l'état
  const sortedProperties = sortProperties(filtered);
  setFilteredProperties(sortedProperties);

}, [
  searchQuery, listingType, propertyTypes, minPrice, maxPrice,
  minBeds, minBaths, minM2, maxM2, features, condition,
  furnitureType, heatingType, parkingType, buildingMaterial,
  kitchenType, properties, sortOption
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
    setMinM2(0);
    setMaxM2(500);
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
      hasGasStove: false,
      hasVent: false,
      hasElectricKettle: false,
      hasInductionOven: false,
      hasMicrowave: false,
      hasTv: false,
      hasCoffeeMachine: false,
      hasAudioSystem: false,
      hasHeater: false,
      hasElectricOven: false,
      hasHairDryer: false,
      hasCinema: false,
      hasRefrigerator: false,
      hasVacuumCleaner: false,
      hasDryer: false,
      hasIron: false,
      hasCoDetector: false,
      hasSmokeDetector: false,
      hasEvacuationLadder: false,
      hasFireFightingSystem: false,
      hasPerimeterCameras: false,
      hasAlarm: false,
      hasLiveProtection: false,
      hasLockedEntrance: false,
      hasLockedYard: false,
      nearBusStop: false,
      nearBank: false,
      nearSupermarket: false,
      nearKindergarten: false,
      nearCityCenter: false,
      nearPharmacy: false,
      nearGreenery: false,
      nearOldDistrict: false,
      hasSatelliteTv: false,
      hasPhoneLine: false,
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
    { id: "house", label: "House" },
    { id: "apartment", label: "Apartment" },
    { id: "land", label: "Land" },
    { id: "commercial", label: "Commercial" },
  ];

  const conditionOptions = [
    { id: "newly_renovated", label: "Newly Renovated" },
    { id: "under_renovation", label: "Under Renovation" },
    { id: "white_frame", label: "White Frame" },
    { id: "green_frame", label: "Green Frame" },
    { id: "not_renovated", label: "Not Renovated" },
    { id: "black_frame", label: "Black Frame" },
    { id: "old_renovation", label: "Old Renovation" },
  ];

  const furnitureOptions = [
    { id: "furnished", label: "Furnished" },
    { id: "semi_furnished", label: "Semi-Furnished" },
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
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}gas-stove`}
          checked={features.hasGasStove}
          onCheckedChange={() => handleFeatureChange("hasGasStove")}
        />
        <label htmlFor={`${prefix}gas-stove`} className="text-sm">Gas Stove</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}vent`}
          checked={features.hasVent}
          onCheckedChange={() => handleFeatureChange("hasVent")}
        />
        <label htmlFor={`${prefix}vent`} className="text-sm">Vent</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}electric-kettle`}
          checked={features.hasElectricKettle}
          onCheckedChange={() => handleFeatureChange("hasElectricKettle")}
        />
        <label htmlFor={`${prefix}electric-kettle`} className="text-sm">Electric Kettle</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}induction-oven`}
          checked={features.hasInductionOven}
          onCheckedChange={() => handleFeatureChange("hasInductionOven")}
        />
        <label htmlFor={`${prefix}induction-oven`} className="text-sm">Induction Oven</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}microwave`}
          checked={features.hasMicrowave}
          onCheckedChange={() => handleFeatureChange("hasMicrowave")}
        />
        <label htmlFor={`${prefix}microwave`} className="text-sm">Microwave</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}tv`}
          checked={features.hasTv}
          onCheckedChange={() => handleFeatureChange("hasTv")}
        />
        <label htmlFor={`${prefix}tv`} className="text-sm">TV</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}coffee-machine`}
          checked={features.hasCoffeeMachine}
          onCheckedChange={() => handleFeatureChange("hasCoffeeMachine")}
        />
        <label htmlFor={`${prefix}coffee-machine`} className="text-sm">Coffee Machine</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}audio-system`}
          checked={features.hasAudioSystem}
          onCheckedChange={() => handleFeatureChange("hasAudioSystem")}
        />
        <label htmlFor={`${prefix}audio-system`} className="text-sm">Audio System</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}heater`}
          checked={features.hasHeater}
          onCheckedChange={() => handleFeatureChange("hasHeater")}
        />
        <label htmlFor={`${prefix}heater`} className="text-sm">Heater</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}electric-oven`}
          checked={features.hasElectricOven}
          onCheckedChange={() => handleFeatureChange("hasElectricOven")}
        />
        <label htmlFor={`${prefix}electric-oven`} className="text-sm">Electric Oven</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}hair-dryer`}
          checked={features.hasHairDryer}
          onCheckedChange={() => handleFeatureChange("hasHairDryer")}
        />
        <label htmlFor={`${prefix}hair-dryer`} className="text-sm">Hair Dryer</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}cinema`}
          checked={features.hasCinema}
          onCheckedChange={() => handleFeatureChange("hasCinema")}
        />
        <label htmlFor={`${prefix}cinema`} className="text-sm">Cinema</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}refrigerator`}
          checked={features.hasRefrigerator}
          onCheckedChange={() => handleFeatureChange("hasRefrigerator")}
        />
        <label htmlFor={`${prefix}refrigerator`} className="text-sm">Refrigerator</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}vacuum-cleaner`}
          checked={features.hasVacuumCleaner}
          onCheckedChange={() => handleFeatureChange("hasVacuumCleaner")}
        />
        <label htmlFor={`${prefix}vacuum-cleaner`} className="text-sm">Vacuum Cleaner</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}dryer`}
          checked={features.hasDryer}
          onCheckedChange={() => handleFeatureChange("hasDryer")}
        />
        <label htmlFor={`${prefix}dryer`} className="text-sm">Dryer</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}iron`}
          checked={features.hasIron}
          onCheckedChange={() => handleFeatureChange("hasIron")}
        />
        <label htmlFor={`${prefix}iron`} className="text-sm">Iron</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}co-detector`}
          checked={features.hasCoDetector}
          onCheckedChange={() => handleFeatureChange("hasCoDetector")}
        />
        <label htmlFor={`${prefix}co-detector`} className="text-sm">CO Detector</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}smoke-detector`}
          checked={features.hasSmokeDetector}
          onCheckedChange={() => handleFeatureChange("hasSmokeDetector")}
        />
        <label htmlFor={`${prefix}smoke-detector`} className="text-sm">Smoke Detector</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}evacuation-ladder`}
          checked={features.hasEvacuationLadder}
          onCheckedChange={() => handleFeatureChange("hasEvacuationLadder")}
        />
        <label htmlFor={`${prefix}evacuation-ladder`} className="text-sm">Evacuation Ladder</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}fire-fighting-system`}
          checked={features.hasFireFightingSystem}
          onCheckedChange={() => handleFeatureChange("hasFireFightingSystem")}
        />
        <label htmlFor={`${prefix}fire-fighting-system`} className="text-sm">Fire Fighting System</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}perimeter-cameras`}
          checked={features.hasPerimeterCameras}
          onCheckedChange={() => handleFeatureChange("hasPerimeterCameras")}
        />
        <label htmlFor={`${prefix}perimeter-cameras`} className="text-sm">Perimeter Cameras</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}alarm`}
          checked={features.hasAlarm}
          onCheckedChange={() => handleFeatureChange("hasAlarm")}
        />
        <label htmlFor={`${prefix}alarm`} className="text-sm">Alarm</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}live-protection`}
          checked={features.hasLiveProtection}
          onCheckedChange={() => handleFeatureChange("hasLiveProtection")}
        />
        <label htmlFor={`${prefix}live-protection`} className="text-sm">Live Protection</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}locked-entrance`}
          checked={features.hasLockedEntrance}
          onCheckedChange={() => handleFeatureChange("hasLockedEntrance")}
        />
        <label htmlFor={`${prefix}locked-entrance`} className="text-sm">Locked Entrance</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}locked-yard`}
          checked={features.hasLockedYard}
          onCheckedChange={() => handleFeatureChange("hasLockedYard")}
        />
        <label htmlFor={`${prefix}locked-yard`} className="text-sm">Locked Yard</label>
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
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}bus-stop`}
          checked={features.nearBusStop}
          onCheckedChange={() => handleFeatureChange("nearBusStop")}
        />
        <label htmlFor={`${prefix}bus-stop`} className="text-sm">Bus Stop</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}bank`}
          checked={features.nearBank}
          onCheckedChange={() => handleFeatureChange("nearBank")}
        />
        <label htmlFor={`${prefix}bank`} className="text-sm">Bank</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}supermarket`}
          checked={features.nearSupermarket}
          onCheckedChange={() => handleFeatureChange("nearSupermarket")}
        />
        <label htmlFor={`${prefix}supermarket`} className="text-sm">Supermarket</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}kindergarten`}
          checked={features.nearKindergarten}
          onCheckedChange={() => handleFeatureChange("nearKindergarten")}
        />
        <label htmlFor={`${prefix}kindergarten`} className="text-sm">Kindergarten</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}city-center`}
          checked={features.nearCityCenter}
          onCheckedChange={() => handleFeatureChange("nearCityCenter")}
        />
        <label htmlFor={`${prefix}city-center`} className="text-sm">City Center</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}pharmacy`}
          checked={features.nearPharmacy}
          onCheckedChange={() => handleFeatureChange("nearPharmacy")}
        />
        <label htmlFor={`${prefix}pharmacy`} className="text-sm">Pharmacy</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}greenery`}
          checked={features.nearGreenery}
          onCheckedChange={() => handleFeatureChange("nearGreenery")}
        />
        <label htmlFor={`${prefix}greenery`} className="text-sm">Greenery</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}old-district`}
          checked={features.nearOldDistrict}
          onCheckedChange={() => handleFeatureChange("nearOldDistrict")}
        />
        <label htmlFor={`${prefix}old-district`} className="text-sm">Old District</label>
      </div>
    </div>
  );

  const renderAdditionalFeaturesFilter = (prefix = "") => (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}satellite-tv`}
          checked={features.hasSatelliteTv}
          onCheckedChange={() => handleFeatureChange("hasSatelliteTv")}
        />
        <label htmlFor={`${prefix}satellite-tv`} className="text-sm">Satellite TV</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${prefix}phone-line`}
          checked={features.hasPhoneLine}
          onCheckedChange={() => handleFeatureChange("hasPhoneLine")}
        />
        <label htmlFor={`${prefix}phone-line`} className="text-sm">Phone Line</label>
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
            {renderListingTypeFilter()}
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

          <div className="space-y-3">
            <h4 className="font-medium">Currency</h4>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              {currencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Surface (m²) */}
          <div className="space-y-3">
            <h3 className="font-medium">Surface (m²)</h3>
            <div className="px-2">
              <Slider
                value={[minM2, maxM2]}
                max={500}
                step={10}
                onValueChange={(values) => {
                  setMinM2(values[0]);
                  setMaxM2(values[1]);
                }}
              />
            </div>
            <div className="flex justify-between gap-2 mt-2">
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={minM2Input}
                  onChange={handleMinM2InputChange}
                  onBlur={handleM2Blur}
                  className="w-20 border rounded px-2 py-1 text-sm"
                />
                <span className="text-sm">m²</span>
              </div>
              <span className="text-sm">to</span>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={maxM2Input}
                  onChange={handleMaxM2InputChange}
                  onBlur={handleM2Blur}
                  className="w-20 border rounded px-2 py-1 text-sm"
                />
                <span className="text-sm">m²</span>
              </div>
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

          {/* Additional Features */}
          <div className="space-y-3">
            <h3 className="font-medium">Additional Features</h3>
            {renderAdditionalFeaturesFilter("mobile-")}
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
        {renderListingTypeFilter()}
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

      {/* Surface (m²) */}
      <div className="space-y-3">
        <h4 className="font-medium">Surface (m²)</h4>
        <div className="px-2">
          <Slider
            value={[minM2, maxM2]}
            max={500}
            step={10}
            onValueChange={(values) => {
              setMinM2(values[0]);
              setMaxM2(values[1]);
            }}
          />
        </div>
        <div className="flex justify-between gap-2 mt-2">
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={minM2Input}
              onChange={handleMinM2InputChange}
              onBlur={handleM2Blur}
              className="w-20 border rounded px-2 py-1 text-sm"
            />
            <span className="text-sm">m²</span>
          </div>
          <span className="text-sm">to</span>
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={maxM2Input}
              onChange={handleMaxM2InputChange}
              onBlur={handleM2Blur}
              className="w-20 border rounded px-2 py-1 text-sm"
            />
            <span className="text-sm">m²</span>
          </div>
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

      {/* Additional Features */}
      <div className="space-y-3">
        <h4 className="font-medium">Additional Features</h4>
        {renderAdditionalFeaturesFilter()}
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
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white border border-estate-neutral-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-estate-neutral-500">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
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
