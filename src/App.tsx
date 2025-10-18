// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Index from "./pages/Index";
import PropertyDetail from "./pages/PropertyDetail";
import Properties from "./pages/Properties";
import NotFound from "./pages/NotFound";
import Sell from "./pages/Sell";
import Account from "./pages/Account";
import VerificationError from "./pages/VerificationError";
import MovingServicesWrapper from "./pages/MovingServices"; // Import the new component
import { supabase } from "@/lib/api/supabaseClient";
import { useEffect, useState } from "react";
import { CurrencyProvider } from './CurrencyContext';

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check authentication state on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for authentication changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
          <CurrencyProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/moving-services" element={<MovingServicesWrapper />} /> 
                <Route
                  path="/account"
                  element={<Account />}
                />
                <Route path="/verification-error" element={<VerificationError />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CurrencyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
