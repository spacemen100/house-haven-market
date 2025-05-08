// src/contexts/CurrencyContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Currency = 'GEL' | 'USD' | 'EUR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (price: number, fromCurrency: Currency) => number;
  formatPrice: (price: number, fromCurrency: Currency) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('GEL');

  // Taux de conversion (1 USD = 2.75 GEL, 1 EUR = 3.12 GEL)
  const conversionRates = {
    GEL: 1,
    USD: 2.75,
    EUR: 3.12
  };

  const convertPrice = (price: number, fromCurrency: Currency) => {
    // Convertir d'abord en GEL puis vers la devise cible
    const priceInGel = price * conversionRates[fromCurrency];
    return priceInGel / conversionRates[currency];
  };

  const formatPrice = (price: number, fromCurrency: Currency) => {
    const convertedPrice = convertPrice(price, fromCurrency);
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(convertedPrice);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice }}>
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