// src/contexts/CurrencyContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// On ne garde qu'EUR comme devise
type Currency = 'EUR';

interface CurrencyContextType {
  currency: Currency;
  // setCurrency est supprimé car on a une seule devise
  convertPrice: (price: number, fromCurrency?: string) => number;
  formatPrice: (price: number, fromCurrency?: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Taux de conversion vers EUR uniquement
const conversionRates = {
  GEL: 0.32,   // 1 GEL = 0.32 EUR
  USD: 0.92,   // 1 USD = 0.92 EUR
  EUR: 1,      // 1 EUR = 1 EUR
  // Vous pouvez ajouter d'autres devises si nécessaire
};

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency] = useState<Currency>('EUR'); // Fixé à EUR

  const convertPrice = (price: number, fromCurrency: string = 'GEL') => {
    // S'assurer que fromCurrency est valide, sinon utiliser GEL par défaut
    const validFromCurrency = fromCurrency in conversionRates ? fromCurrency : 'GEL';
    // Convertir le prix de la devise source vers EUR
    return price * conversionRates[validFromCurrency as keyof typeof conversionRates];
  };

  const formatPrice = (price: number, fromCurrency: string = 'GEL') => {
    const convertedPrice = convertPrice(price, fromCurrency);
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(convertedPrice);
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      convertPrice, 
      formatPrice 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export type { Currency };