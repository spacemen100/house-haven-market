import PropertyCard from "@/components/PropertyCard";
import { getFeaturedProperties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FeaturedProperties = () => {
  const { t } = useTranslation();
  const featuredProperties = getFeaturedProperties();

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-estate-800 mb-2">
              {t('featuredProperties')}
            </h2>
            <p className="text-estate-neutral-600 max-w-2xl">
              {t('featuredPropertiesSubtitle')}
            </p>
          </div>
          <Link to="/properties" className="mt-4 md:mt-0">
            <Button variant="outline" className="border-estate-800 text-estate-800 hover:bg-estate-800 hover:text-white">
              {t('viewAllProperties')}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;