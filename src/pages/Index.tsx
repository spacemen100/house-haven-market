
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import CategorySection from "@/components/CategorySection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const Index = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    // Set page title
    document.title = "HouseHaven - " + t("findDreamHome");
  }, [t]);

  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedProperties />
      <CategorySection />
      <Footer />
    </div>
  );
};

export default Index;
