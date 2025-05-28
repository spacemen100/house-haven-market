
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/NewestProperties";
//import CategorySection from "@/components/CategorySection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProperties />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
