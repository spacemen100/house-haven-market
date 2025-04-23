
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/properties?search=${searchQuery}&type=${propertyType}`);
  };

  return (
    <div className="relative bg-estate-800 py-16 md:py-24 lg:py-32">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3')",
          opacity: "0.3",
        }}
      ></div>

      <div className="container relative z-10">
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find Your Dream Home
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Discover the perfect property from our extensive collection of homes, apartments, and land for sale and rent.
          </p>

          {/* Search Form */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-estate-neutral-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Enter location, city, or neighborhood"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-search pl-10"
                  />
                </div>
              </div>

              <div className="md:w-40">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="input-search"
                >
                  <option value="all">All Types</option>
                  <option value="house">Houses</option>
                  <option value="apartment">Apartments</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <Button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-md font-medium"
              >
                Search
              </Button>
            </form>
          </div>

          {/* Property Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-4xl font-bold">2.5K+</p>
              <p className="text-estate-neutral-200">Properties</p>
            </div>
            <div>
              <p className="text-4xl font-bold">1.8K+</p>
              <p className="text-estate-neutral-200">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold">100+</p>
              <p className="text-estate-neutral-200">Awards Won</p>
            </div>
            <div>
              <p className="text-4xl font-bold">50+</p>
              <p className="text-estate-neutral-200">Cities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
