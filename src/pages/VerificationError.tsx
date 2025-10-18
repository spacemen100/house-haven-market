
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const VerificationError = () => {
  const [errorType, setErrorType] = useState<string | null>(null);
  const [errorDescription, setErrorDescription] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Parse error params from hash
    if (location.hash) {
      const hashParams = new URLSearchParams(location.hash.substring(1));
      setErrorType(hashParams.get("error"));
      setErrorDescription(hashParams.get("error_description")?.replace(/\+/g, " "));
    }
  }, [location]);

  const getErrorMessage = () => {
    switch (errorType) {
      case "access_denied":
        if (location.hash.includes("otp_expired")) {
          return "Le lien de vérification par e-mail a expiré.";
        }
        return "Accès refusé. Vous n'avez pas la permission d'accéder à cette ressource.";
      default:
        return errorDescription || "Une erreur s'est produite lors de la vérification.";
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container min-h-[70vh] py-16 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md border border-estate-neutral-200">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="h-16 w-16 bg-amber-100 flex items-center justify-center rounded-full">
              <AlertTriangle className="h-8 w-8 text-amber-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-estate-800">Erreur de vérification</h1>
            
            <p className="text-estate-neutral-600">
              {getErrorMessage()}
            </p>
            
            <div className="space-y-3 w-full mt-4">
              <Button asChild className="w-full bg-teal-500 hover:bg-teal-600">
                <Link to="/">
                  Retour à l'accueil
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="w-full"
              >
                <a 
                  href="/account"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/account";
                  }}
                >
                  Réessayer
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerificationError;
