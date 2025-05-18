import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
            {t('heroTitle')}
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>

          {/* Add Listing Button */}
          <div className="max-w-md mx-auto">
            <Button
              onClick={() => navigate("/sell")}
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-6 text-lg md:text-xl rounded-lg font-bold w-full"
              size="lg"
            >
              {t('addListing')}
            </Button>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Hero;