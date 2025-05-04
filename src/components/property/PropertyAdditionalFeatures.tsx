
import { Property } from "@/types/property";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PropertyAdditionalFeaturesProps {
  property: Property;
}

const PropertyAdditionalFeatures = ({ property }: PropertyAdditionalFeaturesProps) => {
  const { t } = useTranslation();
  
  const features = [
    { label: t("elevator"), value: property.hasElevator },
    { label: t("ventilation"), value: property.hasVentilation },
    { label: t("airConditioning"), value: property.hasAirConditioning },
    { label: t("accessible"), value: property.isAccessible },
  ].filter(feature => feature.value);

  const hasEquipment = property.equipment && property.equipment.length > 0;
  const hasInternetTV = property.internetTV && property.internetTV.length > 0;
  const hasStorage = property.storage && property.storage.length > 0;
  const hasSecurity = property.security && property.security.length > 0;
  const hasNearbyPlaces = property.nearbyPlaces && property.nearbyPlaces.length > 0;

  if (!features.length && !hasEquipment && !hasInternetTV && !hasStorage && !hasSecurity && !hasNearbyPlaces) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-estate-800 mb-4">{t("additionalFeatures")}</h2>
      <div className="bg-white rounded-lg p-6 shadow-sm border border-estate-neutral-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.length > 0 && (
            <div>
              <h3 className="font-medium mb-3">{t("generalFeatures")}</h3>
              <div className="grid grid-cols-1 gap-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check size={18} className="text-teal-500" />
                    <span>{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasEquipment && (
            <div>
              <h3 className="font-medium mb-3">{t("equipment")}</h3>
              <div className="grid grid-cols-1 gap-2">
                {property.equipment?.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check size={18} className="text-teal-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasInternetTV && (
            <div>
              <h3 className="font-medium mb-3">{t("internetTV")}</h3>
              <div className="grid grid-cols-1 gap-2">
                {property.internetTV?.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check size={18} className="text-teal-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasSecurity && (
            <div>
              <h3 className="font-medium mb-3">{t("security")}</h3>
              <div className="grid grid-cols-1 gap-2">
                {property.security?.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check size={18} className="text-teal-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasNearbyPlaces && (
            <div>
              <h3 className="font-medium mb-3">{t("nearbyPlaces")}</h3>
              <div className="grid grid-cols-1 gap-2">
                {property.nearbyPlaces?.map((place, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check size={18} className="text-teal-500" />
                    <span>{place}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyAdditionalFeatures;
