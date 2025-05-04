
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/NewestProperties";
import CategorySection from "@/components/CategorySection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
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
