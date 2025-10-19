import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Autocomplete from "@/components/Autocomplete";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MapPin, Euro } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const Hero = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [type, setType] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const carouselImages = Array.from(
    { length: 14 },
    (_, i) => `/photohomepagecaroussel (${i + 1}).jpg`
  );

  return (
    <div className="relative bg-estate-800 py-16 md:py-24 lg:py-32 overflow-hidden">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="absolute inset-0 w-full h-full"
      >
        <CarouselContent className="h-full">
          {carouselImages.map((src, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="h-full">
                <img
                  src={src}
                  alt={`Image du carrousel ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </Carousel>

      <div className="container relative z-10">
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Trouvez votre bien idéal
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Recherchez parmi les annonces de vente et de location dans votre ville.
          </p>

          <div className="mx-auto max-w-5xl">
            <form
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 p-3 md:p-4 flex flex-col md:flex-row gap-3 md:gap-2 items-stretch"
              onSubmit={(e) => {
                e.preventDefault();
                const params = new URLSearchParams();
                if (city) params.set("city", city);
                if (type && type !== "all") params.set("type", type);
                if (minPrice) params.set("minPrice", minPrice);
                if (maxPrice) params.set("maxPrice", maxPrice);
                navigate(`/properties?${params.toString()}`);
              }}
            >
              <div className="flex-1 flex items-center gap-2 bg-white rounded-xl border border-estate-neutral-200 px-3">
                <MapPin className="text-estate-neutral-500" size={18} />
                <div className="flex-1">
                  <Autocomplete
                    label=""
                    placeholder="Ville, quartier..."
                    value={city}
                    onChange={setCity}
                    onPlaceChanged={(place) => {
                      const description = place?.formattedAddress || place?.formatted_address || place?.displayName || "";
                      if (description) setCity(description);
                    }}
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="w-full bg-white rounded-xl border-estate-neutral-200 text-estate-800">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="house">Maison</SelectItem>
                    <SelectItem value="apartment">Appartement</SelectItem>
                    <SelectItem value="land">Terrain</SelectItem>
                    <SelectItem value="commercial">Commerce</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 bg-white rounded-xl border border-estate-neutral-200 px-3">
                  <Euro className="text-estate-neutral-500" size={18} />
                  <Input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value.replace(/\D/g, ""))}
                    placeholder="Prix min"
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-estate-800 placeholder:text-estate-neutral-400"
                  />
                </div>
                <div className="flex items-center gap-2 bg-white rounded-xl border border-estate-neutral-200 px-3">
                  <Euro className="text-estate-neutral-500" size={18} />
                  <Input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value.replace(/\D/g, ""))}
                    placeholder="Prix max"
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-estate-800 placeholder:text-estate-neutral-400"
                  />
                </div>
              </div>
              <Button type="submit" className="bg-teal-500 hover:bg-teal-600 rounded-xl px-6 md:px-8">
                Rechercher
              </Button>
            </form>
          </div>

          <div className="max-w-md mx-auto mt-6">
            <Button
              onClick={() => navigate("/sell")}
              className="bg-white text-estate-800 hover:bg-estate-neutral-100 px-8 py-6 text-lg md:text-xl rounded-xl font-semibold w-full"
              size="lg"
            >
              Déposer une annonce
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
